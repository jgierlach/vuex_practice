<template>
  <div>
    <h1>Product List</h1>
    <img 
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
     />
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">{{product.title}} - {{product.price}}
        <button @click="addProductToCart(product)">Add To Cart</button>
      </li>
    </ul>
  </div>
</template>


<script>
import shop from '../api/shop.js'
import store from '../store/index.js'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    products() {
      return store.getters.availableProducts
    }
  },
  methods: {
    addProductToCart(product) {
      store.dispatch('addProductToCart', product)
    }
  },
  created() {
    this.loading = true
    store.dispatch('fetchProducts')
     .then(() => this.loading = false)
  }
};
</script>
