# Part 2 - Creating a new action

In this exercise we will create a new action for Backstage. Custom actions allow
us to extend the functionality of Backstage to do whatever we need as part of a
template. They are re-usable steps that can be used in multiple templates.

Our new action will allow us to get a random cat picture. It will call the Cat
API to get the location of a cat photo, download the file and place it in the
working directory.

There are 4 steps to creating a new action:

1. Create a new scaffolder plugin
2. Register your plugin
3. Write your action
4. Use it in the template

## Create a new scaffolder plugin

To create a new scaffolder we can leverage the backstage templates by running

```bash
cd backstage
yarn new --select scaffolder-module
```

This will create a new scaffolder module in the `plugins` directory. You can
name the plugin whatever you like, for this example we will call it
`cat-scaffolder`.

Congratulations, you have created a new scaffolder plugin!

!!! tip

    You can see what other plugin types there are by running `yarn new`.

## Register your plugin

The plugin won't do much on its own, we need to register it in the backend so
that it gets loaded correctly.

Firstly, add your package as a reference to the
`./packages/backend/package.json` in the dependencies section, like below:

```json
{
  ...
  "dependencies": {
    ...
    "@internal/backstage-plugin-scaffolder-backend-module-cat-scaffolder": "link:../../plugins/scaffolder-backend-module-cat-scaffolder",
    ...
  }
}
```

And run `yarn install` to install the new package into the backend app.

Then add the following code to `packages/backend/src/index.ts`. This will
register your plugin with the backend and make it available to the scaffolder.

```typescript
...
backend.add(
  import("@internal/backstage-plugin-scaffolder-backend-module-cat-scaffolder")
);
```

!!! tip

    You may notice that this is underlined in red with an error. Don't worry
    we will fix this in the next step.

Now we need to export your action correctly from the plugin for the "new
backend" system.

Create a new file in your plugin called `src\module.ts` containing the following
code

```typescript
import { createBackendModule } from "@backstage/backend-plugin-api";
import { scaffolderActionsExtensionPoint } from "@backstage/plugin-scaffolder-node/alpha";
import { createAcmeExampleAction } from "./actions";

export const actionsModule = createBackendModule({
  pluginId: "scaffolder",
  moduleId: "cat-scaffolder",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
      },
      async init({ scaffolder }) {
        scaffolder.addActions(createAcmeExampleAction());
      },
    });
  },
});
```

Then replace all the code in the `src\index.ts` file with the following:

```typescript
export { actionsModule as default } from "./module";
```

The red error in your backend should now disappear.

To confirm everything is working correctly you can now run `yarn dev` to start
backstage, navigate to [Installed Actions](http://localhost:3000/create/actions)
and you should see `acme:example` in the list. (we will change this later!)

## Write your action

Now we need to write our action. This is the code that will be executed when the
action is run as part of a template.

First, update the definition of the action, changing the ID and description and
removing the required inputs and properties definitions. We don't need them
(yet). Your definition should something look like this:

```typescript
id: 'catscanner:randomcat',
description: 'Downloads a random cat image into the workspace',
schema: {
  input: {
    type: 'object',
    required: [],
    properties: {},
  },
},
```

Now need to implement the action code in the `handler` function in
`src/actions/example/example.ts`,. This is where we get the cat image from the
API and download it to the working directory.

The API that we will use is `https://api.thecatapi.com/v1/images/search`, this
API will return a JSON object with a URL to a cat image. Once we get this json,
we then need to download this image and save it to the working directory.

You can access the working directory using `ctx.workspacePath` and write to the
log using `ctx.logger.info`.

!!! tip "Unit Testing"

    You should write unit tests for your action using the
    [instructions in the backstage docs](https://backstage.io/docs/features/software-templates/writing-tests-for-actions).

## Use it in a template

Now that we have our action we can use it in a template.

You can add this action to the template by adding the following to the
`spec.steps` section of the template yaml file:

```yaml
- id: download-cat-image
  name: Download Cat Image
  action: catscanner:randomcat
```

You can now test your cat downloading skills in the template! You should end up
with a repo that has a single cat image in it.

!!! tip "Don't forget to refresh your template!"

## Bonus Round - Testing

If you have not already you should try writing unit test for your new action
using the
[instructions in the backstage docs](https://backstage.io/docs/features/software-templates/writing-tests-for-actions).

You can see that the template was generated with an example unit test already
setup as an example for you
