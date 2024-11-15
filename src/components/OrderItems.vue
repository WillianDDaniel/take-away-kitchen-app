<script>
  export default {
    name: 'OrderItems',
    props: {
      order: Object,
      currencyFormatter: Function,
    }
  }
</script>

<template>
  <div v-for="item in order?.items">
    {{ item.quantity }} -
    {{ item.name }}
    {{ item.description }}

    <div v-if="item.note">
      {{ item.note }}
    </div>

    {{ currencyFormatter(item.price) }}
  </div>
</template>

<style scoped>
</style>