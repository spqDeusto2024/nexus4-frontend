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
        <h1 class="main-title">Gestión de Inquilinos</h1>
        <button @click="mostrarFormularioCrearInquilino = true" class="btn">Crear Inquilino</button>
  
        <table>
          <caption>Inquilinos</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Nacimiento</th>
              <th>Muerte</th>
              <th>Familia ID</th>
              <th>Empleo ID</th>
              <th>Roles ID</th>
              <th>Estancia ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inquilino in inquilinos" :key="inquilino.id">
              <td>{{ inquilino.id }}</td>
              <td>{{ inquilino.nombre }}</td>
              <td>{{ inquilino.categoria }}</td>
              <td>{{ inquilino.nacimiento }}</td>
              <td>{{ inquilino.muerte }}</td>
              <td>{{ inquilino.familia_id }}</td>
              <td>{{ inquilino.empleo_id }}</td>
              <td>{{ inquilino.roles_id }}</td>
              <td>{{ inquilino.id_estancia }}</td>
              <td>
                <button @click="eliminarInquilino(inquilino.id)" class="btn btn-danger">Eliminar</button>
                <button @click="editarInquilino(inquilino)" class="btn btn-primary">Modificar</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="mostrarFormularioCrearInquilino">
          <h3>Crear Inquilino</h3>
          <form @submit.prevent="crearInquilino">
            <label for="nombre">Nombre:</label>
            <input v-model="nuevoInquilino.nombre" id="nombre" type="text" />
            <label for="categoria">Categoria:</label>
            <input v-model="nuevoInquilino.categoria" id="categoria" type="text" />
            <label for="nacimiento">Nacimiento:</label>
            <input v-model="nuevoInquilino.nacimiento" id="nacimiento" type="date" />
            <label for="muerte">Muerte:</label>
            <input v-model="nuevoInquilino.muerte" id="muerte" type="date" />
            <label for="familia_id">Familia ID:</label>
            <input v-model="nuevoInquilino.familia_id" id="familia_id" type="number" />
            <label for="empleo_id">Empleo ID:</label>
            <input v-model="nuevoInquilino.empleo_id" id="empleo_id" type="number" />
            <label for="roles_id">Roles ID:</label>
            <input v-model="nuevoInquilino.roles_id" id="roles_id" type="number" />
            <label for="id_estancia">Estancia ID:</label>
            <input v-model="nuevoInquilino.id_estancia" id="id_estancia" type="number" />
            <button type="submit" class="btn btn-success">Añadir Inquilino</button>
          </form>
        </div>
  
        <div v-if="inquilinoParaEditar">
          <h3>Modificar Inquilino</h3>
          <form @submit.prevent="actualizarInquilino">
            <label for="nombre">Nombre:</label>
            <input v-model="inquilinoParaEditar.nombre" id="nombre" type="text" />
            <label for="categoria">Categoria:</label>
            <input v-model="inquilinoParaEditar.categoria" id="categoria" type="text" />
            <label for="nacimiento">Nacimiento:</label>
            <input v-model="inquilinoParaEditar.nacimiento" id="nacimiento" type="date" />
            <label for="muerte">Muerte:</label>
            <input v-model="inquilinoParaEditar.muerte" id="muerte" type="date" />
            <label for="familia_id">Familia ID:</label>
            <input v-model="inquilinoParaEditar.familia_id" id="familia_id" type="number" />
            <label for="empleo_id">Empleo ID:</label>
            <input v-model="inquilinoParaEditar.empleo_id" id="empleo_id" type="number" />
            <label for="roles_id">Roles ID:</label>
            <input v-model="inquilinoParaEditar.roles_id" id="roles_id" type="number" />
            <label for="id_estancia">Estancia ID:</label>
            <input v-model="inquilinoParaEditar.id_estancia" id="id_estancia" type="number" />
            <button type="submit" class="btn btn-success">Actualizar Inquilino</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'InquilinosComponent',
    data() {
      return {
        inquilinos: [], // Lista de inquilinos
        nuevoInquilino: {
          nombre: "",
          categoria: "",
          nacimiento: "",
          muerte: "",
          familia_id: null,
          empleo_id: null,
          roles_id: null,
          id_estancia: null
        },
        mostrarFormularioCrearInquilino: false,
        inquilinoParaEditar: null, // Inquilino seleccionado para editar
      };
    },
    mounted() {
      this.obtenerInquilinos();
    },
    methods: {
      async obtenerInquilinos() {
        try {
          const response = await axios.get("http://localhost:8000/inquilino/get_all");
          console.log("Datos obtenidos:", response.data); // Verifica los datos obtenidos
          this.inquilinos = response.data;
        } catch (error) {
          console.error("Error al obtener los inquilinos:", error);
        }
      },
      async crearInquilino() {
        try {
          const response = await axios.post("http://localhost:8000/inquilino/create", this.nuevoInquilino);
          this.inquilinos.push(response.data);
          this.nuevoInquilino = {
            nombre: "",
            categoria: "",
            nacimiento: "",
            muerte: "",
            familia_id: null,
            empleo_id: null,
            roles_id: null,
            id_estancia: null
          };
          this.mostrarFormularioCrearInquilino = false;
        } catch (error) {
          console.error("Error al crear el inquilino:", error);
        }
      },
      async eliminarInquilino(id) {
        try {
          await axios.delete(`http://localhost:8000/inquilino/delete/${id}`);
          this.inquilinos = this.inquilinos.filter(inquilino => inquilino.id !== id);
        } catch (error) {
          console.error("Error al eliminar el inquilino:", error);
        }
      },
      editarInquilino(inquilino) {
        this.inquilinoParaEditar = { ...inquilino };
      },
      async actualizarInquilino() {
        try {
          const response = await axios.put(`http://localhost:8000/inquilino/update/${this.inquilinoParaEditar.id}`, this.inquilinoParaEditar);
          const index = this.inquilinos.findIndex(inquilino => inquilino.id === this.inquilinoParaEditar.id);
          this.$set(this.inquilinos, index, response.data);
          this.inquilinoParaEditar = null;
        } catch (error) {
          console.error("Error al actualizar el inquilino:", error);
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