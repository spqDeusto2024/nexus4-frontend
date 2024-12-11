<template>
    <div class="dashboard-container">
      <header class="top-bar">
        <div class="brand">NEXUS4</div>
        <nav class="menu">
          <a href="#">Home</a>
          <a href="#">Familias</a>
          <a href="#">Estancias</a>
          <a href="#">Recursos</a>
        </nav>
        <div class="logout">
          <a href="#">Logout</a>
        </div>
      </header>
  
      <div class="content">
        <h1 class="main-title">Panel de Control</h1>
        <div class="grid-container">
          <!-- Caja con 3 recursos y barras -->
          <div class="box">
            <div class="label">Agua</div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: '70%' }"></div>
            </div>
            <div class="subvalue">70%</div>
  
            <div class="label">Aire</div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: '50%' }"></div>
            </div>
            <div class="subvalue">50%</div>
  
            <div class="label">Temperatura</div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: '90%' }"></div>
            </div>
            <div class="subvalue">90%</div>
          </div>
  
          <!-- Caja de estancias -->
          <div class="box">
            <div class="label">Estancias</div>
            <div class="value">{{ estancias }}</div>
          </div>
  
          <!-- Caja de inquilinos -->
          <div class="box">
            <div class="label">Inquilinos</div>
            <div class="value">{{ inquilinos }}</div>
          </div>
  
          <!-- Caja con botón de alarma -->
          <div class="box">
            <div class="label">Alarma</div>
            <button
              class="alarm-button"
              :class="{ active: alarmaActiva }"
              @click="toggleAlarma"
            >
              {{ alarmaActiva ? 'ON' : 'OFF' }}
            </button>
          </div>
  
          <!-- Caja de Empleo disponibles -->
          <div class="box">
            <div class="label">Empleos</div>
            <div class="value">{{ recursos }}</div>
          </div>
  
          <!-- Caja de familias -->
          <div class="box">
            <div class="label">Familias</div>
            <div class="value">{{ alertas }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  export default {
    name: 'DashboardPage',
    setup() {
      const estancias = ref(10)
      const inquilinos = ref(25)
      const recursos = ref(12)
      const alertas = ref(3)
      const alarmaActiva = ref(false)
  
      const toggleAlarma = () => {
        alarmaActiva.value = !alarmaActiva.value
      }
  
      return {
        estancias,
        inquilinos,
        recursos,
        alertas,
        alarmaActiva,
        toggleAlarma,
      }
    },
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a1a, #4a4a4a);
    color: #fff;
    font-family: 'Open Sans', sans-serif;
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
  }
  
  .main-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .box {
    background: #1a1a1a;
    border-radius: 20px;
    border: 1px solid #333;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, border-color 0.2s;
    min-height: 200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .box:hover {
    transform: scale(1.05);
    border: 2px solid red;
  }
  
  .label {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #fff;
  }
  
  .value {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #fff;
  }
  
  .subvalue {
    font-size: 1.4rem;
    font-weight: 400;
    color: #ccc;
  }
  
  .progress-bar-container {
    background: #333;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  
  .progress-bar {
    background: #4caf50;
    height: 100%;
  }
  
  .alarm-button {
    padding: 10px 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    background-color: #444;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .alarm-button.active {
    background-color: #4caf50;
    color: #fff;
  }
  
  .alarm-button:hover {
    opacity: 0.8;
  }
  </style>
  
  