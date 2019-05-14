import Vuex from "vuex";
import Vue from "vue";
import shop from '../api/shop.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // data
    products: [],
    cart: []
  },
  getters: {
    // computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  actions: {
    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          context.commit("setProducts", products);
          resolve()
        });
      })     
    },

    addProductToCart(context, product) {
      console.log('addProductToCart is called')
      if(product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)
      }
    }
  },
  mutations: {
    setProducts(state, products) {
      // update the products
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory(state, product) {
      product.inventory--
    }
  }
});
