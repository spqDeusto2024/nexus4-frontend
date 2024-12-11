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
        <h1 class="main-title">Gestión de Estancias</h1>
        <button @click="mostrarFormularioCrearEstancia = true" class="btn">Crear Estancia</button>
  
        <table>
          <caption>Estancias</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Personas Actuales</th>
              <th>Capacidad Máxima</th>
              <th>Recurso ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="estancia in estancias" :key="estancia.id">
              <td>{{ estancia.id }}</td>
              <td>{{ estancia.nombre }}</td>
              <td>{{ estancia.categoria }}</td>
              <td>{{ estancia.personas_actuales }}</td>
              <td>{{ estancia.capacidad_max }}</td>
              <td>{{ estancia.recurso_id }}</td>
              <td>
                <button @click="eliminarEstancia(estancia.id)" class="btn btn-danger">Eliminar</button>
                <button @click="editarEstancia(estancia)" class="btn btn-primary">Modificar</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="mostrarFormularioCrearEstancia">
          <h3>Crear Estancia</h3>
          <form @submit.prevent="crearEstancia">
            <label for="nombre">Nombre:</label>
            <input v-model="nuevaEstancia.nombre" id="nombre" type="text" />
            <label for="categoria">Categoría:</label>
            <input v-model="nuevaEstancia.categoria" id="categoria" type="text" />
            <label for="personas_actuales">Personas Actuales:</label>
            <input v-model="nuevaEstancia.personas_actuales" id="personas_actuales" type="number" />
            <label for="capacidad_max">Capacidad Máxima:</label>
            <input v-model="nuevaEstancia.capacidad_max" id="capacidad_max" type="number" />
            <label for="recurso_id">Recurso ID:</label>
            <input v-model="nuevaEstancia.recurso_id" id="recurso_id" type="number" />
            <button type="submit" class="btn btn-success">Añadir Estancia</button>
          </form>
        </div>
  
        <div v-if="estanciaParaEditar">
          <h3>Modificar Estancia</h3>
          <form @submit.prevent="actualizarEstancia">
            <label for="nombre">Nombre:</label>
            <input v-model="estanciaParaEditar.nombre" id="nombre" type="text" />
            <label for="categoria">Categoría:</label>
            <input v-model="estanciaParaEditar.categoria" id="categoria" type="text" />
            <label for="personas_actuales">Personas Actuales:</label>
            <input v-model="estanciaParaEditar.personas_actuales" id="personas_actuales" type="number" />
            <label for="capacidad_max">Capacidad Máxima:</label>
            <input v-model="estanciaParaEditar.capacidad_max" id="capacidad_max" type="number" />
            <label for="recurso_id">Recurso ID:</label>
            <input v-model="estanciaParaEditar.recurso_id" id="recurso_id" type="number" />
            <button type="submit" class="btn btn-success">Actualizar Estancia</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'EstanciasComponent',
    data() {
      return {
        estancias: [], // Lista de estancias
        nuevaEstancia: {
          nombre: "",
          categoria: "",
          personas_actuales: 0,
          capacidad_max: 0,
          recurso_id: 0
        },
        mostrarFormularioCrearEstancia: false,
        estanciaParaEditar: null, // Estancia seleccionada para editar
      };
    },
    mounted() {
      this.obtenerEstancias();
    },
    methods: {
      async obtenerEstancias() {
        try {
          const response = await axios.get("http://localhost:8000/estancia/get_all");
          this.estancias = response.data;
        } catch (error) {
          console.error('Error al obtener las estancias:', error);
        }
      },
      async crearEstancia() {
        try {
          const response = await axios.post("http://localhost:8000/estancia/create", this.nuevaEstancia);
          this.estancias.push(response.data);
          this.nuevaEstancia = {
            nombre: "",
            categoria: "",
            personas_actuales: 0,
            capacidad_max: 0,
            recurso_id: 0
          };
          this.mostrarFormularioCrearEstancia = false;
        } catch (error) {
          console.error('Error al crear la estancia:', error);
        }
      },
      async eliminarEstancia(id) {
        try {
          await axios.delete(`http://localhost:8000/estancia/delete/${id}`);
          this.estancias = this.estancias.filter(estancia => estancia.id !== id);
        } catch (error) {
          console.error('Error al eliminar la estancia:', error);
        }
      },
      editarEstancia(estancia) {
        this.estanciaParaEditar = { ...estancia };
      },
      async actualizarEstancia() {
        try {
          const response = await axios.put(`http://localhost:8000/estancia/update/${this.estanciaParaEditar.id}`, this.estanciaParaEditar);
          const index = this.estancias.findIndex(estancia => estancia.id === this.estanciaParaEditar.id);
          this.$set(this.estancias, index, response.data);
          this.estanciaParaEditar = {
            nombre: "",
            categoria: "",
            personas_actuales: 0,
            capacidad_max: 0,
            recurso_id: 0
          };
        } catch (error) {
          console.error('Error al actualizar la estancia:', error);
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