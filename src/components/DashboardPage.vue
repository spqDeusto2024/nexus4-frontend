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
        <router-link to="/dashboard/empleos">Empleos</router-link>
      </nav>
      <div class="logout">
        <router-link to="/">Logout</router-link>
      </div>
    </header>

    <div class="content">
      <h1 class="main-title">Panel de Control</h1>
      <div class="grid-container">
        
        <!-- Caja con 3 recursos y barras -->
        <div class="box" @click="goToRecursos">
          <div v-for="(recurso, index) in recursos.slice(0, 3)" :key="index" class="recurso-item">
            <div class="label">{{ recurso.nombre }}</div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: recurso.porcentaje + '%' }"></div>
            </div>
            <div class="subvalue">{{ recurso.porcentaje }}%</div>
          </div>
        </div>

        <!-- Caja de estancias -->
        <div class="box" @click="goToEstancias">
          <div class="label">Estancias</div>
          <div class="value">{{ estancias }}</div>
        </div>

        <!-- Caja de inquilinos -->
        <div class="box" @click="goToInquilinos">
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
        <div class="box" @click="goToEmpleos">
          <div class="label">Empleos</div>
          <div class="value">{{ empleos }}</div>
        </div>

        <!-- Caja de familias -->
        <div class="box" @click="goToFamilias">
          <div class="label">Familias</div>
          <div class="value">{{ familias }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'DashboardPage',
  setup() {
    const estancias = ref(0)
    const inquilinos = ref(0)
    const recursos = ref([]);
    const alertas = ref(0)
    const empleos = ref(0)
    const familias = ref(0)
    const alarmaActiva = ref(false)

    const toggleAlarma = () => {
      alarmaActiva.value = !alarmaActiva.value
    }

    const obtenerEstancias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/estancia/get_all')
        estancias.value = response.data.length
      } catch (error) {
        console.error('Error al obtener las estancias:', error)
      }
    }

    const obtenerInquilinos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/inquilino/get_all')
        inquilinos.value = response.data.length
      } catch (error) {
        console.error('Error al obtener los inquilinos:', error)
      }
    }

    const obtenerRecursos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/recurso/get_all');
        // Asignar directamente los recursos desde la API
        recursos.value = response.data.map((recurso) => ({
          nombre: recurso.nombre,
          porcentaje: Math.round(
            (recurso.capacidad_actual / recurso.capacidad_max) * 100
          ), // Calcular porcentaje de capacidad
        }));
      } catch (error) {
        console.error('Error al obtener los recursos:', error);
      }
    }

    const obtenerAlertas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/alerta/get_all')
        alertas.value = response.data.length
      } catch (error) {
        console.error('Error al obtener las alertas:', error)
      }
    }

    const obtenerEmpleos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/empleo/get_all')
        empleos.value = response.data.length
      } catch (error) {
        console.error('Error al obtener los empleos:', error)
      }
    }

    const obtenerFamilias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/familia/get_all')
        familias.value = response.data.length
      } catch (error) {
        console.error('Error al obtener las familias:', error)
      }
    }

    onMounted(() => {
      obtenerEstancias()
      obtenerInquilinos()
      obtenerRecursos()
      obtenerAlertas()
      obtenerEmpleos()
      obtenerFamilias()
    })

    return {
      estancias,
      inquilinos,
      recursos,
      alertas,
      empleos,
      familias,
      alarmaActiva,
      toggleAlarma,
    }
  },
  methods: {
    goToEstancias() {
      this.$router.push({ name: 'Estancias' })
    },
    goToInquilinos() {
      this.$router.push({ name: 'Inquilinos' })
    },
    goToFamilias() {
      this.$router.push({ name: 'Familias' })
    },
    goToRecursos() {
      this.$router.push({ name: 'Recursos' });
    },
    goToEmpleos() {
      this.$router.push({ name: 'Empleos' })
    },
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #4a4a4a);
  color: #fff;
  font-family: 'Roboto', sans-serif;
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
  font-weight: 500;
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
  font-weight: 500;
  text-decoration: none;
  border: 1px solid #f2cf74;
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
  max-height: calc(100vh - 60px); /* Ajusta 60px a la altura de tu encabezado */
  overflow-y: auto; /* Permitir desplazamiento vertical en el contenido */
  overflow: auto;
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
  grid-template-columns: repeat(3, 1fr); /* Distribuye las cajas equitativamente */
  gap: 20px;
  width: 100%; /* Asegura que el contenedor ocupe todo el espacio disponible */
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.box:hover {
  transform: scale(1.05);
  border: 2px solid #f2cf74;
}

.label {
  font-size: 1.4rem;
  font-weight: 500;
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
  text-align: center; /* Centra el texto */
  width: 100%; /* Asegura que ocupe todo el ancho del contenedor */
  margin-top: 5px; /* Un pequeño margen para separar del progreso */
  font-size: 14px; /* Puedes ajustar el tamaño de la fuente si es necesario */
  color: #fff; /* Asegura que el texto sea visible */
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
  width: 90%;
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