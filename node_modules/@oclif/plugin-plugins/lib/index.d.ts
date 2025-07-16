import PluginsIndex from './commands/plugins/index.js';
import PluginsInspect from './commands/plugins/inspect.js';
import PluginsInstall from './commands/plugins/install.js';
import PluginsLink from './commands/plugins/link.js';
import PluginsReset from './commands/plugins/reset.js';
import PluginsUninstall from './commands/plugins/uninstall.js';
import PluginsUpdate from './commands/plugins/update.js';
export declare const commands: {
    plugins: typeof PluginsIndex;
    'plugins:inspect': typeof PluginsInspect;
    'plugins:install': typeof PluginsInstall;
    'plugins:link': typeof PluginsLink;
    'plugins:reset': typeof PluginsReset;
    'plugins:uninstall': typeof PluginsUninstall;
    'plugins:update': typeof PluginsUpdate;
};
export declare const hooks: {
    update: import("@oclif/core").Hook<"update">;
};
