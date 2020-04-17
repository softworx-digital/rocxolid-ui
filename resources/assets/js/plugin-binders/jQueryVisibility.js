import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class jQueryVisibility extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        // allow only one (global) binding
        this.bound = false;
    }

    bind(container)
    {
        if (this.bound) {
            return this;
        }

        $(container).on('change', ':radio[data-toggle-visibility]', function()
        {
            const selector = $(this).data('toggle-visibility');
            const $elm = $(selector);

            if ($(this).is(':checked')) {
                $elm.removeClass('hidden').addClass('show').removeClass('disabled');
            } else {
                $elm.removeClass('show').addClass('hidden').addClass('disabled');
            }
        });

        $(container).on('click', '[data-toggle-visibility-show]', function()
        {
            const selector = $(this).data('toggle-visibility-show');
            const $elm = $(selector);

            $elm.removeClass('hidden').addClass('show').find(':input').prop('disabled', false).removeClass('disabled');
        });

        $(container).on('click', '[data-toggle-visibility-hide]', function()
        {
            const selector = $(this).data('toggle-visibility-hide');
            const $elm = $(selector);

            $elm.removeClass('show').addClass('hidden').find(':input').prop('disabled', true).addClass('disabled');
        });

        this.bound = true;

        return this;
    }
}

jQueryVisibility.packageName = 'jquery-visibility';

jQueryVisibility.check = () => (typeof $ !== 'undefined');

export { jQueryVisibility };