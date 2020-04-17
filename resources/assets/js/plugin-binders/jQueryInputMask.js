import 'inputmask/dist/jquery.inputmask';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class jQueryInputMask extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};
    }

    bind(container)
    {
        var rx = this.rx;

        $('[data-inputmask]').inputmask();
    }
}

jQueryInputMask.packageName = 'jquery-inputmask';

jQueryInputMask.check = () => (typeof $ !== 'undefined') && (typeof $.fn.inputmask !== 'undefined');

export { jQueryInputMask };