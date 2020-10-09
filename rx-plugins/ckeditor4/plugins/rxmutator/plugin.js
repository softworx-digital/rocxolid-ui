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
								var restricted_multiple_placeholder = $(this).data('mutatorMultiplePlaceholder');
								var restricted_expression_selection = $(this).data('mutatorAllowedExpression');
								var allowed_selection_regex = $(this).data('mutatorAllowedSelectionRegex');
								var mutator = editor.document.createElement('span');

								mutator.setAttributes({
									'data-mutator': $(this).data('mutator'),
									'title': $(this).data('title'),
								});

								try {
									if (self.isMutatorWrapped(selection)) {
										throw lang.error.selection_invalid_wrapped;
									}

									if (restricted_multiple_placeholder && (!editor.widgets.selected || (editor.widgets.selected.length < 2))) {
										throw lang.error.selection_requires_multiple_placeholder;
									}

									if (!restricted_multiple_placeholder && editor.widgets.selected && (editor.widgets.selected.length > 1)) {
										throw lang.error.selection_forbids_multiple_placeholder;
									}

									// @todo: find a prettier way to do this
									if (restricted_expression_selection) {
										self.handleExpressionMutator(lang, $(this), editor, selection, mutator);
									} else if (restricted_multiple_placeholder && editor.widgets.selected && (editor.widgets.selected.length > 1)) {
										self.handleMultiplePlaceholderMutator(lang, $(this), editor, selection, mutator);
									} else {
										self.handleSimpleMutator(lang, $(this), editor, selection, mutator);
									}
								} catch (e) {
									self.notifyError(e);
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

		handleSimpleMutator: function(lang, $choice, editor, selection, mutator) {
			let allowed_selection_regex = $choice.data('mutatorAllowedSelectionRegex');

			switch (selection.getType()) {
				case CKEDITOR.SELECTION_NONE:
					break;
				case CKEDITOR.SELECTION_TEXT:
					if (selection.getSelectedText() === '') {
						throw lang.error.selection_empty;
					} else if (allowed_selection_regex && !(new RegExp(allowed_selection_regex)).test(selection.getSelectedText())) {
						throw lang.error.selection_invalid_regex;
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
		},

		// @todo: currently this doesn't create a full-featured widget element (save is required)
		handleExpressionMutator: function(lang, $choice, editor, selection, mutator) {
			let allowed_selection_regex = $choice.data('mutatorAllowedSelectionRegex');

			if (selection.getSelectedText() === '') {
				throw lang.error.selection_empty;
			} else if (allowed_selection_regex && !(new RegExp(allowed_selection_regex, 'u')).test(selection.getSelectedText())) {
				throw lang.error.selection_invalid_expression;
			}

			var style = new CKEDITOR.style({attributes: {
				'data-mutator': $choice.data('mutator'),
				'title': $choice.data('title')
			}});

			console.log(editor.applyStyle(style));
			// editor.widgets.initOn(mutator, 'rxmutator');
		},

		handleMultiplePlaceholderMutator: function(lang, $choice, editor, selection, mutator) {
			let mutator_content = [];

			editor.widgets.selected.forEach(el => {

				let $element = $(el.element.$)
					.removeAttr('data-cke-widget-data')
					.removeAttr('data-cke-widget-upcasted')
					.removeAttr('data-cke-widget-keep-attr')
					.removeAttr('data-widget')
					.removeAttr('contenteditable')
					.removeClass('cke_widget_element');

				mutator_content.push($element.wrap('<span></span>').parent().html());
			});

			mutator.setHtml(mutator_content.join(' + '));
			editor.insertElement(mutator);
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