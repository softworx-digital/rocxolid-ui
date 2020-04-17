import History from 'history.js/package.json';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class HistoryJS extends PluginBinder
{
    bind(selector)
    {
        var rx = this.rx;
    }
}

HistoryJS.packageName = 'history.js';

HistoryJS.check = () => (typeof History !== 'undefined');

export { HistoryJS };