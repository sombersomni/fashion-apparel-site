<template>
    <div class="cart-product-container">
        <div 
            v-show="openConfirm"
            class="confirm-modal">
            <div>
                <p>Are you sure you want to remove this item?</p>
                <div>
                    <button 
                        @click="removeItem(cartItem.id)" 
                        class="shop-btn checkout-btn">Yes</button>
                    <button
                        @click="closeConfirm()"
                        class="shop-btn checkout-btn">No</button>
                </div>
            </div>
        </div>
        <div>
            <img 
                :style="{ width: ($store.state.mobile ? 75 : 100) + 'px' }"
                :src="'/imgs' + cartItem.product_img" />
        </div>
        <div class="cart-product-details">
            <h4>{{cartItem.name}}</h4>
            <p>
                Color: {{colorName}}<br/>
                Size: <span>{{cartItem.size}}</span><br/>
                Sku: {{cartItem.id}}<br/>
                Quantity: {{cartItem.quantity}}
            </p>
        </div>

        <div>
            <p>${{cartItem.price}}.00</p>
            <select
                @change="changeQuantity()"
                ref="selectRefMobile"  
                v-show="$store.state.mobile">
                <option 
                    v-for="n in maxQuantity"
                    :key="n"
                    :value="n">{{n}}</option>
            </select>
        </div>
        <div 
            v-show="!$store.state.mobile">
            <select 
                @change="changeQuantity($event, cartItem.id)"
                ref="selectRef"  
                v-show="!$store.state.mobile">
                <option 
                    v-for="n in maxQuantity"
                    :key="n"
                    :value="n">{{n}}</option>
            </select>
        </div>
        <div 
            @click="confirmRemoval()"
            class="close-btn">
            <font-awesome-icon :icon="['far', 'times']" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CartItem from '../model/CartItem';

@Component({
    name: 'CartProduct',
    props: {
        cartItem: {
            type: Object,
            required: true,
        },
    },
})
export default class CartProduct extends Vue {
    private maxQuantity: number = 5;
    private openConfirm: boolean = false;
    mounted() {
        this.$refs.selectRef.value = this.cartItem.quantity;
        this.$refs.selectRefMobile.value = this.cartItem.quantity;
    }
    private changeQuantity(e: any, id: string) {
        const quantity = parseInt(e.target.value);
        this.$store.commit({ type: 'changeItemQuantity', id, quantity });
    }
    private confirmRemoval() {
        this.openConfirm = true;
    }
    private closeConfirm() {
        this.openConfirm = false;
    }
    private removeItem(id: string) {
        this.openConfirm = false;
        this.$store.commit({ type: 'removeFromCart', id });
    }
    get colorName() {
        const colorName: string =  this.$props.cartItem.color;
        return colorName.includes('pattern') ? colorName.replace('/patterns/', '') : colorName;
    }
}
</script>

<style scoped>
.cart-product-container {
    position: relative;
    text-align: left;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 10px 0px;
    border-top: 1px solid #333;
}

.cart-product-container > div {
    flex-grow: 1;
}

.cart-product-details > h4,h5,h6 {
    text-transform: capitalize;
    margin: 0px 0px 5px 0px;
}

.cart-product-details { 
    padding: 0px 10px;
}

.close-btn {
    margin: 0px 10px;
    opacity: 1;
    transition: opacity 1s;
}

.close-btn:hover {
    opacity: 0.7;
    cursor: pointer;
}

.confirm-modal {
    background: rgba(255,255,255,0.9);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
    z-index: 30;
}

.confirm-modal button {
    background: white;
    margin: 10px;
}

.confirm-modal > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span {
    text-transform: uppercase;
}
select {
    width: 50px;
    height: 25px;
    border: 2px solid black;
}
p {
    margin: 0;
}
</style>