import { test } from '@playwright/test';
import LegacyPage from './legacyPage';
import TargetPage from './targetPage';

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


/**
 * This task uses the LegacyPage and TargetPage fixtures defined above and
 * the LegacyPage and TargetPage classes defined below. With these abstractions,
 * the task code is very concise and easy to read.
 */
task('copy cars from legacy system to the new one', async ({ legacyPage, targetPage }) => {
    await targetPage.open();
    await legacyPage.openDashboard();

    // exportCars is a generator function, so it returns the cars one at a time:
    for await (const car of legacyPage.exportCars()) {

        // for each car, submit it to the target system
        await targetPage.submitCar(car);
    }

    await targetPage.assertExerciseIsCompleted();
});



