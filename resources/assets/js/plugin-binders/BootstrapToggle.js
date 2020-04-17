import 'bootstrap-toggle/css/bootstrap-toggle.min.css';
import 'bootstrap-toggle';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class BootstrapToggle extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('input:checkbox[data-toggle]', container).bootstrapToggle();
    }
}

BootstrapToggle.packageName = 'bootstrap-toggle';

BootstrapToggle.check = () => (typeof $ !== 'undefined') && (typeof $.fn.toggle !== 'undefined');

export { BootstrapToggle };