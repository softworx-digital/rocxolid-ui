import 'ekko-lightbox/dist/ekko-lightbox.css';
import 'ekko-lightbox';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class EkkoLightbox extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        // allow only one (global) binding
        this.bound = false;
    }

    bind(container)
    {
        if (this.bound) {
            return this;
        }

        var rx = this.rx;

        $(container).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });

        this.bound = true;
    }
}

EkkoLightbox.packageName = 'ekko-lightbox';

EkkoLightbox.check = () => (typeof $ !== 'undefined') && (typeof $.fn.ekkoLightbox !== 'undefined');

export { EkkoLightbox };