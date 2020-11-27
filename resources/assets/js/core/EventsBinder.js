import { Utility } from './Utility';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class EventsBinder
{
    constructor(rx)
    {
        this.rx = rx;
    }

    bind(container)
    {
        this._log('Binding events...');

        container = container || document;

        this
            .bindWindowUnload()
            .bindWindowFocus()
            .bindWindowFullscreen();

        this
            .bindSubmit(container)
            .bindClick(container)
            .bindChange(container)
            .bindModalEvents(container)
            .bindCollapseEvents(container)
            .bindTabsEvents(container);

        return this;
    }

    bindSubmit(container)
    {
        this._log('Binding submit event');

        let rx = this.rx;
        let self = this;

        $(container).on('submit', 'form.ajaxify', function(e)
        {
            if (rx.hasPlugin('loading-overlay')) {
                rx.getPlugin('loading-overlay').show($(this).closest('.ajax-overlay'));
            }
        });

        $(container).on('keydown', 'form :text, :password', function (e) {
            switch (e.which) {
                case 13: // enter
                    $(this).closest('form').submit();
                    return false;
                case 27: // esc
                    // $(this).closest('.modal').modal('hide');
                    return false;
            }
        });

        return this;
    }

    bindClick(container)
    {
        this._log('Binding click event');

        let rx = this.rx;

        $(container).on('click', '[data-ajax-url]', function(e)
        {
            e.preventDefault(e);

            let data = {};

            data._method = $(this).data('request-method') || 'GET';
            data._token = $(this).data('token') || null;

            Utility.ajaxCall({
                rx: rx,
                element: $(this),
                type: data._method,
                url: $(this).data('ajax-url'),
                data: data
            });
        });

        $(container).on('click', '[data-submit-action]', function(e)
        {
            e.preventDefault(e);

            const $btngroup = $(this).closest('.btn-group.submit-actions');

            $btngroup.closest('form').find('input[name="_submit-action"]').val($(this).data('submit-action'));
            $btngroup.find('input[type="submit"], button[data-ajax-submit-form]').click();
        });

        $(container).on('click', '[data-add-element]', function(e)
        {
            const $elm = $($(this).data('add-form-row'));
            const $clone = $elm.clone();

            $clone.find('input:not([type=radio], [type=checkbox]), select').val('');
            $clone.find('input[type=radio], input[type=checkbox]').attr('checked', false);
            $clone.find('input.flat').each(function(index)
            {
                $(this).next('ins').remove();
                $(this).removeAttr('style').unwrap();
            });

            $elm.closest('fieldset').append($clone);
        });

        $(container).on('click', '[data-append-custom-value]', function(e)
        {
            const $input = $($(this).data('append-custom-value'));
            const $target = $($(this).data('append-custom-value-target'));
            const $template = $target.find('.append-template');
            const $clone = $template.clone();

            $clone
                .removeClass('append-template')
                .removeClass('hidden')
                .addClass('active');

            $clone.find('.title').text($input.val());
            $clone.find('input').val($input.val()).removeAttr('disabled');

            if ($input.val() !== '') {
                if ($clone.find('input').is(':radio')) {
                    $clone.find('input').prop('checked', true).change();
                    $target.find('input:radio[name="' + $clone.find('input').attr('name') + '"]').attr('checked', false).parent().removeClass('active');
                }

                $template.before($clone);
                $input.val('');
            }
        });

        $(container).on('click', '[data-remove-parent]', function(e)
        {
            $(this).closest($(this).data('remove-parent')).remove();
        });

        $(container).on('click', '[data-add-form-field-group]', function(e)
        {
            const selector = $(this).data('add-form-field-group');
            const $container = $(this).closest($(this).data('add-form-field-group-container'));

            if ($container.exists()) {
                let $original = $container.find(selector).last();
                let $clone = $original.clone();

                $clone = Utility.resetFormField($clone, function($field)
                {
                    // @todo: move to Utility.resetFormField ?
                    rx.bindPlugin('select', $field);
                    rx.bindPlugin('ajax-select', $field);
                    rx.bindPlugin('toggle', $field);

                    // @todo: quick'n'dirty
                    $field.find('i.tooltipstered').each(function () {
                        $(this).attr('title', $original.find('i.tooltipstered').tooltipster('content'));
                    });

                    rx.bindPlugin('tooltips', $field);

                    $field.appendTo($container);
                });

                // reindex the fields incrementally
                Utility.resetArrayFieldsNameParameters($container, selector);
            } else {
                throw new ReferenceError('No container for selector [' + selector + '] found');
            }
        });

        $(container).on('click', '[data-remove-form-field-group]', function(e)
        {
            const selector = $(this).data('remove-form-field-group');
            const $container = $(this).closest($(this).data('remove-form-field-group-container'));

            if ($container.exists()) {
                $(this).closest(selector).remove();

                // reindex the fields incrementally
                Utility.resetArrayFieldsNameParameters($container, selector);
            } else {
                throw new ReferenceError('No container for selector [' + selector + '] found');
            }
        });

        $(container).on('click', '[data-click-delegate]', function(e)
        {
            let selector = $(this).attr('data-click-delegate');
            let econtainer = $(this).attr('data-click-delegate-container') || container;

            $(this).closest(econtainer).find(selector).click();
        });

        $(container).on('click', '[data-click-check]', function(e)
        {
            let selector = $(this).attr('data-click-check');
            let econtainer = $(this).attr('data-click-check-container') || container;
            let $elm = $(this).closest(econtainer).find(selector);

            $elm.closest('[data-toggle]').find(':checked').removeAttr('checked').closest('.active').removeClass('active').removeClass('focus');
            $elm.attr('checked', 'checked').parent().addClass('active');

        });

        $(container).on('click', '[data-toggle="buttons"] > .btn, [data-toggle="buttons"] > .btn-group > .btn', function(e)
        {
            $(this).removeClass('focus');
        });

        $(container).on('click', '[data-click-uncheck]', function(e)
        {
            let selector = $(this).attr('data-click-uncheck');
            let econtainer = $(this).attr('data-click-uncheck-container') || container;

            $(this).closest(econtainer).find(selector).removeAttr('checked').closest('.active').removeClass('active').removeClass('focus');
        });

        $(container).on('click', '[data-click-enable]', function(e)
        {
            let selector = $(this).attr('data-click-enable');
            let econtainer = $(this).attr('data-click-enable-container') || container;

            $(this).closest(econtainer).find(selector).removeAttr('disabled').parent().removeClass('disabled');
        });

        $(container).on('click', '[data-click-disable]', function(e)
        {
            let selector = $(this).attr('data-click-disable');
            let econtainer = $(this).attr('data-click-disable-container') || container;

            $(this).closest(econtainer).find(selector).attr('disabled', 'disabled').parent().addClass('disabled');
        });

        return this;
    }

    bindChange(container)
    {
        this._log('Binding change event');

        let rx = this.rx;

        // $(container).on('change', '[data-change-action]', function(e)
        $(container).on('changed.bs.select', 'select[data-change-action]', function(e, clickedIndex, newValue, oldValue)
        {
            if (newValue == oldValue) {
                return false;
            } else {
                $(this).find('.bs-searchbox input').focus();
            }

            const $form = $(this).closest('form');

            $form.find($(this).attr('data-change-disable')).attr('disabled', 'disabled');

            const data = $form.find('[name^="_data"],[name="_section"],[name="_param"]').not(':disabled').fieldSerialize();

            Utility.ajaxCall({
                rx: rx,
                element: $form,
                type: $(this).data('request-method') || 'POST',
                url: $(this).data('change-action'),
                data: data
            });
        });

        $(container).on('changed.bs.select', 'select[data-change-redirect]', function(e, clickedIndex, newValue, oldValue)
        {
            $(location).attr('href', $(this).val());
        });

        $(container).on('change', ':checkbox[data-change-action], :radio[data-change-action]', function(e)
        {
            const $form = $(this).closest('form');

            $form.find($(this).attr('data-change-disable')).attr('disabled', 'disabled');

            const data = $form.find('[name^="_data"],[name="_section"],[name="_param"]').not(':disabled').fieldSerialize();

            Utility.ajaxCall({
                rx: rx,
                element: $form,
                type: $(this).data('request-method') || 'POST',
                url: $(this).data('change-action'),
                data: data
            });
        });

        $(container).on('change', ':checkbox[data-change-redirect], :radio[data-change-redirect]', function(e)
        {
            $(location).attr('href', $(this).val());
        });

        $(container).on('change keydown', '.has-error :input', function(e)
        {
            $(this).closest('.has-error').removeClass('has-error').find('.error-message').remove();
        });

        return this;
    }

    bindWindowUnload()
    {
        this._log('Binding window unload event');

        let rx = this.rx;

        $(window).on('beforeunload', function(e) {
            if (window.isContentDirty) {
                (e || window.event).returnValue = configuration.leaveConfirmationMessage; //Gecko + IE
                return configuration.leaveConfirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            } else {
                $('body').addClass('unloading');
                $('.modal').modal('hide');

                if (rx.hasPlugin('loading-overlay')) {
                    rx.getPlugin('loading-overlay').show($('.right_col .x_panel'));
                }
            }
        });

        return this;
    }

    bindWindowFocus()
    {
        this._log('Binding window focus event');

        let rx = this.rx;
        let self = this;

        $(window).on('focus', function(e)
        {
            // self._log('Window focused', e);

            let need_ping = (rx.ping < ((new Date()).getTime() / 1000));

            if (need_ping && (typeof configuration.pingUrl !== 'undefined')) {
                $.getJSON(configuration.pingUrl)
                    .done(function(data) {
                        rx.ping = data.ping;
                    })
                    .fail(function(data)
                    {
                        if (data.status === 401) {
                            if (!$('#login-modal').exists()) {
                                $.getJSON(configuration.loginUrl, function(data)
                                {
                                    rx.getResponse().set(data).handle();
                                });

                                $('body').addClass('offline');
                            }
                        }
                    });
            }
        });

        return this;
    }

    bindWindowFullscreen()
    {
        this._log('Binding document fullscreenchange event');

        document.addEventListener('fullscreenchange', function() {
            $('body').toggleClass('fullscreen', !!document.fullscreenElement);
        });

        return this;
    }

    bindModalEvents(container)
    {
        let self = this;

        this._log('Binding modal events');

        $(container).on('show.bs.modal', '.modal', function(e)
        {
            self._log('Fired show.bs.modal event', e);

            const zIndex = 1040 + (10 * $('.modal:visible').length);

            $(this).css('z-index', zIndex);

            setTimeout(function()
            {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });

        return this;
    }

    bindCollapseEvents(container)
    {
        this._log('Binding collapse events');

        $(container).on('show.bs.collapse', '.collapse', function()
        {
            const $btn = $('[data-target="#' + $(this).attr('id') + '"]');

            $btn.find('.glyphicon-chevron-right').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
            $btn.find('.glyphicon-chevron-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            $btn.find('.title').text($btn.data('label-shown'));
        });

        $(container).on('hide.bs.collapse', '.collapse', function()
        {
            const $btn = $('[data-target="#' + $(this).attr('id') + '"]');

            $btn.find('.glyphicon-chevron-left').removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
            $btn.find('.glyphicon-chevron-up').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            $btn.find('.title').text($btn.data('label-hidden'));
        });

        return this;
    }

    bindTabsEvents(container)
    {
        this._log('Binding tab events');

        /*
        $('a[data-toggle="tab"]').on('hide.bs.tab', function(e)
        {
            var $old_tab = $($(e.target).attr('href'));
            var $new_tab = $($(e.relatedTarget).attr('href'));

            if($new_tab.index() < $old_tab.index()){
                $old_tab.css('position', 'relative').css('right', '0').show();
                $old_tab.animate({'right': '-100%'}, 300, function()
                {
                    $old_tab.css('right', 0).removeAttr('style');
                });
            }
            else {
                $old_tab.css('position', 'relative').css('left', '0').show();
                $old_tab.animate({'left': '-100%'}, 300, function()
                {
                    $old_tab.css('left', 0).removeAttr('style');
                });
            }
        });

        $('a[data-toggle="tab"]').on('show.bs.tab', function(e)
        {
            var $new_tab = $($(e.target).attr('href'));
            var $old_tab = $($(e.relatedTarget).attr('href'));

            if($new_tab.index() > $old_tab.index()){
                $new_tab.css('position', 'relative').css('right', '-2500px');
                $new_tab.animate({'right': '0'}, 500);
            }
            else {
                $new_tab.css('position', 'relative').css('left', '-2500px');
                $new_tab.animate({'left': '0'}, 500);
            }
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e)
        {
            // your code on active tab shown
        });
        */

        return this;
    }

    _log(message, event)
    {
        event
            ? console.debug(`%c [EventsBinder]`, 'color: #bada55;', message, event)
            : console.debug(`%c [EventsBinder]`, 'color: #bada55;', message);

        return this;
    }
}

export { EventsBinder };