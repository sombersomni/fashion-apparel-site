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
import Rx from 'rx-lite';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  private resizeSubscription: Rx.Subscription;
  mounted() {
    const savedCartState = window.localStorage.getItem('cartState');
    if (savedCartState) {
      const parsedCartState = JSON.parse(savedCartState);
      this.$store.commit({ type: 'updateCart', cart: parsedCartState.cart });
    }
    this.$store.commit('setMobile', window.innerWidth);
    const resize$ = Rx.Observable.fromEvent(window, 'resize').debounce(200);
    this.resizeSubscription = resize$.subscribe((e: any) => {
      this.$store.commit('setMobile', e.target.innerWidth);
    });

  }
  destroyed() {
    //this.resizeSubscription.unsubscribe();
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
