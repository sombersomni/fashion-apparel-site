<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'cartpage',
    watch: {
        $route(to, from) {
            if (to.name == 'cart' || to.name == 'cartpage' || to.name == 'cartbuy') {
                window.scrollTo(0,0);
            }
        }
    },
}
</script>