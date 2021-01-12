import { MomentJS as DateManipulationPluginBinder } from '../plugin-binders/MomentJS';
import { Clipboard as ClipboardPluginBinder } from '../plugin-binders/Clipboard';
import { Tooltipster as TooltipPluginBinder } from '../plugin-binders/Tooltipster';
import { NProgressJS as LoadingProgressPluginBinder } from '../plugin-binders/NProgressJS';
import { jQueryLoadingOverlay as LoadingOverlayPluginBinder } from '../plugin-binders/jQueryLoadingOverlay';
import { PNotifyJS as NotificationPluginBinder } from '../plugin-binders/PNotifyJS';
import { SortableJS as SortingPluginBinder } from '../plugin-binders/SortableJS';
import { ChartJS as ChartPluginBinder } from '../plugin-binders/ChartJS';
import { HistoryJS as BrowserHistoryPluginBinder } from '../plugin-binders/HistoryJS';
import { jQueryAppear as AppearPluginBinder } from '../plugin-binders/jQueryAppear';
import { jQueryHotkeys as HotkeysPluginBinder } from '../plugin-binders/jQueryHotkeys';
import { jQueryNicescroll as ScrollPluginBinder } from '../plugin-binders/jQueryNicescroll';
import { jQueryStickr as StickyPluginBinder } from '../plugin-binders/jQueryStickr';
import { EkkoLightbox as LightboxPluginBinder } from '../plugin-binders/EkkoLightbox';
import { jQueryForm as AjaxFormPluginBinder } from '../plugin-binders/jQueryForm';
import { jQueryAsyncSteps as WizardPluginBinder } from '../plugin-binders/jQueryAsyncSteps';
// import { jQuerySteps as WizardPluginBinder } from '../plugin-binders/jQuerySteps';
import { jQueryInputMask as InputMaskPluginBinder } from '../plugin-binders/jQueryInputMask';
import { BootstrapMaxlength as MaxlengthPluginBinder } from '../plugin-binders/BootstrapMaxlength';
// import { BlueimpFileUpload as FileUploadPluginBinder } from '../plugin-binders/BlueimpFileUpload';
import { BootstrapFileinput as FileinputPluginBinder } from '../plugin-binders/BootstrapFileinput';
import { BootstrapSelectPicker as SelectPickerPluginBinder } from '../plugin-binders/BootstrapSelectPicker';
// import { BootstrapMultiSelectPicker as MultiSelectPickerPluginBinder } from '../plugin-binders/BootstrapMultiSelectPicker';
import { BootstrapAjaxSelectPicker as AjaxSelectPickerPluginBinder } from '../plugin-binders/BootstrapAjaxSelectPicker';
import { BootstrapDaterangePicker as DateRangePickerPluginBinder } from '../plugin-binders/BootstrapDaterangePicker';
import { BootstrapDatetimePicker as DateTimePickerPluginBinder } from '../plugin-binders/BootstrapDatetimePicker';
import { BootstrapTagsinput as TagsinputPluginBinder } from '../plugin-binders/BootstrapTagsinput';
import { BootstrapSlider as SliderPluginBinder } from '../plugin-binders/BootstrapSlider';
import { BootstrapToggle as TogglePluginBinder } from '../plugin-binders/BootstrapToggle';
import { BootstrapProgressbar as ProgressbarPluginBinder } from '../plugin-binders/BootstrapProgressbar';
import { PaletteColorPicker as PaletteColorPickerPluginBinder } from '../plugin-binders/PaletteColorPicker';
import { Summernote as WysiwygTextareaPluginBinder } from '../plugin-binders/Summernote';
// import { TinyMCE as WysiwygTextareaPluginBinder } from '../plugin-binders/TinyMCE';
import { CKEditor as InlineWysiwygTextareaPluginBinder } from '../plugin-binders/CKEditor';
// import { ScrollMagicJS as ScrollMagicJSPluginBinder } from '../plugin-binders/ScrollMagic';
// rx
import { jQueryVisibility as ElementVisibilityPluginBinder } from '../plugin-binders/jQueryVisibility';
import { jQueryDependency as ElementDependencyPluginBinder } from '../plugin-binders/jQueryDependency';
import { Autosubmit as AutosubmitPluginBinder } from '../plugin-binders/Autosubmit';
import { ImagePlaceholder as ImagePlaceholderPluginBinder } from '../plugin-binders/ImagePlaceholder';
import { PDFObjectJS as DocumentViewerPluginBinder } from '../plugin-binders/PDFObjectJS';
// import { RxDocumentComposer as DocumentComposerPluginBinder } from '../plugin-binders/RxDocumentComposer';
import { KEditorBinder as DocumentComposerPluginBinder } from '../plugin-binders/KEditorBinder';

/**
 * Plugins definition with their binders.
 */
export default {
    'date': {
        'binder': DateManipulationPluginBinder
    },
    'clipboard': {
        'binder': ClipboardPluginBinder
    },
    'tooltips': {
        'binder': TooltipPluginBinder
    },
    'loading-overlay': {
        'binder': LoadingOverlayPluginBinder
    },
    'ajax-progress': {
        'binder': LoadingProgressPluginBinder
    },
    'notification': {
        'binder': NotificationPluginBinder
    },
    'sorting': {
        'binder': SortingPluginBinder
    },
    'chart': {
        'binder': ChartPluginBinder
    },
    'browser-history': {
        'binder': BrowserHistoryPluginBinder
    },
    'appear': {
        'binder': AppearPluginBinder
    },
    'hotkeys': {
        'binder': HotkeysPluginBinder
    },
    'scroll': {
        'binder': ScrollPluginBinder
    },
    'sticky': {
        'binder': StickyPluginBinder
    },
    'lightbox': {
        'binder': LightboxPluginBinder
    },
    'progressbar': {
        'binder': ProgressbarPluginBinder
    },
    'wizard': {
        'binder': WizardPluginBinder
    },
    'ajax-form': {
        'binder': AjaxFormPluginBinder
    },
    'fileupload': {
        'binder': FileinputPluginBinder
    },
    'inputmask': {
        'binder': InputMaskPluginBinder
    },
    'maxlength' : {
        'binder': MaxlengthPluginBinder
    },
    'select': {
        'binder': SelectPickerPluginBinder
    },/*
    'multi-select': {
        'binder': MultiSelectPickerPluginBinder
    },*/
    'ajax-select': {
        'binder': AjaxSelectPickerPluginBinder
    },
    'daterangepicker' : {
        'binder': DateRangePickerPluginBinder
    },
    'datetimepicker': {
        'binder': DateTimePickerPluginBinder
    },
    'tagsinput': {
        'binder': TagsinputPluginBinder
    },
    'slider': {
        'binder': SliderPluginBinder
    },
    'toggle': {
        'binder': TogglePluginBinder
    },
    'palette-colorpicker': {
        'binder': PaletteColorPickerPluginBinder
    },
    'editor': {
        'binder': WysiwygTextareaPluginBinder
    },
    'inline-editor': {
        'binder': InlineWysiwygTextareaPluginBinder
    },/*
    'scroll-utility': {
        'binder': ScrollMagicJSPluginBinder
    },*/
    // rx
    'dependency': {
        'binder': ElementDependencyPluginBinder
    },
    'visibility': {
        'binder': ElementVisibilityPluginBinder
    },
    'autosubmit': {
        'binder': AutosubmitPluginBinder
    },
    'image-placeholder': {
        'binder': ImagePlaceholderPluginBinder
    },
    'document-viewer': {
        'binder': DocumentViewerPluginBinder
    },
    'document-composer': {
        'binder': DocumentComposerPluginBinder
    },
};