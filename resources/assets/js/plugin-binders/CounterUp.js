import { animaCounter } from 'anima-counters';
import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class CounterUp extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.counter-up', container).each(function (index)
        {
            const $elm = $(this);

            new animaCounter($elm[0], {});
        });
    }
}

CounterUp.packageName = 'counter-up';

CounterUp.check = () => (typeof animaCounter !== 'undefined');

export { CounterUp };