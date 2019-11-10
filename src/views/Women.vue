<template>
    <div class="main-container">
        <SaleHeader 
            img="/imgs/feature/blonde-beauty-header.jpg"
            label="summer girl"
            saleMsg="Get free shipping if your purchase is more than $100" />
        <keep-alive>
            <Products page="women"/>
        </keep-alive>
    </div>
</template>

<script>
import Products from '../components/Products.vue';
import SaleHeader from '../components/SaleHeader.vue';
export default {
    name: 'women',
    components: {
        Products,
        SaleHeader,
    },
};

</script>

<style scoped>
</style>