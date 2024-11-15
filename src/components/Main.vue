<script>
  import takeAwayApi from '../services/takeAwayApi'
  export default {
    name: 'Main',
    data() {
      return {
        orders: [],
        restaurant_code: '',
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
      },
      getRestaurantCode() {
        const code = localStorage.getItem('restaurant_code')
        if (code) {
          this.restaurant_code = code
        }
      },
      translateStatus(status) {
        switch (status) {
          case 'pending':
            return 'Pendente'
          case 'preparing':
            return 'Em preparo'
          case 'ready':
            return 'Pronto'
          case 'delivered':
            return 'Entregue'
          case 'canceled':
            return 'Cancelado'
        }
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

  <main v-else class="order-list">
    <div v-for="order in orders" class="order">

      <div>
        Pedido: {{ order.code }} - {{ order.customer_name }}
      </div>

      <div>
        Status: {{ translateStatus(order.status) }}
      </div>

      <div>
        Feito às {{
          new Date(order.created_at).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        }}
        -
        {{ new Date(order.created_at).toLocaleDateString('pt-BR') }}
      </div>
    </div>
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

</style>