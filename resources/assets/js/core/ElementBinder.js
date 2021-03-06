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
        // simulate element click when page bookmark present
        if (window.location.hash) {
            $('[href="' + window.location.hash + '"]').trigger('click');
        }

        // reload the page when clicking back / forward
        const [entry] = performance.getEntriesByType('navigation');

        // console.table(entry.toJSON());

        switch (entry.type) {
            case 'back_forward':
                location.reload();
                break;
        }

        return this;
    }

    sidebar()
    {
        var rx = this.rx;

        $(document).on('click', '#menu-toggle', function(e)
        {
            $('.left_col.menu_fixed').toggle();
        });

        $('#sidebar-menu').on('show.bs.collapse', '.collapse', function() {
            $('#sidebar-menu').find('.collapse.in').collapse('hide');
        });

        if (rx.hasPlugin('scroll')) {
            rx.getPlugin('scroll').bindElement('#sidebar-menu');
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
