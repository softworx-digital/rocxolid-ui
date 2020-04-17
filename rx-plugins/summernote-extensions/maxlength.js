(function(factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function($) {
    // Extends plugins for print plugin.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        maxlength: function(context) {
            var self = this;

            var layoutInfo = context.layoutInfo;
            var $editor = layoutInfo.editor;
            var $editable = layoutInfo.editable;
            var $statusbar = layoutInfo.statusbar;
            var maxlength = $editor.parent().find('.wysiwyg').attr('maxlength');

            if (typeof maxlength === 'undefined') {
                return false;
            }

            self.$label = null;

            self.initialize = function() {
                var label = document.createElement('span');

                self.$label = $(label);
                self.$label.addClass('bootstrap-maxlength label label-success');
                self.$label.css({
                    display: 'none',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                });
                $statusbar.append(self.$label);

                self.toggle(self.countChars($editable.html()));

                $editable.on('focus', function(e) {
                    self.$label.show();
                });

                $editable.on('blur', function(e) {
                    self.$label.hide();
                });

                // $editable.on('input', function(e) {
                $editable.on('keyup', function(e) {
                    self.toggle(self.countChars($editable.html()), e);
                });
            };

            self.toggle = function(length, e) {
                self.$label.text(length + ' / ' + maxlength);

                if (length >= maxlength) {
                    if (e) {
                        // this doesn't work for input event
                        const isChar = (e.keyCode > 47 && e.keyCode < 58)    // number keys
                                    || (e.keyCode == 32 || e.keyCode == 13)  // spacebar & return key(s) (if you want to allow carriage returns)
                                    || (e.keyCode > 64 && e.keyCode < 91)    // letter keys
                                    || (e.keyCode > 95 && e.keyCode < 112)   // numpad keys
                                    || (e.keyCode > 185 && e.keyCode < 193)  // ;=,-./` (in order)
                                    || (e.keyCode > 218 && e.keyCode < 223); // [\]' (in order)

                        // this works for input event
                        // const isChar = (typeof e.originalEvent.data == 'string');

                        if (isChar) {
                            e.preventDefault();
                        }
                    }

                    self.$label.addClass('label-danger');
                    self.$label.removeClass('label-success');
                } else {
                    self.$label.addClass('label-success');
                    self.$label.removeClass('label-danger');
                }
            };

            self.countChars = function(text) {
                var text = text.replace(/(<([^>]+)>)/ig, '');
                return text.length;
            }
        }
    });
}));