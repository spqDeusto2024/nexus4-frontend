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
        <h1 class="main-title">Gestión de Familias</h1>
        <button @click="mostrarFormularioCrearFamilia = true">Crear Familia</button>
  
        <table>
          <caption>Familias</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="familia in familias" :key="familia.id">
              <td>{{ familia.id }}</td>
              <td>{{ familia.apellido }}</td>
              <td>
                <button @click="eliminarFamilia(familia.id)">Eliminar</button>
                <button @click="editarFamilia(familia)">Modificar</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="mostrarFormularioCrearFamilia">
          <h3>Crear Familia</h3>
          <form @submit.prevent="crearFamilia">
            <label for="apellido">Apellido:</label>
            <input v-model="nuevoApellido" id="apellido" type="text" />
            <button type="submit">Añadir Familia</button>
          </form>
        </div>
  
        <div v-if="familiaParaEditar">
          <h3>Modificar Familia</h3>
          <form @submit.prevent="actualizarFamilia">
            <label for="apellido">Apellido:</label>
            <input v-model="familiaParaEditar.apellido" id="apellido" type="text" />
            <button type="submit">Actualizar Familia</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'FamiliasComponent',
    data() {
      return {
        familias: [], // Lista de familias
        nuevoApellido: "", // Campo para el nuevo apellido
        mostrarFormularioCrearFamilia: false,
        familiaParaEditar: null, // Familia seleccionada para editar
      };
    },
    mounted() {
      this.obtenerFamilias();
    },
    methods: {
      async obtenerFamilias() {
        try {
          const response = await axios.get("http://localhost:8000/familia/get_all");
          console.log("Datos obtenidos:", response.data); // Verifica los datos obtenidos
          this.familias = response.data;
        } catch (error) {
          console.error("Error al obtener las familias:", error);
        }
      },
      async crearFamilia() {
        try {
          const nuevaFamilia = { apellido: this.nuevoApellido };
          const response = await axios.post("http://localhost:8000/familia/create", nuevaFamilia);
          this.familias.push(response.data);
          this.nuevoApellido = "";
          this.mostrarFormularioCrearFamilia = false;
        } catch (error) {
          console.error("Error al crear la familia:", error);
        }
      },
      async eliminarFamilia(id) {
        try {
          await axios.delete(`http://localhost:8000/familia/delete/${id}`);
          this.familias = this.familias.filter(familia => familia.id !== id);
        } catch (error) {
          console.error("Error al eliminar la familia:", error);
        }
      },
      editarFamilia(familia) {
        this.familiaParaEditar = { ...familia };
      },
      async actualizarFamilia() {
        try {
          const response = await axios.put(`http://localhost:8000/familia/update/${this.familiaParaEditar.id}`, this.familiaParaEditar);
          const index = this.familias.findIndex(familia => familia.id === this.familiaParaEditar.id);
          this.$set(this.familias, index, response.data);
          this.familiaParaEditar = null;
        } catch (error) {
          console.error("Error al actualizar la familia:", error);
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
  }
  </style>