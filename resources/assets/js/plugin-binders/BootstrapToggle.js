import 'bootstrap-toggle/css/bootstrap-toggle.min.css';
import 'bootstrap-toggle';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapToggle extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('input:checkbox[data-toggle]', container).bootstrapToggle();

        // @todo: hotfixed
        const groupcontainer = $(container).is('.row.form-field-group-addable') ? $(container).closest('fieldset') : container;

        $('input:checkbox[data-toggle][data-uncheck-group]', groupcontainer).change(function() {
            if ($(this).is(':checked')) {
                $('input:checkbox[data-toggle][data-uncheck-group]', groupcontainer).not(this).bootstrapToggle('off');
            }
        });
    }

    unbind(container)
    {
        var rx = this.rx;

        $('input:checkbox[data-toggle]', container).bootstrapToggle('destroy');
    }
}

BootstrapToggle.packageName = 'bootstrap-toggle';

BootstrapToggle.check = () => (typeof $ !== 'undefined') && (typeof $.fn.toggle !== 'undefined');

export { BootstrapToggle };