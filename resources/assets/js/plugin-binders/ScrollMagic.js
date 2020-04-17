import 'scrollmagic/scrollmagic/minified/ScrollMagic';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class ScrollMagicJS extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        this.controller = new ScrollMagic.Controller();
    }

    bind(container)
    {
        var pb = this;

        // @todo: not used and not properly configured
        $('.scroll-magic', container).each(function() {
            new ScrollMagic.Scene({
                    triggerElement: $(this).attr('data-scroll-container')
                })
                .setPin(this)
                .addIndicators({name: "-- (duration: 0)"}) // add indicators (requires plugin)
                .addTo(pb.controller);
        });
    }
}

ScrollMagicJS.packageName = 'scrollmagic';

ScrollMagicJS.check = () => (typeof ScrollMagic !== 'undefined');

export { ScrollMagicJS };