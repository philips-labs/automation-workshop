# Part 3 - Customize the UI

Random cat pictures are great, but it would be great if we could have a little
choice over what we got!

We can customize the template UI by creating a new field extension. This will
allow us to create a new field type that can be used in the template.

- Create the frontend plugin
- Implement the field extension
- Wire up the field extension frontend
- Use it in the template
- Update the action to use the output from the new field

## Create a new frontend plugin

```bash
cd backstage
yarn new --select plugin-react
```

We can name our plugin whatever we like, in this example we will call it
`catscanner`.

Now the plugin is created, to be able to use it, we need to add the plugin to
the `packages/app/package.json` file. This will make the plugin available to the
frontend (we will register out new field extension later).

```json
    "dependencies": {
        ...
        "@internal/backstage-plugin-catscanner-react": "link:../../plugins/catscanner-react",
        ...
    }
```

Now run `yarn install` to install the new plugin into the frontend app.

## Implement the field extension

Now we need to implement our field extension. Field extensions are a way to
combine an ID, a React Component and a validation function together in a modular
way that you can then use to pass to the Scaffolder. The Field Extension will
output a value that can be later consumed in a template.

We will implement against the following requirements:

- The user will be able to preview their random cat image.
- The user will be able to get a new image if they don't like the one they see.
- The shown cat image will be the one downloaded in the template.

This means that we will need to do the following

- Our implementation will be a react component that reads the Cat API to get a
  random cat image and then renders it in the UI for the user to see.
- The "output value" of the field will be the URL of the image, which we can use
  later in the template.
- We will also implement a validation function that will check that the URL is
  present and correctly formatted.

On to the implementation!

We can create a Field Extension by using the `createScaffolderFieldExtension`
API provided by backstage. But this comes in a few different parts, that we will
put into different files to keep things easy.

We will create a new folder in `plugins/catscanner-react/src/components` to hold
all of the files related to the extension. lets call this `RandomCatPix`.

```bash
cd backstage/
mkdir -p plugins/catscanner-react/src/components/RandomCatPix
```

Inside this we need to create the primary files that will contain the react
component and the validation. These files are:

- RandomCatPixExtension.tsx - contains the react part of the extension
- validation.ts - contains the function that validates the output of the field
- schema.ts - contains the schema for the field to allow it to be previewed
- extensions.ts - contains the registration of the extension
- index.ts - exports the extension to be used in the frontend

We can create all these files by running the following commands:

```bash
# go to the root of the react plugin
cd backstage/plugins/catscanner-react
touch src/components/RandomCatPix/RandomCatPixExtension.tsx \
  src/components/RandomCatPix/validation.ts \
  src/components/RandomCatPix/schema.ts \
  src/components/RandomCatPix/extensions.ts \
  src/components/RandomCatPix/index.ts
```

`RandomCatPixExtension.tsx` - This is the skeleton of our react UI component and
we will come back and extend this with our implementation later.

??? example "RandomCatPixExtension.tsx"

    ```tsx
    // plugins/catscanner-react/src/components/RandomCatPix/RandomCatPixExtension.tsx
    import React from "react";
    import { FieldExtensionComponentProps } from "@backstage/plugin-scaffolder-react";
    import FormControl from "@material-ui/core/FormControl";

    /*
    This is the actual component that will get rendered in the form
    */
    export const RandomCatPixExtension = ({
      onChange,
      rawErrors,
      required,
      formData,
    }: FieldExtensionComponentProps<string>) => {
      return (
        <FormControl
          margin="normal"
          required={required}
          error={rawErrors?.length > 0 && !formData}
        >
        // Add your forms react code here
        </FormControl>
      );
    };
    ```

`validation.ts` - This is the validation of the output of the component. Inside
this function, you can check the value of the field and return an error if it is
not valid.

??? example "validation.ts"

    ```typescript
    // plugins/catscanner-react/src/components/RandomCatPix/validation.ts
    import type { FieldValidation } from "@rjsf/utils";

    /*
    This is a validation function that will run when the form is submitted.
      You will get the value from the `onChange` handler before as the value here to make sure that the types are aligned\
    */
    export const randomCatPixExtensionValidation = (
      value: string,
      validation: FieldValidation
    ) => {};
    ```

`schema.ts` - The schema is optional, it allows backstage to know how to render
this component, what inputs it takes. This enables the previewing of the
component in the Custom Field Explorer.

??? example "schema.ts"

    ```typescript
    // plugins/catscanner-react/src/components/RandomCatPix/schema.ts
    import { CustomFieldExtensionSchema } from "@backstage/plugin-scaffolder-react";

    export const RandomCatPixSchema: CustomFieldExtensionSchema = {
      uiOptions: {
        type: "object",
        properties: {},
      },
      returnValue: { type: "string" },
    };
    ```

