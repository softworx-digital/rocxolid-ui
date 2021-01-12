import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';
import 'bootstrap-select/dist/js/i18n/defaults-sk_SK'; // @todo: find out how to support multiple and switch between them at runtime
import { PluginBinder } from '../core/PluginBinder';
import { Utility } from '../core/Utility';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapSelectPicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('select', container).selectpicker({
            showTick: true
        });
    }

    bindEvents(container)
    {
        var rx = this.rx;

        $(container).off('change', 'select[data-change-action]');
        $(container).on('changed.bs.select', 'select[data-change-action]', function(e, clickedIndex, newValue, oldValue) {
            Utility.changeToAction(rx, $(this), e);
        });

        $(container).off('change', 'select[data-change-redirect]');
        $(container).on('changed.bs.select', 'select[data-change-redirect]', function(e, clickedIndex, newValue, oldValue) {
            Utility.changeToRedirect(rx, $(this), e);
        });

        $(container).find('form.autosubmit').each(function() {
            const $form = $(this);

            $form.off('change', 'select');
            $form.on('changed.bs.select', 'select', function(e, clickedIndex, newValue, oldValue) {
                e.preventDefault();
                e.stopPropagation();
                $form.trigger('submit');
            });
        });
    }
}

BootstrapSelectPicker.packageName = 'bootstrap-selectpicker';

BootstrapSelectPicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.selectpicker !== 'undefined');

export { BootstrapSelectPicker };