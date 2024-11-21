<script>
  export default {
    name: 'Button',
    props: {
      action: Function,
      label: String,
      className: String,
      type: {
        type: String,
        default: 'button'
      }
    }
  }
</script>

<template>
  <button :type="type" @click="action"
    :class="`button ${className}`"
  >
    {{ label }}
  </button>
</template>

<style>
  .button {
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1.1rem;
    color: #fff;
    font-weight: 600;
    border: none;
    outline: none;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .danger {
    background-color: rgb(239, 46, 46);
  }

  .success {
    background-color: rgb(12, 161, 12);
  }

</style>