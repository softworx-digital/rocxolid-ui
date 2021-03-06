import Chart from 'chart.js';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class ChartJS extends PluginBinder
{
    bind(selector)
    {
        var rx = this.rx;
    }
}

ChartJS.packageName = 'chart.js';

ChartJS.check = () => (typeof Chart !== 'undefined');

export { ChartJS };