# Setup Backstage Dev Environment

## Getting Started

To get started with this workshop we are going to use
[Codespaces](https://github.com/features/codespaces) to set up our development
environment.

!!! tip "Codespaces plugin for VSCode"

    Before we start you should install the Codespaces plugin into your local VSCode
    installation, this is because we will later connect your vscode instance to the
    codespace in GitHub.

To use Codespaces we can go to the code button on the
[workshop repository](https://github.com/philips-labs/automation-workshop) and
select the Codespaces tab. Clicking create an new Codespaces will start out the
building and starting of your own Codespace. After a while you will have running
and working environment which you can see from the VSCode instance in your
browser.

You must then open your local vscode and press `ctrl/cmd+shift+p` and search for
`connect to codespace`. If you have not logged into GitHub you may be prompted
to login, once logged in you will need to select which codespace you want to
connect to. It will take a few seconds to connect and then you will see all of
the files from the codespace in your local vscode.

Once have you connected your vscode you can then continue with the rest of the
instructions here.

??? Note "Codespaces"

    During the workshop we use GitHub Codespaces to provide a consistent and easy to
    use environment for the workshop. GitHub is charging you for Codespaces usage, but
    also provide a free tier including 120 core-hours per month. You can check the details on the [GitHub billing page](https://github.com/settings/billing/summary). To avoid you make unnecessary costs, Codespaces will be automatically stopped after 30 minutes of inactivity. Check the [Codespace settings page](https://github.com/settings/codespaces) to see your Codespaces and adjust settings.

## Creating a new Backstage app

Once you have a running environment you will now need to create a new backstage
app and get it started. To do this we have to use an `npx` command that will use
the backstage scaffolder to create a new backstage app.

Open the vscode terminal and run the following command and answer the questions
when prompted, accept all defaults.

```bash
npx @backstage/create-app@latest --path backstage
```

In this command we specify the path to create the app in, which is normally
optional but needed within our setup as the backstage folder will already exists
due to container mounts.

This command will take a few minutes to run as it scaffolds the ann and restores
all the packages using yarn.

Once it is complete, we can start the development environment by running the
following command:

```bash
yarn start
```

![Backstage App](./assets/getting_started_app.png)

Once you have a running installation we can move to the first exercise (make
sure you read the note on Authentication below first!). In case you don't see
the Backstage app running, please check the following:

??? Note "Working Directory"

    Ensure you are in the `backstage` directory when running the above command.
    All of the commands in this workshop should be run from the `backstage` directory.

??? Note "Port mapping"

    Backstage is running two processes exposed in the the container on port 3000
    and 7007. The codespace is mapping the ports to your local ports. Ensure
    you have no other processes running on those ports and both ports are mapped, you may have to manually add port 7007 in the vscode UI.

## Authentication

For this workshop we will need to authenticate with GitHub in order to create
new repositories in organizations that you own. To do this we need a token for
GitHub. We can re-use the token from the GitHub CLI for these purposes, this is
the easiest way to get a token and the token is short lived.

Before we can continue we need to stop the running backstage app, you can do
this by pressing `ctrl+c` in the terminal where the app is running. Next we use
the same terminal session to authenticate with GitHub.

The GitHub CLI is already installed in this codespace, first you need to login.

```bash
unset GITHUB_TOKEN
gh auth login
```

Follow the prompts in the terminal and you should see
`✓ Logged in as <USERNAME>` when successful.

We need to export the token to the command line to enable it to be used in the
backstage app.

```bash
export GITHUB_TOKEN=$(gh auth token)
```

!!! tip "Terminal Sessions"

    This token will only be available in the current terminal session, if you
    close the terminal (or open a new one) you will need to re-run the above
    export command to export the token.
