<template>
  <div clas="main-container">
    <div class="feature-header-container">
        <div 
          ref="featureTitle"
          :style="{ 
              left: $store.state.mobile ? '50%' : '10%',
              transform: $store.state.mobile ? 'translate(-50%, -50%)' : 'translate(0px,-50%)',
          }"
          id="feature-title">
          <div>
            <h1
              :style="{ 
                fontSize: $store.state.mobile ? '2em' : '3em' }">Meet the new Mobius Collection</h1>
            <div class="underline"></div>
            <h3>Reach new heights and alter your perception with our new attire</h3>
          </div>
        </div>
      <video 
        class="feature-media"
        v-if="canPlayVideo"
        :style="{ 
          transform: $store.state.mobile ? 'translateX(20%)' : 'translateX(0)' }"
        ref="videoRef" 
        autoplay muted loop>
        <source src="../assets/videos/hill-woman.mp4" type="video/mp4">
      Your browser does not support the video tag.
      </video>
      <img 
        v-else
       :style="{ transform: $store.state.mobile ? 'translateX(20%)' : 'translateX(0)' }"
        class="feature-media" 
        src='../assets/imgs/feature/header.jpg' 
        aria-label="feature" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import anime from 'animejs';
@Component({
  props: {
    companyName: String,
  },
  watch: {
    $route(to) {
      if (to.name === 'home') {
          anime({
            targets: this.$refs.featureTitle,
            width: [0, 300],
            duration: 3000,
            delay: 200,
            loop: 1,
        });
        this.$refs.videoRef.loop = true;
        this.$refs.videoRef.play();
      } else {
        this.$refs.videoRef.pause();
      }
    },
  },
})
export default class FeatureHeader extends Vue {
  private canPlayVideo: boolean = true;
  private largeHeight: boolean = true;
  public animateHeader: boolean = true;
  mounted() {
    this.largeHeight = window.innerHeight > 800;
    const check = this.$refs.videoRef.canPlayType('video/mp4');
    this.canPlayVideo = check.length > 0;
    anime({
      targets: this.$refs.featureTitle,
      width: [0, 300],
      duration: 3000,
      delay: 200,
      loop: 1,
    });
  }
}
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
  margin: 0;
  padding: 0;
  width: 100vw;
  height: auto;
  max-height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
}

#feature-title {
  position: absolute;
  height: auto;
  color: white;
  width: 0px;
  z-index: 10;
  top: 50%;
  overflow-x: hidden;
}

#feature-title > div {
  width: 300px;
  min-height: 300px;
}

#feature-title > h1 {
  padding: 20px;
}

.feature-media {
  min-height: 100vh;
  width: 1920px;
  min-width: 1280px;
}

.title-open-enter-active, .title-open-leave-active {
    transition: 1s;
}
.title-open-enter, .title-open-leave-to {
    width: 10px;
}
.title-open-enter-to, .title-open-leave {
    width: 300px;
}
</style>