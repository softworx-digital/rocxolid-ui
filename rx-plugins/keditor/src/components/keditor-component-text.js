import '../styles/keditor-component-text.less';

// import KEditor from 'keditor';

// Text component
// ---------------------------------------------------------------------
KEditor.components['text'] = {
    settingEnabled: function (keditor, component) {
        return component.is('[data-element-settings-url');
    },

    settingTitle: function (keditor, component) {
        return keditor.options.locale.component.text.settingsTitle;
    },

    initSettingForm: function (keditor, component, form) {
        let self = this;
        let options = keditor.options;
        let rx = keditor.options.rx;
        let rxUtility = keditor.options.rxUtility;
        var meta_data_viewer_element = component.find('.keditor-meta-data');

        rxUtility.ajaxCall({
            rx: rx,
            element: $(form),
            type: 'get',
            url: component.data('elementSettingsUrl'),
        }, function (data) {
            if (rx.hasPlugin('loading-overlay')) {
                rx.getPlugin('loading-overlay').hide($(form).closest('.ajax-overlay'));
            }

            let $form = $(data.form);

            rx.bindPlugins($form);

            $form.on('submit', function () {
                $(this).ajaxSubmit({
                    beforeSubmit: function(arr, $form, options)
                    {
                        if (rx.hasPlugin('loading-overlay')) {
                            rx.getPlugin('loading-overlay').show($form.closest('.ajax-overlay'));
                        }
                    },
                    success: function(data, statusText, xhr, $form)
                    {
                        if (rx.hasPlugin('loading-overlay')) {
                            rx.getPlugin('loading-overlay').hide($form.closest('.ajax-overlay'));
                        }

                        rx.getResponse().set(data).handle(null, {
                            'meta_data': function(data) {
                                let metaData = data ? JSON.parse(atob(data)) : {};

                                if (!$.isEmptyObject(metaData)) {
                                    var $list = $('<ul>');

                                    for (var key in metaData) {
                                        $list.append(`<li>${metaData[key].title}: ${metaData[key].value}</li>`);
                                    }

                                    meta_data_viewer_element.html($list);
                                    component.attr('data-element-meta', data);
                                    component.addClass('meta-data-active');
                                } else {
                                    meta_data_viewer_element.text('');
                                    component.removeAttr('data-element-meta');
                                    component.removeClass('meta-data-active');
                                }

                                keditor.sidebarCloser.click();
                            }
                        });
                    },
                    error: function(data)
                    {
                        rx.handleAjaxError(data);
                    }
                });



                return false;
            });

            form
                .append($form)
                .on('keydown', function (e) {
                    switch (e.which) {
                        case 13: // enter
                            $form.submit();
                            return false;
                        case 27: // esc
                            keditor.sidebarCloser.click();
                            return false;
                    }
                })
                .find(':input:visible').first().focus();
        });
    },

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
                .attr('data-element-id', componentContentElement.data('elementId'))
                .attr('data-element-template', componentContentElement.data('elementTemplate'));

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
        let rx = keditor.options.rx;
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

                if (rx.hasPlugin('notification')) {
                    rx.getPlugin('notification').show(e, 'error');
                }
            }
        });
    },

    bindEditor: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        let rx = keditor.options.rx;

        $(editable)
            .prop('contenteditable', true)
            .attr('data-editable-id', this.makeEditableId(componentContent, editable, isSingleEditable));

        if (!rx.hasPlugin('inline-editor')) {
            return;
        }

        let editor = rx.getPlugin('inline-editor').inline(editable);

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
        let rx = keditor.options.rx;

        // const param = isSingleEditable ? null : $(editable).data('name');
        const param = $(editable).is('[data-name]') ? $(editable).data('name') : null;

        if (rx.hasPlugin('inline-editor')) {
            var editor = rx.getPlugin('inline-editor').findInstance(editable);
        }

        callbackResponse[param] = editor ? editor.getData() : $(editable).html();
    },

    destroyEditor: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        let rx = keditor.options.rx;

        if (rx.hasPlugin('inline-editor')) {
            const editor = rx.getPlugin('inline-editor').findInstance(editable);

            editor && editor.destroy();
        }
    },

    makeEditableId: function(componentContent, editable, isSingleEditable)
    {
        return isSingleEditable && !$(editable).is('[data-name]') ? componentContent.attr('id') : componentContent.attr('id') + '-' + $(editable).data('name');
    }
};