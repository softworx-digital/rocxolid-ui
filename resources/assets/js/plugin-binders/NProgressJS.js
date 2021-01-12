import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class NProgressJS extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        NProgress.configure({
            showSpinner: settings.showSpinner || false
        });
    }

    bind(container)
    {
        var rx = this.rx;

        /*
        this is commented out since the plugin blurring the input element is very obtrusive
        $(container).ajaxStart(function() {
            NProgress.start();
        });

        $(container).ajaxComplete(function() {
            NProgress.done();
            $(':focus').trigger('blur');
        }).on('changed.bs.select', function(event, clickedIndex, newValue, oldValue) {
            $(this).prev().find('input').trigger('focus');
        });
        */
    }
}

NProgressJS.packageName = 'nprogress';

NProgressJS.check = () => (typeof NProgress !== 'undefined');

export { NProgressJS };