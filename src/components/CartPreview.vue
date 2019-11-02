<template>
    <div 
        v-show="open || stayOpen"
        :style="{left: (leftOffset - 200) + 'px'}"
        class="cart-preview"
        ref="cartPreview"
        @mouseenter="onPreviewEnter()"
        @mouseleave="onPreviewLeave()">
        <div class="cart-preview-item-container">
            <div
                v-for="item in $store.state.cart"
                :key="item.id"
                class="cart-preview-item"
            >
                <img :src="'/imgs' + item.product_img" aria-label="item.name"/>
                    <div class="cart-preview-info">
                    <h5 style="text-transform: uppercase;">{{item.name}}</h5>
                    <p>${{item.price}}.00</p>
                    <h6>quantity: {{item.quantity}}</h6>
                </div>
            </div>
        </div>
        <div class="cart-preview-checkout">
            <p>Subtotal - ${{subTotal}}</p>
            <button class="shop-btn">Checkout</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props: {
        leftOffset: {
            type: Number,
            required: true,
        },
        open: {
            type: Boolean,
            default: false,
        },
    },
})
export default class CartPreview extends Vue {
    private stayOpen: boolean = false;

    mounted() {
        console.log(this.$refs);
        this.$refs.cartPreview.scrollTop = 0;
    }
    get subTotal() {
        return this.$store.getters.subTotal;
    }
    private onPreviewEnter() {
        this.stayOpen = true;
        this.$emit('onPreview', true);
    }
      private onPreviewLeave() {
        this.stayOpen = false;
        this.$emit('onPreview', false);
    }
}
</script>

<style scoped>
    .cart-preview {
        top: 60px;
        position: absolute;
        background: white;
        width: 225px;
        min-width: 200px;
        height: auto;
        z-index: 98;
    }
    .cart-preview-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        padding: 10px;
        border-bottom: 1px solid #333;
    }
    .cart-preview-item-container {
        display: flex;
        flex-direction: column;
        max-height: 400px;
        min-height: 200px;
        overflow-y: scroll;
    }
    .cart-preview-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0px 10px;
    }
    .cart-preview-checkout {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        padding: 20px;
    }

    .cart-preview-checkout > button {
        width: 120px;
        height: 40px;
        background: black;
        color: white;
    }

    img {
        width: 75px;
    }
    h3,h4,h5,h6 {
        margin: 0;
        text-align: left;
    }

    p {
        font-size: 0.75em;
        margin: 10px 5px;
    }
</style>