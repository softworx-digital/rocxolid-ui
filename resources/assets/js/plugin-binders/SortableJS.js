import Sortable from 'sortablejs';
import { PluginBinder } from '../core/PluginBinder';
import { Utility } from '../core/Utility';

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

        this.sortableOptions = (container) => ({
            group: settings.group || $(container).attr('data-sortable-group') || 'sortable',
            handle: settings.handle || '.drag-handle',
            animation: settings.animation || 250,
            // forceFallback: settings.forceFallback || true, // commented out, causes troubles with fallback positioning
            touchStartThreshold: settings.touchStartThreshold || 0,
            // fallbackTolerance: settings.fallbackTolerance || 1, // commented out, causes troubles with fallback positioning
            dataIdAttr: settings.dataIdAttr || 'data-item-id',
            onStart: settings.onStart || function(e)
            {
                $('body').addClass('dragging');
            },
            onMove: settings.onMove || function(e, originalEvent)
            {
                const $item = $(e.dragged),
                      $related = $(e.related),
                      $container = $(e.from);

                $('.drag-hover').removeClass('drag-hover');
                $related.addClass('drag-hover');
                $item.removeClass('drag-hover');
            },
            onEnd: settings.onEnd || function(e)
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

                const $item = $(e.item);
                const $from = $(e.from);
                const $from_container = $item.closest('.sortable');

                if ($from_container.is('[data-reindex-item]')) {
                    Utility.resetArrayFieldsNameParameters($from_container, $from_container.attr('data-reindex-item'));
                }

                if ($from_container.is('[data-update-url]')) {
                    $('ul.sortable:not(:has(li))').addClass('empty');
                    $('ul.sortable:has(li)').removeClass('empty');

                    // $item.closest('.ajax-overlay').LoadingOverlay('show');
                    // @todo: Utility.ajaxCall
                    $.post($from_container.data('update-url'), { _data: serialize($from_container) }, function(data)
                    {
                        // $item.closest('.ajax-overlay').LoadingOverlay('hide');

                        rx.getResponse().set(data).handle();
                    });
                }

                // @todo: bind to container
                $('body').removeClass('dragging');
            }
        })
    }

    bind(container)
    {
        var rx = this.rx;
        var pb = this;

        $('.sortable', container).each(function(index)
        {
            Sortable.create(this, pb.sortableOptions(this));
        });
    }
}

SortableJS.packageName = 'sortablejs';

SortableJS.check = () => (typeof Sortable !== 'undefined');

export { SortableJS };