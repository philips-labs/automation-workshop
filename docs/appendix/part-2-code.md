# Part 2 - Action Code

Below is the code for the

```typescript
// Imports
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

// handler function
ctx.logger.info(
  `Running example template with parameters: ${ctx.input.myParameter}`
);

const catResult = await fetch("https://api.thecatapi.com/v1/images/search");

const catData: Record<string, CatResult> = await catResult.json();

const stream = fs.createWriteStream(
  path.join(ctx.workspacePath, "catimage.jpeg")
);
const { body } = await fetch(catData[0].url);

await finished(Readable.fromWeb(body as ReadableStream).pipe(stream));

ctx.logger.info("Cat image downloaded");
```
