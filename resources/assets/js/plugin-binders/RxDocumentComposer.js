import 'keditor/dependencies/jquery-ui-1.12.1.custom/jquery-ui';
// import { Keditor, KeditorComponents } from 'rx-document-composer';
// import 'rx-document-composer/dist/js/keditor';
// import 'rx-document-composer/dist/js/keditor-components';
// require('rx-document-composer/dist/js/keditor-components');
// import 'keditor';
// import { KEditor, KEditorComponents } from 'keditor';
// import 'keditor';
// import 'keditor/dist/js/keditor-components';
import { PluginBinder } from '../PluginBinder';

// @todo: temporarily leaving as is, since every attempt to use it in bundled fashion failed
// used currently as inline javascript in show.blades of page elementables

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class RxDocumentComposer extends PluginBinder
{
    bind(container)
    {
        var rx = this.rx;

        $('.content-composition', container).each(function(index)
        {
            let $element = $(this);

            $element.keditor({
                rx: rx,
                title: '',
                contentStyles: [
                    {
                        id: 'keditor',
                        href: '/vendor/softworx/rocXolid/plugins/document-composer/css/keditor.css'
                    },
                    {
                        id: 'keditor-components',
                        href: '/vendor/softworx/rocXolid/plugins/document-composer/css/keditor-components.css'
                    },
                    {
                        id: 'bootstrap',
                        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                    },
                    {
                        id: 'font-awesome',
                        href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
                    },
                    {
                        id: 'summernote',
                        href: "https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.css"
                    }
                ],
                snippetsUrl: $element.data('snippets-url'),
                extraTopbarItems: {
                    pdf: {
                        html: '<a href="javascript:void(0);" title="PDF Preview" class="keditor-ui keditor-topbar-btn"><i class="fa fa-fw fa-file-pdf-o"></i></a>',
                        click: function() {
                            window.rxUtility().ajaxCall({
                                rx: rx,
                                element: $element,
                                type: 'post',
                                url: $element.data('preview-pdf-url'),
                                data: {
                                    content: $element.keditor('getContent')
                                }
                            });
                        }
                    }
                }
            });
        });
    }
}

RxDocumentComposer.packageName = 'rx-document-composer';

RxDocumentComposer.check = () => (typeof $ !== 'undefined') && (typeof $.fn.keditor !== 'undefined');

export { RxDocumentComposer };