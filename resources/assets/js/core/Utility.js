/**
 * Utility functions container.
 *
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class Utility {}

/**
 * Iterate through all fields and for those having [number] (index) in field name set the index to be the row number.
 */
Utility.resetArrayFieldsNameParameters = ($container, selector) => {
    $container.find(selector).each(function(i)
    {
        $(this).find('[name]').each(function() // @todo: add additional regex check
        {
            if (!$(this).closest('.control-group-additional').exists()) {
                const attr = $(this).attr('name').replace(/(.*)\[(\d*)\](.*)/, function($0, $1, $2, $3)
                {
                    return $1 + '[' + i + ']' + $3;
                });

                $(this).attr('name', attr);
            }
        });
    });
}

Utility.resetFormField = ($field, callback) => {
    $field.find('.control-group-additional').remove();
    $field.find('[data-add-form-field-group]').remove();
    $field.find('[data-remove-form-field-group]').removeClass('hidden');
    $field.find('input:checkbox[data-toggle]').prop('checked', false).change().unwrap().next('.toggle-group').remove();
    $field.find('.has-error').removeClass('has-error');
    $field.find('.error-message').remove();
    $field.find('.bootstrap-select').replaceWith(function()
    {
        return $('select', this);
    });
    //$clone.find(':input').val('');
    $field.find('input:not([type=radio], [type=checkbox]), select').val('');
    $field.find('input:radio, input:checkbox').attr('checked', false);
    $field.find('input.flat').each(function(index)
    {
        $(this).next('ins').remove();
        $(this).removeAttr('style').unwrap();
    });

    if (typeof callback === 'function') {
        callback($field);
    }

    return $field;
}

Utility.base64ToArrayBuffer = (data) => {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);

    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }

    return bytes;
}

Utility.formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

