import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';
import 'bootstrap-select/dist/js/i18n/defaults-sk_SK'; // @todo: find out how to support multiple and switch between them at runtime
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class BootstrapSelectPicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('select', container).selectpicker({
            showTick: true
        }).on('change', function() {
            if ($(this).closest('form').hasClass('autosubmit')) {
                $(this).closest('form').find('input[type="submit"], button[type="button"][data-ajax-submit-form]').click();
            }
        });
    }
}

BootstrapSelectPicker.packageName = 'bootstrap-selectpicker';

BootstrapSelectPicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.selectpicker !== 'undefined');

export { BootstrapSelectPicker };