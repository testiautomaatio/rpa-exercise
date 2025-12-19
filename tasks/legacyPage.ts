import { Page, expect } from '@playwright/test';
import { type Car } from './types';

const legacySystem = "https://rpa-exercise-legacy-system.pages.dev/";

export default class LegacyPage {

    constructor(readonly page: Page) { }

    async openDashboard() {
        await this.page.goto(legacySystem + "dashboard.php");
        await this.assertCarDetailsAreVisible();
    }

    async assertCarDetailsAreVisible() {
        await expect(this.carTable).toBeVisible({ timeout: 10_000 });
    }

    /**
     * A generator function that exports cars one at a time.
     * You can read more about generators here:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
     */
    async *exportCars() {
        const rows = await this.page.getByRole("row").all();

        // skip row 0 because it's the header
        for (const row of rows.slice(1)) {
            // open the next car details dialog
            await row.getByRole("button", { name: "Details" }).click();

            // get current car details from dialog
            const car = await this.extractCarFromDialog();

            await this.page.getByRole("button", { name: "Close" }).click();

            // log the car to the console for debugging purposes
            console.table(car);

            // yield the current and move to the next one
            yield car;
        }

    }

    private async extractCarFromDialog(): Promise<Car> {
        // Utility function to extract a single field by the field name.
        const get = async (fieldName: string) => {
            const group = this.dialog.getByRole("group", { name: fieldName });
            const text = await group.innerText();

            // We only want the value in the field, so we remove the field name from the text:
            return text.replace(fieldName, "").trim()
        }

        // Partial<> in TypeScript allows objects with some undefined properties.
        // It allows missing but not extra properties or wrong types.
        const car: Partial<Car> = {};

        // Get the first fields from "general" tab
        car.licensePlate = await get("License plate");
        car.make = await get("Make");
        car.model = await get("Model");
        car.year = await get("Year");
        car.color = await get("Color");

        // click on the second tab
        await this.dialog.getByRole("tab", { name: "Usage" }).click();

        // continue extracting fields
        car.streetLegal = (await get("Street legal")).includes("yes");
        car.owner = await get("Owner");

        // the mileage field is a bit different, it's an input field and not just text
        car.mileage = await this.dialog
            .getByRole("group", { name: "Mileage" })
            .locator("input")
            .inputValue();

        return car as Car;
    }

    get carTable() {
        return this.page.getByText("Final_CarSheet_v5");
    }

    get dialog() {
        return this.page.getByRole("dialog");
    }

}
