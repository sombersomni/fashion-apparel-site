<template>
    <div class="main-container">
        <div class="cart-container">
            <div 
                :style="{ 
                    minWidth: ($store.state.mobile ? 250 : 600) + 'px',
                    width: ($store.state.mobile ? 80 : 100) + '%',
                    margin: $store.state.mobile ? '0px 10px' : '0px 20px'}"
                class="cart-items">
                <h2>My Shopping Cart ({{cartCount}})</h2>
                <div class="cart-items-header">
                    <h4>Item</h4>
                    <h4>Description</h4>
                    <h4>Price <span v-show="$store.state.mobile">/ Quantity</span></h4>
                    <h4 v-show="!$store.state.mobile">Quantity</h4>
                </div>
                <div 
                    v-if="$store.state.cart.length > 0">
                    <CartProduct 
                        v-for="cartItem in $store.state.cart"
                        :key="cartItem.id"
                        :cartItem="cartItem"/>
                </div>
                <p v-else> Your cart is currently empty! </p>
                <div class="cart-items-footer">
                    <div>
                        <p>Subtotal</p>
                        <p>Shipping</p>
                        <p>Estimated Total</p>
                    </div>
                    <div>
                        <p>${{subTotal}}</p>
                        <p>{{$store.state.shipping === 0 ? 'free' : `$${$store.state.shipping}.00`}}</p>
                        <p>${{estimatedTotal}}</p>
                    </div>
                </div>
                <div class="cart-items-nav">
                    <button
                        @click="goShopping()"
                        class="shop-btn checkout-btn">Continue Shopping</button>
                    <button 
                        @click="proceedToCheckout()"
                        style="background: black; color: white;"
                        class="shop-btn checkout-btn">Continue Checkout</button>
                </div>
            </div>
            <div 
                v-show="$store.state.currentWidth >= 900"
                class="cart-items-extras">
                <div class="payment-info">
                    <h4>Free Returns Worldwide</h4>
                    <p>Shop with confidence with Free Returns.</p>
                    <h4>We accept</h4>
                    <div class="payement-icons">
                        <font-awesome-icon 
                            class="payment-icon"
                            v-for="payType in acceptedPaymentMethods"
                            :key="payType"
                            size="2x"
                            :icon="['fab', 'cc-' + payType]" />
                    </div>
                    <h4>Secure shopping</h4>
                    <p>We are committed to respecting your privacy and complying with applicable laws 
                        and regulations to ensure that the personal information you give us is kept 
                        appropriately secure and processed fairly and lawfully.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CartProduct from '../components/CartProduct';

export default {
    name: 'cart',
    components: {
        CartProduct,
    },
    data() {
        return {
            acceptedPaymentMethods: [ 'amex', 'discover', 'mastercard', 'visa', 'paypal'],
        };
    },
    methods: {
        goShopping() {
            this.$router.push('/');
        },
        proceedToCheckout() {
            this.$router.push('/checkout');
        },
    },
    computed: {
        cartCount() {
            return this.$store.getters.cartCount;
        },
        subTotal() {
            return this.$store.getters.subTotal;
        },
        estimatedTotal() {
            const subTotalParsed = parseFloat(this.$store.getters.subTotal);
            const shipping = parseFloat(this.$store.state.shipping);
            const total = subTotalParsed  + shipping;
            return parseFloat(total).toFixed(2);
        },
    },
};
</script>

<style scoped>
.cart-container {
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
}

.cart-container > div {
    margin: 0px 25px;
}

.cart-container > div:nth-child(1) {
    order: 0;
    flex-grow: 3;
}

.cart-container > div:nth-child(2) {
    order: 1;
    flex-grow: 1;
}

.cart-items-header {
    text-align: left;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 10px 0px;
    border-top: 1px solid #333;
}
.cart-items-header > h4,h5,h6 {
    flex-grow: 1;
}

.cart-items-footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: #EEE;
    border-bottom: 1px solid #333;
}

.cart-items-footer > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-content: flex-start;
    text-align: right;
    padding: 25px;
}

.cart-items-footer > div > p {
    margin: 0; 
}

.cart-items-footer > div > p:nth-child(3) {
    font-weight: bold;
}

.cart-items-nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 10px 0;
}

.cart-items-extras {
    min-width: 200px;
    max-width: 300px;
    padding: 10px;
}

.cart-items-extras > div {
    padding: 25px;
    border: 1px solid #333;
    width: 80%;
}

.checkout-btn {
    padding: 10px 25px
}

.payment-icons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.payment-icon {
    margin: 5px;
}

h4,h5,h6 {
    text-transform: capitalize;
}

h1,h2 {
    text-align: left;
}
</style>