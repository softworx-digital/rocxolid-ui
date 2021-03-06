// import '../../../../bower_components/jquery-palette-color-picker/src/palette-color-picker.css';
// import '../../../../bower_components/jquery-palette-color-picker/src/palette-color-picker';
import 'jquery-palette-color-picker/src/palette-color-picker.css';
import 'jquery-palette-color-picker/src/palette-color-picker.js';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class PaletteColorPicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.palette-colorpicker', container).paletteColorPicker({
            timeout: 1000,
            position: 'upside',
            close_all_but_this: true,
        });
        $('.palette-color-picker-button').addClass('input-group-addon').prepend('<i class="fa fa-chevron-circle-down fa-lg"></i>');
    }
}

PaletteColorPicker.packageName = 'jquery-palette-color-picker';

PaletteColorPicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.paletteColorPicker !== 'undefined');

export { PaletteColorPicker };