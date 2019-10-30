<template>
  <div class="main-container"> 
      <div class="wrapper">
        <FilterDisplay />
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
import FilterDisplay from '../components/FilterDisplay.vue';

export default {
  name: 'products',
  data() {
      return {
          products: [],
          aggregation: {},
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
    FilterDisplay,
  },
  methods: {
    aggregateData(products) {
      
    }
  },
  async mounted() {
    try {
      const url = 'http://localhost:8080/products.json';
      const response = await fetch(url);
      const data = await response.json();
      this.products = data[this.page];
      this.aggregation = this.aggregateData(this.products);

    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.products-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
}
.wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
}
</style>