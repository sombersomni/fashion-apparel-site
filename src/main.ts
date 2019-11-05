import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortUp, faSortDown, faHeart as solidHeart } from '@fortawesome/pro-solid-svg-icons';
import { faCheck, faHeart, faShoppingBag, faTimes, faBars, faTruck, faBagsShopping, faGift } from '@fortawesome/pro-regular-svg-icons';
import { faPlusCircle, faSlidersH, faArrowRight} from '@fortawesome/pro-light-svg-icons';
import { faTwitter, faInstagram, faVuejs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';

library.add(faTwitter, faVuejs, faInstagram, faCheck, faSortUp, faSortDown, faHeart, solidHeart, faShoppingBag, faPlusCircle, faTimes, faBars, faSlidersH, faTruck, faArrowRight, faBagsShopping, faGift);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
