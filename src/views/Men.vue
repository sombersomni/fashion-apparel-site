<template>
    <div class="main-container">
      <SaleHeader 
        img="/imgs/feature/blonde-cool-header.jpg" 
        label="summer boy"
        saleMsg="Get free shipping if your purchase is more than $100" />
        <keep-alive>
            <Products page="men"/>
        </keep-alive>
    </div>
</template>

<script>
import Products from '../components/Products.vue';
import SaleHeader from '../components/SaleHeader.vue';
export default {
    name: 'men',
    components: {
        Products,
        SaleHeader,
    },
};
</script>
