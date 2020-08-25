import TOOLBAR_TYPE from '../constants/toolbarType';
import CSS_CLASS from '../constants/cssClass';
import ICON from '../constants/icon';

// @todo: quick & dirty implementation, complex solution is welcome
export default function (metaData) {
    let self = this;
    let options = self.options;

    let $metaDataViewer = $(`<div class="${CSS_CLASS.UI} ${CSS_CLASS.META_DATA} ${CSS_CLASS.META_DATA_TOP}"></div>`);

    if (!$.isEmptyObject(metaData)) {
        var $list = $('<ul>');

        for (var key in metaData) {
            $list.append(`<li>${options.locale.metaData[key]}: ${metaData[key]}</li>`);
        }

        $metaDataViewer.html($list);
    }

    return $metaDataViewer[0].outerHTML;
};
