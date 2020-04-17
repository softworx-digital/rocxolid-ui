import 'jquery.async.steps'; // in place of 'jquery.steps';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryAsyncSteps extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        // @todo: the settings initialization should be here, but have no clue how to access the bound element (and form)
        // consider different (or own / extending this plugin)
    }

    bind(container)
    {
        let rx = this.rx;
        let pb = this;
        let $wizardForm = $('.wizard form', container);
        let settings = settings || {};

        const validateFieldGroup = (url) => new Promise((resolve, reject) => {
            $wizardForm.ajaxSubmit(rx.getPlugin('ajax-form').getFormSubmitOptions({
                url: url,
                success: function(data, statusText, xhr, $form)
                {
                    if (rx.hasPlugin('loading-overlay')) {
                        rx.getPlugin('loading-overlay').hide($form.closest('.ajax-overlay'));
                    }

                    rx.getResponse().set(data).handle();

                    resolve(!data.errors || !data.errors.length);
                },
                error: settings.error || function(data)
                {
                    rx.handleAjaxError(data);

                    reject(false);
                }
            }));
        });

        this.stepsOptions = {
            doneClass: settings.doneClass || 'completed',
            onChange: settings.onChange || async function(currentIndex, newIndex, stepDirection) {
                // console.debug('onChange', currentIndex, newIndex, stepDirection);
            },
            onValidateForward: settings.onValidateForward || async function(currentIndex, newIndex) {
                const url = $(this.contentSelector, this.el).eq(currentIndex).data('form-field-group-validation-url');

                if (rx.hasPlugin('ajax-form') && url) {
                    return validateFieldGroup(url);
                } else {
                    return true;
                }
            }
        }

        if ($('.wizard', container).data('plugin_AsyncSteps')) {
            $('.wizard', container).data('plugin_AsyncSteps').destroy();
        }

        $('.wizard', container).asyncSteps(pb.stepsOptions);

        return this;
    }
}

jQueryAsyncSteps.packageName = 'jquery-async-steps';

jQueryAsyncSteps.check = () => (typeof $ !== 'undefined') && (typeof $.fn.asyncSteps !== 'undefined');

export { jQueryAsyncSteps };