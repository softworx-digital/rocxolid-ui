import 'ckeditor4';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class CKEditor extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        // global CKEditor configuration
        CKEDITOR.disableAutoInline = true;
        CKEDITOR.config.language = settings.lang || this.lang;
        CKEDITOR.config.extraPlugins = 'justify,font,colorbutton,colordialog';
        CKEDITOR.config.skin = 'bootstrapck';
        CKEDITOR.config.format_tags = 'p;h1;h2;h3;h4;h5;h6';

        // local CKEditor configuration
        this.editorOptions = {
        };

        // local specific inline CKEditor configuration
        this.inlineEditorOptions = {
            toolbarGroups: [
                { name: 'clipboard', groups: [ 'undo' ] },
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'paragraph' ] },
                { name: 'links', groups: [ 'links' ] },
                { name: 'insert', groups: [ 'insert' ] },
                { name: 'styles', groups: [ 'styles' ] },
                { name: 'colors', groups: [ 'colors' ] },
            ],
            allowedContent: true, // DISABLES Advanced Content Filter. This is so templates with classes: allowed through
            bodyId: 'editor',
            // templates_replaceContent: false,
            removeButtons: 'Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord',
            minimumChangeMilliseconds: 100
        };

        // map of instances - element.id => editor.id
        this.instances = {};
    }

    bind(container)
    {
        var rx = this.rx;
        var self = this;

        // $('textarea.wysiwyg').ckeditor(this.editorOptions);

        /*
        $('.wysiwyg-inline', container).each(function() {
            $(this).prop('contenteditable', true);
            self.inline($(this));
        });
        */
    }

    inline(element, options)
    {
        var rx = this.rx;
        var options = options || {};

        let editor = CKEDITOR.inline(element, {
            ...this.inlineEditorOptions,
            ...options
        });

        this.instances[$(element).data('editableId')] = editor.id;

        return editor;
    }

    instance(id)
    {
        return CKEDITOR.instances[id];
    }

    findInstance(element)
    {
        let elementId = $(element).data('editableId');

        if (typeof this.instances[elementId] == 'undefined') {
            throw `Cannot find CKEDITOR instance named [${elementId}]`;
        }

        return this.instance(this.instances[elementId]);
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
    'en': 'en',
    'sk': 'sk'
};

CKEditor.packageName = 'ckeditor';

CKEditor.check = () => (typeof CKEDITOR !== 'undefined');

export { CKEditor };