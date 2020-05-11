/*! RocXolid Document Composer v1.0.0 | Copyright (c) 2016-present Kademi (http://kademi.co) & 2020 softworx (hello@softworx.digital) */
!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("jquery"));else if("function"==typeof define&&define.amd)define(["jquery"],n);else{var o="object"==typeof exports?n(require("jquery")):n(t.jquery);for(var e in o)("object"==typeof exports?exports:t)[e]=o[e]}}("undefined"!=typeof self?self:this,(function(t){return function(t){var n={};function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=n,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(1&n&&(t=o(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)o.d(e,i,function(n){return t[n]}.bind(null,i));return e},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=9)}([function(n,o){n.exports=t},,function(t,n){KEditor.components.audio={settingEnabled:!0,settingTitle:"Audio Settings",init:function(t,n,o,e){var i=o.find(".keditor-component-content");0===i.find(".audio-wrapper").length&&i.wrapInner('<div class="audio-wrapper"></div>')},initSettingForm:function(t,n){t.append('<form class="form-horizontal">     <div class="form-group">         <label class="col-sm-12">Audio file</label>         <div class="col-sm-12">             <div class="audio-toolbar">                 <a href="#" class="btn-audio-upload btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>                 <input class="audio-upload" type="file" style="display: none" />             </div>         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Autoplay</label>         <div class="col-sm-12">             <input type="checkbox" class="audio-autoplay" />         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Show Controls</label>         <div class="col-sm-12">             <input type="checkbox" class="audio-controls" checked />         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Width (%)</label>         <div class="col-sm-12">             <input type="number" min="20" max="100" class="form-control audio-width" value="100" />         </div>     </div></form>');var o=t.find(".audio-upload");t.find(".btn-audio-upload").off("click").on("click",(function(t){t.preventDefault(),o.trigger("click")})),o.off("change").on("change",(function(){var t=this.files[0];/audio/.test(t.type)?n.getSettingComponent().find("audio").attr("src",URL.createObjectURL(t)):alert("Your selected file is not an audio file!")})),t.find(".audio-autoplay").on("click",(function(){n.getSettingComponent().find("audio").prop("autoplay",this.checked)})),t.find(".audio-controls").on("click",(function(){n.getSettingComponent().find("audio").prop("controls",this.checked)})),t.find(".audio-width").on("change",(function(){var t=n.getSettingComponent().find("audio");t.parent().attr("data-width",this.value),t.css("width",this.value+"%")}))},showSettingForm:function(t,n,o){var e=n.find("audio"),i=e.parent(),a=t.find(".audio-autoplay"),l=t.find(".audio-controls"),s=t.find(".audio-width");a.prop("checked",!!e.attr("autoplay")),l.prop("checked",!!e.attr("controls")),s.val(i.attr("data-width")||100)}}},function(t,n,o){},function(t,n,o){},function(t,n){KEditor.components.video={init:function(t,n,o,e){var i=o.children(".keditor-component-content").find("video");i.parent().is(".video-wrapper")||i.wrap('<div class="video-wrapper"></div>')},getContent:function(t,n){var o=t.children(".keditor-component-content");return o.find("video").unwrap(),o.html()},settingEnabled:!0,settingTitle:"Video Settings",initSettingForm:function(t,n){t.append('\n            <form class="form-horizontal">\n                <div class="form-group">\n                    <label for="video-input" class="col-sm-12">Video file</label>\n                    <div class="col-sm-12">\n                        <div class="video-toolbar">\n                            <a href="#" class="btn-video-input btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>\n                            <input class="video-input" type="file" style="display: none" />\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-autoplay" class="col-sm-12">Autoplay</label>\n                    <div class="col-sm-12">\n                        <input type="checkbox" class="video-autoplay" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-loop" class="col-sm-12">Loop</label>\n                    <div class="col-sm-12">\n                        <input type="checkbox" class="video-loop" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-controls" class="col-sm-12">Show Controls</label>\n                    <div class="col-sm-12">\n                        <input type="checkbox" class="video-controls" checked />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="" class="col-sm-12">Ratio</label>\n                    <div class="col-sm-12">\n                        <input type="radio" name="video-radio" class="video-ratio" value="4/3" checked /> 4:3\n                    </div>\n                    <div class="col-sm-12">\n                        <input type="radio" name="video-radio" class="video-ratio" value="16/9" /> 16:9\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="video-width" class="col-sm-12">Width (px)</label>\n                    <div class="col-sm-12">\n                        <input type="number" class="video-width form-control" min="320" max="1920" value="320" />\n                    </div>\n                </div>\n            </form>\n        ');var o=t.find(".video-input");t.find(".btn-video-input").on("click",(function(t){t.preventDefault(),o.trigger("click")})),o.on("change",(function(){var t=this.files[0],o=n.getSettingComponent().find("video");/video/.test(t.type)?o.attr("src",URL.createObjectURL(t)):alert("Your selected file is not an video file!")})),t.find(".video-autoplay").on("click",(function(){n.getSettingComponent().find("video").prop("autoplay",this.checked)})),t.find(".video-loop").on("click",(function(){n.getSettingComponent().find("video").prop("loop",this.checked)})),t.find(".video-ratio").on("click",(function(){n.getSettingComponent().find("video").attr("data-ratio",this.value),t.find(".video-width").trigger("change")})),t.find(".video-controls").on("click",(function(){n.getSettingComponent().find("video").prop("controls",this.checked)})),t.find(".video-width").on("change",(function(){var t=n.getSettingComponent().find("video"),o="16/9"===t.attr("data-ratio")?16/9:4/3,e=this.value/o;t.attr("width",this.value),t.attr("height",e)}))},showSettingForm:function(t,n,o){var e=n.find("video");t.find(".video-autoplay").prop("checked",e.prop("autoplay")),t.find(".video-loop").prop("checked",e.prop("loop")),t.find(".video-ratio").prop("checked",!1).filter('[value="'+e.attr("data-ratio")+'"]').prop("checked",!0),t.find(".video-controls").prop("checked",e.prop("controls")),t.find(".video-width").val(e.attr("width"))}}},function(t,n){KEditor.components.vimeo={init:function(t,n,o,e){var i=o.find("iframe"),a=i.parent();e.initIframeCover(i,a)},settingEnabled:!0,settingTitle:"Vimeo Settings",initSettingForm:function(t,n){t.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary btn-vimeo-edit">Change Video</button>       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Autoplay</label>       <div class="col-sm-12">           <input type="checkbox" id="vimeo-autoplay" />       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-default btn-vimeo-169">16:9</button>           <button type="button" class="btn btn-sm btn-default btn-vimeo-43">4:3</button>       </div>   </div></form>'),t.find(".btn-vimeo-edit").on("click",(function(t){t.preventDefault();var o=prompt("Please enter Vimeo URL in here:").match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);o&&o[1]?n.getSettingComponent().find(".embed-responsive-item").attr("src","https://player.vimeo.com/video/"+o[1]+"?byline=0&portrait=0&badge=0"):alert("Your Vimeo URL is invalid!")})),t.find(".btn-vimeo-169").on("click",(function(t){t.preventDefault(),n.getSettingComponent().find(".embed-responsive").removeClass("embed-responsive-4by3").addClass("embed-responsive-16by9")})),t.find(".btn-vimeo-43").on("click",(function(t){t.preventDefault(),n.getSettingComponent().find(".embed-responsive").removeClass("embed-responsive-16by9").addClass("embed-responsive-4by3")}));var o=t.find("#vimeo-autoplay");o.on("click",(function(){var t=n.getSettingComponent().find(".embed-responsive-item"),e=t.attr("src").replace(/(\?.+)+/,"")+"?byline=0&portrait=0&badge=0&autoplay="+(o.is(":checked")?1:0);t.attr("src",e)}))},showSettingForm:function(t,n,o){var e=n.find(".embed-responsive-item"),i=t.find("#vimeo-autoplay"),a=e.attr("src");i.prop("checked",-1!==a.indexOf("autoplay=1"))}}},function(t,n){KEditor.components.youtube={init:function(t,n,o,e){var i=o.find("iframe"),a=i.parent();e.initIframeCover(i,a)},settingEnabled:!0,settingTitle:"Youtube Settings",initSettingForm:function(t,n){t.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary btn-youtube-edit">Change Video</button>       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Autoplay</label>       <div class="col-sm-12">           <input type="checkbox" id="youtube-autoplay" />       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-default btn-youtube-169">16:9</button>           <button type="button" class="btn btn-sm btn-default btn-youtube-43">4:3</button>       </div>   </div></form>'),t.find(".btn-youtube-edit").on("click",(function(t){t.preventDefault();var o=prompt("Please enter Youtube URL in here:").match(/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/);o&&o[1]?n.getSettingComponent().find(".embed-responsive-item").attr("src","https://www.youtube.com/embed/"+o[1]):alert("Your Youtube URL is invalid!")})),t.find(".btn-youtube-169").on("click",(function(t){t.preventDefault(),n.getSettingComponent().find(".embed-responsive").removeClass("embed-responsive-4by3").addClass("embed-responsive-16by9")})),t.find(".btn-youtube-43").on("click",(function(t){t.preventDefault(),n.getSettingComponent().find(".embed-responsive").removeClass("embed-responsive-16by9").addClass("embed-responsive-4by3")}));var o=t.find("#youtube-autoplay");o.on("click",(function(){var t=n.getSettingComponent().find(".embed-responsive-item"),e=t.attr("src").replace(/(\?.+)+/,"")+"?autoplay="+(o.is(":checked")?1:0);t.attr("src",e)}))},showSettingForm:function(t,n,o){var e=n.find(".embed-responsive-item"),i=t.find("#youtube-autoplay"),a=e.attr("src");i.prop("checked",-1!==a.indexOf("autoplay=1"))}}},,function(t,n,o){"use strict";o.r(n);o(2),o(3);var e,i,a=o(0),l=o.n(a);KEditor.components.form={emptyContent:'<p class="text-muted lead text-center"><br />[No form content]<br /><br /></p>',renderForm:function(t){var n=t.find(".form-content"),o=l()("<div />");o.formRender({dataType:"json",formData:i.actions.getData("json")}),n.html(o.html()),n.hasClass("form-horizontal")&&n.children("div").each((function(){var t=l()(this),o=n.attr("data-grid")||"4-8";if(o=o.split("-"),t.attr("class"))if(t.hasClass("fb-button"))t.find("button").wrap('<div class="col-sm-'.concat(o[1]," col-sm-offset-").concat(o[0],'"></div>'));else{var e=t.children("label"),i=t.children("input, select, textarea"),a=t.children("div");e.addClass("control-label col-sm-".concat(o[0])),a.length>0?a.addClass("col-sm-".concat(o[1])):i.addClass("form-control").wrap('<div class="col-sm-'.concat(o[1],'"></div>'))}}))},initModal:function(t){var n=this;(e=t.initModal("keditor-modal-form")).find(".keditor-modal-title").html("Design form"),e.css({visibility:"hidden",display:"block",opacity:1}),e.find(".keditor-modal-body").append('\n            <div class="form-builder-area-wrapper">\n                <div class="form-builder-area"></div>\n            </div>\n        '),i=e.find(".form-builder-area").formBuilder({showActionButtons:!1,dataType:"json",disableFields:["autocomplete","paragraph","header"],disabledAttrs:["access"],typeUserDisabledAttrs:{"checkbox-group":["toggle","inline"]}}),e.find(".keditor-modal-footer").html('\n            <button type="button" class="keditor-ui keditor-btn keditor-btn-default keditor-modal-close">Close</button>\n            <button type="button" class="keditor-ui keditor-btn keditor-btn-primary btn-save-form">Save</button>\n        '),e.find(".btn-save-form").on("click",(function(o){o.preventDefault();var a=t.getSettingComponent();a.find(".form-data").html(i.actions.getData("json")),n.renderForm(a),t.hideModal(e)})),setTimeout((function(){e.css({visibility:"",display:"",opacity:""})}),500)},init:function(t,n,o,i){var a=o.find(".keditor-component-content"),l=o.find(".form-content");0===o.find(".form-data").length&&a.append('<div class="form-data" style="display: none !important;"></div>'),0===l.length&&a.append('<form class="form-content">'.concat(this.emptyContent,"</form>")),e||this.initModal(i)},settingEnabled:!0,settingTitle:"Form Settings",initSettingForm:function(t,n){var o=this;t.html('\n            <div class="form-horizontal">\n                <div class="form-group">\n                    <div class="col-sm-12">\n                       <button class="btn btn-primary btn-block btn-design-form" type="button"><i class="fa fa-paint-brush"></i> Design form</button>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Action</label>\n                    <div class="col-sm-12">\n                        <input type="text" class="form-control txt-form-action" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Method</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-method">\n                            <option value="get">Get</option>\n                            <option value="post">Post</option>\n                            <option value="put">Put</option>\n                            <option value="delete">Delete</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Enctype</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-enctype">\n                            <option value="text/plain">text/plain</option>\n                            <option value="multipart/form-data">multipart/form-data</option>\n                            <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-12">Layout</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-layout">\n                            <option value="">Normal</option>\n                            <option value="form-horizontal">Horizontal</option>\n                            <option value="form-inline">Inline</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group select-grid-wrapper">\n                    <label class="col-sm-12">Grid setting</label>\n                    <div class="col-sm-12">\n                        <select class="form-control select-grid">\n                            <option value="2-10">col-2 col-10</option>\n                            <option value="3-9">col-3 col-9</option>\n                            <option value="4-8">col-4 col-8</option>\n                            <option value="5-7">col-5 col-7</option>\n                            <option value="6-6">col-6 col-6</option>\n                        </select>\n                        <small class="help-block">This setting is for width of label and control with number of cols as unit</small>\n                    </div>\n                </div>\n            </div>\n        '),t.find(".btn-design-form").on("click",(function(t){t.preventDefault();var o=n.getSettingComponent();i.actions.setData(o.find(".form-data").html()),n.showModal(e)})),t.find(".txt-form-action").on("change",(function(){n.getSettingComponent().find(".form-content").attr("action",this.value)})),t.find(".select-method").on("change",(function(){n.getSettingComponent().find(".form-content").attr("action",this.value)})),t.find(".select-enctype").on("change",(function(){n.getSettingComponent().find(".form-content").attr("enctype",this.value)})),t.find(".select-layout").on("change",(function(){var e=n.getSettingComponent(),i=e.find(".form-content");i.removeClass("form-inline form-horizontal"),this.value&&i.addClass(this.value),o.renderForm(e),t.find(".select-grid-wrapper").css("display","form-horizontal"===this.value?"block":"none")})),t.find(".select-grid").on("change",(function(){var t=n.getSettingComponent();t.find(".form-content").attr("data-grid",this.value),o.renderForm(t)}))},showSettingForm:function(t,n,o){var e=n.find(".form-content"),i="";e.hasClass("form-inline")?i="form-inline":e.hasClass("form-horizontal")&&(i="form-horizontal"),t.find(".txt-form-action").val(e.attr("action")||""),t.find(".select-method").val(e.attr("method")||"get"),t.find(".select-enctype").val(e.attr("enctype")),t.find(".select-layout").val(i),t.find(".select-grid-wrapper").css("display","form-horizontal"===i?"block":"none"),t.find(".select-grid").val(e.attr("data-grid")||"4-8")}},KEditor.components.googlemap={init:function(t,n,o,e){var i=o.find("iframe"),a=i.parent();e.initIframeCover(i,a)},settingEnabled:!0,settingTitle:"Google Map Settings",initSettingForm:function(t,n){t.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary btn-googlemap-edit">Update Map</button>       </div>   </div>   <div class="form-group">       <label class="col-sm-12">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-default btn-googlemap-169">16:9</button>           <button type="button" class="btn btn-sm btn-default btn-googlemap-43">4:3</button>       </div>   </div></form>'),t.find(".btn-googlemap-edit").on("click",(function(t){t.preventDefault();var o=prompt("Please enter Google Map embed code in here:"),e=l()(o),i=e.attr("src");e.length>0&&i&&i.length>0?n.getSettingComponent().find(".embed-responsive-item").attr("src",i):alert("Your Google Map embed code is invalid!")})),t.find(".btn-googlemap-169").on("click",(function(t){t.preventDefault(),n.getSettingComponent().find(".embed-responsive").removeClass("embed-responsive-4by3").addClass("embed-responsive-16by9")})),t.find(".btn-googlemap-43").on("click",(function(t){t.preventDefault(),n.getSettingComponent().find(".embed-responsive").removeClass("embed-responsive-16by9").addClass("embed-responsive-4by3")}))}},KEditor.components.photo={init:function(t,n,o,e){o.children(".keditor-component-content").find("img").css("display","inline-block")},settingEnabled:!0,settingTitle:"Photo Settings",initSettingForm:function(t,n){var o=this;n.options;t.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary" id="photo-edit">Change Photo</button>           <input type="file" style="display: none" />       </div>   </div>   <div class="form-group">       <label for="photo-align" class="col-sm-12">Align</label>       <div class="col-sm-12">           <select id="photo-align" class="form-control">               <option value="left">Left</option>               <option value="center">Center</option>               <option value="right">Right</option>           </select>       </div>   </div>   <div class="form-group">       <label for="photo-style" class="col-sm-12">Style</label>       <div class="col-sm-12">           <select id="photo-style" class="form-control">               <option value="">None</option>               <option value="img-rounded">Rounded</option>               <option value="img-circle">Circle</option>               <option value="img-thumbnail">Thumbnail</option>           </select>       </div>   </div>   <div class="form-group">       <label for="photo-responsive" class="col-sm-12">Responsive</label>       <div class="col-sm-12">           <input type="checkbox" id="photo-responsive" />       </div>   </div>   <div class="form-group">       <label for="photo-width" class="col-sm-12">Width</label>       <div class="col-sm-12">           <input type="number" id="photo-width" class="form-control" />       </div>   </div>   <div class="form-group">       <label for="photo-height" class="col-sm-12">Height</label>       <div class="col-sm-12">           <input type="number" id="photo-height" class="form-control" />       </div>   </div></form>');var e=t.find("#photo-edit"),i=e.next();e.on("click",(function(t){t.preventDefault(),i.trigger("click")})),i.on("change",(function(){var e=this.files[0];if(/image/.test(e.type)){var i=new FileReader;i.addEventListener("load",(function(e){var i=n.getSettingComponent().find("img");i.attr("src",e.target.result),i.css({width:"",height:""}),i.load((function(){o.showSettingForm.call(o,t,n.getSettingComponent(),n)}))})),i.readAsDataURL(this.files[0])}else alert("Your selected file is not photo!")})),t.find("#photo-align").on("change",(function(){n.getSettingComponent().find(".photo-panel").css("text-align",this.value)})),t.find("#photo-responsive").on("click",(function(){n.getSettingComponent().find("img")[this.checked?"addClass":"removeClass"]("img-responsive")})),t.find("#photo-style").on("change",(function(){var t=n.getSettingComponent().find("img"),o=this.value;t.removeClass("img-rounded img-circle img-thumbnail"),o&&t.addClass(o)}));var a=t.find("#photo-width"),l=t.find("#photo-height");a.on("change",(function(){var t=n.getSettingComponent().find("img"),e=+this.value,i=Math.round(e/o.ratio);e<=0&&(e=o.width,i=o.height,this.value=e),t.css({width:e,height:i}),l.val(i)})),l.on("change",(function(){var t=n.getSettingComponent().find("img"),e=+this.value,i=Math.round(e*o.ratio);e<=0&&(i=o.width,e=o.height,this.value=e),t.css({height:e,width:i}),a.val(i)}))},showSettingForm:function(t,n,o){var e=this,i=t.find("#photo-align"),a=t.find("#photo-responsive"),s=t.find("#photo-width"),d=t.find("#photo-height"),r=t.find("#photo-style"),c=n.find(".photo-panel"),p=c.find("img"),f=c.css("text-align");"right"===f&&"center"===f||(f="left"),p.hasClass("img-rounded")?r.val("img-rounded"):p.hasClass("img-circle")?r.val("img-circle"):p.hasClass("img-thumbnail")?r.val("img-thumbnail"):r.val(""),i.val(f),a.prop("checked",p.hasClass("img-responsive")),s.val(p.width()),d.val(p.height()),l()("<img />").attr("src",p.attr("src")).load((function(){e.ratio=this.width/this.height,e.width=this.width,e.height=this.height}))}};o(4);KEditor.components.text={init:function(t,n,o,e){var i=e.options,a=o.children(".keditor-component-content");a.on("input",(function(a){"function"==typeof i.onComponentChanged&&i.onComponentChanged.call(e,a,o),"function"==typeof i.onContainerChanged&&i.onContainerChanged.call(e,a,n,t),"function"==typeof i.onContentChanged&&i.onContentChanged.call(e,a,t)})),this.withEditables(e,t,o,a,this.bindEditor)},getContent:function(t,n){var o=t.find(".keditor-component-content"),e=t.find("[data-element-type]"),i={},a=$("<div>").addClass("content-container").attr("data-element-type",e.data("elementType")).attr("data-element-id",e.data("elementId"));return this.withEditables(n,null,t,o,this.getEditorContent,i),$.each(i,(function(t,n){$("<div>").addClass("editable-content").attr("data-name",t).html(n).appendTo(a)})),a},destroy:function(t,n){var o=t.find(".keditor-component-content");self.withEditables(n,null,t,o,self.destroyEditor)},withEditables:function(t,n,o,e,i,a){var l=this,s=[];e.find(".editable").each((function(d,r){try{var c=1==e.find(".editable").length;if(!c&&!$(r).is("[data-name]"))throw"[data-name] missing in editable element";if($(r).is("[data-name]")){if(s.includes($(r).data("name")))throw'[data-name="'.concat($(r).data("name"),"\"] already used in this component's editable elements");s.push($(r).data("name"))}i.call(l,t,n,o,e,r,c,a)}catch(t){console.error(t,r),rx().hasPlugin("notification")&&rx().getPlugin("notification").show(t,"error")}}))},bindEditor:function(t,n,o,e,i,a,l){if($(i).prop("contenteditable",!0).attr("data-editable-id",this.makeEditableId(e,i,a)),rx().hasPlugin("inline-editor")){var s=rx().getPlugin("inline-editor").inline(i);s.on("instanceReady",(function(){$(".".concat(s.id)).appendTo(t.wrapper),"function"==typeof t.options.onComponentReady&&t.options.onComponentReady.call(n,o,i,s)}))}},getEditorContent:function(t,n,o,e,i,a,l){var s=a?null:$(i).data("name");if(rx().hasPlugin("inline-editor"))var d=rx().getPlugin("inline-editor").findInstance(i);l[s]=d?d.getData():$(i).html()},destroyEditor:function(t,n,o,e,i,a,l){rx().hasPlugin("inline-editor")&&rx().getPlugin("inline-editor").findInstance(i).destroy()},makeEditableId:function(t,n,o){return o?t.attr("id"):t.attr("id")+"-"+$(n).data("name")}};o(5),o(6),o(7)}])}));
//# sourceMappingURL=keditor-components.js.map