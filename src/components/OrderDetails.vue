<script>
  import OrderItems from './OrderItems.vue'
  import OrderHeader from './OrderHeader.vue'
  import Button from './Button.vue'
  import Modal from './Modal.vue'

  import takeAwayApi from '../services/takeAwayApi'
  import translateOrderStatus from '../assets/js/translateOrderStatus'

  export default {
    name: 'OrderDetails',

    components: {
      OrderHeader,
      OrderItems,
      Button,
      Modal,
    },

    props: {
      order_code: String,
      restaurantCode: String,
    },

    data() {
      return {
        order: null,
        isOpen: false,
      }
    },

    methods: {
      async getOrderDetails() {
        this.order = await takeAwayApi.getOrderDetails(this.restaurantCode, this.order_code)
      },
      updateStatus() {
        takeAwayApi.updateOrderStatus(this.restaurantCode, this.order_code)
          .then(() => { this.getOrderDetails() })
      },
      cancelOrder(event) {
        const reason = event.target.reason.value
        takeAwayApi.cancelOrder(this.restaurantCode, this.order_code, reason)
          .then(() => {
            this.isOpen = false
            this.getOrderDetails()
          })
      },
      openModal() {
        this.isOpen = true
      },
      translateStatus(status) {
        return translateOrderStatus(status)
      }
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
    <OrderItems :order="order" />

    <div class="actions">
      <Button @click="openModal" label="Cancelar Pedido" className="danger"
        v-if="order.status !== 'delivered' && order.status !== 'cancelled'"
      />

      <Button @click="updateStatus" className="success"
        :label="order.status === 'pending' ? 'Aceitar Pedido' : 'Marcar como Pronto'"
        v-if="order.status === 'pending' || order.status === 'preparing'"
      />

      <div v-else class="order-status">
        Pedido {{ translateStatus(order.status) }}
        {{ order.cancel_reason && " - Motivo: " + order.cancel_reason }}
      </div>
    </div>
  </section>

  <section v-else>
    Clique em um pedido para ver os detalhes
  </section>

  <Modal :show="isOpen" @close="isOpen = false" title="Cancelar Pedido">
    <slot>

      <form @submit.prevent="cancelOrder" class="cancel-order">
        <p>Tem certeza que deseja cancelar o pedido?</p>

        <input type="text" placeholder="Motivo do cancelamento" name="reason">
        <Button type="submit" label="Cancelar Pedido" className="danger" />
      </form>

    </slot>
  </Modal>

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

  .actions {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 50px;
  }

  .actions span {
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-right: 20px;
  }

  .cancel-order {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cancel-order input {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #7b7b7b;
  }

  .order-status {
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-right: 20px;
    border: 1px solid #7b7b7b;
    border-radius: 3px;
    font-weight: 500;
  }

</style>