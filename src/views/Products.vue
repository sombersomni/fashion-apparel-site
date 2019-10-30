<template>
  <div class="main-container"> 
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
</template>

<script>
import ProductDisplay from '../components/ProductDisplay.vue';
import FilterDisplay from '../components/FilterDisplay.vue';
export default {
  name: 'products',
  data() {
      return {
          products: [],
      };
  },
  components: {
    ProductDisplay,
  },
  async mounted() {
    try {
      const pageName = this.$router.history.current.name;
      const url = 'http://localhost:8080/products.json';
      const response = await fetch(url);
      const data = await response.json();
    //   console.log(data);
    //   console.log(this.$router);
      this.products = data[pageName];
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

}
</style>