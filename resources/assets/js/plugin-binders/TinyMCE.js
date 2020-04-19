import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/mobile/theme';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class TinyMCE extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        tinymce.init({
            selector: 'textarea.wysiwyg',
            // skin: false,
            // plugins: ['paste', 'link', 'autoresize']
        });
    }

    get lang()
    {
        const lang = $('html').attr('lang');

        if (!lang) {
            throw 'No html lang specified';
        } else if (typeof this.constructor.langToLocale[lang] === 'undefined') {
            throw {
                package: this.constructor.packageName,
                message: 'Language not supported or language pack is not loaded',
                language: lang
            }
        } else {
            return this.constructor.langToLocale[lang];
        }
    }
}

TinyMCE.langToLocale = {
    'en': 'en-US',
    'sk': 'sk-SK'
};

TinyMCE.packageName = 'tinymce';

TinyMCE.check = () => (typeof tinymce !== 'undefined');

export { TinyMCE };