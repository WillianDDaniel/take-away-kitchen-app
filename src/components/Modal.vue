<script>
  export default {
    props: {
      show: Boolean,
      title: {
        type: String,
        default: 'Modal'
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">

      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="close">×</button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .modal-header button {
    border: none;
    background: transparent;
    font-size: 1.8rem;
    cursor: pointer;
  }
</style>