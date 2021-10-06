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

        const lang = $('html').attr('lang');

        $('.datepicker', container).datetimepicker({
            locale: lang,
            format: 'DD.MM.YYYY'
        });

        $('.datetimepicker', container).datetimepicker({
            locale: lang,
            format: 'DD.MM.YYYY HH:mm'
        });
    }
}

BootstrapDatetimePicker.packageName = 'eonasdan-bootstrap-datetimepicker';

BootstrapDatetimePicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.datetimepicker !== 'undefined');

export { BootstrapDatetimePicker };