<template>
    <nav>
        <router-link to="/"><h3>Apparel</h3></router-link>
        <div class="menu-item"><router-link to="/men">Men</router-link></div>
        <div class="menu-item"><router-link to="/women">Women</router-link></div>
        <div class="cart-icon">
            <font-awesome-icon :icon="['far', 'shopping-bag']" />
            <div 
                class="shop-count"
                v-if="cartCount > 0">{{cartCount}}</div>
        </div>
    </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
    get cartCount() {
        return this.$store.getters.cartCount;
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
    h3 {
        margin: 0px 25px;
    }

    .menu-item {
        font-weight: bold;
        margin: 0px 10px;
    }

    .cart-icon {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .shop-count {
        text-align: center;
        margin: 0px 5px;
        color: #333;
        font-size: 0.75em;
        font-weight: bold;
    }
</style>