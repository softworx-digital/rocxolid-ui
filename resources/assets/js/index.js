/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
require('bootstrap');

// https://www.chromestatus.com/feature/5745543795965952
(function () {
    if (typeof EventTarget !== 'undefined') {
        let func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
            this.func = func;
            if (typeof capture === 'boolean') {
                capture = {
                    ...capture,
                    ...{ passive: capture }
                };
            }
            this.func(type, fn, capture);
        };
    };
}());

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