import '../styles/keditor-component-text.less';

import KEditor from 'keditor';

// Text component
// ---------------------------------------------------------------------
KEditor.components['text'] = {
    options: {
        toolbarGroups: [
            {name: 'document', groups: ['mode', 'document', 'doctools']},
            {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
            {name: 'forms', groups: ['forms']},
            {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
            {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
            {name: 'links', groups: ['links']},
            {name: 'insert', groups: ['insert']},
            '/',
            {name: 'clipboard', groups: ['clipboard', 'undo']},
            {name: 'styles', groups: ['styles']},
            {name: 'colors', groups: ['colors']},
        ],
        title: false,
        allowedContent: true, // DISABLES Advanced Content Filter. This is so templates with classes: allowed through
        bodyId: 'editor',
        templates_replaceContent: false,
        enterMode: 'P',
        forceEnterMode: true,
        format_tags: 'p;h1;h2;h3;h4;h5;h6',
        removePlugins: 'table,magicline,tableselection,tabletools',
        removeButtons: 'Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Outdent,Indent,Blockquote,CreateDiv,Language,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Maximize,About,ShowBlocks,BidiLtr,BidiRtl,Flash,Image,Subscript,Superscript,Anchor',
        minimumChangeMilliseconds: 100
    },

    init: function (contentArea, container, component, keditor) {
        let self = this;
        let options = keditor.options;

        let componentContent = component.children('.keditor-component-content');
        componentContent.prop('contenteditable', true);
        // componentContent.prop('designMode', 'on');

        componentContent.on('input', function (e) {
            if (typeof options.onComponentChanged === 'function') {
                options.onComponentChanged.call(keditor, e, component);
            }

            if (typeof options.onContainerChanged === 'function') {
                options.onContainerChanged.call(keditor, e, container, contentArea);
            }

            if (typeof options.onContentChanged === 'function') {
                options.onContentChanged.call(keditor, e, contentArea);
            }
        });

        /*
        editor.on('instanceReady', function () {
            if (typeof options.onComponentReady === 'function') {
                options.onComponentReady.call(contentArea, component, editor);
            }
        });
        */

        if (options.rx.hasPlugin('textarea')) {
            let $editable = $(keditor.iframe).contents().find(componentContent);

            options.rx.getPlugin('textarea').bindInline($editable);
            // options.rx.getPlugin('textarea').bindComponent($editable);

            $($editable).on('summernote.init', function() {
                console.log('Summernote is launched 2');
            });
        }
    },

    getContent: function (component, keditor) {
        let options = keditor.options;
        let componentContent = component.children('.keditor-component-content');

        /*
        if (options.rx.hasPlugin('textarea')) {
            return options.rx.getPlugin('textarea').getContent(componentContent);
        }
        */

        return componentContent.html();
    },

    destroy: function (component, keditor) {
        let options = keditor.options;
        let componentContent = component.children('.keditor-component-content');

        /*
        if (options.rx.hasPlugin('textarea')) {
            return options.rx.getPlugin('textarea').destroy(componentContent);
        }
        */
    }
};
