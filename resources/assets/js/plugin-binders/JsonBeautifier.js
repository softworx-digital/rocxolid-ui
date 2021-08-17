import { PluginBinder } from '../core/PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class JsonBeautifier extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('pre.json').each(function() {
            var obj = JSON.parse($(this).text());
            $(this).text(JSON.stringify(obj, undefined, 2));
        });
    }
}

JsonBeautifier.packageName = 'json-beautifier';

JsonBeautifier.check = () => true;

export { JsonBeautifier };