import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import CartItem from '../model/CartItem';

export default new Vuex.Store({
  state: {
    cart: [],
    mobile: false,
    currentWidth: 0,
    onAuto: false,
    shipping: 10,
  },
  getters: {
    cartCount: (state: any) => state.cart.reduce(
      (accum: number, currentVal: CartItem) => accum + currentVal.quantity, 0),
    subTotal: (state: any) => {
        const totalPrice = state.cart.reduce(
          (accum: number, currentVal: CartItem) => accum + currentVal.price * currentVal.quantity, 0);
        const shipping = totalPrice > 100 ? 0 : 10;
        state.shipping = shipping;
        const priceAfterTax = totalPrice + (totalPrice * .0625);
        return priceAfterTax.toFixed(2);
    },
  },
  mutations: {
    setMobile(state: any, width: number) {
      state.mobile = width <= 600;
      state.currentWidth = width;
    },
    updateCart(state: any, payload: any) {
      state.cart = payload.cart.slice();
      state.onAuto = payload.onAuto ? true : false;
    },
    changeItemQuantity(state: any, payload: any) {
      const { id, quantity } = payload;
      const foundIndex = state.cart.findIndex((product: CartItem) => product.id === id );
      state.cart[foundIndex].quantity = quantity;
      const saveState = {cart: state.cart.slice()};
      window.localStorage.setItem('cartState', JSON.stringify(saveState));
    },
    addToCart(state: any, payload: any) {
      const { item } = payload;
      const foundIndex = state.cart.findIndex((product: CartItem) => product.id === item.id );
      if (foundIndex === -1) {
        state.cart.push(item);
      } else {
        state.cart[foundIndex].quantity++;
      }
      const saveState = {cart: state.cart.slice()};
      window.localStorage.setItem('cartState', JSON.stringify(saveState));
    },
    removeFromCart(state: any, payload: any) {
      const { id } = payload;
      const foundIndex = state.cart.findIndex((product: CartItem) => product.id === id );
      state.cart.splice(foundIndex, 1);
      const saveState = {cart: state.cart.slice()};
      window.localStorage.setItem('cartState', JSON.stringify(saveState));
    },
  },
  actions: {
  },
  modules: {
  },
});
