<script>
  import takeAwayApi from '../services/takeAwayApi'
  export default {
    name: 'Header',
    data() {
      return {
        restaurantName: null,
      }
    },
    methods: {
      async getRestaurantName() {
        const restaurantCode = localStorage.getItem('restaurant_code')
        this.restaurantName = await takeAwayApi.getRestaurantName(restaurantCode)
      },
      setOff() {
        localStorage.removeItem('restaurant_code')
        window.location.reload()
      }
    },
    mounted() {
      this.getRestaurantName()
    }
  }
</script>

<template>
  <header>

    <div class="logo-container">
      <img src="../assets/img/paleva-logo.png" alt="PaLevá logo">
      <span class="logo">PaLevá</span>
      <p>Gestão de Cozinha</p>
    </div>

    <nav>
      <div>
        {{ restaurantName?.brand_name }}
      </div>
      <button v-if="restaurantName" @click="setOff" class="sign-out">
        Sair
      </button>
    </nav>

  </header>
</template>

<style scoped>
  header {
    width: 100vw;
    height: 5rem;
    background-color: #27272a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    border-bottom: 1px solid #7b7b7b;
  }

  .logo {
    font-family: 'Lobster', cursive;
    padding: 10px;
    font-size: 2rem;
    color: #fff;
  }

  .logo-container {
    margin: 10px 20px;
    display: flex;
    align-items: center;
  }

  .logo-container img {
    width: 1.75rem;
    height: 1.75rem;
  }

  .logo-container p {
    margin-left: 7px;
    margin-top: 10px;
    font-style: italic;
  }

  header nav {
    margin-right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sign-out {
    padding: 5px 10px;
    border: 1px solid #7b7b7b;
    border-radius: 5px;
    background-color: #27272a;
    color: #fff;
    cursor: pointer;
  }
</style>