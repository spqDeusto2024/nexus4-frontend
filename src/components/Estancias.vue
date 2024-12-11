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
            <th>Recurso</th>
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
            <td>{{ getRecursoNombre(estancia.recurso_id) }}</td>
            <td>
              <button @click="eliminarEstancia(estancia.id)" class="btn btn-danger">Eliminar</button>
              <button @click="editarEstancia(estancia)" class="btn btn-primary">Modificar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="mostrarFormularioCrearEstancia" class="form-box centered">
        <h3>Crear Estancia</h3>
        <form @submit.prevent="crearEstancia" class="form">
          <label for="nombre">Nombre:</label>
          <input v-model="nuevaEstancia.nombre" id="nombre" type="text" placeholder="Nombre"/>
          <label for="categoria">Categoría:</label>
          <input v-model="nuevaEstancia.categoria" id="categoria" type="text" placeholder="Categoría"/>
          <label for="personas_actuales">Personas Actuales:</label>
          <input v-model="nuevaEstancia.personas_actuales" id="personas_actuales" type="number" placeholder="N° Personas"/>
          <label for="capacidad_max">Capacidad Máxima:</label>
          <input v-model="nuevaEstancia.capacidad_max" id="capacidad_max" type="number" placeholder="Capacidad"/>
          <label for="recurso_id">Recurso:</label>
          <select v-model="nuevaEstancia.recurso_id" id="recurso_id" required>
            <option disabled value="">Seleccione un recurso</option>
            <option v-for="recurso in recursos" :key="recurso.id" :value="recurso.id">
              {{ recurso.nombre }}
            </option>
          </select>
          <button type="submit" class="btn btn-success">Añadir Estancia</button>
        </form>
      </div>

      <div v-if="estanciaParaEditar" class="form-box centered">
        <h3>Modificar Estancia</h3>
        <form @submit.prevent="actualizarEstancia" class="form">
          <label for="nombre">Nombre:</label>
          <input v-model="estanciaParaEditar.nombre" id="nombre" type="text" placeholder="Nombre"/>
          <label for="categoria">Categoría:</label>
          <input v-model="estanciaParaEditar.categoria" id="categoria" type="text" placeholder="Categoría"/>
          <label for="personas_actuales">Personas Actuales:</label>
          <input v-model="estanciaParaEditar.personas_actuales" id="personas_actuales" type="number" placeholder="N° Personas"/>
          <label for="capacidad_max">Capacidad Máxima:</label>
          <input v-model="estanciaParaEditar.capacidad_max" id="capacidad_max" type="number" placeholder="Capacidad"/>
          <label for="recurso_id">Recurso:</label>
          <select v-model="estanciaParaEditar.recurso_id" id="recurso_id" required>
            <option disabled value="">Seleccione un recurso</option>
            <option v-for="recurso in recursos" :key="recurso.id" :value="recurso.id">
              {{ recurso.nombre }}
            </option>
          </select>
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
    recursos: [], // Lista de recursos
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
  this.obtenerRecursos();
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
  async obtenerRecursos() {
    try {
      const response = await axios.get("http://localhost:8000/recurso/get_all");
      this.recursos = response.data;
    } catch (error) {
      console.error('Error al obtener los recursos:', error);
    }
  },
  async crearEstancia() {
    try {
      await axios.post("http://localhost:8000/estancia/create", this.nuevaEstancia);
      await this.obtenerEstancias();
      this.nuevaEstancia = null;
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
  getRecursoNombre(id) {
    const recurso = this.recursos.find(recurso => recurso.id === id);
    return recurso ? recurso.nombre : 'No asignado';
  },
  async actualizarEstancia() {
    try {
      if (this.estanciaParaEditar.capacidad_maxima_alcanzada === undefined || this.estanciaParaEditar.capacidad_maxima_alcanzada === null) {
        this.estanciaParaEditar.capacidad_maxima_alcanzada = false;
      }
      await axios.put(`http://localhost:8000/estancia/update/${this.estanciaParaEditar.id}`, this.estanciaParaEditar);
      await this.obtenerEstancias();
      this.estanciaParaEditar = null;
      this.estanciaParaEditar = null;
    } catch (error) {
        console.error('Error al actualizar la estancia:', error);
        alert('No se pudo actualizar la estancia. Por favor, verifica los datos.');
    }
  },
}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

html, body {
margin: 0;
padding: 0;
font-family: 'Roboto', sans-serif;
background: linear-gradient(135deg, #1a1a1a, #4a4a4a);
color: #fff;
height: 100%;
width: 100%;
overflow-x: hidden;
overflow-y: auto;
}

.dashboard-container {
display: flex;
flex-direction: column;
min-height: 100vh;
backdrop-filter: blur(6px);
box-sizing: border-box;
overflow: auto;
}

/* Top bar */
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
box-shadow: 0 0 20px rgba(0,0,0,0.7);
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
background-color: #262626;
box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

.logout {
margin-left: auto;
}

.logout a {
color: #fff;
font-size: 1rem;
font-weight: 500;
text-decoration: none;
border: 1px solid #f2cf74;
padding: 5px 10px;
border-radius: 4px;
transition: background-color 0.3s;
background: #1e1e1e;
}

.logout a:hover {
background-color: #400;
box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

/* Content */
.content {
flex: 1;
padding: 20px;
padding-bottom: 100px;
margin-top: 60px;
box-sizing: border-box;
overflow-y: auto;
}

.main-title {
font-size: 1.8rem;
font-weight: 700;
text-align: center;
margin-bottom: 30px;
color: #fff;
text-shadow: 0 0 10px rgba(0,0,0,0.6);
}

table {
width: 100%;
border-collapse: collapse;
margin-bottom: 50px;
background: #1a1a1a;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 20px rgba(0,0,0,0.5);
word-wrap: break-word;
padding-bottom: 100px;
margin-bottom: 100px;
}

tbody {
  max-height: 45vh; /* Limita la altura de la tabla */
  overflow-y: auto; /* Agrega un scrollbar interno si es necesario */
  display: block; /* Requerido para habilitar el scroll interno */
}

thead, tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

th, td { 
  width: 100px; /* Ancho de las celdas */
  padding: 10px;
  text-align: center;
}

caption {
text-align: left;
font-weight: 700;
padding: 10px;
background: #111;
color: #fff;
}

th, td {
padding: 10px;
border-bottom: 1px solid #333;
color: #ccc;
font-size: 0.95rem;
}

th {
background-color: #111;
font-weight: 700;
color: #fff;
border-bottom: 2px solid #333;
}

tr:hover {
background: #262626;
}

/* Buttons */
button {
margin: 5px;
padding: 10px 20px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 14px;
transition: background-color 0.3s, box-shadow 0.3s;
font-weight: 500;
}

button.btn {
background-color: #f2cf74;
color: #211f27;
}

button.btn:hover {
background-color: #CFA04A;
box-shadow: 0 0 8px rgba(184, 134, 54, 0.5);
}

button.btn-danger {
background-color: #F05D5E;

}

button.btn-danger:hover {
background-color: #EE4444;
box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

button.btn-primary {
background-color: #7FAFC7;
}

button.btn-primary:hover {
background-color: #5595B4;
box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

button.btn-success {
background-color: #f2cf74;
}

button.btn-success:hover {
background-color: #CFA04A;
box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

/* Forms */
.form-box {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: auto; /* Centrará horizontalmente si no hay otras restricciones */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  overflow-y: auto;
  /*animation: fadeIn 0.6s ease-out;*/

  /* Para centrar vertical y horizontalmente 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;  Asegúrate de que quede por encima de otros elementos */
}

.centered{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.form-box h3 {
font-weight: 700;
font-size: 1.4rem;
margin-bottom: 20px;
color: #f2cf74;
text-align: center;
}

.form {
display: flex;
flex-direction: column;
}

.form label {
margin-bottom: 8px;
font-weight: 500;
color: #f0f0f0;
font-size: 0.95rem;
}

.form input {
width: 100%;
box-sizing: border-box;
padding: 12px;
margin-bottom: 20px;
border: none;
border-radius: 4px;
outline: none;
background: #1e1e1e;
color: #ccc;
font-size: 14px;
transition: background 0.3s;
}

.form input::placeholder {
color: #888;
}

.form input:focus {
background: #262626;
box-shadow: 0 0 4px #f2cf74;
}

/* Select */
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #ccc;
}

select:focus {
  background: #262626;
  box-shadow: 0 0 4px #f2cf74;
}

/* Animación de entrada */
@keyframes fadeIn {
from { 
  opacity: 0; 
  transform: translateY(20px); 
}
to { 
  opacity: 1; 
  transform: translateY(0); 
}
}

/* Media Query para pantallas pequeñas */
@media (max-width: 600px) {
  table {
    margin-bottom: 100px; /* Aumenta el espacio debajo de la tabla */
  }

  /* Opcional: Ajusta otros estilos para pantallas pequeñas */
  .main-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .form-box {
    max-width: 90%; /* Aumenta el ancho del formulario en pantallas pequeñas */
  }
}
</style>
