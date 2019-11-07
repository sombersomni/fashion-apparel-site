<template>
  <div id="app">
    <Navigation />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

@Component({
  components: {
    Navigation,
    Footer,
  },
})
export default class App extends Vue {
  mounted() {
    const savedCartState = window.localStorage.getItem('cartState');
    if (savedCartState) {
      const parsedCartState = JSON.parse(savedCartState);
      this.$store.commit({ type: 'updateCart', cart: parsedCartState.cart, onAuto: true });
    }
    this.$store.commit('setMobile', window.innerWidth);
    window.addEventListener('resize', this.manageResize);
  }
  destroyed() {
    window.removeEventListener('resize', this.manageResize);
  }
  private manageResize(e) {
    this.$store.commit('setMobile', e.target.innerWidth);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  overflow-x: hidden;
}
</style>
