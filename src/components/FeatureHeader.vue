<template>
  <div class="main-container">
    <div class="feature-header-container">
      <div id="feature-title">
        <h1>{{ companyName }}</h1>
        <h3>Apparel.</h3>
        <div class="underline"></div>
        <p class="desc">Stay fresh but professional</p>
        <div>
           <router-link to="/men"><button class="shop-btn">Shop Men</button></router-link>
          <router-link to="/women"><button class="shop-btn">Shop Women</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  props: {
    companyName: String,
  },
})
export default class FeatureHeader extends Vue {}
</script>

<style scoped>
h1,
h2,
h3 {
  font-style: italic;
}
img {
  width: 100vw;
}

.feature-header-container {
  background: url("../assets/imgs/feature/header.jpg") no-repeat;
  background-size: cover;
  background-position-x: right;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
.underline {
  border-bottom: 2px solid white;
  width: 90%;
}
#feature-title {
  position: absolute;
  top: 85px;
  left: 25px;
  width: 300px;
  height: auto;
}

.shop-btn {
  margin-right: 10px;
  padding: 5px 10px;
  border: 2px solid #333;
  font-weight: bold;
  background: transparent;
  transform: scale(1);
}
.shop-btn:hover {
  cursor: pointer;
  transform: scale(0.95);
}
</style>