/**
 * Abstract plugin binder, serves as interface.
 *
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class PluginBinder
{
    constructor(rx, settings)
    {
        if (new.target === PluginBinder) {
            throw new TypeError('Abstract class instantiation');
        }

        this.rx = rx;
        this.settings = settings || {};

        console.debug('Creating', new.target.name, 'plugin binder');
    }

    bind(container)
    {
        throw new ReferenceError('Binding must be implemented in specific plugin binder');
    }

    onNotAvailable()
    {
        console.warn(this.constructor.packageName, 'not available');
    }

    t(key)
    {
        return this.rx.translator.translate(this.constructor.packageName, key);
    }
}

PluginBinder.packageName = null;

PluginBinder.check = () => console.warn('Check must be implemented in specific plugin binder') && false;

PluginBinder.onNotAvailable = (plugin) => console.warn('Plugin for', plugin, 'not available');

export { PluginBinder };