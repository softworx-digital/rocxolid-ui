import Sortable from 'sortablejs';
import { PluginBinder } from '../PluginBinder';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class SortableJS extends PluginBinder
{
    constructor(rx, settings) {
        super(rx, settings)

        settings = settings || {};

        this.sortableOptions = {
            group: settings.group || 'sortable',
            handle: settings.handle || '.drag-handle',
            animation: settings.animation || 250,
            forceFallback: settings.forceFallback || true,
            touchStartThreshold: settings.touchStartThreshold || 0,
            fallbackTolerance: settings.fallbackTolerance || 1,
            dataIdAttr: settings.dataIdAttr || 'data-item-id',
            onStart: settings.onStart || function (evt)
            {
                $('body').addClass('dragging');
            },
            onMove: settings.onMove || function (evt, originalEvent)
            {
                const $item = $(evt.dragged),
                      $related = $(evt.related),
                      $container = $(evt.from);

                $('.drag-hover').removeClass('drag-hover');
                $related.addClass('drag-hover');
                $item.removeClass('drag-hover');
            },
            onEnd: settings.onEnd || function (evt)
            {
                const serialize = function($container)
                {
                    let tree = [];

                    if (!$container.children().exists()) {
                        return [];
                    }

                    $container.children().each(function()
                    {
                        const validTypes = ['containeeType', 'containeeId', 'pageElementType', 'pageElementId', 'itemType', 'itemId'];
                        let o = {};

                        for (let i in $(this).data()) {
                            // put only valid data
                            if (validTypes.includes(i)) {
                                o[i] = $(this).data(i);
                            }
                        }

                        o['children'] = serialize($(this).children('.sortable'));

                        tree.push(o);
                    });

                    return [ tree ];
                };

                const $item = $(evt.item);
                const $from = $(evt.from);
                const $from_container = $item.closest('.sortable[data-update-url]');
                const tree = serialize($from_container);

                // @todo: bind to container
                $('body').removeClass('dragging');
                $('ul.sortable:not(:has(li))').addClass('empty');
                $('ul.sortable:has(li)').removeClass('empty');

                // $item.closest('.ajax-overlay').LoadingOverlay('show');

                $.post($from_container.data('update-url'), { _data: tree }, function(data)
                {
                    // $item.closest('.ajax-overlay').LoadingOverlay('hide');

                    rx.getResponse().set(data).handle();
                });
            }
        }
    }

    bind(container)
    {
        var rx = this.rx;
        var pb = this;

        $('.sortable', container).each(function(index)
        {
            Sortable.create(this, pb.sortableOptions);
        });
    }
}

SortableJS.packageName = 'sortablejs';

SortableJS.check = () => (typeof Sortable !== 'undefined');

export { SortableJS };