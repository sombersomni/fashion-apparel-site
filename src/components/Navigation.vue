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
                class="menu-section">
                <router-link exact to="/"><h3>Apparel</h3></router-link>
                <div class="menu-item"><router-link exact to="/men">Men</router-link></div>
                <div class="menu-item"><router-link exact to="/women">Women</router-link></div>
            </div>
            <div 
                style="justify-content: flex-end;"
                class="menu-section">
                <div 
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
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CartPreview from '../components/CartPreview.vue';
@Component({
    components: {
        CartPreview,
    },
    props: {
        cartOffDuration: {
            type: Number,
            default: 2500,
        },
    },
})
export default class Navigation extends Vue {
    public cartOffset: number = 0;
    public openCartPreview: boolean = false;
    public previewOn: boolean = false;
    public cartLeaveTimeout: any = null;
    mounted() {
        this.cartOffset = this.$refs.cartIcon.offsetLeft;
    }
    get cartCount() {
        if (this.$refs.cartIcon && this.$store.getters.cartCount > 0) {
            this.onCartEnter();
            this.onCartLeave(2500);
        }
        return this.$store.getters.cartCount;
    }
    public onCartEnter() {
        if (this.cartLeaveTimeout) {
            window.clearTimeout(this.cartLeaveTimeout);
        }
        this.cartOffset = this.$refs.cartIcon.offsetLeft;
        this.openCartPreview = true;
    }
    public onCartLeave(duration: number) {
        this.cartLeaveTimeout = window.setTimeout(() => {
            this.openCartPreview = false;
        }, duration);
    }
}
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
        flex-grow: 1;
        margin: 0px 25px;
    }
    nav h3 {
        margin: 0px 10px;
        font-style: italic;
    }

    .menu-item {
        font-weight: bold;
        margin-right: 10px;
    }

    .cart-icon {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        opacity: 1;
        transition: opacity 1s;
    }

    .cart-icon:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    .shop-count {
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