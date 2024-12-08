<template>
  <h1>NEXUS4</h1>
  <PantallaPrincipal msg="Welcome to Your Vue.js App"/>
</template>

<script>
import PantallaPrincipal from './components/PantallaPrincipal.vue' 


export default {
  name: 'App',
  components: {
    PantallaPrincipal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
