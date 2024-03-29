import 'ajax-bootstrap-select/dist/css/ajax-bootstrap-select.min.css';
import 'ajax-bootstrap-select';
// import 'ajax-bootstrap-select/dist/js/locale/ajax-bootstrap-select.sk-SK.js'; // @todo: not available & find out how to support multiple and switch between them at runtime
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapAjaxSelectPicker extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;
        var pb = this;

        $('select.autocomplete', container).ajaxSelectPicker({
            minLength: 3,
            locale: {
                currentlySelected: pb.t('currentlySelected'),
                emptyTitle: pb.t('emptyTitle'),
                errorText: pb.t('errorText'),
                searchPlaceholder: pb.t('searchPlaceholder'),
                statusInitialized: pb.t('statusInitialized'),
                statusNoResults: pb.t('statusNoResults'),
                statusSearching: pb.t('statusSearching'),
                statusTooShort: pb.t('statusTooShort')
            },
            ajax: {
                data: function() {
                    let $form = this.plugin.$element.closest('form');
                    let data = {};

                    $form.find('[name^="_data"],[name="_section"],[name="_param"]').serializeArray().map((e) => {
                        data[e.name] = e.value;
                    });

                    return {
                        ...data,
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