import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import 'malihu-custom-scrollbar-plugin';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryCustomScrollbar extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $.mCustomScrollbar.defaults.scrollButtons.enable=true; //enable scrolling buttons by default
		$.mCustomScrollbar.defaults.axis="yx"; //enable 2 axis scrollbars by default

        $('.scrollable', container).mCustomScrollbar();
    }

    bindElement(selector)
    {
        $(selector).niceScroll();
    }

    resizeElement(selector)
    {
        $(selector).niceScroll().resize();
    }
}

jQueryCustomScrollbar.packageName = 'jquery-custom-scrollbar';

jQueryCustomScrollbar.check = () => (typeof $ !== 'undefined') && (typeof $.mCustomScrollbar !== 'undefined');

export { jQueryCustomScrollbar };