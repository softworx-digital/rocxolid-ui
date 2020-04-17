import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap-daterangepicker';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapDaterangePicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('select.autocomplete', container).ajaxSelectPicker({
            minLength: 3
        });
    }
}

BootstrapDaterangePicker.packageName = 'bootstrap-daterangepicker';

BootstrapDaterangePicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.daterangepicker !== 'undefined');

export { BootstrapDaterangePicker };