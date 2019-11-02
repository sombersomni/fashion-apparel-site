import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import CartItem from '../model/CartItem';

export default new Vuex.Store({
  state: {
    cart: [],
  },
  getters: {
    cartCount: (state: any) => state.cart.reduce(
      (accum: number, currentVal: CartItem) => accum + currentVal.quantity, 0),
    subTotal: (state: any) => {
        const totalPrice = state.cart.reduce(
          (accum: number, currentVal: CartItem) => accum + currentVal.price * currentVal.quantity, 0);
        const priceAfterTax = totalPrice + (totalPrice * .0625);
        return priceAfterTax;
    },
  },
  mutations: {
    updateCart(state: any, payload: any) {
      state.cart = payload.cart.slice();
    },
    addToCart(state: any, payload: any) {
      const { item } = payload;
      const foundIndex = state.cart.findIndex((product: CartItem) => product.id === item.id );
      if (foundIndex === -1) {
        state.cart.push(payload.item);
      } else {
        state.cart[foundIndex].quantity++;
      }
      const saveState = {...state};
      window.localStorage.setItem('cartState', JSON.stringify(saveState));
    },
  },
  actions: {
  },
  modules: {
  },
});