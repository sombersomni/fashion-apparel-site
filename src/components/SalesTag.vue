<template>
    <div class="sale-container">
        <h6>
            {{sale}} %
            <br>
            off
        </h6>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props: {
        sale: {
            type: Number,
            required: true,
            default: 0,
        },
    },
})
export default class SalesTag extends Vue {}
</script>

<style scoped>
.sale-container {
    padding: 10px;
    border-radius: 50%;
    background: white;
    position: absolute;
    z-index: 10;
    box-shadow: 1px 1px 4px 1px #666;
    top: 10px;
    right: 10px;
}
h5,h6 {
    margin: 0;
    text-align: center;
    font-style: italic;
}
</style>