import Vue from 'vue';

/*
 * NOTE: Although this doesn't scale very well, there is currently no other way to make
 * WebStorm etc. recognize the base components than to state them explicitly.
 *
 * Apart from that, this is also the approach that big libraries like element-ui take.
 */

import Button from './Button';
import CheckboxButton from './CheckboxButton';
import Container from './Container';
import ContextMenu from './ContextMenu';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import Grid from './Grid';
import GridColumn from './GridColumn';
import GridRow from './GridRow';
import Headline from './Headline';
import LabeledElement from './LabeledElement';
import LightSwitch from './LightSwitch';
import Link from './Link';
import List from './List';
import ListItem from './ListItem';
import Modal from './Modal';
import NumberInput from './NumberInput';
import Paragraph from './Paragraph';
import RadioButtonGroup from './RadioButtonGroup';
import SquareImage from './SquareImage';
import Text from './Text';
import TextInput from './TextInput';

Vue.component('b-button', Button);
Vue.component('b-checkbox-button', CheckboxButton);
Vue.component('b-column', GridColumn);
Vue.component('b-container', Container);
Vue.component('b-context-menu', ContextMenu);
Vue.component('b-dropdown', Dropdown);
Vue.component('b-dropdown-item', DropdownItem);
Vue.component('b-grid', Grid);
Vue.component('b-headline', Headline);
Vue.component('b-labeled-element', LabeledElement);
Vue.component('b-light-switch', LightSwitch);
Vue.component('b-link', Link);
Vue.component('b-list', List);
Vue.component('b-list-item', ListItem);
Vue.component('b-modal', Modal);
Vue.component('b-number-input', NumberInput);
Vue.component('b-paragraph', Paragraph);
Vue.component('b-radio-button-group', RadioButtonGroup);
Vue.component('b-square-image', SquareImage);
Vue.component('b-row', GridRow);
Vue.component('b-text', Text);
Vue.component('b-text-input', TextInput);
