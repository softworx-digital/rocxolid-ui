import 'bootstrap-fileinput/css/fileinput.min.css';
// import 'bootstrap-fileinput/js/plugins/piexif';
import 'bootstrap-fileinput';
import 'bootstrap-fileinput/themes/fa/theme';
import '../lang/sk/BootstrapFileinput'; // customized translation, @todo: find out how to support multiple and switch between them at runtime
import 'form-serializer';
import { PluginBinder } from '../core/PluginBinder';
import { Utility } from '../core/Utility';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapFileinput extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        this.fileinputOptions = {
            language: settings.lang || this.lang
        }
    }

    bind(container)
    {
        var rx = this.rx;
        var pb = this;

        $('input[type="file"]', container).each(function(index) {
            const $elm = $(this);
            const $form = $elm.closest('form');

            $elm.fileinput({
                language: pb.lang,
                uploadUrl: $form.hasClass('ajax-upload') ? $form.attr('action') : null,
                autoOrientImage: false,
                uploadExtraData: function(previewId, index) {
                    // return $form.find('[name^="_data"],[name="_section"],[name="_param"]').serializeObject();

                    let data = {};

                    $form.find('[name^="_data"],[name="_section"],[name="_param"]').each(function() {
                        data[$(this).attr('name')] = $(this).val();
                    });

                    return data;
                }
            })
            // fired on asynchronous uploads on each file uploaded
            .on('fileuploaded', function(event, data, previewId, index) {
                console.debug('fileinput.fileuploaded');
                rx.getResponse().set(data.response).handle();
            })
            // fired on upload error
            .on('fileuploaderror', function(event, data, msg) {
                console.log('File Upload Error', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
            })
            // fired after completion of either the synchronous or asynchronous ajax batch upload for non-resumable ajax uploads
            .on('filebatchuploadcomplete', function(event, files, extraData) {
                console.debug('fileinput.filebatchuploadcomplete');
                Utility.ajaxCall({
                    rx: rx,
                    element: $form,
                    type: $form.attr('method'),
                    url: $form.data('on-action-complete'),
                    data: extraData
                });
            })
            // fired on synchronous uploads on whole batch uploaded
            .on('filebatchuploadsuccess', function(event, data) {
                console.debug('fileinput.filebatchuploadsuccess');
                rx.getResponse().set(data.response).handle();
            });

            $form.find('[data-action="upload"').on('click', function() {
                $elm.fileinput('upload');
            });
        });
    }

    get lang()
    {
        const lang = $('html').attr('lang');

        if (!lang) {
            throw 'No html lang specified';
        } else if (typeof $.fn.fileinputLocales[lang] === 'undefined') {
            throw {
                package: this.constructor.packageName,
                message: 'Language not supported or language pack is not loaded',
                language: lang
            }
        } else {
            return lang;
        }
    }
}

BootstrapFileinput.packageName = 'bootstrap-fileinput';

BootstrapFileinput.check = () => (typeof $ !== 'undefined') && (typeof $.fn.fileinput !== 'undefined');

export { BootstrapFileinput };