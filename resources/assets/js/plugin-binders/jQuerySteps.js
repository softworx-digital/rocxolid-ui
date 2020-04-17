import { PluginBinder } from '../PluginBinder';

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// I was unable to bind it properly with async calls within step validation
// therefore I created a customized plugin version - jQueryAsyncSteps
//
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQuerySteps extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        // @todo: the settings initialization should bbe here, but have no clue how to access the bound element (and form)
        // consider different (or own / extending this plugin)
    }

    bind(container)
    {
        let rx = this.rx;
        let pb = this;
        let $form = $('.wizard form', container);
        let settings = settings || {};

        var extensionMethods = {
            setAction: function(action) {
                alert('asd');
            }
        };
console.log($.fn.steps);
        $.extend(true, $.fn.steps.prototype, extensionMethods);



        async function check(currentIndex, newIndex, stepDirection) {
console.log('change', currentIndex, newIndex, stepDirection);
console.log('1');
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => resolve("done!"), 2000)
            });
console.log('2');
            let result = await promise; // wait until the promise resolves (*)
console.log('3');
            alert(result); // "done!"
console.log('4');
            return result;
        }

        this.stepsOptions = {
            doneClass: settings.doneClass || 'completed'
        }

        /*
        this.stepsOptions = {
            doneClass: settings.doneClass || 'completed',
            onChange: settings.onChange || async function(currentIndex, newIndex, stepDirection) {
console.log('change', currentIndex, newIndex, stepDirection);

                let validateStep = new Promise((resolve, reject) => {
                    let $formFieldGroup = $(this.contentSelector, $form).eq(currentIndex);

                    $form.ajaxSubmit(rx.getPlugin('ajax-form').getFormSubmitOptions({
                        url: $formFieldGroup.data('form-field-group-validation-url'),
                        success: function(data, statusText, xhr, $form)
                        {
                            if (rx.hasPlugin('loading-overlay')) {
                                rx.getPlugin('loading-overlay').hide($form.closest('.ajax-overlay'));
                            }

                            rx.getResponse().set(data).handle();

                            resolve(!data.errors || !data.errors.length);
                        },
                    }));
                });

                switch (stepDirection) {
                    case 'forward':
                        if (rx.hasPlugin('ajax-form')) {
console.log('first');
                            return await validateStep;
                        } else {
                            return true;
                        }
                        break;
                    default:
                        return true;
                }
            }
        }
        */

        $('.wizard', container).steps(pb.stepsOptions);

        return this;
    }
}

jQuerySteps.packageName = 'jquery-steps';

jQuerySteps.check = () => (typeof $ !== 'undefined') && (typeof $.fn.steps !== 'undefined');

export { jQuerySteps };