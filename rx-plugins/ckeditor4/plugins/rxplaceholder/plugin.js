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
			var lang = editor.lang.rxplaceholder;
			var $element = $(editor.element.$ ).closest('[data-element-type]');
			var $composition = window.parent.$('iframe').closest('[data-keditor]').find('.content-composition');

			editor.addCommand('RxPlaceholderDialog', {
				exec: function (editor) {
					window.rxUtility().ajaxCall({
						rx: window.rx(),
						element: $element,
						type: 'get',
						url: $composition.data('placeholders-url'),
						data: {
							elementType: $element.data('elementType')
						}
					});
				}
			});

            editor.ui.addButton && editor.ui.addButton('RxPlaceholderDialog', {
				label: lang.toolbar,
				command: 'RxPlaceholderDialog',
				toolbar: 'rx,0',
				icon: 'placeholder'
			});
		},

		afterInit: function(editor) {
			alert('placeholder afterInit');
		}
	});
})();