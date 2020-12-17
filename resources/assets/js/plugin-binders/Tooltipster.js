
import 'tooltipster/dist/css/tooltipster.bundle.min.css';
import 'tooltipster';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class Tooltipster extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('[title!=""][title]', container).tooltipster({
            theme: 'tooltipster-rocXolid',
            animation: 'fade',
            delay: 100,
            maxWidth: 300,
            contentAsHTML: true,
            // interactive: true,
        });
    }
}

Tooltipster.packageName = 'tooltipster';

Tooltipster.check = () => (typeof $ !== 'undefined') && (typeof $.fn.tooltipster !== 'undefined');

export { Tooltipster };