Utility.loadScript = (src) => {
    return new Promise(function(resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

Utility.ajaxCall = (settings, success, error) => {
    if (!settings.rx) {
        throw new ReferenceError('Missing rocXolid instance reference in settings');
    }

    if (!settings.element) {
        // throw new ReferenceError('Missing element reference in settings');
    }

    if (!settings.type) {
        throw new ReferenceError('Missing request type in settings');
    }

    if (!settings.url) {
        throw new ReferenceError('Missing request URL in settings');
    }

    if (!settings.data) {
        // throw new ReferenceError('Missing request data in settings');
    }

    if (settings.element && settings.rx.hasPlugin('loading-overlay')) {
        settings.rx.getPlugin('loading-overlay').show($(settings.element).closest('.ajax-overlay'));
    }

    $.ajax({
        type: settings.type.toUpperCase(),
        url: settings.url,
        clientUrl: settings.url,
        dataType: 'json',
        data: settings.data,
        success: ((data) => {
            if (success && (typeof success === 'function')) {
                success(data);
            } else {
                if (settings.element && settings.rx.hasPlugin('loading-overlay')) {
                    settings.rx.getPlugin('loading-overlay').hide($(settings.element).closest('.ajax-overlay'));
                }
                settings.rx.getResponse().set(data).handle();
                // History.pushState(data, title, url);
                // History.pushState(null, null, this.clientUrl);
            };
        }),
        error: ((data) => {
            if (error && (typeof error === 'function')) {
                error(data);
            } else {
                if (settings.element && settings.rx.hasPlugin('loading-overlay')) {
                    settings.rx.getPlugin('loading-overlay').hide($(settings.element).closest('.ajax-overlay'));
                }
                settings.rx.handleAjaxError(data)
            };
        })
    });
}

Utility.extendJQuery = () => {
    /**
     * Check DOM element's existence.
     *
     * @return bool
     */
    $.fn.exists = function()
    {
        return this.length > 0;
    }

    /**
     * Get DOM element's tagName property value.
     *
     * @return string
     */
    $.fn.tagName = function()
    {
        return this.prop('tagName');
    }

    /**
     * Find all descendant 'selector' elements except those having parent 'except'.
     *
     * @param {*} selector
     * @param {*} except
     * @param {*} result
     * @return jQuery
     */
    $.fn.findExcept = function(selector, except, result)
    {
        var result = typeof result !== 'undefined' ? result : new $();

        this.children().each(function() {
            if ($(this).is(selector)) {
                result.push(this);
            }

            if (!$(this).is(except)) {
                $(this).findExclude(selector, except, result);
            }
        });

        return result;
    }

    /**
     * Bind form submission by hitting enter on text inputs or on radio/checkbox change.
     *
     * @return jQuery
     */
    $.fn.autosubmit = function()
    {
        let $form = $(this);

        $('input.autosubmit[type="checkbox"],input.autosubmit[type="radio"]', $form).on('change', function(e)
        {
            e.preventDefault();
            $form.find('input[type="submit"], button[type="button"][data-ajax-submit-form]').trigger('click');
        });

        $form.find('select').on('change', function(e)
        {
            if ($(this).is(':focus')) {
                e.preventDefault();
                e.stopPropagation();
                $form.find('input[type="submit"], button[type="button"][data-ajax-submit-form]').trigger('click');
            }
        });

        // selectpicker event
        /*
        // this is fired together with select.on('change')
        $form.find('select').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue)
        {
            if (newValue !== oldValue) {
                e.preventDefault();
                e.stopPropagation();
                $form.find('input[type="submit"], button[type="button"][data-ajax-submit-form]').click();
            }
        });
        */

        return $(this);
    }

    /**
     * Remove DOM element after timout (default 250ms).
     *
     * @return jQuery
     */
    $.fn.timeoutRemove = function(timeout)
    {
        timeout = timeout || 250;

        $(this).fadeTo($(this).data('timeout-remove'), timeout).slideUp(timeout, () => $(this).remove());

        return $(this);
    }

    /**
     * Focus first form field.
     *
     * @return jQuery
     */
    $.fn.focusFirst = function()
    {
        const $focusField = $(this).find(':text, textarea, select').eq(0);

        if ($focusField.exists()) {
            const fieldOffset = $focusField.offset().top;
            const scrollTolerance = $(window).height() / 2;

            $focusField.trigger('focus');

            if (fieldOffset > scrollTolerance) {
                $('html, body').animate({scrollTop: (fieldOffset - 30)});
            }
        }

        return $(this);
    };

    $.fn.enableElement = function() {
        this
            .removeClass('disabled')
            .find(':input')
                .prop('disabled', false)
                .removeClass('disabled');

        return this;
    }

    $.fn.enableFormElement = function()
    {
        const $elm = this.is(':input') ? this.closest('.form-group') : this;

        $elm
            .removeClass('hidden')
            .find(':input')
                .prop('disabled', false)
                .removeClass('disabled');

        return this;
    }

    $.fn.disableElement = function()
    {
        this
            .addClass('disabled')
            .find(':input')
                .prop('disabled', true)
                .addClass('disabled');

        return this;
    }

    $.fn.disableFormElement = function()
    {
        const $elm = this.is(':input') ? this.closest('.form-group') : this;

        $elm
            .addClass('hidden')
            .find(':input')
                .prop('disabled', true)
                .addClass('disabled');

        return this;
    }

    /**
     * Create blurred placeholder until image loads.
     *
     * @return jQuery
     */
    $.fn.imagePlaceholder = function()
    {
        const $elm = this;
        const $small = $('img', $elm);
        var img = new Image();
        var subject = new Image();

        img.src = $small.attr('src');
        subject.src = $elm.attr('data-image-src');
        $(subject).addClass($elm.attr('data-image-class'));

        img.onload = function() {
            $small.addClass('loaded');
        };

        subject.onload = function() {
            $(subject).addClass('loaded');
            // $small.removeClass('loaded');
        };

        $(subject).appendTo($elm);

        return this;
    };

    /**
     * Keep element in view.
     *
     * @return jQuery
     */
    $.fn.keepElementInContainer = function(container)
    {
        const $elm = this;
        var container = container || window;
        var elemPosTop = $elm.position().top;

        $(window).scroll(function()
        {
            var containerTop = $(container).scrollTop();

            if (containerTop > elemPosTop) {
                $elm.css({
                    'position': 'fixed',
                    'top': containerTop + 10
                });
            } else {
                $elm.css({
                    'position': 'inherit'
                });
            }
        });

        return this;
    };
}

export { Utility };