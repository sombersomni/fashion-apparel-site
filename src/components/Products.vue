<template>
  <div class="main-container"> 
      <div class="wrapper">
        <div class="filter-display">
          <h1>Filter</h1>
          <SelectionList 
            v-for="agg in aggregateData()"
            :key="agg[0]"
            :filterLabel="agg[0]"
            :filterValues="agg[1]"/>
        </div>
        <div class="products-container">
            <ProductDisplay 
                    v-for="product in products"
                    :key="product.id"
                    :name="product.name"
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
export default {
  name: 'products',
  data() {
      return {
          products: [],
          criteria: {},
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
  methods: {
    aggregateData() {
      const keyArr = ['type', 'colors', 'fabrics'];
      let aggregation = {};
      for ( let i = 0; i <= this.products.length - 1; i++ ) {
        const product = this.products[i];
        for ( let x = 0; x <= keyArr.length - 1; x++ ) {
          const label = keyArr[x];
          aggregation = mapInfo(label, product, aggregation);
        }
      }
      const aggregateKeys = Object.keys(aggregation);
      // mapping the key to index 0 and the object to index 1 for easier prop passing
      return aggregateKeys.length > 0 ? aggregateKeys.map((aggkey) => [aggkey, aggregation[aggkey]]) : [];
    },
  },
  async mounted() {
    try {
      const url = 'http://localhost:8080/products.json';
      const response = await fetch(url);
      const data = await response.json();
      this.products = data[this.page];
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