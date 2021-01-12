import 'bootstrap-multiselect/dist/css/bootstrap-multiselect.css';
import 'bootstrap-multiselect';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 * @todo: the 'bootstrap-multiselect' plugin doesn't seem to work properly
 */
class BootstrapMultiSelectPicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        /*
        $('.multi-select', container).multiselect().on('change', function() {
            if ($(this).closest('form').hasClass('autosubmit')) {
                $(this).closest('form').find('input[type="submit"], button[type="button"][data-ajax-submit-form]').trigger('click');
            }
        });
        */

        console.table($.fn);
    }
}

BootstrapMultiSelectPicker.packageName = 'bootstrap-multiselect';

BootstrapMultiSelectPicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.multiselect !== 'undefined');

export { BootstrapMultiSelectPicker };