`extensions.ts` - this will create the Field Extension registration that will be
recognized by backstage. This brings together the ID, React component and
validation into a single component that we will make available to the
scaffolder.

??? example "extensions.ts"

    ```typescript
    // /plugins/catscanner-react/src/components/RandomCatPix/extensions.ts
    import { scaffolderPlugin } from "@backstage/plugin-scaffolder";
    import { createScaffolderFieldExtension } from "@backstage/plugin-scaffolder-react";
    import { RandomCatPixExtension } from "./RandomCatPixExtension";
    import { randomCatPixExtensionValidation } from "./validation";
    import { RandomCatPixSchema } from "./schema";

    export const RandomCatPixFieldExtension = scaffolderPlugin.provide(
      createScaffolderFieldExtension({
        name: "RandomCatPix",
        component: RandomCatPixExtension,
        validation: randomCatPixExtensionValidation,
        schema: RandomCatPixSchema,
      })
    );
    ```

Now we need to export the component from the plugin by modifying the `index.ts`
in the `RandomCatPix` folder.

```typescript
// plugins/catscanner-react/src/components/RandomCatPix/index.ts
export { RandomCatPixFieldExtension } from "./extensions";
```

Next we do the same in the `components` folder to export the `RandomCatPix`.

```typescript
// plugins/catscanner-react/src/components/index.ts
export * from "./RandomCatPix";
```

!!! tip "Previewing your component"

    You can preview the extensions you write in the Backstage UI using the
    Custom Field Explorer (accessible via the /create/edit route by default)

    To do this you need to first register your extension using the instructions
    in the next section below.

Now we need to go back to `RandomCatPixExtension.tsx` and implement the actual
UI code that we will use to get a random cat image and display it for the user.

You will want to look at the `useEffect` and `useState` react hooks to allow you
to trigger the request to the API and store the result.

You must also call the `onChange` function passed as a props to notify backstage
of the output value you want to use in the template. This does not have to be
what you render directly in the UI, for example you can pass an ID but render a
friendly name. So you should call this each time change the rendered cat image.

!!! tip

    We can re-use a lot of the code from the custom action we created earlier!

## Wire up the field extension frontend

You do this in `packages/app/src/App.tsx`. You need to provide the
`customFieldExtensions` as children to the `ScaffolderPage`.

In `App.tsx` you should find a section that looks like this, where the
scaffolder route is setup.

```tsx
const routes = (
  <FlatRoutes>
    ...
    <Route path="/create" element={<ScaffolderPage />} />
    ...
  </FlatRoutes>
);
```

Currently it is empty as we do not have any custom UI components, only the built
in ones. We need to change the setup to take in our new custom field extension
so that the scaffolder is aware of it.

```tsx
import { ScaffolderFieldExtensions } from "@backstage/plugin-scaffolder-react";
import { RandomCatPixFieldExtension } from "@internal/backstage-plugin-catscanner-react";

const routes = (
  <FlatRoutes>
    ...
    <Route path="/create" element={<ScaffolderPage />}>
      <ScaffolderFieldExtensions>
        <RandomCatPixFieldExtension />
      </ScaffolderFieldExtensions>
    </Route>
    ...
  </FlatRoutes>
);
```

## Use it in the template

Now our field extension is created and made available to the scaffolder, we can
use it in the template we created. We need to update our `template.yaml` file to
include the new field. The field extension outputs the URL as a value that we
can use later in the template.

We need to add the following new field to the catscanner template under the
`repoUrl` in the `spec.parameters.properties` section.

```yaml
randomCatUrl:
  type: string
  ui:field: RandomCatPix
```

You may now be wondering how we can use this value in the action we previously
created and what would that action even do?

Well the action would need to be changed to just download the URL provided and
no longer speak to the cat API at all. Luckily for us, this is a pretty standard
operation that we already have an action for.

We can change our template to remove our custom action and replace it with the
`fetch:plain:file` action that takes a URL and downloads it to the working
directory.

```yaml
- id: fetch-randomcat
  name: Random Cat
  action: fetch:plain:file
  input:
    url: ${{ parameters.randomCatUrl }}
    targetPath: catimage.jpeg
```

We also need to make a change to the `app-config.yaml` file to tell backstage
that we are happy to allow it to download files from the cat API CDN. This is a
security feature to stop the download of potentially dangerous files.

Add the following to the `backend:` section of your app-config.yaml and restart
your app.

```yaml
backend:
  reading:
    allow:
      - host: cdn2.thecatapi.com
```

Now we have two ways to get a random cat for our repo, we have a truly random
action, where you never know what cat you are going to get. We also have a user
selected cat, where you can pick the cat you want to see in your repo from the
random selections.

## Bonus Rounds

### Front End Testing

You can add some front end react testing to your components using the examples
created as part of the plugin template.

### Documentation

You should also add some documentation to your template to help your users
understand what your template does, how it works and why they should use it.
