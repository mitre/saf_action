import Plugins from '../plugins.js';
export const update = async function () {
    const plugins = new Plugins({
        config: this.config,
    });
    try {
        await plugins.update();
    }
    catch (error) {
        if (error instanceof Error) {
            this.error(error.message);
        }
    }
};
