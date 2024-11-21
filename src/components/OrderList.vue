<script>
  import translateOrderStatus from '../assets/js/translateOrderStatus'
  import dateFormatter from '../assets/js/dateFormatter'
  import takeAwayApi from '../services/takeAwayApi';

  export default {
    name: 'OrderList',

    props: {
      orders: Array,
      showOrderDetails: Function,
      restaurantCode: String,
    },

    data() {
      return {
        filteredOrders: this.orders,
        statusList: () => translateOrderStatus(),
      }
    },

    methods: {
      translateStatus(status) {
        return translateOrderStatus(status)
      },
      dateFormatter(date) {
        return dateFormatter(date)
      },
      async filterOrders(status) {
        this.filteredOrders = await takeAwayApi.getOrdersByStatus(this.restaurantCode, status)
      }
    },

    computed: {
      sortedOrders() {
        return this.filteredOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      },
    },
  }
</script>

<template>
  <section>
    <div class="order-list">

      <div class="order-filters-container">
        <label for="order-filters">Filtrar por status:</label>

        <select class="order-filters" @change="filterOrders($event.target.value)">
          <option value="all">Todos</option>

          <option v-for="status in statusList()" id="order-filter" :value="status">
            {{ translateStatus(status) }}
          </option>
        </select>
      </div>

      <div
        v-for="order in sortedOrders" @click="showOrderDetails(order.code)"
        class="order" v-bind:title="'Ver detalhes do pedido ' + order.code"
      >
        <div class="order-header">
          <span class="code">#{{ order.code }}</span>
          {{ order.customer_name.split(' ')[0] }}
        </div>

        <div class="status">{{ translateStatus(order.status) }}</div>

        <div>
          Feito às {{ dateFormatter(order.created_at) }}
        </div>
      </div>

      <div v-if="sortedOrders.length === 0">
        Nenhum pedido encontrado!
      </div>

    </div>
  </section>
</template>

<style scoped>
  .order-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 5px 10px;
    min-width: 330px;
    max-height: calc(100vh - 100px);
    overflow-y: scroll;
  }

  .order {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 1px solid #7b7b7b;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .order:hover {
    border: 1px solid #27272a;
    background-color: rgb(240, 240, 240);
  }

  .order-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .order-header .code {
    font-weight: bold;
    font-size: 0.9rem;
    color: rgb(26, 26, 26);
    border: 1px solid #7b7b7b;
    border-radius: 3px;
    padding: 1px 2px;
  }

  .status {
    margin: 3px;
    font-weight: 500;
  }

  .order-filters-container {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .order-filters {
    padding: 5px;
    border-radius: 5px;
  }
</style>