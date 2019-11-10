<template>
  <div style="margin-top: 20px;"> 
      <div v-show="openFilter"
        class="modal-bg"></div>
      <div class="wrapper">
        <div
          v-if="$store.state.mobile"
          class="filter-display-mobile-container"
          :style="{ 
            left: (openFilter ? -10 : -210) + 'px',
            position: hitScrollMark ? 'fixed' : 'absolute',
            top: (hitScrollMark ? 65 : 265) + 'px'}">
          <div 
            class="filter-tab"
            @click="onFilterTabClick()">
            <font-awesome-icon :icon="['fal', 'sliders-h']" />
            <p>filter</p>
          </div>
          <div class="filter-display-mobile">
            <h1>Filter</h1>
            <SelectionList 
              v-for="agg in aggregateData()"
              :key="agg[0]"
              :filterLabel="agg[0]"
              :filterValues="agg[1]"
              @onUpdateFilter="filterProducts($event)"
              @onCloseFilter="openFilter = $event"/>
          </div>
        </div>
        <div 
          v-else
          class="filter-display">
          <h1>Filter</h1>
          <SelectionList 
            v-for="agg in aggregateData()"
            :key="agg[0]"
            :filterLabel="agg[0]"
            :filterValues="agg[1]"
            @onUpdateFilter="filterProducts($event)"/>
        </div>
        <div class="products-container">
            <ProductDisplay 
                    v-for="(product, i) in filteredProducts"
                    :key="product.id"
                    :index="i"
                    :id="product.id"
                    :name="product.name"
                    :gender="product.gender"
                    :feature_img="product.feature_img"
                    :colors="product.colors"
                    :price="product.price"
                    :sale="product.sale ? product.sale : 0"
                />
        </div>
    </div>
  </div>
</template>

<script>
import ProductDisplay from '../components/ProductDisplay.vue';
import SelectionList from './inputs/SelectionList.vue';
import mapInfo from '../utility/mapInfo.ts';
import filterCheck from '../utility/filterCheck.ts';
export default {
  name: 'products',
  data() {
      return {
          products: [],
          filteredProducts: [],
          filterKeys: ['type', 'sizes', 'colors', 'fabrics'],
          criteria: {},
          filterMap: {},
          openFilter: false,
          hitScrollMark: false,
      };
  },
  props: {
      page: {
          type: String,
          required: true,
      },
  },
  components: {
    ProductDisplay,
    SelectionList,
  },
  created() {
    this.filterKeysCopy = this.filterKeys.slice();
    const newFilterMap = {};
    for (let i = 0; i <= this.filterKeys.length - 1; i++) {
      const filterKey = this.filterKeys[i];
      newFilterMap[filterKey] = [];
    }
    this.filterMap = newFilterMap;
  },
  methods: {
    onFilterTabClick() {
      this.openFilter = !this.openFilter;
    },
    aggregateData() {
      let aggregation = {};
      for ( let i = 0; i <= this.filteredProducts.length - 1; i++ ) {
        const product = this.filteredProducts[i];
        for ( let x = 0; x <= this.filterKeys.length - 1; x++ ) {
          const label = this.filterKeys[x];
          aggregation = mapInfo(label, product, aggregation);
        }
      }
      const aggregateKeys = Object.keys(aggregation);
      // mapping the key to index 0 and the object to index 1 for easier prop passing
      return aggregateKeys.length > 0 ? aggregateKeys.map((aggkey) => [aggkey, aggregation[aggkey]]) : [];
    },
    filterProducts(data) {
      const { filterValue, filterType, action, refresh } = data;
      this.filterMap = { ...this.filterMap };
      if (refresh) {
        this.filterMap[filterType] = [];
        this.filteredProducts = this.products.slice();
      }
      if (filterValue.toLowerCase() !== 'all') {
        if (action === 'add') {
          this.filterMap[filterType] = this.filterMap[filterType].concat(filterValue);
        } else {
          this.filterMap[filterType] = this.filterMap[filterType].filter((val) => val !== filterValue);
        }
      }
      this.filteredProducts = this.products.filter((product) => {
        for (let i = 0; i <= this.filterKeys.length - 1; i++) {
          const label = this.filterKeys[i];
          if (this.filterMap.hasOwnProperty(label)) {
            const filterArr = this.filterMap[label];
            if (filterArr.length > 0) {
              if (!filterCheck(filterArr, product[label])) {
                return false;
              }
            }
          }
        }
        return true;
      });
    },
    trackScroll(e) {
      if (window.scrollY > 200) {
        this.hitScrollMark = true;
      } else {
        this.hitScrollMark = false;
      }
    },
  },
  async mounted() {
    window.addEventListener('scroll', this.trackScroll);
    try {
      const url = '/products.json';
      const response = await fetch(url);
      const data = await response.json();
      this.products = data[this.page];
      this.filteredProducts = data[this.page];
      this.criteria = this.aggregateData(data[this.page]);

    } catch (err) {
      console.log(err);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.trackScroll);
  },
};
</script>

<style scoped>
.filter-display {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 25%;
  margin: 0px 10px;
}

.filter-display-mobile {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 0px 10px;
  height: 70vh;
}

.filter-display-mobile-container {
  width: 210px;
  z-index: 99;
  background: white;
  transition: left 1s;
}

.filter-tab {
  position: absolute;
  right: -44px;
  top: 0px;
  padding: 10px;
  z-index: 0;
  background: #333;
  color: white;
  width: 25px;
  font-size: 0.75em;
}

.filter-tab:hover {
  cursor: pointer;
}

.filter-display > h1 {
  background: #333;
  color: white;
  margin: 0;
}

.products-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    min-width: 300px;
    width: 70%;
}
.wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 25px;
}
</style>