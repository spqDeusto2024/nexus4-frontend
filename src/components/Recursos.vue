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
      <h1 class="main-title">Gestión de Recursos</h1>
      <div class="layout">
        <!-- Contenedor izquierdo -->
        <div class="left-container">
          <!-- White Box para crear recurso -->
          <div class="white-box">
            <h3>Crear Recurso</h3>
            <form @submit.prevent="crearRecurso">
              <label for="nombre"></label>
              <input
                v-model="nuevoRecurso.nombre"
                id="nombre"
                type="text"
                placeholder="Ingrese nombre"
              />
              <label for="capacidad_min"></label>
              <input
                v-model="nuevoRecurso.capacidad_min"
                id="capacidad_min"
                type="number"
                placeholder="Ingrese capacidad mínima"
              />
              <label for="capacidad_max"></label>
              <input
                v-model="nuevoRecurso.capacidad_max"
                id="capacidad_max"
                type="number"
                placeholder="Ingrese capacidad máxima"
              />
              <label for="capacidad_actual"></label>
              <input
                v-model="nuevoRecurso.capacidad_actual"
                id="capacidad_actual"
                type="number"
                placeholder="Ingrese capacidad actual"
              />
              <button type="submit" class="btn btn-primary">Añadir Recurso</button>
            </form>
          </div>

          <!-- White Box para buscar -->
          <div class="white-box">
            <h3>Buscador</h3>
            <form @submit.prevent="filtrarRecursos">
              <label for="busqueda"></label>
              <input
                v-model="busqueda"
                id="busqueda"
                type="text"
                placeholder="Ingrese nombre a buscar"
              />
              <button type="submit" class="btn btn-primary">Buscar</button>
            </form>
          </div>

          <!-- White Box para modificar recurso con controles -->
          <div class="white-box modify-recursos">
            <h3>Modificar Recursos</h3>
            <div v-for="(recurso, index) in recursosFiltrados" :key="recurso.id" class="recurso-control">
              <h4>{{ recurso.nombre }}</h4>
              <div class="control-buttons">
                <button @click="modificarRecurso(index, -10)">-10</button>
                <button @click="modificarRecurso(index, -1)">-1</button>
                <span>{{ (recurso.capacidad_actual / recurso.capacidad_max * 100).toFixed(2) }}%</span>
                <button @click="modificarRecurso(index, 1)">+1</button>
                <button @click="modificarRecurso(index, 10)">+10</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenedor derecho: Tabla -->
        <div class="table-container">
          <div class="table-responsive">
            <table class="styled-table">
              <caption>Recursos</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Capacidad Mínima</th>
                  <th>Capacidad Máxima</th>
                  <th>Capacidad Actual</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="recurso in recursosFiltrados" :key="recurso.id">
                  <td class="centered">{{ recurso.id }}</td>
                  <td class="centered">{{ recurso.nombre }}</td>
                  <td class="centered">{{ recurso.capacidad_min }}</td>
                  <td class="centered">{{ recurso.capacidad_max }}</td>
                  <td class="centered">{{ recurso.capacidad_actual }}</td>
                  <td class="centered">
                    <button @click="eliminarRecurso(recurso.id)" class="btn btn-danger">Eliminar</button>
                    <button @click="editarRecurso(recurso)" class="btn btn-primary">Modificar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Alarma -->
      <div v-if="alarmaActiva" class="alarm-overlay">
        <div class="alarm-modal">
          <p class="alert-message">¡Alerta! Vas a superar los límites del recurso.</p>
          <input type="password" v-model="password" placeholder="Contraseña" />
          <button @click="desactivarAlarma">Desactivar Alarma</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import alarmSoundFile from '@/assets/alarma-de-incendios.mp3';

