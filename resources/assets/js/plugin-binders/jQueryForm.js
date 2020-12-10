import 'jquery-form';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryForm extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        // allow only one (global) binding
        this.bound = false;

        this.formSubmitOptions = {
            beforeSubmit: settings.beforeSubmit || function(arr, $form, options)
            {
                if (rx.hasPlugin('loading-overlay')) {
                    rx.getPlugin('loading-overlay').show($form.closest('.ajax-overlay'));
                }
            },
            success: settings.success || function(data, statusText, xhr, $form)
            {
                if (rx.hasPlugin('loading-overlay')) {
                    rx.getPlugin('loading-overlay').hide($form.closest('.ajax-overlay'));
                }

                rx.getResponse().set(data).handle();
            },
            error: settings.error || function(data, statusText, xhr, $form)
            {
                if (rx.hasPlugin('loading-overlay')) {
                    rx.getPlugin('loading-overlay').hide($form.closest('.ajax-overlay'));
                }

                rx.handleAjaxError(data);
            }
        }
    }

    bind(container)
    {
        if (this.bound) {
            return this;
        }

        var rx = this.rx;
        var pb = this;

        $(container).on('submit', 'form[data-ajax-submit-url]', function(e)
        {
            e.preventDefault(e);
            // e.stopPropagation();
            $(this).ajaxSubmit(pb.formSubmitOptions);
        });

        $(container).on('submit', 'form:has([data-ajax-submit-form])', function(e)
        {
            e.preventDefault(e);
            // e.stopPropagation();
            $(this).ajaxSubmit(pb.formSubmitOptions);
        });

        $(container).on('click', '[data-ajax-submit-form]', function(e)
        {
            const $form = $('form' + $(this).data('ajax-submit-form'), container);

            if ($form.exists()) {
                e.preventDefault(e);
                // e.stopPropagation();

                if ($(this).is(':reset')) {
                    $form.find('input:visible').val('');
                    $form.find('select').val('').selectpicker('refresh');
                }

                $form.ajaxSubmit(pb.formSubmitOptions);
            } else {
                console.warn('No matching form for submission', $(this).data('ajax-submit-form'));
            }
        });

        this.bound = true;

        return this;
    }

    getFormSubmitOptions(settings)
    {
        settings = settings || {};

        return {...this.formSubmitOptions, ...settings};
    }
}

jQueryForm.packageName = 'jquery-form';

jQueryForm.check = () => (typeof $ !== 'undefined') && (typeof $.fn.ajaxSubmit !== 'undefined');

export { jQueryForm };