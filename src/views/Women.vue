<template>
    <keep-alive>
        <Products page="women"/>
    </keep-alive>
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