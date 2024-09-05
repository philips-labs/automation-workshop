# Part 2 - Action Code

Below is the code for the action that we will be creating in this exercise. This
action will download a random cat image from the Cat API and save it to the
workspace.

```typescript
import { createTemplateAction } from "@backstage/plugin-scaffolder-node";
import fs from "fs";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";
import { finished } from "stream/promises";
import path from "path";

// types
export interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

/**
 * Creates an `acme:example` Scaffolder action.
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */
export function createAcmeExampleAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction<{
    myParameter: string;
  }>({
    id: "catscanner:randomcat",
    description: "Downloads a random cat image into the workspace",
    schema: {
      input: {
        type: "object",
        required: [],
        properties: {},
      },
    },
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: ${ctx.input.myParameter}`
      );

      const catResult = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );

      const catData: Record<string, CatResult> = await catResult.json();

      const stream = fs.createWriteStream(
        path.join(ctx.workspacePath, "catimage.jpeg")
      );
      const { body } = await fetch(catData[0].url);

      await finished(Readable.fromWeb(body as ReadableStream).pipe(stream));

      ctx.logger.info("Cat image downloaded");
    },
  });
}
```
