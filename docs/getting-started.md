# Setup Backstage Dev Environment

## Getting Started

To get started with this workshop we are going to use Codespaces to set up our
development environment.

!!! tip "Codespaces plugin for VSCode"

    Before we start you should install the Codespaces plugin into your local VSCode
    installation, this is because we will later connect your vscode instance to the
    codespace in GitHub.

To use Codespaces we can go to the code button on the workshop repository and
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

## Creating a new Backstage app

Once you have a running environment you will now need to create a new backstage
app and get it started. To do this we have to use an `npx` command that will use
the backstage scaffolder to create a new backstage app.

Open the vscode terminal and run the following command and answer the questions
when prompted, accept all defaults.

```bash
npx @backstage/create-app@latest --path backstage --skip-install
```

In this command we specify the path to create the app in, which is normally
optional but needed within our setup as the backstage folder will already exists
due to container mounts. We also skip the install as we will upgrade to yarn 4
in the next step.

!!! tip "Yarn 4 Migration"

    While we are here we will migrate to yarn 3 to help speed up node installs
    in the future.

    Run the following commands

    ```bash
    cd backstage
    yarn set version berry && \
    yarn config set nodeLinker node-modules && \
    yarn install
    ```

Once the yarn installation is complete, you can start the app by running the
following command:

```bash
cd backstage
yarn dev
```

This should build and run the app and open a browser window for you. If it does
not you can open a browser and navigate to `http://localhost:3000` to see the
app running.

Once you have a running installation we can move to the first exercise!

??? Note "Working Directory"

    Ensure you are in the `backstage` directory when running the above command.
    All of the commands in this workshop should be run from the `backstage` directory.

??? Note "Port mapping"

    Backstage is running two processes exposed in the the container on port 3000
    and 7007. The codespace is mapping the ports to your local ports. Ensure
    you have no other processes running on those ports.

??? Note Node 20

    If you are running node 20 you will need to set the `NODE_OPTIONS=--no-node-snapshot`
    environment variable to prevent the node process from crashing.

    You can do this in a few ways, such as running
    `NODE_OPTIONS=--no-node-snapshot yarn dev` each time you start the app, or
    by adding it to the `dev` script in the `package.json`.

## Authentication

For this workshop we will need to authenticate with GitHub in order to create
new repositories in organizations that you own. To do this we need a token for
GitHub. We can re-use the token from the GitHub CLI for these purposes, this is
the easiest way to get a token and the token is short lived.

The GitHub CLI is already installed in this codespace, first you need to login.

```bash
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
