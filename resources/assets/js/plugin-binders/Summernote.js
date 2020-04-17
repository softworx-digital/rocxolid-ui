import 'summernote/dist/summernote.css';
import 'summernote';
import 'summernote/dist/lang/summernote-sk-SK.min';
import 'summernote-extensions/maxlength';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class Summernote extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        // let langpack = await import(`summernote/dist/lang/summernote-${this.lang}`);

        $('textarea.wysiwyg', container).summernote({
            disableDragAndDrop: true,
            lang: this.lang,
            height: 200,
            dialogsInBody: true,
            dialogsFade: true,
            fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48' , '64', '82', '150'],
            onCreateLink: function (url) {
                return url;
            }
        });
    }

    bindInline(selector)
    {
        var rx = this.rx;

        return $(selector).summernote({
            airMode: true,
            onCreateLink: function (url) {
                return url;
            }
        });
    }

    getContent(selector)
    {
        return $(selector).summernote('code');
    }

    destroy(selector)
    {
        return $(selector).summernote('destroy');
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

Summernote.langToLocale = {
    'en': 'en-US',
    'sk': 'sk-SK'
};

Summernote.packageName = 'summernote';

Summernote.check = () => (typeof $ !== 'undefined') && (typeof $.fn.summernote !== 'undefined');

export { Summernote };