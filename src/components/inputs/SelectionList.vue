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

<script>
import Selection from './Selection.vue';

export default {
    name: 'SelectionList',
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
  data() {
      return {
          sortStyle : {
                marginTop: '5px',
                padding: '5px',
                cursor: 'pointer',
                background: 'transparent',
                width: '100px',
            },
            resetFilterList: true,
            numOfSelected: 0,
            limit: 5,
            optionLength: 0,
            showMore: false,
            sortOn: true,
      };
  },
  mounted() {
      this.sortOn = this.$props.filterLabel.toLowerCase() === 'type';
  },
  methods: {
      getCriteria(
        name,
        crit,
    ) {
        const newCriteria = [{ label: 'All' }];
        for (const label in crit) {
            if (crit.hasOwnProperty(label)) {
                const count = crit[label];
                const newCrit = { label, count };
                newCriteria.push(newCrit);
            }
        }
        this.optionLength = newCriteria.length;
        return newCriteria;
    },
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    toggleSort() {
      this.sortOn = !this.sortOn;
    },
    closeFilter(e) {
      e.stopPropagation();
      const isFilterLabel = (e.target.nodeName === 'DIV' && e.target.className === 'filter-label');
      const isFilter = (e.target.nodeName === 'DIV' && e.target.className === 'filter');
      const isHeader = (e.target.nodeName === 'H4' || e.target.nodeName === 'H1');
      if (isFilterLabel || isFilter || isHeader) {
          this.$emit('onCloseFilter', false);
      }
    },
     updateFilter(data, filterLabel) {
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
  },
  watch: {
      $route(to, from) {
          if (to.name === 'men' || to.name === 'women') {
              this.sortOn = this.$props.filterLabel.toLowerCase() === 'type';
          }
      }
  }
};


  




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
    margin-top: 5px;
    text-align: center;
}
.filter-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>