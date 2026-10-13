import AbTestingPage from './AbTestingPage';
import AddRemoveElementsPage from './AddRemoveElementsPage';
import BasicAuthPage from './BasicAuthPage';
import BrokenImagesPage from './BrokenImagesPage';
import ChallengingDomPage from './ChallengingDomPage';
import CheckboxesPage from './CheckboxesPage';
import CollapserPage from './CollapserPage';
import ContextMenuPage from './ContextMenuPage';
import DigestAuthPage from './DigestAuthPage';
import DisappearingElementsPage from './DisappearingElementsPage';
import DragAndDropPage from './DragAndDropPage';
import DropdownPage from './DropdownPage';
import DynamicContentPage from './DynamicContentPage';
import DynamicControlsPage from './DynamicControlsPage';
import DynamicLoadingPage, { DynamicLoadingVariantPage } from './DynamicLoadingPage';
import EntryAdPage from './EntryAdPage';
import ExitIntentPage from './ExitIntentPage';
import ExpanderPage from './ExpanderPage';
import FileDownloadPage from './FileDownloadPage';
import FileUploadPage from './FileUploadPage';
import FloatingMenuPage from './FloatingMenuPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import FormAuthenticationPage, { SecurePage } from './FormAuthenticationPage';
import FramesPage from './FramesPage';
import GeolocationPage from './GeolocationPage';
import HorizontalSliderPage from './HorizontalSliderPage';
import HoversPage from './HoversPage';
import InfiniteScrollPage from './InfiniteScrollPage';
import InputsPage from './InputsPage';
import JavaScriptAlertsPage from './JavaScriptAlertsPage';
import JavaScriptErrorPage from './JavaScriptErrorPage';
import JQueryUiMenusPage from './JQueryUiMenusPage';
import KeyPressesPage from './KeyPressesPage';
import LargeDomPage from './LargeDomPage';
import ListViewPage from './ListViewPage';
import MultipleWindowsPage, { WindowPage } from './MultipleWindowsPage';
import NestedFramesPage from './NestedFramesPage';
import NotificationMessagePage from './NotificationMessagePage';
import RedirectLinkPage, { RedirectLandingPage } from './RedirectLinkPage';
import ScrollbarPage from './ScrollbarPage';
import SecureFileDownloadPage from './SecureFileDownloadPage';
import ShadowDomPage from './ShadowDomPage';
import ShiftingContentPage, { ShiftingContentVariantPage } from './ShiftingContentPage';
import SlowResourcesPage from './SlowResourcesPage';
import SortableDataTablesPage from './SortableDataTablesPage';
import StatusCodesPage, { StatusCodePage } from './StatusCodesPage';
import TooltipPage from './TooltipPage';
import TyposPage from './TyposPage';
import WysiwygEditorPage from './WysiwygEditorPage';
import type { ComponentType } from 'react';

export interface UIExample {
  title: string;
  path: string;
  Component: ComponentType;
  hidden?: boolean;
}

