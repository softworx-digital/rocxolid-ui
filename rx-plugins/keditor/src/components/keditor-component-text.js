import '../styles/keditor-component-text.less';

// import KEditor from 'keditor';

// Text component
// ---------------------------------------------------------------------
KEditor.components['text'] = {
    init: function (contentArea, container, component, keditor)
    {
        let self = this;
        let options = keditor.options;

        let componentContent = component.children('.keditor-component-content');

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

        self.withEditables(keditor, contentArea, component, componentContent, self.bindEditor);
    },

    getContent: function (component, keditor, format)
    {
        let self = this;
        let componentContent = component.find('.keditor-component-content');
        let componentContentElement = component.find('[data-element-type]');

        if (format === 'raw') {
            $content = componentContent.html();
        } else {
            let contentParts = {};
            var $content = $('<div>')
                .addClass('content-container')
                .attr('data-element-type', componentContentElement.data('elementType'))
                .attr('data-element-id', componentContentElement.data('elementId'));

            self.withEditables(keditor, null, component, componentContent, self.getEditorContent, contentParts);

            $.each(contentParts, function(name, html) {
                let $wrapper = $('<div>')
                    .addClass('editable-content')
                    .attr('data-name', name)
                    .html(html);

                $wrapper.appendTo($content)
            });
        }

        KEditor.log(`Component [${componentContentElement.data('elementType')}][${componentContentElement.data('elementId')}] [${format}] content`, $content);

        return $content;
    },

    destroy: function (component, keditor)
    {
        let self = this;
        let componentContent = component.find('.keditor-component-content');

        self.withEditables(keditor, null, component, componentContent, self.destroyEditor);
    },

    withEditables: function(keditor, contentArea, component, componentContent, callback, callbackResponse)
    {
        let self = this;
        let names = [];

        componentContent.find('.editable').each(function(index, editable) {
            try {
                let isSingleEditable = (componentContent.find('.editable').length == 1);

                if (!isSingleEditable && !$(editable).is('[data-name]')) {
                    throw "[data-name] missing in editable element";
                }

                if ($(editable).is('[data-name]')) {
                    if (names.includes($(editable).data('name'))) {
                        throw `[data-name="${$(editable).data('name')}"] already used in this component's editable elements`;
                    }

                    names.push($(editable).data('name'));
                }

                callback.call(self, keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse);
            } catch (e) {
                console.error(e, editable);

                if (rx().hasPlugin('notification')) {
                    rx().getPlugin('notification').show(e, 'error');
                }
            }
        });
    },

    bindEditor: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        $(editable)
            .prop('contenteditable', true)
            .attr('data-editable-id', this.makeEditableId(componentContent, editable, isSingleEditable));

        if (!rx().hasPlugin('inline-editor')) {
            return;
        }

        let editor = rx().getPlugin('inline-editor').inline(editable);

        editor.on('instanceReady', function () {
            // $('#cke_' + componentContent.attr('id')).appendTo(keditor.wrapper);
            $(`.${editor.id}`)
                .addClass('animated')
                .addClass('fadeIn')
                .addClass('speed-200')
                .appendTo(keditor.wrapper); // add it to the keditor wrapper to apply specific styling

            if (typeof keditor.options.onComponentReady === 'function') {
                keditor.options.onComponentReady.call(contentArea, component, editable, editor);
            }
        });
    },

    getEditorContent: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        // const param = isSingleEditable ? null : $(editable).data('name');
        const param = $(editable).is('[data-name]') ? $(editable).data('name') : null;

        if (rx().hasPlugin('inline-editor')) {
            var editor = rx().getPlugin('inline-editor').findInstance(editable);
        }

        callbackResponse[param] = editor ? editor.getData() : $(editable).html();
    },

    destroyEditor: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        if (rx().hasPlugin('inline-editor')) {
            const editor = rx().getPlugin('inline-editor').findInstance(editable);

            editor && editor.destroy();
        }
    },

    makeEditableId: function(componentContent, editable, isSingleEditable)
    {
        return isSingleEditable && !$(editable).is('[data-name]') ? componentContent.attr('id') : componentContent.attr('id') + '-' + $(editable).data('name');
    }
};