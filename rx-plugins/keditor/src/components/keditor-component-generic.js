import '../styles/keditor-component-text.less';
// import { position, offset } from 'caret-pos';
// import { CKEditor } from '../../../../resources/assets/js/plugin-binders/CKEditor';
// import KEditor from 'keditor';
var scrollIntoView = require('scroll-into-view');

// Generic component
// ---------------------------------------------------------------------
KEditor.components['generic'] = {
    settingEnabled: function (keditor, component) {
        return component.is('[data-element-settings-url');
    },

    settingTitle: function (keditor, component) {
        return keditor.options.locale.component.generic.settingsTitle;
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

        // self.withEditables(keditor, null, component, componentContent, self.destroyEditor);
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
        let self = this;
        let rx = keditor.options.rx;

        $(editable)
            .prop('contenteditable', true)
            .attr('data-editable-id', this.makeEditableId(componentContent, editable, isSingleEditable));

        if (!rx.hasPlugin('inline-editor')) {
            return;
        }

        $(editable).on('focus', function(e) {
            console.debug(`%c [${$(editable).data('editableId')}] FOCUS`, 'color: #d1ffa3;', editable);

            scrollIntoView(editable, { time: 100 });

            // const pos = position($(editable).get(0)); // { left: 15, top: 30, height: 20, pos: 15 }
            // const off = offset($(editable).get(0));

            // console.log('POS', pos);
            // console.log('OFF', off);

            rx.getPlugin('inline-editor').findInstance(editable) || rx.getPlugin('inline-editor').inline(editable, {} /*{ enableContextMenu: false }*/, function (editor) {
                console.debug(`%c [CKEditor][${editor.name}] BOUND to [${$(editable).data('editableId')}]`, 'color: #d1ffa3;', editor);

                editor.on('instanceReady', function () {
                    $(`.${editor.id}`)
                        .addClass('animated')
                        .addClass('slideInLeft')
                        .addClass('speed-200')
                        .appendTo(keditor.wrapper); // add it to the keditor wrapper to apply specific styling

                    editor.fire('focus');

                    if (typeof keditor.options.onComponentReady === 'function') {
                        keditor.options.onComponentReady.call(contentArea, component, editable, editor);
                    }
                });
            });
        });

        $(editable).on('blur', function() {
            console.debug(`%c [${$(editable).data('editableId')}] BLUR`, 'color: #ffcc00;', editable);

            const editor = rx.getPlugin('inline-editor').findInstance(editable)

            if (editor && !editor.rxModal) {
                // console.debug(`%c [CKEditor][${editor.name}] of [${$(editable).data('editableId')}] destroying...`, 'color: #ffcc00;');
                try {
                    // editor.destroy(); // don't destroy the ckeditor cause I cannot identify if the contextmenu has been opened (fires element blur)
                } catch (e) {
                    console.debug(`%c [CKEditor][${editor.name}] of [${$(editable).data('editableId')}] Destroy error`, 'color: #ff0000;', e);
                }
            } else if (editor) {
                console.debug(`%c [CKEditor][${editor.name}] of [${$(editable).data('editableId')}] BLUR, rxModal Opened, keeping...`, 'color: #ffcc00;');
            } else {
                console.debug(`%c [CKEditor] not initialized on [${$(editable).data('editableId')}]`, 'color: #ff0000;', e);
            }
        });
    },

    getEditorContent: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        let rx = keditor.options.rx;

        // const param = isSingleEditable ? null : $(editable).data('name');
        const param = $(editable).is('[data-name]') ? $(editable).data('name') : null;

        if (rx.hasPlugin('inline-editor')) {
            var editor = rx.getPlugin('inline-editor').findInstance(editable) || rx.getPlugin('inline-editor').inline(editable);
        }

        callbackResponse[param] = (typeof editor !== 'undefined') ? editor.getData() : $(editable).html();

        (typeof editor !== 'undefined') && editor.destroy();
    },

    destroyEditor: function(keditor, contentArea, component, componentContent, editable, isSingleEditable, callbackResponse)
    {
        let rx = keditor.options.rx;

        if (rx.hasPlugin('inline-editor')) {
            let editor = rx.getPlugin('inline-editor').findInstance(editable);

            editor && editor.destroy();
        }
    },

    makeEditableId: function(componentContent, editable, isSingleEditable)
    {
        return isSingleEditable && !$(editable).is('[data-name]') ? componentContent.attr('id') : componentContent.attr('id') + '-' + $(editable).data('name');
    }
};