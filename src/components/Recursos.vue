<template>
    <div class="dashboard-container">
      <header class="top-bar">
        <div class="brand">NEXUS4</div>
        <nav class="menu">
        <router-link to="/dashboard">Home</router-link>
        <router-link to="/dashboard/estancias">Estancias</router-link>
        <router-link to="/dashboard/inquilinos">Inquilinos</router-link>
        <router-link to="/dashboard/familias">Familias</router-link>
        <router-link to="/dashboard/recursos">Recursos</router-link>
        </nav>
        <div class="logout">
          <router-link to="/">Logout</router-link>
        </div>
      </header>
  
      <div class="content">
        <h1 class="main-title">Gestión de Recursos</h1>
        <!-- Aquí puedes añadir el contenido de tu componente -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecursosComponent', // Cambia el nombre del componente para que sea multi-palabra
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a1a, #4a4a4a);
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    overflow-y: auto; /* Permitir desplazamiento vertical */
  }
  
  .top-bar {
    background: #111;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
  }
  
  .brand {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
  }
  
  .menu {
    display: flex;
    gap: 20px;
    margin-left: 30px;
  }
  
  .menu a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .menu a:hover {
    background-color: #222;
  }
  
  .logout {
    margin-left: auto;
  }
  
  .logout a {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid #f00;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .logout a:hover {
    background-color: #400;
  }
  
  .content {
    flex: 1;
    padding: 80px 20px 20px;
    box-sizing: border-box;
    margin-top: 60px; /* Añadir margen superior para evitar que el contenido quede oculto detrás del encabezado fijo */
  }
  
  .main-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
  }
  </style>