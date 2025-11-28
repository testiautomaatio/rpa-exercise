// The `test` function is renamed to `task` to better reflect its purpose in this exercise
import { test as task } from '@playwright/test';

// URLs of the legacy and target systems
const legacySystem = "https://rpa-exercise-legacy-system.pages.dev/";
const targetSystem = "https://rpa-exercise-target-system.pages.dev/";


task('copy cars from the legacy system to the target system', async ({ page, browser, context }) => {
    /* 
     * You can use the `page` as usual to interact with a single browser tab, but you can also
     * open new tabs or browser windows using the `context` or `browser` fixtures.
     * 
     * https://playwright.dev/docs/pages#multiple-pages
     */
});
