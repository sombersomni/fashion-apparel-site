<template>
    <nav>
        <router-link to="/"><h3>Apparel</h3></router-link>
        <div class="menu-item"><router-link to="/men">Men</router-link></div>
        <div class="menu-item"><router-link to="/women">Women</router-link></div>
    </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

export default class Navigation extends Vue {

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


</style>