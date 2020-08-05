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
		icons: 'mutator',
		hidpi: true,

		onLoad: function() {
			// Register styles for placeholder widget frame.
            // CKEDITOR.addCss( '.cke_placeholder{background-color:#ff0}' );
		},

		init: function(editor) {
			var self = this;
			var rx = window.rx();
			var lang = editor.lang.rxmutator;
			var $element = $(editor.element.$).closest('[data-element-type]');
			var $composition = window.parent.$('iframe').closest('[data-keditor]').find('.content-composition');
			var $loading_element = $('.right_col > .x_panel');

			editor.addCommand('rxMutatorDialog', {
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
								var selection = editor.getSelection();
								var allowed_selection_regex = $(this).data('mutatorAllowedSelectionRegex');
								var mutator = editor.document.createElement('span');

								mutator.setAttributes({
									'data-mutator': $(this).data('mutator'),
									'title': $(this).data('title'),
								});

								if (self.isMutatorWrapped(selection)) {
									self.notifyError(lang.error.selection_invalid_wrapped);
								}

								switch (selection.getType()) {
									case CKEDITOR.SELECTION_NONE:
										break;
									case CKEDITOR.SELECTION_TEXT:
										if (selection.getSelectedText() === '') {
											self.notifyError(lang.error.selection_empty);
										} else if (allowed_selection_regex && !(new RegExp(allowed_selection_regex)).test(selection.getSelectedText())) {
											self.notifyError(lang.error.selection_invalid_regex);
										} else {
											mutator.setText(selection.getSelectedText());
											editor.insertElement(mutator);
											var widget = editor.widgets.initOn(mutator, 'rxmutator');
										}
										break;
									case CKEDITOR.SELECTION_ELEMENT:
										mutator.setHtml(selection.getSelectedElement().getHtml());
										editor.insertElement(mutator);
										break;
								}
							});
						});
					});
				}
			});

			editor.addCommand('rxMutatorRemove', {
				exec: function (editor) {
					var selection = editor.getSelection();

					var widget = editor.widgets.initOn(selection.getSelectedElement(), 'rxmutator');
					var $content = $('span[data-mutator]', widget.getClipboardHtml());

					editor.insertHtml($content.html());
				}
			});

			editor.widgets.add('rxmutator', {
				allowedContent: 'span[data-mutator]',
				requiredContent: 'span[data-mutator]',

				inline: true,
				// draggable: true,
				draggable: false,

				upcast: function(el) {
					return el.name == 'span' && ('data-mutator' in el.attributes);
				},

				downcast: function() {
					return;
				},

				init: function() {
					this.on('contextMenu', function(ev) {
						ev.data['rxMutatorRemoveItem'] = CKEDITOR.TRISTATE_OFF;
					});
				},
			});

            editor.ui.addButton && editor.ui.addButton('rxMutatorDialog', {
				label: lang.toolbar,
				command: 'rxMutatorDialog',
				toolbar: 'rx,1',
				icon: 'mutator'
			});

			if (editor.contextMenu) {
				editor.addMenuGroup('rxMutatorGroup');
				editor.addMenuItem('rxMutatorRemoveItem', {
					label: lang.contextMenu.remove,
					icon: this.path + 'icons/mutator.png',
					command: 'rxMutatorRemove',
					group: 'rxMutatorGroup'
				});
			}
		},

		afterInit: function(editor) {
			// alert('mutator afterInit');
		},

		isMutatorWrapped: function(selection) {
			var ancestor = selection.getCommonAncestor();

			return ancestor && $(ancestor.$.parentNode).is('span[data-mutator]');
		},

		notifyError: function(msg) {
			if (window.rx().hasPlugin('notification')) {
				window.rx().getPlugin('notification').show(msg, 'error');
			}
		},
	});
})();