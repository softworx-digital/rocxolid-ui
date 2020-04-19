import 'stickr.js/jquery.stickr';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryStickr extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};
    }

    bind(container)
    {
        $('.keep-scroll-position', container).stickr({
            duration: 0,
            offsetTop: 60,
            offsetBottom: 20
        });
    }
}

jQueryStickr.packageName = 'stickr';

jQueryStickr.check = () => (typeof $ !== 'undefined') && (typeof $.fn.stickr !== 'undefined');

export { jQueryStickr };