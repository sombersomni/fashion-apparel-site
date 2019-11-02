<template>
  <div 
    :style="{borderLeft: leftBorderOn ? '1px solid #333' : 'none'}" 
    class="product-select" 
    @click="toggleMiniMenu(label, otherOpen)">
    <p>{{label}}</p>
    <h5 :style="{textTransform: label === 'size' ? 'uppercase' : 'capitalize'}">{{selectionLabel}}</h5>
    <font-awesome-icon 
        :style="selectorCaretStyle" 
        :icon="['fas', flipCaret && !otherOpen ? 'sort-up' : 'sort-down']" />
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        props: {
            leftBorderOn: Boolean,
            otherOpen: {
                type: Boolean,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            selectionLabel: {
                type: String,
                required: true,
                default: '-',
            },
        },
    })
    export default class MiniMenu extends Vue {
        private flipCaret: boolean = false;
        private selectorCaretStyle = {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 10,
        };
        private toggleMiniMenu(label: string, otherOpen: boolean) {
            if (otherOpen) {
                this.flipCaret = true;
            } else {
                this.flipCaret = !this.flipCaret;
            }
            this.$emit('toggleMenu', { open: this.flipCaret, menuType: label});
        }
    }
</script>

<style scoped>
.product-select {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 50%;
    padding: 5px 25px;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
}
.product-select > p {
    text-transform: capitalize;
    margin: 10px;
}
</style>