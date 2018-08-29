import Vue from 'vue';

/*
 * NOTE: Although this doesn't scale very well, there is currently no other way to make
 * WebStorm etc. recognize the base components than to state them explicitly.
 *
 * Apart from that, this is also the approach that big libraries like element-ui take.
 */

import headline from './Headline.vue';
import paragraph from './Paragraph.vue';
import link from './Link.vue';

Vue.component('b-headline', headline);
Vue.component('b-paragraph', paragraph);
Vue.component('b-link', link);
