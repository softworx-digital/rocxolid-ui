import { PluginBinder } from '../core/PluginBinder';
import { Utility } from '../core/Utility';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BlueimpFileUpload extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;
        var pb = this;

        $('input[type="file"][data-upload-url]', container).each(function(index)
        {
            const $elm = $(this);
            const $overlay = $elm.closest('.ajax-overlay');
            const $progressbar = $elm.closest('.control-group').find('.progress-bar');
            const $filelist = $elm.closest('.control-group').find('.files');

            $elm.fileupload({
                url: $elm.data('upload-url'),
                dataType: 'json',
                add: function(e, data) {
                    let valid = true;

                    for (let i in data.files) {
                        if ($elm.attr('accept')) {
                            let accept = $elm.attr('accept').split(',');
                            var re = new RegExp('(' + accept.join('|') + ')', 'i');

                            if (!re.test(data.files[i].type)) {
                                valid = false;

                                if (rx.hasPlugin('notification')) {
                                    rx.getPlugin('notification').show(data.files[i].name + pb.t('errorFileType') + accept.join(', '), 'error');
                                }
                            }
                        }

                        if ($elm.attr('data-maxsize') && (data.files[i].size > $elm.attr('data-maxsize'))) {
                            valid = false;

                            if (rx.hasPlugin('notification')) {
                                rx.getPlugin('notification').show(data.files[i].name + pb.t('errorSize') + Utility.formatBytes($elm.attr('data-maxsize')), 'error');
                            }
                        }
                    }

                    if (valid) {
                        data.submit();
                    }
                },
                submit: function(e, data)
                {
                    if (rx.hasPlugin('loading-overlay')) {
                        rx.getPlugin('loading-overlay').show($overlay);
                    }

                    $progressbar.css('width', '0%');
                },
                progressall: function(e, data)
                {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $progressbar.css('width', progress + '%');
                },
                done: function(e, data)
                {
                    if (rx.hasPlugin('loading-overlay')) {
                        rx.getPlugin('loading-overlay').hide($overlay);
                    }

                    rx.getResponse().set(data.result).handle();
                },
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
        });

        $('input[type="file"][data-upload-self]', container).each(function(index)
        {
            const $elm = $(this);
            // const $overlay = $elm.closest('.ajax-overlay');
            const $progressbar = $elm.closest('.control-group').find('.progress-bar');
            const $filelist = $elm.closest('.control-group').find('.files');

            $elm.fileupload({
                dataType: 'json',
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
        });
    }
}

BlueimpFileUpload.packageName = 'blueimp-file-upload';

BlueimpFileUpload.check = () => (typeof $ !== 'undefined') && (typeof $.fn.fileupload !== 'undefined');

export { BlueimpFileUpload };