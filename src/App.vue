<template>
  <div id="app">
    <Navigation />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },
  watch: {
    $route(to, from) {
      window.scrollTo(0, 0);
    },
  },
  methods: {
    manageResize(e) {
      this.$store.commit('setMobile', e.target.innerWidth);
    },
  },
  mounted() {
    const savedCartState = window.localStorage.getItem('cartState');
    if (savedCartState) {
      const parsedCartState = JSON.parse(savedCartState);
      this.$store.commit({ type: 'updateCart', cart: parsedCartState.cart, onAuto: true });
    }
    this.$store.commit('setMobile', window.innerWidth);
    window.addEventListener('resize', this.manageResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.manageResize);
  },
};
</script>

<style>
#app {
  margin: 0;
  overflow-x: hidden;
}
</style>
