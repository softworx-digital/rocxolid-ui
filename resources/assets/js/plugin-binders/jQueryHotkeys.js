import 'jquery.hotkeys';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryHotkeys extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $(container).keydown(function(e)
        {
            if ((e.which == '115' || e.which == '83' ) && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                $('button[type="submit"]').trigger('click');

                return false;
            }

            return true;
        });
    }
}

jQueryHotkeys.packageName = 'jquery-hotkeys';

jQueryHotkeys.check = () => (typeof $ !== 'undefined') && (typeof $.hotkeys !== 'undefined');

export { jQueryHotkeys };