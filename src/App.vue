<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
};
  <DashboardPage />
</template>

<script>
import DashboardPage from './components/DashboardPage.vue'
export default {
  name: 'App',
  components: {
    DashboardPage
  }
}
</script>

<style>
/* Opcional: Asegúrate que #app ocupe todo el espacio */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
  min-height: 100vh;
  width: 100%;
  background: #000;
  margin: 0;
  padding: 0;
}
/* Puedes agregar estilos globales aquí */
</style>
