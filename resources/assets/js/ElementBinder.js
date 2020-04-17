/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class ElementBinder {
    constructor(rx)
    {
        this.rx = rx;
    }

    bind(container)
    {
        this.window()
            .sidebar()
            .forms();
            // .positions();

        return this;
    }

    window()
    {
        if (window.location.hash) {
            $('[href="' + window.location.hash + '"]').trigger('click');
        }

        return this;
    }

    sidebar()
    {
        $(document).on('click', '#menu-toggle', function(e)
        {
            // @todo: hotfixed
            $('.left_col.menu_fixed').toggle();
        });

        $('#sidebar-menu').height($('.left_col').height() - ($('.left_col .fixed-scroll').height() + $('.left_col .sidebar-footer').height()));

        // @todo: use bootstrap collapse
        $('#sidebar-menu ul.side-menu')
            .find('a')
            .on('click', function(e)
            {
                var $li = $(this).parent();

                if ($li.is('.active')) {
                    $li.removeClass('active active-sm');
                    $('ul:first', $li).slideUp(function()
                    {
                        //setContentHeight();
                    });
                } else {
                    if (!$li.parent().is('.child_menu')) {
                        $('#sidebar-menu ul.side-menu')
                            .find('li')
                            .removeClass('active active-sm');
                        $('#sidebar-menu ul.side-menu')
                            .find('li ul')
                            .slideUp();
                    }

                    $li.addClass('active');

                    $('ul:first', $li).slideDown(function()
                    {
                        //setContentHeight();
                    });
                }
            });

        if (this.rx.hasPlugin('scroll')) {
            this.rx.getPlugin('scroll').bindElement('#sidebar-menu');
        }

        return this;
    }

    forms()
    {
        if ($('form').exists()) {
            $('form')
                .eq(0)
                .focusFirst();
        }

        return this;
    }

    positions()
    {
        $('.keep-scroll-position').each(function()
        {
            $(this).keepElementInContainer($(this).attr('data-scroll-container'));
        });
    }
}

export { ElementBinder };
