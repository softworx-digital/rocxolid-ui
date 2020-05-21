// @todo: temporary - will be replaced by SortableJS
import 'keditor/dependencies/jquery-ui-1.12.1.custom/jquery-ui';
import 'keditor/dist/css/keditor.css';
import 'keditor/dist/css/keditor-components.css';
import { KEditor } from 'keditor'; // from rx-plugins
import 'keditor/dist/js/keditor-components';
import { PluginBinder } from '../core/PluginBinder';
import { Utility } from '../core/Utility';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
// @todo: unfinished
class KEditorBinder extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        KEditor.rx = rx;

        // Utility.loadScript(`${window.KEDITOR_COMPONENTS}/js/keditor-components.js`);
    }
}

KEditorBinder.packageName = 'keditor';

KEditorBinder.check = () => (typeof $ !== 'undefined') && (typeof $.fn.keditor !== 'undefined');

export { KEditorBinder };