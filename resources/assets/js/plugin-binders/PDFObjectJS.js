// import 'pdfobject/pdfobject';
let PDFObject = require('pdfobject/pdfobject');
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class PDFObjectJS extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};
    }

    bind(container)
    {
        var pb = this;

        $('.pdfobject', container).each(function() {
            PDFObject.embed($(this).attr('data-pdf-url'), $(this));
        });
    }
}

PDFObjectJS.packageName = 'pdfobject';

PDFObjectJS.check = () => (typeof PDFObject !== 'undefined');

export { PDFObjectJS };