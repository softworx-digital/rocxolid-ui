/*! RocXolid Document Composer v1.0.0 | Copyright (c) 2016-present Kademi (http://kademi.co) & 2020 softworx (hello@softworx.digital) */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("jquery"));else if("function"==typeof define&&define.amd)define(["jquery"],e);else{var n="object"==typeof exports?e(require("jquery")):e(t.jquery);for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}("undefined"!=typeof self?self:this,(function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}([function(e,n){e.exports=t},,function(t,e){KEditor.components.audio={settingEnabled:!0,settingTitle:"Audio Settings",init:function(t,e,n,o){var i=n.find(".keditor-component-content");0===i.find(".audio-wrapper").length&&i.wrapInner('<div class="audio-wrapper"></div>')},initSettingForm:function(t,e,n){n.append('<form class="form-horizontal">     <div class="form-group">         <label class="col-sm-12">Audio file</label>         <div class="col-sm-12">             <div class="audio-toolbar">                 <a href="#" class="btn-audio-upload btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>                 <input class="audio-upload" type="file" style="display: none" />             </div>         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Autoplay</label>         <div class="col-sm-12">             <input type="checkbox" class="audio-autoplay" />         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Show Controls</label>         <div class="col-sm-12">             <input type="checkbox" class="audio-controls" checked />         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Width (%)</label>         <div class="col-sm-12">             <input type="number" min="20" max="100" class="form-control audio-width" value="100" />         </div>     </div></form>');var o=n.find(".audio-upload");n.find(".btn-audio-upload").off("click").on("click",(function(t){t.preventDefault(),o.trigger("click")})),o.off("change").on("change",(function(){var t=this.files[0];/audio/.test(t.type)?e.find("audio").attr("src",URL.createObjectURL(t)):alert("Your selected file is not an audio file!")})),n.find(".audio-autoplay").on("click",(function(){e.find("audio").prop("autoplay",this.checked)})),n.find(".audio-controls").on("click",(function(){e.find("audio").prop("controls",this.checked)})),n.find(".audio-width").on("change",(function(){var t=e.find("audio");t.parent().attr("data-width",this.value),t.css("width",this.value+"%")}))},showSettingForm:function(t,e,n){var o=e.find("audio"),i=o.parent(),a=t.find(".audio-autoplay"),l=t.find(".audio-controls"),s=t.find(".audio-width");a.prop("checked",!!o.attr("autoplay")),l.prop("checked",!!o.attr("controls")),s.val(i.attr("data-width")||100)}}},function(t,e,n){},function(t,e,n){},function(t,e){function n(t,e,n){t.self===t?t.scrollTo(e,n):(t.scrollLeft=e,t.scrollTop=n)}function o(t){var e=t._scrollSettings;if(e){var i=e.maxSynchronousAlignments,a=function(t,e){var n,o,i,a,l,s,r,d=t.align,c=t.target.getBoundingClientRect(),f=d&&null!=d.left?d.left:.5,u=d&&null!=d.top?d.top:.5,p=d&&null!=d.leftOffset?d.leftOffset:0,m=d&&null!=d.topOffset?d.topOffset:0,v=f,h=u;if(t.isWindow(e))s=Math.min(c.width,e.innerWidth),r=Math.min(c.height,e.innerHeight),o=c.left+e.pageXOffset-e.innerWidth*v+s*v,i=c.top+e.pageYOffset-e.innerHeight*h+r*h,i-=m,a=(o-=p)-e.pageXOffset,l=i-e.pageYOffset;else{s=c.width,r=c.height,n=e.getBoundingClientRect();var b=c.left-(n.left-e.scrollLeft),g=c.top-(n.top-e.scrollTop);o=b+s*v-e.clientWidth*v,i=g+r*h-e.clientHeight*h,o-=p,i-=m,o=Math.max(Math.min(o,e.scrollWidth-e.clientWidth),0),i=Math.max(Math.min(i,e.scrollHeight-e.clientHeight),0),a=o-e.scrollLeft,l=i-e.scrollTop}return{x:o,y:i,differenceX:a,differenceY:l}}(e,t),l=Date.now()-e.startTime,s=Math.min(1/e.time*l,1);if(e.endIterations>=i)return n(t,a.x,a.y),t._scrollSettings=null,e.end("complete");var r=1-e.ease(s);if(n(t,a.x-a.differenceX*r,a.y-a.differenceY*r),l>=e.time)return e.endIterations++,o(t);!function(t){if("requestAnimationFrame"in window)return window.requestAnimationFrame(t);setTimeout(t,16)}(o.bind(null,t))}}function i(t){return t.self===t}function a(t,e,n,a){var l,s=!e._scrollSettings,r=e._scrollSettings,d=Date.now(),c={passive:!0};function f(t){e._scrollSettings=null,e.parentElement&&e.parentElement._scrollSettings&&e.parentElement._scrollSettings.end(t),n.debug&&console.log("Scrolling ended with type",t,"for",e),a(t),l&&(e.removeEventListener("touchstart",l,c),e.removeEventListener("wheel",l,c))}r&&r.end("canceled");var u=n.maxSynchronousAlignments;return null==u&&(u=3),e._scrollSettings={startTime:d,endIterations:0,target:t,time:n.time,ease:n.ease,align:n.align,isWindow:n.isWindow||i,maxSynchronousAlignments:u,end:f},"cancellable"in n&&!n.cancellable||(l=f.bind(null,"canceled"),e.addEventListener("touchstart",l,c),e.addEventListener("wheel",l,c)),s&&o(e),l}function l(t){return"pageXOffset"in t||(t.scrollHeight!==t.clientHeight||t.scrollWidth!==t.clientWidth)&&"hidden"!==getComputedStyle(t).overflow}function s(){return!0}function r(t){if(t.assignedSlot)return r(t.assignedSlot);if(t.parentElement)return"BODY"===t.parentElement.tagName?t.parentElement.ownerDocument.defaultView||t.parentElement.ownerDocument.ownerWindow:t.parentElement;if(t.getRootNode){var e=t.getRootNode();if(11===e.nodeType)return e.host}}t.exports=function(t,e,n){if(t){"function"==typeof e&&(n=e,e=null),e||(e={}),e.time=isNaN(e.time)?1e3:e.time,e.ease=e.ease||function(t){return 1-Math.pow(1-t,t/2)};var o,i=r(t),d=1,c=e.validTarget||s,f=e.isScrollable;for(e.debug&&(console.log("About to scroll to",t),i||console.error("Target did not have a parent, is it mounted in the DOM?"));i;)if(e.debug&&console.log("Scrolling parent node",i),c(i,d)&&(f?f(i,l):l(i))&&(d++,o=a(t,i,e,u)),!(i=r(i))){u("complete");break}return o}function u(t){--d||n&&n(t)}}},function(t,e){KEditor.components.video={init:function(t,e,n,o){var i=n.children(".keditor-component-content").find("video");i.parent().is(".video-wrapper")||i.wrap('<div class="video-wrapper"></div>')},getContent:function(t,e,n){var o=t.children(".keditor-component-content");return o.find("video").unwrap(),o.html()},settingEnabled:!0,settingTitle:"Video Settings",initSettingForm:function(t,e,n){n.append('\n            <form class="form-horizontal">\n                <div class="form-group">\n                    <label for="video-input" class="col-sm-12">Video file</label>\n                    <div class="col-sm-12">\n                        <div class="video-toolbar">\n                            <a href="#" class="btn-video-input btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>\n                            <input class="video-input" type="file" style="display: none" />\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-autoplay" class="col-sm-12">Autoplay</label>\n                    <div class="col-sm-12">\n                        <input type="checkbox" class="video-autoplay" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-loop" class="col-sm-12">Loop</label>\n                    <div class="col-sm-12">\n                        <input type="checkbox" class="video-loop" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-controls" class="col-sm-12">Show Controls</label>\n                    <div class="col-sm-12">\n                        <input type="checkbox" class="video-controls" checked />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="" class="col-sm-12">Ratio</label>\n                    <div class="col-sm-12">\n                        <input type="radio" name="video-radio" class="video-ratio" value="4/3" checked /> 4:3\n                    </div>\n                    <div class="col-sm-12">\n                        <input type="radio" name="video-radio" class="video-ratio" value="16/9" /> 16:9\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-width" class="col-sm-12">Width (px)</label>\n                    <div class="col-sm-12">\n                        <input type="number" class="video-width form-control" min="320" max="1920" value="320" />\n                    </div>\n                </div>\n            </form>\n        ');var o=n.find(".video-input");n.find(".btn-video-input").on("click",(function(t){t.preventDefault(),o.trigger("click")})),o.on("change",(function(){var t=this.files[0],n=e.find("video");/video/.test(t.type)?n.attr("src",URL.createObjectURL(t)):alert("Your selected file is not an video file!")})),n.find(".video-autoplay").on("click",(function(){e.find("video").prop("autoplay",this.checked)})),n.find(".video-loop").on("click",(function(){e.find("video").prop("loop",this.checked)})),n.find(".video-ratio").on("click",(function(){e.find("video").attr("data-ratio",this.value),n.find(".video-width").trigger("change")})),n.find(".video-controls").on("click",(function(){e.find("video").prop("controls",this.checked)})),n.find(".video-width").on("change",(function(){var t=e.find("video"),n="16/9"===t.attr("data-ratio")?16/9:4/3,o=this.value/n;t.attr("width",this.value),t.attr("height",o)}))},showSettingForm:function(t,e,n){var o=e.find("video");t.find(".video-autoplay").prop("checked",o.prop("autoplay")),t.find(".video-loop").prop("checked",o.prop("loop")),t.find(".video-ratio").prop("checked",!1).filter('[value="'+o.attr("data-ratio")+'"]').prop("checked",!0),t.find(".video-controls").prop("checked",o.prop("controls")),t.find(".video-width").val(o.attr("width"))}}},function(t,e){KEditor.components.vimeo={init:function(t,e,n,o){var i=n.find("iframe"),a=i.parent();o.initIframeCover(i,a)},settingEnabled:!0,settingTitle:"Vimeo Settings",initSettingForm:function(t,e,n){n.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary btn-vimeo-edit">Change Video</button>       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Autoplay</label>       <div class="col-sm-12">           <input type="checkbox" id="vimeo-autoplay" />       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-default btn-vimeo-169">16:9</button>           <button type="button" class="btn btn-sm btn-default btn-vimeo-43">4:3</button>       </div>   </div></form>'),n.find(".btn-vimeo-edit").on("click",(function(t){t.preventDefault();var n=prompt("Please enter Vimeo URL in here:").match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);n&&n[1]?e.find(".embed-responsive-item").attr("src","https://player.vimeo.com/video/"+n[1]+"?byline=0&portrait=0&badge=0"):alert("Your Vimeo URL is invalid!")})),n.find(".btn-vimeo-169").on("click",(function(t){t.preventDefault(),e.find(".embed-responsive").removeClass("embed-responsive-4by3").addClass("embed-responsive-16by9")})),n.find(".btn-vimeo-43").on("click",(function(t){t.preventDefault(),e.find(".embed-responsive").removeClass("embed-responsive-16by9").addClass("embed-responsive-4by3")}));var o=n.find("#vimeo-autoplay");o.on("click",(function(){var t=e.find(".embed-responsive-item"),n=t.attr("src").replace(/(\?.+)+/,"")+"?byline=0&portrait=0&badge=0&autoplay="+(o.is(":checked")?1:0);t.attr("src",n)}))},showSettingForm:function(t,e,n){var o=e.find(".embed-responsive-item"),i=t.find("#vimeo-autoplay"),a=o.attr("src");i.prop("checked",-1!==a.indexOf("autoplay=1"))}}},function(t,e){KEditor.components.youtube={init:function(t,e,n,o){var i=n.find("iframe"),a=i.parent();o.initIframeCover(i,a)},settingEnabled:!0,settingTitle:"Youtube Settings",initSettingForm:function(t,e,n){n.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary btn-youtube-edit">Change Video</button>       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Autoplay</label>       <div class="col-sm-12">           <input type="checkbox" id="youtube-autoplay" />       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-default btn-youtube-169">16:9</button>           <button type="button" class="btn btn-sm btn-default btn-youtube-43">4:3</button>       </div>   </div></form>'),n.find(".btn-youtube-edit").on("click",(function(t){t.preventDefault();var n=prompt("Please enter Youtube URL in here:").match(/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/);n&&n[1]?e.find(".embed-responsive-item").attr("src","https://www.youtube.com/embed/"+n[1]):alert("Your Youtube URL is invalid!")})),n.find(".btn-youtube-169").on("click",(function(t){t.preventDefault(),e.find(".embed-responsive").removeClass("embed-responsive-4by3").addClass("embed-responsive-16by9")})),n.find(".btn-youtube-43").on("click",(function(t){t.preventDefault(),e.find(".embed-responsive").removeClass("embed-responsive-16by9").addClass("embed-responsive-4by3")}));var o=n.find("#youtube-autoplay");o.on("click",(function(){var t=e.find(".embed-responsive-item"),n=t.attr("src").replace(/(\?.+)+/,"")+"?autoplay="+(o.is(":checked")?1:0);t.attr("src",n)}))},showSettingForm:function(t,e,n){var o=e.find(".embed-responsive-item"),i=t.find("#youtube-autoplay"),a=o.attr("src");i.prop("checked",-1!==a.indexOf("autoplay=1"))}}},,function(t,n,o){"use strict";o.r(n);o(2),o(3);var i,a,l=o(0),s=o.n(l);KEditor.components.form={emptyContent:'<p class="text-muted lead text-center"><br />[No form content]<br /><br /></p>',renderForm:function(t){var e=t.find(".form-content"),n=s()("<div />");n.formRender({dataType:"json",formData:a.actions.getData("json")}),e.html(n.html()),e.hasClass("form-horizontal")&&e.children("div").each((function(){var t=s()(this),n=e.attr("data-grid")||"4-8";if(n=n.split("-"),t.attr("class"))if(t.hasClass("fb-button"))t.find("button").wrap('<div class="col-sm-'.concat(n[1]," col-sm-offset-").concat(n[0],'"></div>'));else{var o=t.children("label"),i=t.children("input, select, textarea"),a=t.children("div");o.addClass("control-label col-sm-".concat(n[0])),a.length>0?a.addClass("col-sm-".concat(n[1])):i.addClass("form-control").wrap('<div class="col-sm-'.concat(n[1],'"></div>'))}}))},initModal:function(t){var e=this;(i=t.initModal("keditor-modal-form")).find(".keditor-modal-title").html("Design form"),i.css({visibility:"hidden",display:"block",opacity:1}),i.find(".keditor-modal-body").append('\n            <div class="form-builder-area-wrapper">\n                <div class="form-builder-area"></div>\n            </div>\n        '),a=i.find(".form-builder-area").formBuilder({showActionButtons:!1,dataType:"json",disableFields:["autocomplete","paragraph","header"],disabledAttrs:["access"],typeUserDisabledAttrs:{"checkbox-group":["toggle","inline"]}}),i.find(".keditor-modal-footer").html('\n            <button type="button" class="keditor-ui keditor-btn keditor-btn-default keditor-modal-close">Close</button>\n            <button type="button" class="keditor-ui keditor-btn keditor-btn-primary btn-save-form">Save</button>\n        '),i.find(".btn-save-form").on("click",(function(n){n.preventDefault();var o=t.getSettingComponent();o.find(".form-data").html(a.actions.getData("json")),e.renderForm(o),t.hideModal(i)})),setTimeout((function(){i.css({visibility:"",display:"",opacity:""})}),500)},init:function(t,e,n,o){var a=n.find(".keditor-component-content"),l=n.find(".form-content");0===n.find(".form-data").length&&a.append('<div class="form-data" style="display: none !important;"></div>'),0===l.length&&a.append('<form class="form-content">'.concat(this.emptyContent,"</form>")),i||this.initModal(o)},settingEnabled:!0,settingTitle:"Form Settings",initSettingForm:function(t,e,n){var o=this;n.html('\n            <div class="form-horizontal">\n                <div class="form-group">\n                    <div class="col-sm-12">\n                       <button class="btn btn-primary btn-block btn-design-form" type="button"><i class="fa fa-paint-brush"></i> Design form</button>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Action</label>\n                    <div class="col-sm-12">\n                        <input type="text" class="form-control txt-form-action" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Method</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-method">\n                            <option value="get">Get</option>\n                            <option value="post">Post</option>\n                            <option value="put">Put</option>\n                            <option value="delete">Delete</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Enctype</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-enctype">\n                            <option value="text/plain">text/plain</option>\n                            <option value="multipart/form-data">multipart/form-data</option>\n                            <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Layout</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-layout">\n                            <option value="">Normal</option>\n                            <option value="form-horizontal">Horizontal</option>\n                            <option value="form-inline">Inline</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group select-grid-wrapper">\n                    <label class="col-sm-12">Grid setting</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-grid">\n                            <option value="2-10">col-2 col-10</option>\n                            <option value="3-9">col-3 col-9</option>\n                            <option value="4-8">col-4 col-8</option>\n                            <option value="5-7">col-5 col-7</option>\n                            <option value="6-6">col-6 col-6</option>\n                        </select>\n                        <small class="help-block">This setting is for width of label and control with number of cols as unit</small>\n                    </div>\n                </div>\n            </div>\n        '),n.find(".btn-design-form").on("click",(function(e){e.preventDefault();var n=t.getSettingComponent();a.actions.setData(n.find(".form-data").html()),t.showModal(i)})),n.find(".txt-form-action").on("change",(function(){t.getSettingComponent().find(".form-content").attr("action",this.value)})),n.find(".select-method").on("change",(function(){t.getSettingComponent().find(".form-content").attr("action",this.value)})),n.find(".select-enctype").on("change",(function(){t.getSettingComponent().find(".form-content").attr("enctype",this.value)})),n.find(".select-layout").on("change",(function(){var e=t.getSettingComponent(),i=e.find(".form-content");i.removeClass("form-inline form-horizontal"),this.value&&i.addClass(this.value),o.renderForm(e),n.find(".select-grid-wrapper").css("display","form-horizontal"===this.value?"block":"none")})),n.find(".select-grid").on("change",(function(){var e=t.getSettingComponent();e.find(".form-content").attr("data-grid",this.value),o.renderForm(e)}))},showSettingForm:function(t,e,n){var o=e.find(".form-content"),i="";o.hasClass("form-inline")?i="form-inline":o.hasClass("form-horizontal")&&(i="form-horizontal"),t.find(".txt-form-action").val(o.attr("action")||""),t.find(".select-method").val(o.attr("method")||"get"),t.find(".select-enctype").val(o.attr("enctype")),t.find(".select-layout").val(i),t.find(".select-grid-wrapper").css("display","form-horizontal"===i?"block":"none"),t.find(".select-grid").val(o.attr("data-grid")||"4-8")}},KEditor.components.googlemap={init:function(t,e,n,o){var i=n.find("iframe"),a=i.parent();o.initIframeCover(i,a)},settingEnabled:!0,settingTitle:"Google Map Settings",initSettingForm:function(t,e,n){n.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary btn-googlemap-edit">Update Map</button>       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-default btn-googlemap-169">16:9</button>           <button type="button" class="btn btn-sm btn-default btn-googlemap-43">4:3</button>       </div>   </div></form>'),n.find(".btn-googlemap-edit").on("click",(function(t){t.preventDefault();var n=prompt("Please enter Google Map embed code in here:"),o=s()(n),i=o.attr("src");o.length>0&&i&&i.length>0?e.find(".embed-responsive-item").attr("src",i):alert("Your Google Map embed code is invalid!")})),n.find(".btn-googlemap-169").on("click",(function(t){t.preventDefault(),e.find(".embed-responsive").removeClass("embed-responsive-4by3").addClass("embed-responsive-16by9")})),n.find(".btn-googlemap-43").on("click",(function(t){t.preventDefault(),e.find(".embed-responsive").removeClass("embed-responsive-16by9").addClass("embed-responsive-4by3")}))}},KEditor.components.photo={init:function(t,e,n,o){n.children(".keditor-component-content").find("img").css("display","inline-block")},settingEnabled:!0,settingTitle:"Photo Settings",initSettingForm:function(t,e,n){var o=this;t.options;n.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary" id="photo-edit">Change Photo</button>           <input type="file" style="display: none" />       </div>   </div>   <div class="form-group">       <label for="photo-align" class="col-sm-12">Align</label>       <div class="col-sm-12">           <select id="photo-align" class="form-control">               <option value="left">Left</option>               <option value="center">Center</option>               <option value="right">Right</option>           </select>       </div>   </div>   <div class="form-group">       <label for="photo-style" class="col-sm-12">Style</label>       <div class="col-sm-12">           <select id="photo-style" class="form-control">               <option value="">None</option>               <option value="img-rounded">Rounded</option>               <option value="img-circle">Circle</option>               <option value="img-thumbnail">Thumbnail</option>           </select>       </div>   </div>   <div class="form-group">       <label for="photo-responsive" class="col-sm-12">Responsive</label>       <div class="col-sm-12">           <input type="checkbox" id="photo-responsive" />       </div>   </div>   <div class="form-group">       <label for="photo-width" class="col-sm-12">Width</label>       <div class="col-sm-12">           <input type="number" id="photo-width" class="form-control" />       </div>   </div>   <div class="form-group">       <label for="photo-height" class="col-sm-12">Height</label>       <div class="col-sm-12">           <input type="number" id="photo-height" class="form-control" />       </div>   </div></form>');var i=n.find("#photo-edit"),a=i.next();i.on("click",(function(t){t.preventDefault(),a.trigger("click")})),a.on("change",(function(){var i=this.files[0];if(/image/.test(i.type)){var a=new FileReader;a.addEventListener("load",(function(i){var a=e.find("img");a.attr("src",i.target.result),a.css({width:"",height:""}),a.load((function(){o.showSettingForm.call(o,n,e,t)}))})),a.readAsDataURL(this.files[0])}else alert("Your selected file is not photo!")})),n.find("#photo-align").on("change",(function(){e.find(".photo-panel").css("text-align",this.value)})),n.find("#photo-responsive").on("click",(function(){e.find("img")[this.checked?"addClass":"removeClass"]("img-responsive")})),n.find("#photo-style").on("change",(function(){var t=e.find("img"),n=this.value;t.removeClass("img-rounded img-circle img-thumbnail"),n&&t.addClass(n)}));var l=n.find("#photo-width"),s=n.find("#photo-height");l.on("change",(function(){var t=e.find("img"),n=+this.value,i=Math.round(n/o.ratio);n<=0&&(n=o.width,i=o.height,this.value=n),t.css({width:n,height:i}),s.val(i)})),s.on("change",(function(){var t=e.find("img"),n=+this.value,i=Math.round(n*o.ratio);n<=0&&(i=o.width,n=o.height,this.value=n),t.css({height:n,width:i}),l.val(i)}))},showSettingForm:function(t,e,n){var o=this,i=t.find("#photo-align"),a=t.find("#photo-responsive"),l=t.find("#photo-width"),r=t.find("#photo-height"),d=t.find("#photo-style"),c=e.find(".photo-panel"),f=c.find("img"),u=c.css("text-align");"right"===u&&"center"===u||(u="left"),f.hasClass("img-rounded")?d.val("img-rounded"):f.hasClass("img-circle")?d.val("img-circle"):f.hasClass("img-thumbnail")?d.val("img-thumbnail"):d.val(""),i.val(u),a.prop("checked",f.hasClass("img-responsive")),l.val(f.width()),r.val(f.height()),s()("<img />").attr("src",f.attr("src")).load((function(){o.ratio=this.width/this.height,o.width=this.width,o.height=this.height}))}};o(4);var r=o(5);KEditor.components.text={settingEnabled:function(t,e){return e.is("[data-element-settings-url")},settingTitle:function(t,e){return t.options.locale.component.text.settingsTitle},initSettingForm:function(t,e,n){t.options;var o=t.options.rx,i=t.options.rxUtility,a=e.find(".keditor-meta-data");i.ajaxCall({rx:o,element:$(n),type:"get",url:e.data("elementSettingsUrl")},(function(i){o.hasPlugin("loading-overlay")&&o.getPlugin("loading-overlay").hide($(n).closest(".ajax-overlay"));var l=$(i.form);o.bindPlugins(l),l.on("submit",(function(){return $(this).ajaxSubmit({beforeSubmit:function(t,e,n){o.hasPlugin("loading-overlay")&&o.getPlugin("loading-overlay").show(e.closest(".ajax-overlay"))},success:function(n,i,l,s){o.hasPlugin("loading-overlay")&&o.getPlugin("loading-overlay").hide(s.closest(".ajax-overlay")),o.getResponse().set(n).handle(null,{meta_data:function(n){var o=n?JSON.parse(atob(n)):{};if($.isEmptyObject(o))a.text(""),e.removeAttr("data-element-meta"),e.removeClass("meta-data-active");else{var i=$("<ul>");for(var l in o)i.append("<li>".concat(o[l].title,": ").concat(o[l].value,"</li>"));a.html(i),e.attr("data-element-meta",n),e.addClass("meta-data-active")}t.sidebarCloser.click()}})},error:function(t){o.handleAjaxError(t)}}),!1})),n.append(l).on("keydown",(function(e){switch(e.which){case 13:return l.submit(),!1;case 27:return t.sidebarCloser.click(),!1}})).find(":input:visible").first().focus()}))},init:function(t,e,n,o){var i=o.options,a=n.children(".keditor-component-content");a.on("input",(function(a){"function"==typeof i.onComponentChanged&&i.onComponentChanged.call(o,a,n),"function"==typeof i.onContainerChanged&&i.onContainerChanged.call(o,a,e,t),"function"==typeof i.onContentChanged&&i.onContentChanged.call(o,a,t)})),this.withEditables(o,t,n,a,this.bindEditor)},getContent:function(t,e,n){var o=t.find(".keditor-component-content"),i=t.find("[data-element-type]");if("raw"===n)l=o.html();else{var a={},l=$("<div>").addClass("content-container").attr("data-element-type",i.data("elementType")).attr("data-element-id",i.data("elementId")).attr("data-element-template",i.data("elementTemplate"));this.withEditables(e,null,t,o,this.getEditorContent,a),$.each(a,(function(t,e){$("<div>").addClass("editable-content").attr("data-name",t).html(e).appendTo(l)}))}return KEditor.log("Component [".concat(i.data("elementType"),"][").concat(i.data("elementId"),"] [").concat(n,"] content"),l),l},destroy:function(t,e){t.find(".keditor-component-content")},withEditables:function(t,e,n,o,i,a){var l=this,s=t.options.rx,r=[];o.find(".editable").each((function(d,c){try{var f=1==o.find(".editable").length;if(!f&&!$(c).is("[data-name]"))throw"[data-name] missing in editable element";if($(c).is("[data-name]")){if(r.includes($(c).data("name")))throw'[data-name="'.concat($(c).data("name"),"\"] already used in this component's editable elements");r.push($(c).data("name"))}i.call(l,t,e,n,o,c,f,a)}catch(t){console.error(t,c),s.hasPlugin("notification")&&s.getPlugin("notification").show(t,"error")}}))},bindEditor:function(t,n,o,i,a,l,s){var d=t.options.rx;$(a).prop("contenteditable",!0).attr("data-editable-id",this.makeEditableId(i,a,l)),d.hasPlugin("inline-editor")&&($(a).on("focus",(function(e){console.debug("%c [".concat($(a).data("editableId"),"] FOCUS"),"color: #d1ffa3;",a),r(a,{time:100}),d.getPlugin("inline-editor").findInstance(a)||d.getPlugin("inline-editor").inline(a,{},(function(e){console.debug("%c [CKEditor][".concat(e.name,"] BOUND to [").concat($(a).data("editableId"),"]"),"color: #d1ffa3;",e),e.on("instanceReady",(function(){$(".".concat(e.id)).addClass("animated").addClass("slideInLeft").addClass("speed-200").appendTo(t.wrapper),e.fire("focus"),"function"==typeof t.options.onComponentReady&&t.options.onComponentReady.call(n,o,a,e)}))}))})),$(a).on("blur",(function(){console.debug("%c [".concat($(a).data("editableId"),"] BLUR"),"color: #ffcc00;",a);var t=d.getPlugin("inline-editor").findInstance(a);t&&!t.rxModal||(t?console.debug("%c [CKEditor][".concat(t.name,"] of [").concat($(a).data("editableId"),"] BLUR, rxModal Opened, keeping..."),"color: #ffcc00;"):console.debug("%c [CKEditor] not initialized on [".concat($(a).data("editableId"),"]"),"color: #ff0000;",e))})))},getEditorContent:function(t,e,n,o,i,a,l){var s=t.options.rx,r=$(i).is("[data-name]")?$(i).data("name"):null;if(s.hasPlugin("inline-editor"))var d=s.getPlugin("inline-editor").findInstance(i)||s.getPlugin("inline-editor").inline(i);l[r]=void 0!==d?d.getData():$(i).html(),void 0!==d&&d.destroy()},destroyEditor:function(t,e,n,o,i,a,l){var s=t.options.rx;if(s.hasPlugin("inline-editor")){var r=s.getPlugin("inline-editor").findInstance(i);r&&r.destroy()}},makeEditableId:function(t,e,n){return n&&!$(e).is("[data-name]")?t.attr("id"):t.attr("id")+"-"+$(e).data("name")}};o(6),o(7),o(8)}])}));
//# sourceMappingURL=keditor-components.js.map