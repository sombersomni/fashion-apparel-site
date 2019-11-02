<template>
  <div id="app">
    <Navigation />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from './components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  mounted() {
    const savedCartState = window.localStorage.getItem('cartState');
    if (savedCartState) {
      const parsedCartState = JSON.parse(savedCartState);
      this.$store.commit({ type: 'updateCart', cart: parsedCartState.cart });
    }
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
}
</style>
