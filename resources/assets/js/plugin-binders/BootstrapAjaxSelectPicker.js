import 'ajax-bootstrap-select/dist/css/ajax-bootstrap-select.min.css';
import 'ajax-bootstrap-select';
// import 'ajax-bootstrap-select/dist/js/locale/ajax-bootstrap-select.sk-SK.js'; // @todo: not available & find out how to support multiple and switch between them at runtime
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class BootstrapAjaxSelectPicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('select.autocomplete', container).ajaxSelectPicker({
            minLength: 3,
            locale: {
                currentlySelected: this.t('searchPlaceholder'),
                emptyTitle: this.t('emptyTitle'),
                errorText: this.t('errorText'),
                searchPlaceholder: this.t('searchPlaceholder'),
                statusInitialized: this.t('statusInitialized'),
                statusNoResults: this.t('statusNoResults'),
                statusSearching: this.t('statusSearching'),
                statusTooShort: this.t('statusTooShort')
            },
            ajax: {
                data: function () {
                    return {
                        _param: this.plugin.$element.closest('form').find('[name="_param"]').val(),
                        q: '{{{q}}}',
                        ...this.plugin.$element.data('absAjaxRequestData')
                    };
                }
            }
        });
    }
}

BootstrapAjaxSelectPicker.packageName = 'ajax-bootstrap-select';

BootstrapAjaxSelectPicker.check = () => (typeof $ !== 'undefined') && (typeof $.fn.ajaxSelectPicker !== 'undefined');

export { BootstrapAjaxSelectPicker };