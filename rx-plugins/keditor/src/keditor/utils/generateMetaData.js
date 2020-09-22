import TOOLBAR_TYPE from '../constants/toolbarType';
import CSS_CLASS from '../constants/cssClass';
import ICON from '../constants/icon';

// @todo: quick & dirty implementation, complex solution needed
export default function (metaData, position) {
    let self = this;
    let options = self.options;

    let $metaDataViewer = $(`<div class="${CSS_CLASS.UI} ${CSS_CLASS.META_DATA} ${position}"></div>`);

    if (!$.isEmptyObject(metaData)) {
        var $list = $('<ul>');

        for (var key in metaData) {
            $list.append(`<li>${metaData[key].title}: ${metaData[key].value}</li>`);
        }

        $metaDataViewer.html($list);
    }

    return $metaDataViewer[0].outerHTML;
};
