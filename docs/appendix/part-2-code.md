# Part 2 - Action Code

Below is the code for the action that we will be creating in this exercise. This
action will download a random cat image from the Cat API and save it to the
workspace.

```typescript
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs';
import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';
import { finished } from 'stream/promises';
import path from 'path';

// types
export interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export function createExampleAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction({
    id: "catscanner:randomcat",
    description: "Downloads a random cat image into the workspace",
    schema: {
      input: {
        catCount: z => z.number({ description: 'The number of cat images to download' })
      },
    },
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: ${ctx.input.catCount}`
      );

      for (let i = 0; i < ctx.input.catCount; i++) {
        const catResult = await fetch(
          'https://api.thecatapi.com/v1/images/search',
        );

        const catData: Record<string, CatResult> = await catResult.json();

        const stream = fs.createWriteStream(
          path.join(ctx.workspacePath, `catimage${i}.jpeg`),
        );
        const { body } = await fetch(catData[0].url);

        await finished(Readable.fromWeb(body as ReadableStream).pipe(stream));

        ctx.logger.info(`Cat image ${i} downloaded`);
      }
    },
  });
}
```
