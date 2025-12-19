import { Page, expect } from '@playwright/test';
import { type Car } from './types';

const targetSystem = "https://rpa-exercise-target-system.pages.dev/";

export default class TargetPage {

    constructor(readonly page: Page) {
    }

    async open() {
        await this.page.goto(targetSystem);
    }

    async submitCar(car: Car) {
        // map the string fields to form field locators
        const fields: Record<string, string> = {
            "License plate": car.licensePlate,
            "Make": car.make,
            "Model": car.model,
            "Year": car.year,
            "Mileage": car.mileage,
            "Owner name": car.owner,
            "Color": car.color
        };

        // fill each field with the corresponding value
        for (const [name, value] of Object.entries(fields)) {
            await this.page.getByRole("textbox", { name }).fill(value);
        }

        // the street legal is a checkbox, so we handle it separately
        if (car.streetLegal) {
            await this.page.getByRole("checkbox", { name: "Street legal" }).check();
        }

        await this.saveButton.click();

        await this.page.getByText(`${car.licensePlate} was added successfully!`).click();
    }

    get saveButton() {
        return this.page.getByRole("button", { name: "Save" });
    }

    async assertExerciseIsCompleted() {
        await expect(this.page.getByText("Congratulations! You have completed the exercise!")).toBeVisible();
    }
}

