import 'pnotify/dist/PNotifyBrightTheme.css';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class PNotifyJS extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        PNotify.defaults.styling = settings.styling || 'bootstrap3'; // 'material' theme kinda doesn't work
        PNotify.defaults.icons = settings.icons || 'fontawesome4';
        PNotify.defaults.animateSpeed = settings.animateSpeed || 'fast';
        PNotify.defaults.delay = settings.delay || 3000;
        PNotify.defaults.addClass = 'rx';
        PNotify.defaults.modules = {
            Animate: { // doesn't work
                animate: true,
                inClass: 'bounceInRight',
                outClass: 'bounceOutRight'
            },
            History: {
                history: false
            }
        }

        this.stack = {
            'dir1': 'down',
            'dir2': 'left',
            'firstpos1': 25,
            'firstpos2': 25,
            'push': 'top',
            'spacing1': 10,
            'spacing2': 10
        };
    }

    bind(container)
    {

    }

    show(text, type)
    {
        // @todo: enable desktop ?
        PNotify.alert({
            type: type || 'notice',
            text: text,
            stack: this.stack
        });
    }
}

PNotifyJS.packageName = 'notification';

PNotifyJS.check = () => (typeof PNotify !== 'undefined');

export { PNotifyJS };