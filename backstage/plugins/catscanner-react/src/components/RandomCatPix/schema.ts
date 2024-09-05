// plugins/catscanner-react/src/components/RandomCatPix/schema.ts
import { CustomFieldExtensionSchema } from '@backstage/plugin-scaffolder-react';

export const RandomCatPixSchema: CustomFieldExtensionSchema = {
  uiOptions: {
    type: 'object',
    properties: {},
  },
  returnValue: { type: 'string' },
};
