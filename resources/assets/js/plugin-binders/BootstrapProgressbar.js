import 'bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import 'bootstrap-progressbar/bootstrap-progressbar';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class BootstrapProgressbar extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.progress .progress-bar', container).progressbar();
    }
}

BootstrapProgressbar.packageName = 'bootstrap-progressbar';

BootstrapProgressbar.check = () => (typeof $ !== 'undefined') && (typeof $.fn.progressbar !== 'undefined');

export { BootstrapProgressbar };