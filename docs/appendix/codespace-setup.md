# Prerequisites

You will need:

- GitHub Account
- VSCode and 
[Codespaces Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces)


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

# Extra tips:
When using Codespaces with this Workshop, you will encounter the following issue:

![](../assets/codespaces_host_issue.png)

To work around this issue, please change the hostname in the browser from `127.0.0.1` to `localhost`.
