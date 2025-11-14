import { expect, Locator, Page, test } from '@playwright/test';

const legacySystem = "https://rpa-exercise-legacy-system.pages.dev/";
const targetSystem = "https://rpa-exercise-target-system.pages.dev/";

/**
 * Extends the test function with two fixtures:
 * - legacyPage: represents the legacy system page
 * - targetPage: represents the target system page
 * 
 * These fixtures open a new browser tab for each page, so they can be used simultaneously.
 */
const task = test.extend<{ legacyPage: LegacyPage, targetPage: TargetPage }>({
    legacyPage: async ({ page, browser }, use) => {
        const newTab = await browser.newPage();
        await use(new LegacyPage(newTab));
    },
    targetPage: async ({ page, browser }, use) => {
        const newTab = await browser.newPage();
        await use(new TargetPage(newTab));
    }
});

task('copy cars from legacy system to the new one', async ({ legacyPage, targetPage }) => {
    await targetPage.open();
    await legacyPage.openDashboard();

    for await (const car of legacyPage.exportCars()) {
        await targetPage.submitCar(car);
    }

    await targetPage.assertExerciseIsCompleted();
});

class LegacyPage {
    carTable: Locator;

    constructor(readonly page: Page) {
        this.carTable = this.page.getByText("Final_CarSheet_v5");
    }

    async openDashboard() {
        await this.page.goto(legacySystem + "dashboard.php");
        await this.assertCarDetailsAreVisible();
    }

    async assertCarDetailsAreVisible() {
        await expect(this.carTable).toBeVisible({ timeout: 10_000 });
    }

    async *exportCars() {
        const rows = await this.page.getByRole("row").all();

        // skip row 0 because it's the header
        for (const row of rows.slice(1)) {
            // open the next car details dialog
            await row.getByRole("button", { name: "Details" }).click();

            // get current car details from dialog
            const dialog = this.page.getByRole("dialog");
            const car = await this.extractCarFromDialog(dialog);

            await this.page.getByRole("button", { name: "Close" }).click();

            console.table(car);

            // yield the current and move to the next one
            yield car;
        }

    }

    private async extractCarFromDialog(dialog: Locator): Promise<Car> {
        // Utility function to extract a single field by the field name
        const get = async (fieldName: string) => {
            const group = dialog.getByRole("group", { name: fieldName });
            const text = await group.innerText();
            return text.replace(fieldName, "").trim()
        }

        // Partial<> in TypeScript allows objects with some undefined properties
        const car: Partial<Car> = {};

        // Get the first fields from "general" tab
        car.licensePlate = await get("License plate");
        car.make = await get("Make");
        car.model = await get("Model");
        car.year = await get("Year");
        car.color = await get("Color");

        // click on the second tab
        await dialog.getByRole("tab", { name: "Usage" }).click();

        // continue extracting fields
        car.streetLegal = (await get("Street legal")).includes("yes");
        car.owner = await get("Owner");

        // the mileage field is a bit different, so we need to extract it separately
        car.mileage = await dialog.getByRole("group", { name: "Mileage" }).locator("input").inputValue();

        return car as Car;
    }
}

class TargetPage {

    constructor(readonly page: Page) { }

    async openDashboard() {
        await this.page.goto(legacySystem + "dashboard.php");
    }

    async open() {
        await this.page.goto(targetSystem);
    }

    async submitCar(car: Car) {
        const fields: Record<string, string> = {
            "License plate": car.licensePlate,
            "Make": car.make,
            "Model": car.model,
            "Year": car.year,
            "Mileage": car.mileage,
            "Owner name": car.owner,
            "Color": car.color
        };

        for (const [name, value] of Object.entries(fields)) {
            await this.page.getByRole("textbox", { name }).fill(value);
        }

        if (car.streetLegal) {
            await this.page.getByRole("checkbox", { name: "Street legal" }).check();
        }

        await this.page.getByRole("button", { name: "Save" }).click();

        await this.page.getByText(`${car.licensePlate} was added successfully!`).click();
    }

    async assertExerciseIsCompleted() {
        await expect(this.page.getByText("Congratulations! You have completed the exercise!")).toBeVisible();
    }
}

type Car = {
    licensePlate: string;
    make: string;
    model: string;
    year: string;
    color: string;
    mileage: string;
    streetLegal: boolean;
    owner: string;
}
