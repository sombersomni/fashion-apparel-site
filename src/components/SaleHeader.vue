<template>
  <div class="header-container">
    <div 
        class="sale-msg" 
        ref="saleMsg"
        v-if="splitMsg.length > 3">
        <h2
         :style="{ 
             width: '225px'}">
         {{splitMsg.slice(0,3).join(' ')}}</h2>
        <h4
        :style="{ 
            width: '300px'}">
        {{splitMsg.slice(3).join(' ')}}</h4>
    </div>
    <img 
        :src="img" 
        :aria-label="label" />
  </div>
</template>

<script>
import anime from 'animejs';
export default {
    name: 'SaleHeader',
    props: {
        img: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: 'sale header',
        },
        saleMsg: {
            type: String,
        },
    },
    data() {
        return {
            splitMsg: [],
            animWidth: false,
        };
    },
     mounted() {
        this.splitMsg = this.saleMsg.split(' ');
        // anime({
        //     targets: this.$refs.saleMsg,
        //     width: [10, 300],
        //     delay: 200,
        //     duration: 3000,
        //     loop: 1,
        // });
    },
    watch: {
        $route(to, from) {
            if (to.name === 'men' || to.name === 'women') {
                //  anime({
                //     targets: this.$refs.saleMsg,
                //     width: [10, 300],
                //     delay: 200,
                //     duration: 1500,
                //     loop: 1,
                // });
            }
        },
    },
};

</script>

<style scoped>
.header-container {
    width: 100vw;
    height: 200px;
    overflow: hidden;
}
.sale-msg {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    left: 25px;
    top: 75px;
    z-index: 40px;
    overflow: hidden;
}

.sale-msg > h1,h2,h3,h4,h5,h6 {
    background: #333;
    color: white;
    padding: 10px;
    width: auto;
    margin: 0px;
    transition: opacity 1s;
    max-height: 30px;
    text-align: left;
}
img { 
    width: 100vw;
    min-width: 600px;
}
</style>