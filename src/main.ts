import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortUp, faSortDown, faHeart as solidHeart } from '@fortawesome/pro-solid-svg-icons';
import { faCheck, faHeart, faShoppingBag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';

library.add(faCheck, faSortUp, faSortDown, faHeart, solidHeart, faShoppingBag);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
