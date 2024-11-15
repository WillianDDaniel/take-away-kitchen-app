<script>
  import takeAwayApi from '../services/takeAwayApi'
  import OrderList from './OrderList.vue';
  import OrderDetails from './OrderDetails.vue'
  export default {
    name: 'Main',
    components: {
      OrderDetails,
      OrderList,
    },
    data() {
      return {
        orders: [],
        restaurant_code: '',
        selectedOrderCode: '',
      }
    },
    methods: {
      async getAllOrders() {
        this.orders = await takeAwayApi.getAllOrders(this.restaurant_code)
        console.log(this.orders)
      },
      saveRestaurantCode() {
        const code = document.getElementById('restaurant_code').value
        localStorage.setItem('restaurant_code', code)
        this.getRestaurantCode()
        window.location.reload()
      },
      getRestaurantCode() {
        const code = localStorage.getItem('restaurant_code')
        if (code) {
          this.restaurant_code = code
        }
      },
      showOrderDetails(orderCode) {
        this.selectedOrderCode = orderCode
      }
    },
    created() {
      this.getRestaurantCode()
      this.getAllOrders()
    }
  }
</script>

<template>
  <main v-if="restaurant_code === ''">
    <div>{{ restaurant_code }}</div>
    <h1>Para continuar digite o código Alfanumérico único do seu restaurante</h1>
    <input type="text" id="restaurant_code" class="restaurant_code">
    <button @click="saveRestaurantCode">Continuar</button>
  </main>

  <main v-else class="main">
    <OrderList :orders="orders" :showOrderDetails="showOrderDetails" />
    <OrderDetails :order_code="selectedOrderCode" :restaurant_code="restaurant_code" />
  </main>
</template>

<style scoped>
  .restaurant_code {
    padding: 3px;
    outline: none;
    border: 1px solid #7b7b7b;
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .order {
    border: 1px solid #7b7b7b;
    padding: 10px;
    border-radius: 5px;
  }

  .main {
    display: flex;
    gap: 10px;
  }
</style>