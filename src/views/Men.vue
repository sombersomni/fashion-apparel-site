<template>
    <keep-alive>
        <Products page="men"/>
    </keep-alive>
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