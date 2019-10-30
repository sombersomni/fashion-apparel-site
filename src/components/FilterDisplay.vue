<template>
    <div class='filter-display'>
        <section class="color-filter">
            <h4>Colors</h4>
            <hr>
            <Selection label="label" />
        </section>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Selection from './Selection.vue';

@Component({
    components: {
        Selection,
    },
})
export default class FilterDisplay extends Vue {}
</script>

<style>
.filter-display {
    min-width: 200px;
    width: 300px;
    height:100vh;
    margin: 0px 10px;
    display: flex;
    flex-direction: column;
}
</style>