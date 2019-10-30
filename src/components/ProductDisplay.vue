<template>
    <div class="product-display">
        <SalesTag v-if="sale > 0" :sale="sale"/>
        <div class="img-frame">
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
                    :style="{background: color}"
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SalesTag from './SalesTag.vue';

@Component({
    components: {
        SalesTag,
    },
    props: {
        feature_img: {
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
})
export default class ProductDisplay extends Vue {
    private imgsEndpoint: string = 'http://localhost:8080/imgs';
}
</script>

<style scoped>
img {
    width: 100%;
}

.img-frame {
    width: 280px;
    height: 400px;
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
    width: 280px;
    text-align: left;
    margin: 0px 10px;
    position: relative;
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