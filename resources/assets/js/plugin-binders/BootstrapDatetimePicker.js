import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'eonasdan-bootstrap-datetimepicker';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapDatetimePicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.datepicker', container).datetimepicker({
            locale: 'sk',
            format: 'DD.MM.YYYY'
        });
    }
}

BootstrapDatetimePicker.packageName = 'eonasdan-bootstrap-datetimepicker';

BootstrapDatetimePicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.datetimepicker !== 'undefined');

export { BootstrapDatetimePicker };