import 'jquery-appear-original';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryAppear extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $(container).on('appear', '[data-timeout-remove]', function(e)
        {
            alert('appear event triggered');
            $(this).fadeTo($(this).data('timeout-remove'), 250).slideUp(250, function()
            {
                $(this).remove();
            });
        });
    }
}

jQueryAppear.packageName = 'jquery-appear';

jQueryAppear.check = () => (typeof $ !== 'undefined') && (typeof $.fn.appear !== 'undefined');

export { jQueryAppear };