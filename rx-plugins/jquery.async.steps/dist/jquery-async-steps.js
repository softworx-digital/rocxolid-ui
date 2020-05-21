/**
 * AsyncSteps v1.0.0
 * based on https://github.com/oguzhanoya/jquery-steps
 *
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as anonymous module.
      define(['jquery'], factory);
    } else if (typeof exports === 'object') {
      // Node/CommonJS.
      module.exports = factory(require('jquery'));
    } else {
      // Browser globals.
      factory(jQuery);
    }
}(function ($$1) {
    'use strict';

    $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    var DEFAULTS = {
        startAt: 0,
        showBackButton: true,
        showFooterButtons: true,
        onInit: $.noop,
        onDestroy: $.noop,
        onFinish: $.noop,
        onChange:  () => true,
        onValidateForward: () => true,
        onValidateBackward: () => true,
        stepSelector: '.step-steps > li:not(.disabled)',
        contentSelector: '.step-content > .step-tab-panel:not(.disabled)',
        footerSelector: '.step-footer',
        buttonSelector: 'button',
        activeClass: 'active',
        doneClass: 'done',
        errorClass: 'error'
    };

    var AsyncSteps =
        /*#__PURE__*/
        (function() {
            function AsyncSteps(element, options) {
                _classCallCheck(this, AsyncSteps);
                // Extend defaults with the init options.
                this.options = $$1.extend({}, DEFAULTS, options); // Store main DOM element.

                this.el = $$1(element); // Initialize

                this.init();
            }

            _createClass(AsyncSteps, [{
                    key: '_$steps',
                    value: null
                },
                {
                    key: '_$prevBtn',
                    value: null
                },
                {
                    key: '_$nextBtn',
                    value: null
                },
                {
                    key: '_$finishBtn',
                    value: null
                },
                {
                    key: 'init',
                    value: function init() {
                        var self = this;

                        this.hook('onInit');

                        this.loadSteps();
                        // this.bindSteps();

                        this.setShowStep(this.options.startAt, '', this.options.activeClass);
                        this.loadFooterBtns();
                        this.setFooterBtns(); // show footer buttons

                        if (!this.options.showFooterButtons) {
                            this.hideFooterBtns();
                            this.setFooterBtns = $$1.noop;
                        }
                    }
                },
                {
                    key: 'hook',
                    value: function hook(hookName) {
                        if (this.options[hookName] !== undefined) {
                            this.options[hookName].call(this.el);
                        }
                    }
                },
                {
                    key: 'reload',
                    value: function reload() {
                        this._$steps = null;
                        this.loadSteps();
                    }
                },
                {
                    key: 'loadSteps',
                    value: function loadSteps() {
                        var self = this;
                        this._$steps = $$1(this.el).find(this.options.stepSelector);
                        this._$steps
                            .width(((window.screen.width > 992) ? (100 / this._$steps.length) : 100) + '%')
                            .each(function() {
                                $$1('.nmbr', this).html($$1(this).index(self.options.stepSelector) + 1);
                            });

                        this.bindSteps();
                    }
                },
                {
                    key: 'bindSteps',
                    value: function bindSteps() {
                        var self = this;
                        this._$steps
                            .off('click')
                            .on('click', function(e) { // button click event
                                e.preventDefault();
                                var nextStep = $$1(this).index(self.options.stepSelector);
                                var stepIndex = self.getStepIndex();
                                self.setActiveStep(stepIndex, nextStep);
                            })
                    }
                },
                {
                    key: 'destroy',
                    value: function destroy() {
                        this.el.empty();
                        this.el.removeData('plugin_AsyncSteps');
                        this.hook('onDestroy');
                    }
                },
                {
                    key: 'getStepIndex',
                    value: function getStepIndex() {
                        var self = this;
                        const stepIndex = this._$steps.filter('.'.concat(this.options.activeClass)).index(self.options.stepSelector);

                        return stepIndex || 0;
                    }
                },
                {
                    key: 'getMaxStepCount',
                    value: function getMaxStepCount() {
                        return (this._$steps.length - 1);
                    }
                },
                {
                    key: 'getStepDirection',
                    value: function getStepDirection(fromStep, newIndex) {
                        var direction = 'none';

                        if (newIndex < fromStep) {
                            direction = 'backward';
                        } else if (newIndex > fromStep) {
                            direction = 'forward';
                        }

                        return direction;
                    }
                },
                {
                    key: 'setShowStep',
                    value: function setShowStep(idx, removeClass) {
                        var addClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                        this.el
                            .find(this.options.contentSelector)
                            .removeClass(this.options.activeClass);
                        var $stepNav = this._$steps.eq(idx);
                        $stepNav
                            .removeClass(removeClass)
                            .addClass(addClass);
                        var targetStep = $stepNav.find('a').attr('href');
                        $$1(targetStep).addClass(this.options.activeClass);
                    }
                },
                {
                    key: 'setShowStepNav',
                    value: function setShowStepNav(idx, removeClass) {
                        var addClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                        var $stepNav = this._$steps.eq(idx);
                        $stepNav
                            .removeClass(removeClass)
                            .addClass(addClass);
                    }
                },
                {
                    key: 'setActiveStep',
                    value: async function setActiveStep(currentIndex, newIndex) {
                        if (newIndex !== currentIndex) {
                            if (newIndex > currentIndex) { // moving forward
                                for (var i = currentIndex; i <= newIndex; i += 1) { // iterate over all tabs to target
                                    var targetTab = (i === newIndex);

                                    this.options.onChange(i, newIndex, this.getStepDirection(i, newIndex));

                                    if (targetTab) {
                                        this.setShowStep(i, this.options.doneClass, this.options.activeClass);
                                    } else {
                                        // this.setShowStep(i, ''.concat(this.options.activeClass, ' ').concat(this.options.errorClass), this.options.doneClass);
                                        var isValidNextStep = await this.options.onValidateForward(i, newIndex);

                                        if (!isValidNextStep) {
                                            this.setShowStep(i, this.options.doneClass, ''.concat(this.options.activeClass, ' ').concat(this.options.errorClass));
                                            this.setFooterBtns();
                                            break;
                                        }

                                        this.setShowStep(i, ''.concat(this.options.activeClass, ' ').concat(this.options.errorClass), this.options.doneClass);
                                    }
                                }
                            } else { // moving backward
                                for (var i = currentIndex; i >= newIndex; i -= 1) { // iterate over all tabs to target
                                    var targetTab = (i === newIndex);

                                    this.options.onChange(i, newIndex, this.getStepDirection(i, newIndex));

                                    if (targetTab) {
                                        this.setShowStep(i, this.options.doneClass, this.options.activeClass);
                                    } else {
                                        // this.setShowStep(i, ''.concat(this.options.activeClass, ' ').concat(this.options.errorClass), this.options.doneClass);
                                        var isValidPrevStep = await this.options.onValidateBackward(i, newIndex);

                                        if (!isValidPrevStep) {
                                            this.setShowStep(i, ''.concat(this.options.doneClass, ' ').concat(this.options.activeClass), this.options.errorClass);
                                            this.setFooterBtns();
                                            break;
                                        }

                                        this.setShowStepNav(i, ''.concat(this.options.activeClass, ' ').concat(this.options.errorClass, ' ').concat(this.options.doneClass));
                                    }
                                }
                            }

                            this.setFooterBtns();
                        }
                    }
                },
                {
                    key: 'setFinishStep',
                    value: async function setFinishStep(currentIndex) {
                        var isValidNextStep = await this.options.onValidateForward(currentIndex);

                        if (isValidNextStep) {
                            this.el.find('form').trigger('submit');
                        }
                    }
                },
                {
                    key: 'loadFooterBtns',
                    value: function loadFooterBtns() {
                        var self = this;
                        var $footer = this.el.find(
                            this.options.footerSelector
                        );

                        this._$prevBtn = $footer.find('[data-direction="prev"]');
                        this._$nextBtn = $footer.find('[data-direction="next"]');
                        this._$finishBtn = $footer.find('[data-direction="finish"]');

                        $footer.on('click', '[data-direction="prev"], [data-direction="next"]', function(e) {
                            e.preventDefault();
                            var statusAction = $$1(this).data(
                                'direction'
                            );
                            self.setAction(statusAction);
                        });

                        $footer.on('click', '[data-direction="finish"]', function(e) {
                            e.preventDefault();
                            var statusAction = $$1(this).data(
                                'direction'
                            );

                            self.setAction(statusAction);
                        });
                    }
                },
                {
                    key: 'resetFooterBtns',
                    value: function resetFooterBtns() {
                        var $footer = this.el.find(
                            this.options.footerSelector
                        );

                        $footer.find('button[data-direction]').remove();
                        $footer.find('.btn-group')
                            .append(this._$prevBtn)
                            .append(this._$nextBtn)
                            .append(this._$finishBtn);
                    }
                },
                {
                    key: 'setFooterBtns',
                    value: function setFooterBtns() {
                        var stepIndex = this.getStepIndex();
                        var maxIndex = this.getMaxStepCount();

                        this.resetFooterBtns();

                        if (stepIndex === 0) {
                            this._$prevBtn.remove();

                            if (maxIndex !== stepIndex) {
                                this._$finishBtn.remove();
                            }
                        } else if (stepIndex === maxIndex) {
                            this._$nextBtn.remove();
                        } else {
                            if (!this.options.showBackButton) {
                                this._$prevBtn.remove();
                            }

                            this._$finishBtn.remove();
                        }
                    }
                },
                {
                    key: 'setAction',
                    value: function setAction(action) {
                        var self = this;
                        var fromStep = this.getStepIndex();
                        var $stepNav = this._$steps.eq(fromStep);

                        if (action === 'prev') {
                            var nextStep = $stepNav.prevAll(':not(.disabled)').first().index(self.options.stepSelector) || 0;
                        }

                        if (action === 'next') {
                            var nextStep = $stepNav.nextAll(':not(.disabled)').first().index(self.options.stepSelector) || fromStep;
                        }

                        /*
                        if (action === 'finish') {
                            var validStep = this.options.onChange(fromStep, nextStep, 'forward');

                            if (validStep) {
                                this.hook('onFinish');
                            } else {
                                this.setShowStep(fromStep, '', 'error');
                            }
                        }
                        */

                        if (action === 'finish') {
                            this.setFinishStep(fromStep);
                        } else {
                            this.setActiveStep(fromStep, nextStep);
                        }
                    }
                },
                {
                    key: 'next',
                    value: function next() {
                        var fromStep = this.getStepIndex();
                        var maxIndex = this.getMaxStepCount();

                        return maxIndex === fromStep
                            ? this.setAction('finish')
                            : this.setAction('next');
                    }
                },
                {
                    key: 'prev',
                    value: function prev() {
                        var fromStep = this.getStepIndex();

                        return fromStep !== 0 && this.setAction('prev');
                    }
                },
                {
                    key: 'finish',
                    value: function finish() {
                        this.hook('onFinish');
                    }
                },
                {
                    key: 'hideFooterBtns',
                    value: function hideFooterBtns() {
                        this.el.find(this.options.footerSelector).hide();
                    }
                }
            ],
            [
                {
                    key: 'setDefaults',
                    value: function setDefaults(options) {
                        $$1.extend(
                            DEFAULTS,
                            $$1.isPlainObject(options) && options
                        );
                    }
                }
            ]
        );

        return AsyncSteps;
    })();

    var other = $$1.fn.asyncSteps;

    $$1.fn.asyncSteps = function(options) {
        return this.each(function() {
            if (!$$1.data(this, 'plugin_AsyncSteps')) {
                $$1.data(this, 'plugin_AsyncSteps', new AsyncSteps(this, options));
            }
        });
    };

    $$1.fn.asyncSteps.version = '1.0.1';
    $$1.fn.asyncSteps.setDefaults = AsyncSteps.setDefaults; // No conflict

    $$1.fn.asyncSteps.noConflict = function() {
        $$1.fn.asyncSteps = other;
        return this;
    };
}));
