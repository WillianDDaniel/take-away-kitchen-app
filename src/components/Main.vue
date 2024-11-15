<script>
  import OrderList from './OrderList.vue';
  import OrderDetails from './OrderDetails.vue'

  export default {
    name: 'Main',

    props: {
      orders: Array,
      restaurantCode: String
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

  <main class="main">
    <OrderList :orders="orders" :showOrderDetails="showOrderDetails" />
    <OrderDetails :order_code="selectedOrderCode" :restaurantCode="restaurantCode" />
  </main>

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
</style>