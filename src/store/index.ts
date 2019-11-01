import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  getters: {
    cartCount: (state: any) => state.cart.length,
  },
  mutations: {
    addToCart(state: any, payload: any) {
      state.cart.push(payload.item);
    }
  },
  actions: {
  },
  modules: {
  },
})
