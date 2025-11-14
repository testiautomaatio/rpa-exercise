import { test as task } from '@playwright/test';

task('this test uses two tabs', async ({ page, browser, context }) => {
    await page.goto('https://tailwindcss.com/');

    const secondPage = await context.newPage();
    await secondPage.goto('https://stackoverflow.com/search?q=how+to+center+a+div');
});

task('this test uses two browser windows', async ({ page, browser, context }) => {
    await page.goto('https://git-scm.com/docs/git-merge');

    const secondPage = await browser.newPage();
    await secondPage.goto('https://stackoverflow.com/search?q=how+to+exit+vim');
});
