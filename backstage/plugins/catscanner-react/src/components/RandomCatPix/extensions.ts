// /plugins/catscanner-react/src/components/RandomCatPix/extensions.ts
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { RandomCatPixExtension } from './RandomCatPixExtension';
import { randomCatPixExtensionValidation } from './validation';
import { RandomCatPixSchema } from './schema';

export const RandomCatPixFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'RandomCatPix',
    component: RandomCatPixExtension,
    validation: randomCatPixExtensionValidation,
    schema: RandomCatPixSchema,
  }),
);
