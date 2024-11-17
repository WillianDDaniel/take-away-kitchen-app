<script>
  export default {
    name: 'Button',
    props: {
      status: String,
      updateStatus: Function,
    }
  }
</script>

<template>
  <button type="button" @click="updateStatus" class="button"
    v-if="status === 'pending' || status === 'preparing'"
  >
    {{ status === 'pending' ? 'Aceitar Pedido' : 'Marcar como Pronto' }}
  </button>
</template>

<style>
  .button {
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1.1rem;
    background-color: rgb(64, 138, 0);
    color: #fff;
    font-weight: 600;
    border: none;
    outline: none;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .button:hover {
    background-color: rgb(0, 128, 0);
  }
</style>