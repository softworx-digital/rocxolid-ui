import '@adactive/bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import '@adactive/bootstrap-tagsinput';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class BootstrapTagsinput extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;
    }
}

BootstrapTagsinput.packageName = 'bootstrap-tagsinput';

BootstrapTagsinput.check = () => (typeof $ !== 'undefined') && (typeof $.fn.tagsinput !== 'undefined');

export { BootstrapTagsinput };