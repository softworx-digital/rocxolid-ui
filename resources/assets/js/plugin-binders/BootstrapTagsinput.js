import '@adactive/bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import '@adactive/bootstrap-tagsinput';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapTagsinput extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('[data-role="tagsinput"]', container).tagsinput({
            focusClass: 'nosubmit',
            confirmKeys: [13, 32]
        });
    }
}

BootstrapTagsinput.packageName = 'bootstrap-tagsinput';

BootstrapTagsinput.check = () => (typeof $ !== 'undefined') && (typeof $.fn.tagsinput !== 'undefined');

export { BootstrapTagsinput };