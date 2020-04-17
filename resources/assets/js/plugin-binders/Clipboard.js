import ClipboardJS from 'clipboard';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class Clipboard extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        // allow only one (global) binding
        this.bound = false;
    }

    bind(selector)
    {
        if (this.bound) {
            return this;
        }

        var rx = this.rx;
        var pb = this;

        let clipboard = new ClipboardJS('.clipboard');

        clipboard.on('success', function(e) {
            if (rx.hasPlugin('notification')) {
                rx.getPlugin('notification').show(pb.t('success'), 'info');
            }

            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            if (rx.hasPlugin('notification')) {
                rx.getPlugin('notification').show(pb.t('error'), 'error');
            }
        });

        this.bound = true;

        return this;
    }
}

Clipboard.packageName = 'clipboard.js';

Clipboard.check = () => (typeof ClipboardJS !== 'undefined');

export { Clipboard };