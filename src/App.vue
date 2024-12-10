<template>
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
  min-height: 100vh;
  width: 100%;
  background: #000;
  margin: 0;
  padding: 0;
}
</style>
