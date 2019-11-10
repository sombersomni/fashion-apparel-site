<template>
    <div class="cart-buy-container">
        <div class="cart-buy">
            <div class="purchase-summary">
                <h4>Order Summary</h4>
                <div>
                    <p>Subtotal</p>
                    <p>{{subTotal}}</p>
                </div>
                <div>
                    <p>Shipping</p>
                    <p>{{$store.state.shipping === 0 ? 'free' : $store.state.shipping}}</p>
                </div>
                <div>
                    <p>Estimated Total</p>
                    <p>${{estimatedTotal}}</p>
                </div>
            </div>
            <div class="demo-desc">
                <h1>Thank your for visiting</h1>
                <p>This site is a demo to showcase my programming skills in
                    creating an online store for potential clients. 
                    <br />
                    <font-awesome-icon 
                    size="1x"
                    :icon="['fab', 'vuejs']" />
                    ue framework used to create this single page exprience.
                </p>
                <h4 style="text-align: center;">Photography for the product showcase are credited to : </h4>
                <div
                    v-for="photographer in photographers"
                    :key="photographer.name">
                    <a 
                        target="_blank"
                        :href="photographer.site">{{photographer.name}}</a>
                </div>
                <p>If you have any questioons or need work done on your website, you can email me here: 
                    <a href="mailto:sombersomni@gmail.com">sombersomni@gmail.com</a> or
                    <a href="mailto:xavierjp1999@gmail.com">xavierjp1999@gmail.com</a>
                </p>
                <h4 style="text-align: center;">Visit my portfolio website <a target="_blank" href="https://somni.digital">somni.digital</a></h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cartbuy',
    data() {
        return {
            photographers: [
                {name: 'Konstantin V', site: 'https://www.pexels.com/@meduzakos'},
                {name: 'Shahi Zidan', site: 'https://www.instagram.com/shahiizidan/'},
                {name: 'Wendel Moretti', site: 'https://wendelmorettifotografia.46graus.com'},
                {name: 'Marco Trinidad', site: 'https://www.instagram.com/marco.dng/'},
                {name: 'Daria Shevtsova', site: 'https://www.dariashevtsova.com/'},
            ],
        }
    },
    computed: {
        subTotal() {
            return this.$store.getters.subTotal;
        },
        estimatedTotal() {
            const total = this.$store.getters.subTotal + this.$store.state.shipping;
            return parseFloat(total).toFixed(2);
        },
    },
}
</script>

<style scoped>
.cart-buy {
    width: 60vw;
    padding: 25px;
    display: flex;
    flex-direction: column;
}
.cart-buy-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.demo-desc {
    width: 60vw;
    padding: 25px;
    background: #AAA;
    color: #333;
}

.demo-desc > p {
    text-align: left;
    text-justify: newspaper;
}

.purchase-summary {
    background: #DDD;
    width: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
}
.purchase-summary > div > p {
    margin: 0;
}
.purchase-summary > div > p:nth-child(1) {
    float: left;
}
.purchase-summary > div > p:nth-child(2) {
    float: right;
}
</style>