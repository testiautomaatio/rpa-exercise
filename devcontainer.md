# Development container

If you want to avoid installation issues and have a ready-to-use environment, you can use the provided [development container configuration](./.devcontainer/devcontainer.json). A [development container](https://code.visualstudio.com/docs/devcontainers/containers) is a [Docker container](https://www.docker.com/resources/what-container/) that has all the necessary tools and dependencies installed, allowing you to work in a consistent environment that is independent of your local setup.

In this case, the development container is [configured](./.devcontainer/devcontainer.json) to have Node.js and the Playwright VS Code extension installed, along with typical command-line tools that are included in development containers.

> [!NOTE]
> Note that if you choose to use the development container, you will need to install Playwright browsers with a `--with-deps` flag. This is because the development container is minimal and does not include all system dependencies required by browsers, for example. In this exercise browsers are installed with the following command:
>
> ```bash
> npx playwright install chromium --with-deps
> ```


## Run a container locally

To use the development container locally, you need to have [Docker](https://www.docker.com/get-started) installed on your machine and the [Visual Studio Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. Once Docker is set up, you can open the project in VS Code and it will prompt you to reopen the folder in the container. After reopening, VS Code will build the container based on the configuration and install all the required tools and dependencies as specified in the [`postCreate.sh` script](./.devcontainer/postCreate.sh).


### Stopping and removing local containers

Development containers are typically associated with specific projects and folders. When you work with multiple projects over time, you can end up with multiple unnecessary containers that take up disk space.

To stop or remove a container, you can use the Docker CLI, the Docker Desktop application or one of many VS Code extensions. You can also use the VS Code dev containers extension to clean up unnecessary containers: simply open the command palette (Ctrl+Shift+P) and run the "Dev Containers: Clean Up Dev Containers" command to select which containers to remove. Deleting a container is safe assuming that you have committed all your changes to the repository.


## Run a container in the cloud

If installing Docker locally is not your preferred option, you can also use the same development container in a cloud-based environment such as [GitHub Codespaces](https://github.com/features/codespaces). GitHub Codespaces allows you to create a development environment in the cloud that is accessible through your browser or [your locally installed VS Code](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-github-codespaces-in-visual-studio-code). The developer experience in Codespaces is very similar to using a local development container or a local installation.

You can open the project in GitHub Codespaces by following [this guide](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository#creating-a-codespace). After opening the repository in GitHub, you can create a new codespace by clicking on the "Code" button on the repository's front page and selecting "Open with Codespaces". This will create a new codespace that uses the same development container configuration, so you will have the same tools and dependencies available as if you were running it locally. This can be a convenient option if you want to avoid installing Docker or if you want to work from different machines without having to set up the environment each time.

Cloud based development environments are commercial services and may require a paid subscription. Be sure to check the pricing details of the service you choose to use. At the time of writing, GitHub Codespaces offers a free tier with limited hours of usage per month, and additional hours can be purchased if needed (see [docs.github.com](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces)).


### Stopping and removing remote containers

Development containers have time and storage limits and the storage limits can be exceeded if you have multiple large containers, such as those with browsers and other extra tools installed.

When done using the container, you should stop it to stop incurring costs or using the free hours. When completely done with the exercise, you should also delete the container to free up space. Deleting the container is safe assuming that you have committed all your changes to the repository.

For information about how to [stop](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace) and [delete containers](https://docs.github.com/en/codespaces/developing-in-a-codespace/deleting-a-codespace), see the documentation of the service you are using.


## Tips, troubleshooting, and resources

### Installing browser dependencies

Inside a development container, Playwright browsers need to be installed with a `--with-deps` flag. This is because the development container is minimal and does not include all system dependencies required by browsers, for example fonts.

> [!NOTE]
> ```bash
> npx playwright install chromium --with-deps
> ```


### Opening the test report

Opening the Playwright HTML report from your own browser might not work when the report is served from the development container. This happens because Playwright will only allow the local machine to access the report for security reasons. When the report is opened inside the container, your own operating system is technically a separate host, so it should not be able to connect.

You can work around this by opening the report and setting the `--host` flag to listen to all interfaces, not just the local one. For example, you can run the following command in the terminal of the development container:

> [!NOTE]
> ```bash
> npx playwright show-report --host 0.0.0.0
> ```
>
> **⚠️ Security note**
>
> Binding to `0.0.0.0` exposes the report server to your network. Avoid doing this on untrusted networks unless you firewall it.


### Graphical applications

Opening graphical applications that are running inside the development container, such as the Playwright tools or the browser, might not work the same way as on your local machine. This is because the development container is a separate environment that does not have direct access to your local display server. You have better changes of opening graphical applications if you are using a local development container, as opposed to a cloud-based one, because the local container can be configured to use your local display server. However, even with a local container, you might need additional configuration or X11 forwarding to get graphical applications working properly.
