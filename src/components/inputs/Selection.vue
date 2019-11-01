<template>
    <div class="selection"
    >
        <div 
            class="check-square" 
            @click="onSelect(label)">
            <font-awesome-icon 
                v-if="onCheck(label, reset, onlyAll)"
                :icon="['far', 'check']"
                size="1x"
                :style="selectionState" /> 
        </div>
        <p :style="{textTransform: type === 'sizes' ? 'uppercase' : 'capitalize'}">{{label}} {{keepCount ? `(${count})` : ""}}</p>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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
        onlyAll: {
            type: Boolean,
            default: true,
        },
        reset : {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
        },
    },
})
export default class Selection extends Vue {
    public toggleCheck: boolean = this.label.toLowerCase() === 'all';
    private selectionState = {
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: -1,
        left: 0,
        zIndex: 0,
        color: '#333',
    };

    public onSelect(label: string) {
        this.toggleCheck = !this.toggleCheck;
        this.$emit('onSelectedFilter', { filterValue: label, action: this.toggleCheck ? 'add' : 'remove' });
    }

    public onCheck(label: string, reset: boolean, onlyAll: boolean) {
        if (reset || onlyAll) {
            this.toggleCheck = label.toLowerCase() === 'all';
        } else {
            if (label.toLowerCase() === 'all') {
                this.toggleCheck = false;
            }
        }
        return this.toggleCheck;
    }
}
</script>

<style scoped>
p {
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
    cursor: pointer;
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