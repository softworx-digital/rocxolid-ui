/**
 * CKEditor plugin for rocXolid CMS Document Editor integration.
 *
 * @author softworx <hello@softworx.digital>
 * @version 1.0.0
 */

'use strict';

(function() {
    CKEDITOR.plugins.add('rxplaceholder', {
        requires: 'widget',
        lang: 'sk',
        icons: 'rxplaceholder',
        hidpi: true,

        onLoad: function() {
            // Register styles for placeholder widget frame.
            // CKEDITOR.addCss( '.cke_placeholder{background-color:#ff0}' );
        },

        init: function(editor) {
            var rx = window.rx();
            var lang = editor.lang.rxplaceholder;
            var $element = $(editor.element.$).closest('[data-element-type]');
            var $composition = window.parent.$('iframe').closest('[data-keditor]').find('.content-composition');
            var $loading_element = $('.right_col > .x_panel');

            editor.addCommand('RxPlaceholderDialog', {
                exec: function (editor) {
					// custom flag
                    editor.rxModal = true;

                    window.rxUtility().ajaxCall({
                        rx: rx,
                        // element: $element,
                        element: $loading_element,
                        type: 'get',
                        url: $composition.data('placeholders-url'),
                        data: {
                            elementType: $element.data('elementType')
                        }
                    }, function (data) {
                        if (rx.hasPlugin('loading-overlay')) {
                            rx.getPlugin('loading-overlay').hide($loading_element);
                        }

                        rx.getResponse().set(data).handle(function(modal) {
                            $(modal).on('click', '[data-dependency]', function(e) {
                                var $placeholder = $('<span>')
                                    .attr('contenteditable', false)
                                    .attr('data-dependency', $(this).data('dependency'))
                                    .addClass('label')
                                    .addClass('label-info')
                                    .text($(this).data('title'));

                                if (false) {
                                    $placeholder.attr('data-dependency-on-empty', 'remove-parent')
                                }

                                editor.insertHtml($placeholder.get(0).outerHTML + ' ');

                                return false;
                            });

							$(modal).on('hidden.bs.modal', function(e) {
								editor.rxModal = false;
							});
                        });
                    });
                }
            });

            editor.widgets.add('rxplaceholder', {
                allowedContent: 'span[data-dependency]',
                requiredContent: 'span[data-dependency]',

                inline: true,
                // draggable: true,
                draggable: false,

                upcast: function(el) {
                    return el.name == 'span' && ('data-dependency' in el.attributes);
                },

                downcast: function() {
                    return;
                },

                init: function() {
                    this.on('ready', function(ev) {
                        // this.fire('blur');
                        // this.setSelected(false);
                        // this.setFocused(false);
                    });
                },
            });

            editor.ui.addButton && editor.ui.addButton('RxPlaceholderDialog', {
                label: lang.toolbar,
                command: 'RxPlaceholderDialog',
                toolbar: 'rx,0',
                icon: 'placeholder'
            });
        },

        afterInit: function(editor) {
            // alert('placeholder afterInit');
        },
    });
})();