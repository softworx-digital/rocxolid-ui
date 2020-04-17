import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 */
class Autosubmit extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('form.autosubmit', container).each(function(index) {
            $(this).autosubmit();
        });
    }
}

Autosubmit.packageName = 'autosubmit';

Autosubmit.check = () => (typeof $ !== 'undefined') && (typeof $.fn.autosubmit !== 'undefined');

export { Autosubmit };