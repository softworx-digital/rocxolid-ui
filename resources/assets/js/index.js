window.$ = window.jQuery = require('jquery');

require('bootstrap');
// in rocXolid.scss
// require('bootstrap/dist/css/bootstrap.css');
// require('font-awesome/css/font-awesome.min.css');
// require('animate.css/animate.min.css');

import binders from './config/plugins';
import { Utility } from './core/Utility';
import { RocXolid } from './core/RocXolid';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
$(document).ready(function($)
{
    /**
     * Global Ajax calls setup.
     *
     * @returns void
     */
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    Utility.extendJQuery();

    const rx = (new RocXolid()).init(binders);

    window.rx = () => rx;
    window.rxUtility = () => Utility;
});