import moment from 'moment';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class MomentJS extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;
    }
}

MomentJS.packageName = 'moment';

MomentJS.check = () => (typeof moment !== 'undefined');

export { MomentJS };