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
        <h1 class="main-title">Gestión de Empleos</h1>
        <button @click="mostrarFormularioCrearEmpleo = true" class="btn">Crear Empleo</button>
  
        <table>
          <caption>Empleos</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Empleo</th>
              <th>Edad Mínima</th>
              <th>ID Estancia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleo in empleos" :key="empleo.id">
              <td>{{ empleo.id }}</td>
              <td>{{ empleo.empleo }}</td>
              <td>{{ empleo.edad_minima }}</td>
              <td>{{ empleo.id_estancia }}</td>
              <td>
                <button @click="eliminarEmpleo(empleo.id)" class="btn btn-danger">Eliminar</button>
                <button @click="editarEmpleo(empleo)" class="btn btn-primary">Modificar</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="mostrarFormularioCrearEmpleo">
          <h3>Crear Empleo</h3>
          <form @submit.prevent="crearEmpleo">
            <label for="empleo">Empleo:</label>
            <input v-model="nuevoEmpleo.empleo" id="empleo" type="text" />
            <label for="edad_minima">Edad Mínima:</label>
            <input v-model="nuevoEmpleo.edad_minima" id="edad_minima" type="number" />
            <label for="id_estancia">ID Estancia:</label>
            <input v-model="nuevoEmpleo.id_estancia" id="id_estancia" type="number" />
            <button type="submit" class="btn btn-success">Añadir Empleo</button>
          </form>
        </div>
  
        <div v-if="empleoParaEditar">
          <h3>Modificar Empleo</h3>
          <form @submit.prevent="actualizarEmpleo">
            <label for="empleo">Empleo:</label>
            <input v-model="empleoParaEditar.empleo" id="empleo" type="text" />
            <label for="edad_minima">Edad Mínima:</label>
            <input v-model="empleoParaEditar.edad_minima" id="edad_minima" type="number" />
            <label for="id_estancia">ID Estancia:</label>
            <input v-model="empleoParaEditar.id_estancia" id="id_estancia" type="number" />
            <button type="submit" class="btn btn-success">Actualizar Empleo</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmpleosComponent',
    data() {
      return {
        empleos: [], // Lista de empleos
        nuevoEmpleo: {
          empleo: "",
          edad_minima: 0,
          id_estancia: 0,
        },
        mostrarFormularioCrearEmpleo: false,
        empleoParaEditar: null, // Empleo seleccionado para editar
      };
    },
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