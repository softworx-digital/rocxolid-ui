/**
 * CKEditor plugin for rocXolid CMS Document Editor integration.
 *
 * @author softworx <hello@softworx.digital>
 * @version 1.0.0
 */

'use strict';

(function() {
	CKEDITOR.plugins.add('rxmutator', {
        requires: 'widget',
		lang: 'sk',
		icons: 'rxmutator',
		hidpi: true,

		onLoad: function() {
			// Register styles for placeholder widget frame.
            // CKEDITOR.addCss( '.cke_placeholder{background-color:#ff0}' );
		},

		init: function(editor) {
			var rx = window.rx();
			var lang = editor.lang.rxmutator;
			var $element = $(editor.element.$).closest('[data-element-type]');
			var $composition = window.parent.$('iframe').closest('[data-keditor]').find('.content-composition');
			var $loading_element = $('.right_col > .x_panel');

			editor.addCommand('RxMutatorDialog', {
				exec: function (editor) {
					window.rxUtility().ajaxCall({
						rx: rx,
						// element: $element,
						element: $loading_element,
						type: 'get',
						url: $composition.data('mutators-url'),
						data: {
							elementType: $element.data('elementType')
						}
					}, function (data) {
						if (rx.hasPlugin('loading-overlay')) {
							rx.getPlugin('loading-overlay').hide($loading_element);
						}

						rx.getResponse().set(data).handle(function(modal) {
							$(modal).on('click', '[data-mutator]', function(e) {
								// var selected_text = editor.getSelection().getSelectedText();
								var selection = editor.getSelection();
console.log(selection);
								/*
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
								*/
							});
						});
					});
				}
			});

			/*
			editor.widgets.add('rxmutator', {
				allowedContent: 'span[data-mutator]',
				requiredContent: 'span[data-mutator]',

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
			*/

            editor.ui.addButton && editor.ui.addButton('RxMutatorDialog', {
				label: lang.toolbar,
				command: 'RxMutatorDialog',
				toolbar: 'rx,1',
				icon: 'mutator'
			});
		},

		afterInit: function(editor) {
			// alert('mutator afterInit');
		},
	});
})();