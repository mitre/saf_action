import { Plugin as IPlugin } from '../interfaces/plugin';
type PluginLoaderOptions = {
    plugins?: IPlugin[] | PluginsMap;
    root: string;
};
type LoadOpts = {
    dataDir: string;
    devPlugins?: boolean;
    force?: boolean;
    rootPlugin: IPlugin;
    userPlugins?: boolean;
};
type PluginsMap = Map<string, IPlugin>;
export default class PluginLoader {
    options: PluginLoaderOptions;
    errors: (Error | string)[];
    plugins: PluginsMap;
    private pluginsProvided;
    constructor(options: PluginLoaderOptions);
    loadChildren(opts: LoadOpts): Promise<{
        errors: (Error | string)[];
        plugins: PluginsMap;
    }>;
    loadRoot(): Promise<IPlugin>;
    private loadCorePlugins;
    private loadDevPlugins;
    private loadPlugins;
    private loadUserPlugins;
}
export {};
