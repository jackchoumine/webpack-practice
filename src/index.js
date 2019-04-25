import Vue from 'vue';
import App from './App';

import {library } from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(solid)
library.add(regular)
library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#hello',
  render: h => h(App)
});