export default {
  name: "RecursosComponent",
  data() {
    return {
      recursos: [], // Lista completa de recursos
      recursosFiltrados: [], // Lista de recursos que se muestran (originalmente todos)
      busqueda: "", // Texto ingresado en el buscador
      nuevoRecurso: {
        nombre: "",
        capacidad_min: 0,
        capacidad_max: 0,
        capacidad_actual: 0,
      },
      mostrarFormularioCrearRecurso: false,
      recursoParaEditar: null, // Recurso seleccionado para editar
      alarmaActiva: false, // Controla si la alarma está activa
      indiceAlarma: null, // Índice del recurso que activó la alarma
      password: '',
      errorMessage: '',
      correctPassword: '1234', // Contraseña para desactivar la alarma
      alarmSound: null, // Para almacenar el objeto de sonido
    };
  },
  mounted() {
    this.obtenerRecursos();
  },
  methods: {
    async obtenerRecursos() {
      try {
        const response = await axios.get("http://localhost:8000/recurso/get_all");
        this.recursos = response.data;
        this.recursosFiltrados = [...this.recursos]; // Inicialmente muestra todos los recursos
        this.verificarAlarmas();
      } catch (error) {
        console.error("Error al obtener los recursos:", error);
      }
    },
    filtrarRecursos() {
      if (!this.busqueda) {
        this.recursosFiltrados = [...this.recursos];
      } else {
        this.recursosFiltrados = this.recursos.filter((recurso) =>
          recurso.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      }
    },
    async crearRecurso() {
      try {
        const response = await axios.post("http://localhost:8000/recurso/create", this.nuevoRecurso);
        this.recursos.push(response.data);
        this.recursosFiltrados.push(response.data);
        this.nuevoRecurso = { nombre: "", capacidad_min: 0, capacidad_max: 0, capacidad_actual: 0 };
        this.mostrarFormularioCrearRecurso = false;
      } catch (error) {
        console.error("Error al crear el recurso:", error);
      }
    },
    async eliminarRecurso(id) {
      try {
        await axios.delete(`http://localhost:8000/recurso/delete/${id}`);
        this.recursos = this.recursos.filter((recurso) => recurso.id !== id);
        this.filtrarRecursos();
      } catch (error) {
        console.error("Error al eliminar el recurso:", error);
      }
    },
    editarRecurso(recurso) {
      this.recursoParaEditar = { ...recurso };
    },
    async actualizarRecurso() {
      try {
        const response = await axios.put(
          `http://localhost:8000/recurso/update/${this.recursoParaEditar.id}`,
          this.recursoParaEditar
        );
        const index = this.recursos.findIndex(
          (recurso) => recurso.id === this.recursoParaEditar.id
        );
        this.$set(this.recursos, index, response.data);
        this.filtrarRecursos();
        this.recursoParaEditar = null;
        this.verificarAlarmas();
      } catch (error) {
        console.error("Error al actualizar el recurso:", error);
      }
    },
    // Modificar el recurso dentro de los límites
    async modificarRecurso(index, cantidad) {
      const recurso = this.recursos[index];
      const nuevoValor = recurso.capacidad_actual + cantidad;

      if (nuevoValor > recurso.capacidad_max) {
        recurso.capacidad_actual = recurso.capacidad_max;
        this.alarmaActiva = true;
        this.indiceAlarma = index;
        this.playAlarm();
        await this.actualizarRecursoEnBackend(recurso.id, cantidad);
        return;
      }
      if (nuevoValor < recurso.capacidad_min) {
        recurso.capacidad_actual = recurso.capacidad_min;
        this.alarmaActiva = true;
        this.indiceAlarma = index;
        this.playAlarm();
        await this.actualizarRecursoEnBackend(recurso.id, cantidad);
        return;
      }
      recurso.capacidad_actual = nuevoValor;
      await this.actualizarRecursoEnBackend(recurso.id, cantidad);

      // Verificar si la alarma debe desactivarse
      this.verificarAlarmas();
    },
    async actualizarRecursoEnBackend(id, cantidad) {
      try {
        await axios.post(`http://localhost:8000/recurso/modify`, {
          id: id,
          cantidad: cantidad,
        });
        console.log("Recurso actualizado en el backend");
      } catch (error) {
        console.error("Error al actualizar el recurso en el backend:", error);
      }
    },
    playAlarm() {
      console.log("Intentando reproducir el sonido de la alarma...");
      if (!this.alarmSound) {
        this.alarmSound = new Audio(alarmSoundFile);
        this.alarmSound.loop = true;
        console.log("Audio cargado y configurado para repetir.");
      }
      this.alarmSound.play().then(() => {
        console.log("Reproducción de alarma iniciada.");
      }).catch((error) => {
        console.error("Error al reproducir el sonido:", error);
      });
    },
    stopAlarm() {
      if (this.alarmSound) {
        this.alarmSound.pause();
        this.alarmSound.currentTime = 0;
        console.log("Reproducción de alarma detenida.");
      }
    },
    desactivarAlarma() {
      if (this.password === this.correctPassword) {
        this.alarmaActiva = false;
        this.stopAlarm();
        this.password = '';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
      }
    },
    verificarAlarmas() {
      const alerta = this.recursos.find(
        recurso => recurso.capacidad_actual > recurso.capacidad_max || recurso.capacidad_actual < recurso.capacidad_min
      );
      if (alerta) {
        this.alarmaActiva = true;
        this.playAlarm();
      } else {
        if (this.alarmaActiva) {
          this.alarmaActiva = false;
          this.stopAlarm();
        }
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que ocupa al menos el 100% de la altura de la ventana */
  background: linear-gradient(135deg, #1a1a1a, #4a4a4a);
  color: #fff;
  font-family: 'Roboto', sans-serif;
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
  max-height: calc(100vh - 60px); /* Ajusta 60px a la altura de tu encabezado */
  overflow-y: auto; /* Permitir desplazamiento vertical en el contenido */
  overflow: auto;
}

.main-title {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
}

.layout {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

/* Contenedor izquierdo */
.left-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
}

/* Contenedor derecho: Tabla */
.table-container {
  width: 65%;
}

/* Contenedor para hacer la tabla responsive */
.table-responsive {
  overflow-x: auto;
}

/* Caja blanca (Crear y Buscar) */
.white-box {
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
}

.white-box h3 {
  margin-bottom: 20px;
  font-size: 1.4rem;
  color: #fff;
}

.white-box input {
  width: 90%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
}

.white-box button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.white-box .btn-primary {
  background-color: #CFA04A;
  color: white;
}

.white-box .btn-primary:hover {
  background-color: #CFA04A;
}

/* Estilos de la tabla */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: #2c2c2c;
  color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.styled-table caption {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
  text-align: left;
  color: #ddd;
}

.styled-table thead tr {
  background-color: #444;
  color: #fff;
  text-align: center;
}

.styled-table th,
.styled-table td {
  padding: 15px 20px;
  text-align: center; /* Centra el contenido horizontalmente */
  vertical-align: middle; /* Centra el contenido verticalmente */
}

.styled-table tbody tr {
  transition: background-color 0.3s ease;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #3a3a3a;
}

.styled-table tbody tr:hover {
  background-color: #555; /* Efecto hover */
}

/* Botones de acciones */
.btn {
  display: inline-block;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #2196f3;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #1e88e5;
  transform: scale(1.05); 
}

.btn-danger {
  background-color: #f44336;
  color: #fff;
  border: none;
}

.btn-danger:hover {
  background-color: #e53935;
  transform: scale(1.05); 
}

/* Centrado del contenido */
.centered {
  text-align: center;
  vertical-align: middle;
}

/* Alarma */
.alarm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alarm-modal {
  background: #ffffff;
  padding: 30px 50px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 400px;
  width: 90%;
  border: 2px solid #f2cf74;
}

.alert-message {
  font-size: 1.4rem;
  font-weight: bold;
  color: #f44336;
  margin-bottom: 20px;
}

.alarm-modal input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
}

.alarm-modal button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.alarm-modal button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.error-message {
  color: #f44336;
  font-size: 0.9rem;
  margin-top: 10px;
}

/* Estilos para la sección modificar recursos */
.modify-recursos .recurso-control {
  background-color: #2c2c2c;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.modify-recursos h4 {
  margin-bottom: 10px;
  color: #CFA04A; /* Color similar al resto de títulos */
  font-size: 1.2rem;
}

.control-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.control-buttons button {
  background-color: #CFA04A;
  color: #fff;
}

.control-buttons button:hover {
  background-color: #b8923e;
}

.control-buttons span {
  font-size: 1.2rem;
  color: #fff;
  min-width: 40px;
  text-align: center;
}
</style>