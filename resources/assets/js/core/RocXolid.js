import { Response } from './Response';
import { EventsBinder } from './EventsBinder';
import { ElementBinder } from './ElementBinder';
import { Translator } from './Translator';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class RocXolid
{
    constructor()
    {
        this.response = new Response(this);
        this.eventsBinder = new EventsBinder(this);
        this.elementBinder = new ElementBinder(this);
        this.translator = new Translator(this);
        this.pluginBinders = {};
    }

    init(binders)
    {
        this
            .registerPluginBinders(binders)
            .bindPlugins();

        this.eventsBinder.bind();
        this.elementBinder.bind();

        return this;
    }

    getResponse(data)
    {
        return this.response.set(data);
    }

    registerPluginBinders(binders)
    {
        for (let param in binders) {
            if (binders[param].binder.check()) {
                this.registerPluginBinder(binders[param], param);
            } else {
                binders[param].binder.onNotAvailable(param);
            }
        };

        return this;
    }

    registerPluginBinder(plugin, param)
    {
        const binder = plugin.binder;
        const settings = plugin.settings;

        this.pluginBinders[param] = new binder(this, settings);

        return this;
    }

    getPluginBinder(plugin)
    {
        return this.pluginBinders[plugin];
    }

    bindPlugins(selector)
    {
        for (let plugin in this.pluginBinders) {
            this.bindPlugin(plugin, selector);
        }
    }

    bindPlugin(plugin, selector)
    {
        selector = selector || document;

        if (this.hasPlugin(plugin)) {
            this.getPlugin(plugin).bind(selector);
        } else {
            console.warn('No RocXolid plugin binder for', plugin);
        }

        return this;
    }

    unbindPlugin(plugin, selector)
    {
        selector = selector || document;

        if (this.hasPlugin(plugin)) {
            this.getPlugin(plugin).unbind(selector);
        } else {
            console.warn('No RocXolid plugin binder for', plugin);
        }

        return this;
    }

    hasPlugin(plugin)
    {
        return (typeof this.getPluginBinder(plugin) !== 'undefined');
    }

    getPlugin(plugin)
    {
        if (typeof this.getPluginBinder(plugin) !== 'undefined') {
            return this.pluginBinders[plugin];
        } else {
            throw new ReferenceError('No RocXolid plugin binder for ' + plugin);
        }
    }

    handleAjaxError(data)
    {
        console.error('Response error occured', data);

        if (data.status == 401) {
            location.reload();
        } else if (data.status == 403) {
            this.response.notify({
                'type': 'error',
                'text': data.responseJSON.message,
            })
        } else if (data.status == 500) {
            this.response.notify({
                'type': 'error',
                'text': data.responseJSON.message,
            })
        }
    }
}

export { RocXolid };