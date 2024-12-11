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
        <button @click="mostrarFormularioCrearRecurso = true" class="btn">Crear Recurso</button>
  
        <table>
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
            <tr v-for="recurso in recursos" :key="recurso.id">
              <td>{{ recurso.id }}</td>
              <td>{{ recurso.nombre }}</td>
              <td>{{ recurso.capacidad_min }}</td>
              <td>{{ recurso.capacidad_max }}</td>
              <td>{{ recurso.capacidad_actual }}</td>
              <td>
                <button @click="eliminarRecurso(recurso.id)" class="btn btn-danger">Eliminar</button>
                <button @click="editarRecurso(recurso)" class="btn btn-primary">Modificar</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="mostrarFormularioCrearRecurso">
          <h3>Crear Recurso</h3>
          <form @submit.prevent="crearRecurso">
            <label for="nombre">Nombre:</label>
            <input v-model="nuevoRecurso.nombre" id="nombre" type="text" />
            <label for="capacidad_min">Capacidad Mínima:</label>
            <input v-model="nuevoRecurso.capacidad_min" id="capacidad_min" type="number" />
            <label for="capacidad_max">Capacidad Máxima:</label>
            <input v-model="nuevoRecurso.capacidad_max" id="capacidad_max" type="number" />
            <label for="capacidad_actual">Capacidad Actual:</label>
            <input v-model="nuevoRecurso.capacidad_actual" id="capacidad_actual" type="number" />
            <button type="submit" class="btn btn-success">Añadir Recurso</button>
          </form>
        </div>
  
        <div v-if="recursoParaEditar">
          <h3>Modificar Recurso</h3>
          <form @submit.prevent="actualizarRecurso">
            <label for="nombre">Nombre:</label>
            <input v-model="recursoParaEditar.nombre" id="nombre" type="text" />
            <label for="capacidad_min">Capacidad Mínima:</label>
            <input v-model="recursoParaEditar.capacidad_min" id="capacidad_min" type="number" />
            <label for="capacidad_max">Capacidad Máxima:</label>
            <input v-model="recursoParaEditar.capacidad_max" id="capacidad_max" type="number" />
            <label for="capacidad_actual">Capacidad Actual:</label>
            <input v-model="recursoParaEditar.capacidad_actual" id="capacidad_actual" type="number" />
            <button type="submit" class="btn btn-success">Actualizar Recurso</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'RecursosComponent',
    data() {
      return {
        recursos: [], // Lista de recursos
        nuevoRecurso: {
          nombre: '',
          capacidad_min: 0,
          capacidad_max: 0,
          capacidad_actual: 0
        },
        mostrarFormularioCrearRecurso: false,
        recursoParaEditar: null, // Recurso seleccionado para editar
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
        } catch (error) {
          console.error("Error al obtener los recursos:", error);
        }
      },
      async crearRecurso() {
        try {
          const response = await axios.post("http://localhost:8000/recurso/create", this.nuevoRecurso);
          this.recursos.push(response.data);
          this.nuevoRecurso = {
            nombre: '',
            capacidad_min: 0,
            capacidad_max: 0,
            capacidad_actual: 0
          };
          this.mostrarFormularioCrearRecurso = false;
        } catch (error) {
          console.error("Error al crear el recurso:", error);
        }
      },
      async eliminarRecurso(id) {
        try {
          await axios.delete(`http://localhost:8000/recurso/delete/${id}`);
          this.recursos = this.recursos.filter(recurso => recurso.id !== id);
        } catch (error) {
          console.error("Error al eliminar el recurso:", error);
        }
      },
      editarRecurso(recurso) {
        this.recursoParaEditar = { ...recurso };
      },
      async actualizarRecurso() {
        try {
          const response = await axios.put(`http://localhost:8000/recurso/update/${this.recursoParaEditar.id}`, this.recursoParaEditar);
          const index = this.recursos.findIndex(recurso => recurso.id === this.recursoParaEditar.id);
          this.$set(this.recursos, index, response.data);
          this.recursoParaEditar = null;
        } catch (error) {
          console.error("Error al actualizar el recurso:", error);
        }
      },
    }
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
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #333;
    color: #fff;
    font-weight: bold;
    border-bottom: 2px solid #444;
  }
  
  button {
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  button.btn {
    background-color: #4caf50;
    color: #fff;
  }
  
  button.btn:hover {
    background-color: #45a049;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  button.btn-danger {
    background-color: #f44336;
  }
  
  button.btn-danger:hover {
    background-color: #e53935;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  button.btn-primary {
    background-color: #2196f3;
  }
  
  button.btn-primary:hover {
    background-color: #1e88e5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  button.btn-success {
    background-color: #4caf50;
  }
  
  button.btn-success:hover {
    background-color: #45a049;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  </style>