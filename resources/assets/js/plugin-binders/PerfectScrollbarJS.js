import PerfectScrollbar from 'perfect-scrollbar';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class PerfectScrollbarJS extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.scrollable', container).each(function(index) {
            const ps = new PerfectScrollbar($(this).get(0));

            $(this).on('shown.bs.collapse hidden.bs.collapse', '.collapse', function(e) {
                ps.update();
            });
        });
    }
}

PerfectScrollbarJS.packageName = 'perfect-scrollbar';

PerfectScrollbarJS.check = () => (typeof PerfectScrollbar !== 'undefined');

export { PerfectScrollbarJS };