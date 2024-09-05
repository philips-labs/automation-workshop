import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createAcmeExampleAction } from './actions';

export const actionsModule = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'cat-scaffolder',
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
