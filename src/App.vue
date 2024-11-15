<script>
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import takeAwayApi from './services/takeAwayApi'

  export default {
    name: 'App',

    components: {
      Header,
      Main,
    },

    data() {
      return {
        orders: [],
        restaurantCode: null,
      }
    },

    methods: {
      getRestaurantCode() {
        const code = localStorage.getItem('restaurant_code')
        if (code) this.restaurantCode = code
      },
      async getAllOrders() {
        if (!this.restaurantCode) return
        const orders = await takeAwayApi.getAllOrders(this.restaurantCode)

        if (orders.error) {
          alert(orders.error + ': ' + orders.message)
          localStorage.removeItem('restaurant_code')
          window.location.reload()
        }
        this.orders = orders
      },
      saveRestaurantCode() {
        const code = document.getElementById('restaurant-code').value
        localStorage.setItem('restaurant_code', code)
        window.location.reload()
      },
    },

    created() {
      this.getRestaurantCode()
      this.getAllOrders()
    }
  }
</script>

<template>

  <Header />
  <Main v-if="restaurantCode" :orders="orders" :restaurantCode="restaurantCode" />

  <main v-else class="register-code">
    <h1>
      Para continuar informe o código do seu restaurante.
    </h1>

    <label for="restaurant-code">Codigo do restaurante</label>
    <input type="text" id="restaurant-code" class="restaurant-code" placeholder="Digite o codigo">

    <button type="button" @click="saveRestaurantCode">
      Continuar
    </button>
  </main>

</template>

<style scoped>
  .register-code {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .register-code h1 {
    text-align: center;
    padding: 20px;
    font-size: 1.75rem
  }

  .register-code input {
    width: 180px;
    font-size: 1.25rem;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #7b7b7b;
    margin-bottom: 10px;
  }

  .register-code button {
    width: 180px;
    font-size: 1.2rem;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #7b7b7b;
    cursor: pointer;
    background-color: #27272a;
    color: white;
  }

  .register-code button:hover {
    background-color: rgb(56, 56, 56);
  }
</style>