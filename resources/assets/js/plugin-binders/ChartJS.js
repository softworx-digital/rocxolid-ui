import Chart from 'chart.js';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
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