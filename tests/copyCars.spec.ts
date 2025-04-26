import { expect, Locator, Page, test } from '@playwright/test';

const legacySystem = "https://rpa-exercise-legacy-system.pages.dev/";
const targetSystem = "https://rpa-exercise-target-system.pages.dev/";


test('copy cars from legacy system to the new one', async ({ browser }) => {
    const page = await browser.newPage({ recordVideo: { dir: 'videos/' } });

    await page.goto(legacySystem + "dashboard.php");
    //await page.getByRole('button', { name: 'Log in' }).click();

    const page2 = await browser.newPage({ recordVideo: { dir: 'videos/' } });
    await page2.goto(targetSystem);
    await expect(page.getByText("Final_CarSheet_v5")).toBeVisible({ timeout: 10_000 });
    const rows = await page.getByRole("row").all();

    for (const row of rows.slice(1)) {
        await row.getByRole("button", { name: "Details" }).click();

        const dialog = page.getByRole("dialog");
        const car = await extractCarFromDialog(dialog);

        console.log(car);

        await submitCarToTargetSystem(page2, car);

        await page2.getByText(`${car.licensePlate} was added successfully!`).click();
        await page.getByRole("button", { name: "Close" }).click();
    }

    await expect(page2.getByText("Congratulations! You have completed the exercise!")).toBeVisible();
});

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
async function extractCarFromDialog(dialog: Locator): Promise<Car> {
    // Utility function to extract a single field by the field name
    const get = async (fieldName: string) => (await dialog.getByRole("group", { name: fieldName }).innerText()).replace(fieldName, "").trim()

    const car: Record<string, string | boolean> = {};

    // the first tab is the "General" tab
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

async function submitCarToTargetSystem(page: Page, car: Car) {
    await page.getByRole("textbox", { name: "License plate" }).fill(car.licensePlate);
    await page.getByRole("textbox", { name: "Make" }).fill(car.make);
    await page.getByRole("textbox", { name: "Model" }).fill(car.model);
    await page.getByRole("textbox", { name: "Year" }).fill(car.year);
    await page.getByRole("textbox", { name: "Mileage" }).fill(car.mileage);
    await page.getByRole("textbox", { name: "Owner name" }).fill(car.owner);
    await page.getByRole("textbox", { name: "Color" }).fill(car.color);

    if (car.streetLegal) {
        await page.getByRole("checkbox", { name: "Street legal" }).check();
    }

    await page.getByRole("button", { name: "Save" }).click();
}

