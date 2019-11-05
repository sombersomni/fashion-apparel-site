<template>
  <div class="home-container">
    <FeatureHeader companyName="Somni" />
    <div 
    :style="{ flexDirection: $store.state.mobile ? 'column' : 'row' }"
    class="feature-small-container">
      <div 
        :style="{ 
          width: $store.state.mobile ? '100vw' : '50vw',
          height: $store.state.mobile ? '45vh' : '90vh'}"
        class='men-feature feature-small'>
         <router-link 
          to="/men">
            <div class="btn-container">
              <button class="shop-btn chunky-btn">Shop Men</button>
            </div>
          </router-link>
      </div>
      <div 
        :style="{ 
          width: $store.state.mobile ? '100vw' : '50vw',
          height: $store.state.mobile ? '45vh' : '90vh'}"
        class='women-feature feature-small'>
         <router-link 
          to="/women">
            <div class="btn-container">
             <button class="shop-btn chunky-btn">Shop Women</button>
            </div>
          </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import FeatureHeader from '@/components/FeatureHeader.vue';

export default {
  name: 'home',
  components: {
    FeatureHeader,
  },
};

</script>

<style scoped>
.btn-container {
    padding: 10px;
    background: white;
}

.home-container {
  width: 100vw;
  min-height: 100vh;
}
.feature-small {
  display: flex;
  justify-content: center;
  align-items: center;
}
.women-feature {
  background: url('../assets/imgs/women/forward-sports-bra-side.jpg') no-repeat;
  background-position: center;
  background-size: cover;
}
.men-feature {
  background: url('../assets/imgs/feature/daylight-robe.jpg') no-repeat;
  background-position: center;
  background-size: cover;
}

.feature-small-container {
  width: 100vw;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  max-height: 750px;
  overflow: hidden;
}

.chunky-btn {
  padding: 20px 25px;
  margin: 0;
}
</style>
