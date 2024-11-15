<script>
  import translateOrderStatus from '../assets/translateOrderStatus'
  import dateFormatter from '../assets/dateFormatter'

  export default {
    name: 'OrderList',
    props: {
      orders: Array,
      showOrderDetails: Function,
    },

    methods: {
      translateStatus(status) {
        return translateOrderStatus(status)
      },

      dateFormatter(date) {
        return dateFormatter(date)
      },
    }
  }
</script>

<template>
  <section>

    <div class="order-list">

      <div
        v-for="order in orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))"
        @click="showOrderDetails(order.code)"
        class="order" v-bind:title="'Ver detalhes do pedido ' + order.code"
      >
        <div>
          Pedido: {{ order.code }} - {{ order.customer_name }}
        </div>

        <div>
          Status: {{ translateStatus(order.status) }}
        </div>

        <div>
          Feito às {{ dateFormatter(order.created_at) }}
        </div>
      </div>

    </div>

  </section>
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
    cursor: pointer;
  }

  .order:hover {
    background-color: #7b7b7b;
    color: #fff;
  }
</style>