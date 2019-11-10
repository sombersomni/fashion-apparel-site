<template>
  <div class="header-container">
    <div 
        class="sale-msg" 
        :style="{width: animWidth ? '300px' : '10px'}"
        v-if="splitMsg.length > 3">
        <h2
         :style="{ 
             width: '200px'}">
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
import { Component, Vue } from 'vue-property-decorator';
@Component({
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
    watch: {
        $route(to, from) {
            if (from.name === 'men' || from.name === 'women') {
                this.animWidth = false;
            } else  if (to.name === 'men' || to.name === 'women') {
                setTimeout(() => {
                    this.animWidth = true;
                }, 200);
            }
        }
    }
})
export default class SaleHeader extends Vue {
    mounted() {
        this.splitMsg = this.saleMsg.split(' ');
        setTimeout(() => {
            this.animWidth = true;
        }, 200);
    }
}
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
    left: 50px;
    top: 75px;
    z-index: 40px;
    transition: width 1s;
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