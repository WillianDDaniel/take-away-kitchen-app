<script>
  import OrderItems from './OrderItems.vue'
  import OrderHeader from './OrderHeader.vue'
  import Button from './Button.vue'

  import takeAwayApi from '../services/takeAwayApi'

  export default {
    name: 'OrderDetails',

    components: {
      OrderHeader,
      OrderItems,
      Button,
    },

    props: {
      order_code: String,
      restaurantCode: String,
    },

    data() {
      return {
        order: null
      }
    },

    methods: {
      async getOrderDetails() {
        this.order = await takeAwayApi.getOrderDetails(this.restaurantCode, this.order_code)
      },
      updateStatus() {
        takeAwayApi.updateOrderStatus(this.restaurantCode, this.order_code)
          .then(() => {
          this.getOrderDetails()
        })
      },
      currencyFormatter(price) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      },
    },

    watch: {
      order_code() {
        this.getOrderDetails()
      },
    },
  }
</script>

<template>
  <section v-if="order" class="order-details">
    <h2 class="title">Detalhes do pedido</h2>

    <OrderHeader :order="order" />
    <OrderItems :order="order" :currencyFormatter="currencyFormatter" />

    <div class="total-price">
      {{
        "Total: " + currencyFormatter(order?.items.reduce((acc, item) => {
          return acc + item.price * item.quantity
        }, 0))
      }}
    </div>

    <div class="actions">
      <Button :status="order?.status" :updateStatus="updateStatus"
        v-if="order?.status === 'pending' || order?.status === 'preparing'"
      />

      <span v-else>&check; Pedido Pronto</span>
    </div>
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
    width: calc(100vw - 350px);
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 0 10px;
  }

  .title {
    text-align: center;
    padding: 5px;
    font-size: 1.2rem;
  }

  .total-price {
    font-weight: bold;
    width: 50vw;
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 50px;
  }

  .actions span {
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>