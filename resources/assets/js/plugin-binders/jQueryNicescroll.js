import 'jquery.nicescroll';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class jQueryNicescroll extends PluginBinder
{
    bind(container) {}

    bindElement(selector)
    {
        $(selector).niceScroll();

        $(selector).on('heightChanged', function(e)
        {
            $(selector).niceScroll().resize();
        });
    }
}

jQueryNicescroll.packageName = 'jquery-nicescroll';

jQueryNicescroll.check = () => (typeof $ !== 'undefined') && (typeof $.nicescroll !== 'undefined');

export { jQueryNicescroll };