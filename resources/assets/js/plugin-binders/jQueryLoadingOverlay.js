import 'gasparesganga-jquery-loading-overlay';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class jQueryLoadingOverlay extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        $.LoadingOverlaySetup({
            // background: settings.background || 'rgba(42, 63, 84, .5)',
            background: settings.background || 'transparent',
            image: settings.image || false,
            fontawesome: settings.fontawesome || 'fa fa-spinner fa-spin',
            fontawesomeColor: settings.fontawesomeColor || 'rgba(42, 63, 84, .75)',
            // fontawesomeColor: settings.fontawesomeColor || 'rgba(255, 255, 255, .9)',
            fade: settings.fade || [200, 200]
            // zIndex: 999 // modals are >= 1040
        });
    }

    bind(selector)
    {
        var rx = this.rx;
    }

    show(selector)
    {
        $(selector).fadeTo(200, .25).LoadingOverlay('show');
    }

    hide(selector)
    {
        $(selector).fadeTo(200, 1).LoadingOverlay('hide');
    }
}

jQueryLoadingOverlay.packageName = 'jquery-loading-overlay';

jQueryLoadingOverlay.check = () => (typeof $ !== 'undefined') && (typeof $.fn.LoadingOverlay !== 'undefined');

export { jQueryLoadingOverlay };