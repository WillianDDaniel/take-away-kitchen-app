<script>
  import OrderList from './OrderList.vue';
  import OrderDetails from './OrderDetails.vue'

  export default {
    name: 'Main',

    props: {
      orders: Array,
      restaurantCode: String,
    },

    components: {
      OrderDetails,
      OrderList,
    },

    data() {
      return {
        selectedOrderCode: null,
      }
    },

    methods: {
      showOrderDetails(orderCode) {
        this.selectedOrderCode = orderCode
      },
    },
  }
</script>

<template>

  <main class="main" v-if="orders.length > 0">
    <OrderList :orders="orders" :showOrderDetails="showOrderDetails"
      :selectedOrder="selectedOrderCode" :restaurantCode="restaurantCode"/>
    <OrderDetails :order_code="selectedOrderCode" :restaurantCode="restaurantCode" />
  </main>

  <div v-else class="no-orders">
    Nenhum pedido encontrado!
    <br>
    Aguardando pedidos...
  </div>

</template>

<style scoped>
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

  .no-orders {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
</style>