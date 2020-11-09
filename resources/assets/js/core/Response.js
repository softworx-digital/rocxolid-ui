import { Utility } from './Utility';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class Response
{
    constructor(rx, data)
    {
        this.rx = rx;
        this.data = data;
        this.extension = null;
    }

    set(data)
    {
        this.data = data;

        return this;
    }

    handle(callback, extension)
    {
        this._log('handle');

        var self = this;

        if (typeof extension !== 'undefined') {
            if (typeof extension !== 'object') {
                throw new TypeError(`Invalid extension definition, JSON format of { "<cmd-1>": <callback-function-1>, "<cmd-2>": <callback-function-2>, ... } expected`);
            }

            $.each(extension, function(cmd, callback)
            {
                if (typeof callback !== 'function') {
                    throw new TypeError(`Invalid extension definition, JSON format of { "<cmd-1>": <callback-function-1>, "<cmd-2>": <callback-function-2>, ... } expected, [${cmd}] value is not a function`);
                }
            });
        }

        $.each(this.data, function(cmd, pack)
        {
            if ((typeof self[cmd] === 'undefined') && (typeof extension === 'object') && (typeof extension[cmd] === 'undefined')) {
                throw new TypeError('Undefined Response handler for [' + cmd + '] - unsupported command');
            }

            if (pack instanceof Array) {
                $.each(pack, function(i, data)
                {
                    let ret = (typeof extension === 'object') && (typeof extension[cmd] !== 'undefined')
                            ? extension[cmd](data)
                            : self[cmd](data);

                    if (ret && (typeof callback === 'function')) {
                        callback(ret);
                    }
                });
            } else {
                let ret = (typeof extension === 'object') && (typeof extension[cmd] !== 'undefined')
                        ? extension[cmd](pack)
                        : self[cmd](pack);

                if (ret && (typeof callback === 'function')) {
                    callback(ret);
                }
            }
        });
    }

    errors(data)
    {
        this._log('errors');

        var rx = this.rx;

        console.log('Request data invalid', data);

        if (rx.hasPlugin('notification')) {
            $.each(data, (index, error) => rx.getPlugin('notification').show(error, 'error'));
            // rx.getPlugin('notification').show(data.join("\n"), 'error');
        }
    }

    modal(modal)
    {
        this._log('modal');

        var res = this;

        return $(modal)
            .appendTo('body')
            .on('show.bs.modal', function(e) {
                res._bindPlugins($(this));
            })
            .on('hidden.bs.modal', function(e) {
                $(this).remove();
                // History.back();
            })
            .modal('show');
    }

    modalOpen(selector)
    {
        this._log('modalOpen', selector);

        return $(selector).modal();
    }

    modalClose(selector)
    {
        this._log('modalClose', selector);

        return $(selector).modal('hide');
    }

    reload()
    {
        this._log('reload');

        location.reload();
    }

    redirect(url)
    {
        this._log('redirect');

        $(location).attr('href', url);
    }

    openTab(url)
    {
        this._log('openTab');

        window.open(url, '_blank');
    }

    replace(data)
    {
        this._log('replace');

        var res = this;

        $.each(data, function(selector, html)
        {
            $(selector).replaceWith(html);

            res._bindPlugins(selector);
        });
    }

    insert(data)
    {
        this._log('insert');

        var res = this;

        $.each(data, function(selector, html)
        {
            $(selector).html(html);

            res._bindPlugins(selector);
        });
    }

    append(data)
    {
        this._log('append');

        var res = this;

        $.each(data, function(selector, html)
        {
            $(selector).append(html);

            res._bindPlugins(selector);
        });
    }

    val(data)
    {
        this._log('val');

        $.each(data, function(selector, val)
        {
            $(selector).val(val);
        });
    }

    destroy(data)
    {
        this._log('destroy');

        if (!(data instanceof Array)) {
            data = [ data ];
        }

        $.each(data, function(index, selector)
        {
            $(selector).remove();
        });
    }

    empty(data)
    {
        this._log('empty');

        if (!(data instanceof Array)) {
            data = [ data ];
        }

        $.each(data, function(index, selector)
        {
            $(selector).replaceWith($('<span></span>').attr('id', selector.substring(1)));
        });
    }

    notify(data)
    {
        this._log('notify');

        var rx = this.rx;

        if (rx.hasPlugin('notification')) {
            rx.getPlugin('notification').show(data.text, data.type);
        }
    }

    bindForm(selector)
    {
        this._log('bindForm');

        $('[data-toggle=tooltip]', selector).tooltip();

        $('select[data-toggle-visibility]', selector).change(function()
        {
            if ($('option:selected', this).data('toggle-visibility-visible')) {
                $($(this).data('toggle-visibility')).show().find('input,select').removeAttr('disabled');
                //$($(this).data('toggle-visibility')).next('.toggle-alternative').hide();
                $(this).nextAll('.toggle-alternative').hide();

                if ($(this).is('[data-toggle-visibility-instead]')) {
                    $($(this).data('toggle-visibility-instead')).hide();
                }
            } else {
                $($(this).data('toggle-visibility')).hide().find('input,select').attr('disabled', 'disabled');
                //$($(this).data('toggle-visibility')).next('.toggle-alternative').show();
                $(this).nextAll('.toggle-alternative').show();

                if ($(this).is('[data-toggle-visibility-instead]')) {
                    $($(this).data('toggle-visibility-instead')).show();
                }
            }
        });

        $('input[type="radio"][data-toggle-visibility]', selector).change(function()
        {
            if ($(this).is(':checked')) {
                if ($(this).data('toggle-visibility-visible')) {
                    $($(this).data('toggle-visibility')).show().find('input,select').removeAttr('disabled');
                } else {
                    $($(this).data('toggle-visibility')).hide().find('input,select').attr('disabled', 'disabled');
                }
            }
        });

        $('[data-toggle-visibility]', selector)
            .addClass('changing')
            .trigger('change')
            .removeClass('changing');

        $('.modal-body .dropzone').dropzone();
    }

    ping(data)
    {
        this._log('ping');
    }

    file64(data)
    {
        this._log('file64');

        // var disposition = jqXHR.getResponseHeader('Content-Disposition');
        // var type = jqXHR.getResponseHeader('Content-Type');
        var filename = data.filename || false;
        var type = data.type;
        var buffer = Utility.base64ToArrayBuffer(data.base64);

        /*
        if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
        }
        */

        var blob;

        if (typeof File === 'function') {
            try {
                blob = new File([buffer], filename, { type: type });
            } catch (e) { /* Edge */ }
        }

        if (typeof blob === 'undefined') {
            blob = new Blob([buffer], { type: type });
        }

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);
        } else {
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);

            if (filename) {
                // use HTML5 a[download] attribute to specify filename
                var a = document.createElement("a");
                // safari doesn't support this yet
                if (typeof a.download === 'undefined') {
                    window.location = downloadUrl;
                } else {
                    a.href = downloadUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                }
            } else {
                window.open(downloadUrl, '_blank');
            }

            setTimeout(function() { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
        }
    }

    /**
     * Bind plugins to given element.
     *
     * @param {*} selector
     */
    _bindPlugins(selector)
    {
        this._log('_bindPlugins', selector);

        this.rx.bindPlugins(selector);
    }

    /**
     * Bind plugins to given element.
     *
     * @param {*} selector
     */
    _log(method, message)
    {
        message
            ? console.debug(`%c [Response]`, 'color: #bada55;', method, message)
            : console.debug(`%c [Response]`, 'color: #bada55;', method);

        return this;
    }
}

export { Response };