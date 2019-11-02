<template>
  <div style="margin-top: 20px;"> 
      <div class="wrapper">
        <div 
          v-show="!$store.state.mobile"
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
                    v-for="product in filteredProducts"
                    :key="product.id"
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
  },
  async mounted() {
    console.log(this.$store);
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
}
</style>