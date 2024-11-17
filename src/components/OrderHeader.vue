<script>
  import translateOrderStatus from '../assets/js/translateOrderStatus'
  import dateFormatter from '../assets/js/dateFormatter'

  export default {
    name: 'OrderHeader',

    props: {
      order: Object,
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
  <div class="order-header">
    <div class="order-info">
      <span class="order-code">
        #{{ order?.code }}
      </span>

      <span class="customer-name">
        {{ order?.customer_name }}
      </span>
    </div>

    {{ "Feito às " + dateFormatter(order?.created_at) }}

    <span class="status">
      {{ "status: " }}
      <b>{{ translateStatus(order?.status) }}</b>
    </span>
  </div>
</template>

<style scoped>
  .order-header {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    background-color: aliceblue;
    padding: 10px;
    border-radius: 5px;
  }

  .order-info {
    display: flex;
    gap: 10px;
  }

  .customer-name {
    font-size: 1.2rem;
  }

  .status b {
    font-size: 1.2rem;
  }

  .order-code {
    font-weight: bold;
    border: 1px solid #27272a;
    border-radius: 5px;
    padding: 1px 3px;
  }
</style>