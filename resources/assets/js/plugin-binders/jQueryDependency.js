import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class jQueryDependency extends PluginBinder
{
    bind(container)
    {
        $(container).find('[data-dependency-controller-initial]').each(function()
        {
            let $dependent = $(this);

            if ($dependent.attr('data-dependency-controller-initial') === 'enabled') {
                $dependent.enableFormElement();
            } else {
                $dependent.disableFormElement();
            }
        });

        /**
         * Bind change event for all fields defined in [data-dependency-controller-enabled]
         * If values of those fields occur in "my" [data-dependency-controller-enabled] definition => enable "me", disable "me" otherwise.
         */
        $(container).find('[data-dependency-controller-enabled]').each(function()
        {
            let $dependent = $(this);

            try {
                var fields = JSON.parse($(this).attr('data-dependency-controller-field').toString());
            } catch (e) {
                var fields = $(this).attr('data-dependency-controller-field').toString();
            }

            if (!$.isArray(fields)) {
                fields = [ fields ];
            }

            fields.map(function(field)
            {
                $(container).on('change', ':input[name="_data[' + field + ']"]', function()
                {
                    try {
                        var enabled_values = JSON.parse($dependent.attr('data-dependency-controller-enabled').toString());
                    } catch (e) {
                        var enabled_values = $dependent.attr('data-dependency-controller-enabled').toString();
                    }

                    if (!$.isArray(enabled_values)) {
                        enabled_values = [ enabled_values ];
                    }

                    if ($.inArray($(this).val(), enabled_values.map(String)) > -1) {
                        $dependent.enableFormElement();
                    } else {
                        $dependent.disableFormElement();
                    }
                });
            });
        });

        /**
         * Bind change event for all fields defined in [data-dependency-controller-disabled]
         * If values of those fields occur in "my" [data-dependency-controller-disabled] definition => disabled "me", enable "me" otherwise.
         */
        $(container).find('[data-dependency-controller-disabled]').each(function()
        {
            let $dependent = $(this);

            try {
                var fields = JSON.parse($(this).attr('data-dependency-controller-field').toString());
            } catch (e) {
                var fields = [ $(this).attr('data-dependency-controller-field').toString() ];
            }

            fields.map(function(field)
            {
                $(container).on('change', ':input[name="_data[' + field + ']"]', function()
                {
                    if ($.inArray($(this).val(), JSON.parse($dependent.attr('data-dependency-controller-disabled')).map(String)) > -1) {
                        $dependent.disableFormElement();
                    } else {
                        $dependent.enableFormElement();
                    }
                });
            });
        });
    }
}

jQueryDependency.packageName = 'jquery-dependency';

jQueryDependency.check = () => (typeof $ !== 'undefined');

export { jQueryDependency };