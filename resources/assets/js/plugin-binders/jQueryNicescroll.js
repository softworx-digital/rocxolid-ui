import 'jquery.nicescroll';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryNicescroll extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.scrollable', container).each(function(index) {
            $(this).niceScroll({
                cursorcolor: '#fff',
                cursoropacitymin: 0,
                cursoropacitymax: .75,
                cursorwidth: '5px',
                cursorborder: '1px solid transparent',
                cursorborderradius: '3px',
            });

            $(this).on('shown.bs.collapse hidden.bs.collapse', '.collapse', function(e) {
                $(this).niceScroll().resize();
            });
        });
    }

    bindElement(selector)
    {
        $(selector).niceScroll({
            cursorcolor: '#fff',
            cursoropacitymin: 0,
            cursoropacitymax: .75,
            cursorwidth: '5px',
            cursorborder: '1px solid transparent',
            cursorborderradius: '3px',
        });

        $(selector).on('shown.bs.collapse hidden.bs.collapse', '.collapse', function(e) {
            $(selector).niceScroll().resize();
        });
    }

    resizeElement(selector)
    {
        $(selector).niceScroll().resize();
    }
}

jQueryNicescroll.packageName = 'jquery-nicescroll';

jQueryNicescroll.check = () => (typeof $ !== 'undefined') && (typeof $.nicescroll !== 'undefined');

export { jQueryNicescroll };