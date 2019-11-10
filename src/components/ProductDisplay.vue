<template>
    <div ref="productDisplay" class="product-display-container">
        <router-link exact :to="'/' + gender + '/' + id">
            <div
                class="product-display"
                :style="{ 
                    width: ($store.state.mobile ? 140 : 280) + 'px',
                    margin: $store.state.mobile ? '0px 5px' : '0px 10px'}">
                <SalesTag v-if="sale > 0" :sale="sale"/>
                <div 
                    :style="{
                        width: ($store.state.mobile ? 140 : 280) + 'px',
                        height: ($store.state.mobile ? 200 : 400) + 'px'}"
                    class="img-frame">
                    <img 
                    :src="imgsEndpoint + feature_img" 
                    :aria-label="name"/>
                </div>
                <div class="product-display-info">     
                    <h5>{{name}}</h5>
                    <div class="color-container">
                        <h6>color set | </h6>
                        <div
                            v-for="color in colors"
                            :key="color"
                            :style="{background: color.includes('pattern') ? `url(/imgs${color}.jpg)` : color}"
                            class="color-profile"
                            >
                        </div>
                    </div>
                    <p>
                        <span :style="{ color: sale > 0 ? 'red' : '#333'}">${{price}}</span>
                        <span v-if="sale > 0"> (reduced price)</span>
                    </p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import SalesTag from './SalesTag.vue';
import anime from 'animejs';

export default {
    name: 'ProductDisplay',
    components: {
        SalesTag,
    },
    data() {
        return {
            imgsEndpoint: '/imgs',
        };
    },
    props: {
        index: {
            type: Number,
        },
        id: {
            type: String,
            required: true,
        },
        feature_img: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        colors: {
            type: Array,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        sale: {
            type: Number,
            default: 0,
        },
    },
    watch: {
        $route(to, from) {
            if (to.name === 'men' || to.name === 'women') {
                   anime({
                        targets: this.$refs.productDisplay,
                        opacity: 1,
                        translateY: [-50, 0],
                        delay: this.$props.index * 200,
                        loop: 1,
                    });
            }
        },
    },
    mounted() {
        anime({
            targets: this.$refs.productDisplay,
            opacity: 1,
            translateY: [-25, 0],
            delay: this.$props.index * 200,
            loop: 1,
        });
    },
};
</script>

<style scoped>
img {
    width: 100%;
}

.product-display-container {
    opacity: 0;
}

.img-frame {
    overflow: hidden;
}
.color-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.color-profile {
    width: 13px;
    height: 13px;
    border: 2px solid black;
}

h1,h2,h3,h4, h5, h6 {
    margin: 0;
}

.color-container > h6 {
    margin-right: 5px;
}
.product-display {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 300px;
    text-align: left;
    position: relative;
    cursor: pointer;
}

.product-display-info {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
}

.product-display-info > p {
    font-size: 0.75em;
    font-style: italic;
    margin: 0;
    margin-top: 5px;
}
</style>