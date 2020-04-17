import 'bootstrap-maxlength';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class BootstrapMaxlength extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('[maxlength]', container).maxlength({
            alwaysShow: true,
            appendToParent: true
        });
    }
}

BootstrapMaxlength.packageName = 'bootstrap-maxlength';

BootstrapMaxlength.check = () => (typeof $ !== 'undefined') && (typeof $.fn.maxlength !== 'undefined');

export { BootstrapMaxlength };