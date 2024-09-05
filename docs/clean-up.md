# Clean up

??? Info "Pro tip"

    You can delete via the `gh cli` as well. Run the following command to delete the repository:

    ```bash
    gh repo delete <repo-name> --confirm
    ```

    The same you can do with the Codespaces. Run the following command to delete the Codespace:

    ```bash
    gh codespace list
    gh codespace delete -c <codespace-id>
    ```

    Be-careful with the `gh cli` as it can delete things without asking for confirmation.

## Codespaces

During the workshop we used GitHub Codespaces. The Codespace will be automatically stopped after 30 minutes of inactivity. But now the workshop is over, you can delete the Codespace to avoid any burning down your free tier or generate costs depending on your payment plan.

Go to the [Codespace overview page](https://github.com/codespaces) and delete the Codespace created for this workshops.

## Repositories

During the workshops you have created several repositories. You can delete the repositories now safely as they are not needed anymore.

Go to the the your user page, select the repositories tab. Next select the repository you want to delete and go to the settings. Scroll down to the danger zone and delete the repository.

