import 'ckeditor4/skins/moono-lisa/editor.css';
import 'ckeditor4';
import 'ckeditor4/adapters/jquery';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class CKEditor extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        this.editorOptions = {
            // language: settings.lang || this.lang
        }
    }

    bind(container)
    {
        var rx = this.rx;

        $('textarea.wysiwyg').ckeditor(this.editorOptions);
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

CKEditor.langToLocale = {
    'en': 'en-US',
    'sk': 'sk-SK'
};

CKEditor.packageName = 'ckeditor';

CKEditor.check = () => (typeof $.fn.ckeditor !== 'undefined');

export { CKEditor };