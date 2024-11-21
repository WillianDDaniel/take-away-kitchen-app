<script>
  export default {
    name: 'OrderItems',

    props: {
      order: Object,
      currencyFormatter: Function,
    },

    methods: {
      currencyFormatter(price) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency', currency: 'BRL',
        }).format(price / 100)
      },
    }
  }
</script>

<template>
  <div v-for="item in order?.items">

    <div class="item">
      <div>
        {{ item.quantity }} -
        {{ item.name }} -
        {{ item.description }}
      </div>

      <div class="price">
        {{ currencyFormatter(item.price) }}
      </div>
    </div>

    <div v-if="item.note" class="note">
      {{ item.note }}
    </div>
  </div>

  <div class="total-price">
    {{ "Total: " + currencyFormatter(order?.total_price) }}
  </div>
</template>

<style scoped>
  .item {
    display: flex;
    justify-content: space-between;
    width: 50vw;
    margin-left: 10px;
  }

  .note {
    padding: 10px;
    font-size: 0.9rem;
    font-style: italic;
    margin-left: 10px;
  }

  .total-price {
    font-weight: bold;
    width: 50vw;
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
  }
</style>