<template>
    <div class="main-container">
        <div class="header-container">
            <img 
                src="../assets/imgs/feature/blonde-cool-header.jpg" 
                aria-label="summer boy"/>
        </div>
        <keep-alive>
            <Products page="men"/>
        </keep-alive>
    </div>
</template>

<script>
import Products from '../components/Products.vue';

export default {
    name: 'men',
    components: {
        Products,
    },
};
</script>

<style scoped>
.header-container {
    width: 100vw;
    height: 200px;
    overflow: hidden;
}
img { 
    width: 100vw;
    min-width: 500px;
}
</style>