// The list the index page renders, in the same order the reference site publishes it, with this
// project's own five examples interleaved alphabetically.
const available: UIExample[] = [
  { title: 'A/B Testing', path: 'ab-testing', Component: AbTestingPage },
  { title: 'Add/Remove Elements', path: 'add-remove-elements', Component: AddRemoveElementsPage },
  { title: 'Basic Auth', path: 'basic-auth', Component: BasicAuthPage },
  { title: 'Broken Images', path: 'broken-images', Component: BrokenImagesPage },
  { title: 'Challenging DOM', path: 'challenging-dom', Component: ChallengingDomPage },
  { title: 'Checkboxes', path: 'checkboxes', Component: CheckboxesPage },
  { title: 'Collapser', path: 'collapser', Component: CollapserPage },
  { title: 'Context Menu', path: 'context-menu', Component: ContextMenuPage },
  { title: 'Digest Authentication', path: 'digest-auth', Component: DigestAuthPage },
  { title: 'Disappearing Elements', path: 'disappearing-elements', Component: DisappearingElementsPage },
  { title: 'Drag and Drop', path: 'drag-and-drop', Component: DragAndDropPage },
  { title: 'Dropdown', path: 'dropdown', Component: DropdownPage },
  { title: 'Dynamic Content', path: 'dynamic-content', Component: DynamicContentPage },
  { title: 'Dynamic Controls', path: 'dynamic-controls', Component: DynamicControlsPage },
  { title: 'Dynamic Loading', path: 'dynamic-loading', Component: DynamicLoadingPage },
  { title: 'Entry Ad', path: 'entry-ad', Component: EntryAdPage },
  { title: 'Exit Intent', path: 'exit-intent', Component: ExitIntentPage },
  { title: 'Expander', path: 'expander', Component: ExpanderPage },
  { title: 'File Download', path: 'file-download', Component: FileDownloadPage },
  { title: 'File Upload', path: 'file-upload', Component: FileUploadPage },
  { title: 'Floating Menu', path: 'floating-menu', Component: FloatingMenuPage },
  { title: 'Forgot Password', path: 'forgot-password', Component: ForgotPasswordPage },
  { title: 'Form Authentication', path: 'form-authentication', Component: FormAuthenticationPage },
  { title: 'Frames', path: 'frames', Component: FramesPage },
  { title: 'Geolocation', path: 'geolocation', Component: GeolocationPage },
  { title: 'Horizontal Slider', path: 'horizontal-slider', Component: HorizontalSliderPage },
  { title: 'Hovers', path: 'hovers', Component: HoversPage },
  { title: 'Infinite Scroll', path: 'infinite-scroll', Component: InfiniteScrollPage },
  { title: 'Inputs', path: 'inputs', Component: InputsPage },
  { title: 'JavaScript Alerts', path: 'javascript-alerts', Component: JavaScriptAlertsPage },
  { title: 'JavaScript onload event error', path: 'javascript-error', Component: JavaScriptErrorPage },
  { title: 'JQuery UI Menus', path: 'jquery-ui-menus', Component: JQueryUiMenusPage },
  { title: 'Key Presses', path: 'key-presses', Component: KeyPressesPage },
  { title: 'Large & Deep DOM', path: 'large-dom', Component: LargeDomPage },
  { title: 'List View', path: 'list-view', Component: ListViewPage },
  { title: 'Multiple Windows', path: 'multiple-windows', Component: MultipleWindowsPage },
  { title: 'Nested Frames', path: 'nested-frames', Component: NestedFramesPage },
  { title: 'Notification Message', path: 'notification-message', Component: NotificationMessagePage },
  { title: 'Redirect Link', path: 'redirect', Component: RedirectLinkPage },
  { title: 'Scrollbar', path: 'scrollbar', Component: ScrollbarPage },
  { title: 'Secure File Download', path: 'download-secure', Component: SecureFileDownloadPage },
  { title: 'Shadow DOM', path: 'shadow-dom', Component: ShadowDomPage },
  { title: 'Shifting Content', path: 'shifting-content', Component: ShiftingContentPage },
  { title: 'Slow Resources', path: 'slow-resources', Component: SlowResourcesPage },
  { title: 'Sortable Data Tables', path: 'sortable-data-tables', Component: SortableDataTablesPage },
  { title: 'Status Codes', path: 'status-codes', Component: StatusCodesPage },
  { title: 'Tooltip', path: 'tooltip', Component: TooltipPage },
  { title: 'Typos', path: 'typos', Component: TyposPage },
  { title: 'WYSIWYG Editor', path: 'wysiwyg-editor', Component: WysiwygEditorPage },
];

// Child routes, kept off the index list just as the reference site keeps them off its own.
const variants: UIExample[] = [
  { title: 'Dynamic Loading', path: 'dynamic-loading/:variant', Component: DynamicLoadingVariantPage, hidden: true },
  { title: 'Shifting Content', path: 'shifting-content/:variant', Component: ShiftingContentVariantPage, hidden: true },
  { title: 'Multiple Windows', path: 'multiple-windows/:id', Component: WindowPage, hidden: true },
  { title: 'Status Codes', path: 'status-codes/:code', Component: StatusCodePage, hidden: true },
  { title: 'Secure Area', path: 'secure', Component: SecurePage, hidden: true },
  { title: 'Redirected', path: 'redirect-page', Component: RedirectLandingPage, hidden: true },
];

export const examples: UIExample[] = [...available, ...variants];
