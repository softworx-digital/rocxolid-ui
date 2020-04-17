import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import 'bootstrap-slider';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class BootstrapSlider extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('[data-provide="slider"]', container).slider();
    }
}

BootstrapSlider.packageName = 'bootstrap-slider';

BootstrapSlider.check = () => (typeof $ !== 'undefined') && (typeof $.fn.slider !== 'undefined');

export { BootstrapSlider };