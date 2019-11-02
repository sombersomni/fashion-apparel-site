<template>
    <div class="main-container">
        <div class="header-container">
            <img 
                src="../assets/imgs/feature/blonde-beauty-header.jpg" 
                aria-label="summer girl"/>
        </div>
        <keep-alive>
            <Products page="women"/>
        </keep-alive>
    </div>
</template>

<script>
import Products from '../components/Products.vue';

export default {
    name: 'women',
    components: {
        Products,
    },
};

</script>

<style scoped>
.header-container {
    position: relative;
    width: 100vw;
    height: 200px;
    overflow: hidden;
}
img { 
    position: absolute;
    width: 100vw;
    min-width: 600px;
    left: 0;
    top: -100px;
}
</style>