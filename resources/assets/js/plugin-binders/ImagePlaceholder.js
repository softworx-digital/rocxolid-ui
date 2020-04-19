import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class ImagePlaceholder extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.placeholder[data-image-src]', container).each(function()
        {
            $(this).imagePlaceholder();
        });
    }
}

ImagePlaceholder.packageName = 'image-placeholder';

ImagePlaceholder.check = () => (typeof $ !== 'undefined') && (typeof $.fn.imagePlaceholder !== 'undefined');

export { ImagePlaceholder };