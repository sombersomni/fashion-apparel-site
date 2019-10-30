<template>
    <div class="selection"
    >
        <div 
            class="check-square" 
            @click="onSelect()">
            <font-awesome-icon 
                v-if="toggleCheck"
                :icon="['far', 'check']"
                size="1x"
                :style="selectionState" /> 
        </div>
        <p>{{label}} {{keepCount ? `(${count})` : ""}}</p>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props: {
        label: {
            type: String,
            required: true,
        },
        keepCount: {
            type: Boolean,
            default: true,
        },
        count: {
            type: Number,
        },
    },
})
export default class Selection extends Vue {
    public toggleCheck: boolean = this.label === 'All';
    private selectionState = {
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: -1,
        left: 0,
        zIndex: 0,
        color: '#333',
    };

    public onSelect() {
        this.toggleCheck = !this.toggleCheck;
    }

}
</script>

<style scoped>
p {
    text-transform: capitalize;
    font-weight: bold;
}

.selection {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    font-style: italic;
    font-size: .8em;
    width: 125px;
}

.check-square {
    position: relative;
    border: 2px solid black;
    padding: 1px;
    margin: 0px 5px;
    width: 10px;
    height: 10px;
}
.check-square:hover {
    cursor: pointer;
}
</style>