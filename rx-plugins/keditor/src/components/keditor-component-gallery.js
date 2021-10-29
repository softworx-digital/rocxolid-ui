// import '../styles/keditor-component-gallery.less';
// import { position, offset } from 'caret-pos';
// import { CKEditor } from '../../../../resources/assets/js/plugin-binders/CKEditor';
// import KEditor from 'keditor';
var scrollIntoView = require('scroll-into-view');

// Text component
// ---------------------------------------------------------------------
KEditor.components['gallery'] = {
    settingSidebarOpen: false,

    settingEnabled: function (keditor, component) {
        return component.is('[data-element-settings-url');
    },

    settingTitle: function (keditor, component) {
        return keditor.options.locale.component.text.settingsTitle;
    },

    initSettingForm: function (keditor, component, form) {
        let self = this;
        let options = keditor.options;
        let rx = keditor.options.rx;
        let rxUtility = keditor.options.rxUtility;
        var meta_data_viewer_element = component.find('.keditor-meta-data');

        rxUtility.ajaxCall({
            rx: rx,
            element: $(form),
            type: 'get',
            url: component.data('elementSettingsUrl'),
        });
    },
};