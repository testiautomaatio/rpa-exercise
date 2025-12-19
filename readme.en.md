# RPA Challenge (Robotic Process Automation)

In this exercise you will use Playwright for robotic process automation by automating the transfer of data from one web application to another.

This kind of approach is often called Robotic Process Automation (RPA). A software robot is simply software that performs repetitive computer tasks on behalf of a human, such as entering, copying, and transferring data between systems. RPA is useful when systems do not offer APIs or other integration methods, or are otherwise not directly compatible.

While the goal here is not to teach RPA, this is a good applied use case for Playwright. You will work with multiple simultaneous browser sessions and gather and enter data, occasionally transforming it before submission.

In this template the terms "test" and "spec" are replaced with "task" to emphasize the RPA flavor. Functionally the work is still implemented with Playwright tests, so you can use the full test library.

The task is graded in stages. You can earn most of the points even if you do not manage to transfer every piece of data.


## Prerequisites and setup

This exercise assumes you have completed earlier tasks covering Playwright project creation, installation, writing tests, and running them. This repository already contains a Playwright project scaffold. Install and start it with:

```bash
npm install
npm run tasks
```

`npm run tasks` runs the tests on Chromium and produces both a report and trace files. The `tasks` script is defined in [`package.json`](./package.json) to provide a convenient command for running the tasks.

Running the project also requires the browsers to be installed, which you hopefully did in a previous task. If needed, [install Chromium following the Playwright docs](https://playwright.dev/docs/browsers).


> [!TIP]
> The template includes a `tasks` folder with a pre-created [copyCars.task.ts](./tasks/copyCars.task.ts) file. You can implement your solution in that file or create new files as long as Playwright can find them under `tasks`. The example file does not use TypeScript features, so you may rename it to `.js` and write your solution in JavaScript if you prefer (e.g. `git mv copyCars.task.ts copyCars.task.js`).


## Task

> Subject: Help Needed: Transferring Our Fleet Data To A New System
>
> Hi,
>
> I'm the owner of AutoLegacy Oy, a small but stubbornly old-school fleet management company. Since the late 90s, we've been using a homegrown web system to keep track of all our vehicles. It's clunky, slow, insecure, and refuses to die—but it's finally time for an upgrade.
>
> We've recently signed up for a shiny new fleet management system that works in a modern browser (hallelujah!). The catch? Our old system doesn't support exporting data or integrating with anything. There are no APIs nor CSV exports — just a painfully retro web interface where each car's data can be viewed one by one.
>
> This is where I need your help.
>
> Your task is to use Playwright to automate the transfer of our car records from the old system to the new one. You'll need to:
>
> * Visit each car entry in the old system (https://rpa-exercise-legacy-system.pages.dev/).
>
> * Extract all relevant details (e.g., registration number, model, year, mileage etc).
>
> * Fill in the corresponding fields in the new system's web form (https://rpa-exercise-target-system.pages.dev/).
>
> It's a bit like time-traveling with a clipboard. There are no room for errors, so each entry must be copied perfectly. In case of errors, the process must start over from the beginning.
>
> Let me know if you run into any trouble. I'm happy to give you access credentials, screenshots, or nostalgic war stories from the days of dial-up internet.
>
> Thanks in advance for helping us finally enter the 21st century.
>
> Best regards,<br />
> Helena Huoltokirja<br />
> Owner, AutoLegacy Oy<br />
> helena@localhost


## Websites used

As described in the email above, the task uses two separate sites: one is the legacy vehicle registry and the other is the new replacement registry. You need to move data from the old system to the new one.

The old system is at https://rpa-exercise-legacy-system.pages.dev/ and the new system is at https://rpa-exercise-target-system.pages.dev/.

The [old system](https://rpa-exercise-legacy-system.pages.dev/) looks like a 90s website and is intentionally slow and clunky. The password is prefilled on the front page. After logging in you will see a list of cars, each of which must be opened individually. You need to copy each car's data from the old system to the new one.

The [new system](https://rpa-exercise-target-system.pages.dev/) is simpler but more modern. It tracks submitted cars and automatically validates the data by comparing it with the legacy system. If the data does not match, it shows an error to the user and also logs more detailed errors to the browser console. If you see errors, check the console output via the trace viewer.

The new system does not persist submitted data. It resets every time the page loads or refreshes, so you do not need to worry about resetting state between test runs.

![Copying cars from the old system to the new one](./diagram.png)

*Tip: the legacy system is slow and has security shortcomings. You can try skipping the slow login and accessing the car data directly. This can speed up the transfer, but it is optional. The focus here is automation, not security, and we generally do not recommend exploiting such weaknesses.*


## Implementing the solution

After installing the project and trying both sites manually, automate the data transfer by writing a "task" that follows these steps:

1. Open the legacy system front page and sign in.
2. In the legacy system, open each car's details individually.
3. Copy each car's details (license plate, make, model, etc.) into the new system.
4. Verify the data was entered correctly and that the new system reports no errors.
5. Finally, confirm the new system shows the text "You have completed the exercise!".

This task differs from earlier ones and can be solved in multiple ways. For example, you might first collect all legacy car records into an array and then submit them to the new system.

Alternatively, you can open multiple tabs or browser windows with Playwright and use both sites in parallel, like in this example:

```ts
import { test as task } from '@playwright/test';

task('this task uses two tabs', async ({ page, browser, context }) => {
    await page.goto('https://tailwindcss.com/');

    const secondPage = await context.newPage();
    await secondPage.goto('https://stackoverflow.com/search?q=how+to+center+a+div');
});

task('this task uses two browser windows', async ({ page, browser, context }) => {
    await page.goto('https://git-scm.com/docs/git-merge');

    const secondPage = await browser.newPage();
    await secondPage.goto('https://stackoverflow.com/search?q=how+to+exit+vim');
});
```

See the Playwright docs for more details on [Pages](https://playwright.dev/docs/pages), [BrowserContext](https://playwright.dev/docs/api/class-browsercontext), and [Browser](https://playwright.dev/docs/api/class-browser).

It may also be useful to apply Playwright's [Page Object Model](https://playwright.dev/docs/pom) to structure your code and make it more reusable. You can create separate POM classes for the legacy and new systems.


## Automatic evaluation

Once you have a solution—or even a partial one—submit it for automated grading. The task is graded in stages, so you can earn a share of the points without transferring every record.

Add your changes to version control and push them to GitHub with `git status`, `git add`, `git commit`, and `git push`. After `push`, a GitHub Actions workflow runs the tests and provides feedback. You can view the results on your repository's Actions tab.

The automated check runs tests headless, one at a time, on Chromium. We recommend verifying locally before submitting with:

```bash
npx playwright test --reporter="list,html" --project=chromium --trace=on

# or:
npm run tasks
```

If needed, inspect the Actions report and test outputs. Checking the browser console messages via trace viewer can also help resolve small issues. You can resubmit as many times as you like until the deadline.


## About the material

This exercise was created by Teemu Havulinna and is licensed under [Creative Commons BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Language models and AI tools such as GitHub Copilot and ChatGPT were used in creating this exercise.
