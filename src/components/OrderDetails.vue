<script>
  import OrderItems from './OrderItems.vue';
  import takeAwayApi from '../services/takeAwayApi'
  import translateOrderStatus from '../assets/translateOrderStatus'
  import dateFormatter from '../assets/dateFormatter'

  export default {
    name: 'OrderDetails',
    components: {
      OrderItems
    },
    props: {
      order_code: String,
      restaurant_code: String
    },

    data() {
      return {
        order: null
      }
    },

    methods: {
      async getOrderDetails() {
        this.order = await takeAwayApi.getOrderDetails(this.restaurant_code, this.order_code)
      },
      translateStatus(status) {
        return translateOrderStatus(status)
      },
      dateFormatter(date) {
        return dateFormatter(date)
      },
      currencyFormatter(price) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      }
    },

    watch: {
      order_code() {
        this.getOrderDetails()
      }
    }
  }

</script>

<template>
  <section v-if="order" class="order-details">
    <h1>Detalhes do pedido</h1>

    <div>
      {{ order?.code }}
      {{ order?.customer_name }}
      {{ "Status: " + translateStatus(order?.status) }}
      <br>
      {{ "Feito às " + dateFormatter(order?.created_at) }}
    </div>

    <OrderItems :order="order" :currencyFormatter="currencyFormatter" />

    {{ order &&
      "Total: " +
      currencyFormatter(order?.items.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0))
    }}
  </section>

  <section v-else>
    Clique em um pedido para ver os detalhes
  </section>

</template>

<style scoped>

  .order-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>