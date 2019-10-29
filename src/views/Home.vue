<template>
  <div>
    <FeatureHeader companyName="Somni" />
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
