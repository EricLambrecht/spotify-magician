import Vue from 'vue';

/*
 * NOTE: Although this doesn't scale very well, there is currently no other way to make
 * WebStorm etc. recognize the base components than to state them explicitly.
 *
 * Apart from that, this is also the approach that big libraries like element-ui take.
 */

import Button from './Button.vue';
import Container from './Container.vue';
import ContextMenu from './ContextMenu.vue';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import Grid from './Grid.vue';
import GridColumn from './GridColumn.vue';
import GridRow from './GridRow.vue';
import Headline from './Headline.vue';
import LabeledElement from './LabeledElement.vue';
import Link from './Link.vue';
import List from './List.vue';
import ListItem from './ListItem.vue';
import Modal from './Modal.vue';
import NumberInput from './NumberInput.vue';
import Paragraph from './Paragraph.vue';
import SquareImage from './SquareImage.vue';
import Text from './Text.vue';
import TextInput from './TextInput.vue';

Vue.component('b-button', Button);
Vue.component('b-column', GridColumn);
Vue.component('b-container', Container);
Vue.component('b-context-menu', ContextMenu);
Vue.component('b-dropdown', Dropdown);
Vue.component('b-dropdown-item', DropdownItem);
Vue.component('b-grid', Grid);
Vue.component('b-headline', Headline);
Vue.component('b-labeled-element', LabeledElement);
Vue.component('b-link', Link);
Vue.component('b-list', List);
Vue.component('b-list-item', ListItem);
Vue.component('b-modal', Modal);
Vue.component('b-number-input', NumberInput);
Vue.component('b-paragraph', Paragraph);
Vue.component('b-square-image', SquareImage);
Vue.component('b-row', GridRow);
Vue.component('b-text', Text);
Vue.component('b-text-input', TextInput);
