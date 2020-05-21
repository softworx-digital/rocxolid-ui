/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
require('bootstrap');

import './config/globals';
import binders from './config/plugins';
import { Utility } from './core/Utility';
import { RocXolid } from './core/RocXolid';

// global Ajax calls setup
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

Utility.extendJQuery();

const rx = (new RocXolid()).init(binders);

// @todo: nicer
window.rx = () => rx;
window.rxUtility = () => Utility;