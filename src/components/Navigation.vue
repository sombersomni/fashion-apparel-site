<template>
    <div>
        <transition name="fade">
            <div 
                v-show="openCartPreview || previewOn"
                class="modal-bg"></div>
        </transition>
        <nav>
            <CartPreview 
                :leftOffset="cartOffset"
                :open="openCartPreview"
                @onPreview="previewOn = $event"/>
            <div 
                style="justify-content: flex-start;"
                class="menu-section menu-left">
                <router-link exact to="/">
                    <h3>
                        <font-awesome-icon :icon="['far', 'feather']" />
                        HiChi
                        <span style="font-size: 0.8em;">Apparel</span>
                    </h3>
                </router-link>
                <div class="menu-item"><router-link exact to="/men">Men</router-link></div>
                <div class="menu-item"><router-link exact to="/women">Women</router-link></div>
            </div>
            <div 
                style="justify-content: flex-end;"
                class="menu-section menu-right">
                <router-link exact to="/cart">
                    <div 
                        @click="onCartClick()"
                        @mouseenter="onCartEnter()"
                        @mouseleave="onCartLeave(cartOffDuration)"
                        ref="cartIcon"
                        class="cart-icon">
                        <font-awesome-icon :icon="['far', 'shopping-bag']" />
                        <div 
                            class="shop-count"
                            v-if="cartCount > 0">
                            {{cartCount}}
                        </div>
                    </div>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import CartPreview from '../components/CartPreview.vue';
export default {
    name: 'Navigation',
    components: {
        CartPreview,
    },
    props: {
        cartOffDuration: {
            type: Number,
            default: 2500,
        },
    },
    data() {
        return {
            cartOffset: 0,
            openCartPreview: false,
            previewOn: false,
            cartLeaveTimeout: null,
        };
    },
    mounted() {
        this.cartOffset = this.$refs.cartIcon.offsetLeft;
    },
    computed: {
        cartCount() {
            if (this.$refs.cartIcon && this.$store.getters.cartCount > 0) {
                if (!this.$store.state.onAuto) {
                    this.onCartEnter();
                    this.onCartLeave(2500);
                }
            }
            return this.$store.getters.cartCount;
        },
    },
    methods: {
        onCartClick() {
            if (this.cartLeaveTimeout) {
                window.clearTimeout(this.cartLeaveTimeout);
            }
            this.openCartPreview = false;
        },
        onCartEnter() {
            if (this.cartLeaveTimeout) {
                window.clearTimeout(this.cartLeaveTimeout);
            }
            this.cartOffset = this.$refs.cartIcon.offsetLeft;
            this.openCartPreview = true;
        },
        onCartLeave(duration) {
            this.cartLeaveTimeout = window.setTimeout(() => {
                this.openCartPreview = false;
            }, duration);
        },
    },
};
</script>

<style scoped>
    nav {
        position: fixed;
        display: flex;
        flex-direction: row;
        flex-wrap: no-wrap;
        justify-content: flex-start;
        align-items: center;
        background: white;
        width: 100vw;
        height: 60px;
        z-index: 90;
    }

    .menu-section {
        display: flex;
        align-items: center; 
        margin: 0px 25px;
    }

    .menu-left {
        flex-grow: 2;
    }

    .menu-right {
       flex-grow: 1; 
    }

    nav h3 {
        margin: 0px 10px 0px 0px;
        font-style: italic;
    }

    nav .menu-item {
        font-weight: bold;
        margin-right: 10px;
    }

    nav .cart-icon {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        opacity: 1;
        transition: opacity 1s;
    }

    nav .cart-icon:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    nav .shop-count {
        text-align: center;
        margin: 0px 5px;
        color: #333;
        font-size: 0.75em;
        font-weight: bold;
    }

    /* animation */
    .cycle-enter-active, .cycle-leave-active {
    transition: opacity .5s;
    }
    .cycle-enter, .cycle-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
    .cycle-enter-to, .cycle-leave /* .fade-leave-active below version 2.1.8 */ {
    opacity: 1;
    }
</style>