<template>
    <section 
        class="filter-container"
        @click="closeFilter($event)">
      <div class="filter-label">
        <h4>{{filterLabel}}</h4>
        <font-awesome-icon 
            :icon="['fas', sortOn ? 'sort-up' : 'sort-down']" 
            :style="sortStyle" 
            @click="toggleSort()"/>
      </div>
      <div v-show="sortOn" >
        <div class="filter">
            <Selection
            v-for="attr in getCriteria(filterLabel, filterValues).slice(0, showMore ? optionLength : limit)"
            :key="attr.label"
            :label="attr.label"
            :count="attr.count ? attr.count : 0"
            :type="filterLabel"
            :keepCount="attr.label !== 'All'"
            @onSelectedFilter="updateFilter($event, filterLabel)"
            @undoReset="resetFilterList = false"
            :reset="resetFilterList"
            :onlyAll="numOfSelected === 0"
            />
        </div>
        <button 
            class="show-btn"
            v-if="optionLength > limit"
            @click="toggleShowMore()">show {{ showMore ? 'less' : 'more' }}
        </button>
      </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Selection from './Selection.vue';

@Component({
  components: {
    Selection,
  },
  props : {
      filterLabel: {
          type: String,
          required: true,
      },
      filterValues: {
          type: Object,
          required: true,
      },
  },
})
export default class SelectionList extends Vue {

  public sortStyle: any = {
      marginTop: '5px',
      padding: '5px',
      cursor: 'pointer',
      background: 'transparent',
      width: '100px',
  };
  public resetFilterList: boolean = true;
  public numOfSelected: number = 0;

  private limit: number = 5;
  private optionLength: number = 0;
  private showMore: boolean = false;
  private sortOn: boolean = true;

  public getCriteria(
    name: string,
    crit: any,
  ): Array<{ label: string; count?: number }> {
    const newCriteria = [{ label: 'All' }];
    for (const label in crit) {
      if (crit.hasOwnProperty(label)) {
        const count: number = crit[label];
        const newCrit: { label: string; count?: number } = { label, count };
        newCriteria.push(newCrit);
      }
    }
    this.optionLength = newCriteria.length;
    return newCriteria;
  }

  public toggleShowMore() {
      this.showMore = !this.showMore;
  }

  public toggleSort() {
      this.sortOn = !this.sortOn;
  }

  public closeFilter(e: any) {
      e.stopPropagation();
      const isFilterLabel: boolean = (e.target.nodeName === 'DIV' && e.target.className === 'filter-label');
      const isFilter: boolean = (e.target.nodeName === 'DIV' && e.target.className === 'filter');
      const isHeader: boolean = (e.target.nodeName === 'H4' || e.target.nodeName === 'H1');

      if (isFilterLabel || isFilter || isHeader) {
          this.$emit('onCloseFilter', false);
      }
  }

  public updateFilter(data: { filterValue: string, action: string }, filterLabel: string) {
      const { filterValue, action } = data;
      if (filterValue.toLowerCase() === 'all') {
          if (action === 'add') {
              this.resetFilterList = true;
              this.numOfSelected = 0;
          }
      } else {
          if (action === 'add') {
              this.numOfSelected++;
          } else {
              this.numOfSelected--;
          }
          this.resetFilterList = this.numOfSelected === 0;
      }
      this.$emit('onUpdateFilter', { ...data, filterType: filterLabel, refresh: this.resetFilterList});
  }
}
</script>

<style scoped>
h1,h2,h3,h4,h5,h6 {
    text-transform: capitalize;
}
.show-btn {
    background: #333;
    border: none;
    padding: 5px 10px;
    color: white;
}
h4 {
    margin: 0;
    padding: 0;
}

.filter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    transition: height 1s;
}

.filter-label {
    border-bottom: 2px solid #333;
    width: 100%;
    height: 50px;
    padding-top: 5px;
    text-align: center;
}
.filter-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>