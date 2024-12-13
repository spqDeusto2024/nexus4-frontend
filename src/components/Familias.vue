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
      <h1 class="main-title">Gestión de Familias</h1>
      <div class="layout">
        <!-- Contenedor izquierdo -->
        <div class="left-container">
          <!-- White Box para crear familia -->
          <div class="white-box">
            <h3>Crear Familia</h3>
            <form @submit.prevent="crearFamilia">
              <label for="apellido"></label>
              <input
                v-model="nuevoApellido"
                id="apellido"
                type="text"
                placeholder="Ingrese apellido"
              />
              <button type="submit" class="btn btn-primary">Añadir Familia</button>
            </form>
          </div>

          <!-- White Box para buscar -->
          <div class="white-box">
            <h3>Buscador</h3>
            <form @submit.prevent="filtrarFamilias">
              <label for="busqueda"></label>
              <input
                v-model="busqueda"
                id="busqueda"
                type="text"
                placeholder="Ingrese apellido a buscar"
              />
              <button type="submit" class="btn btn-primary">Buscar</button>
            </form>
          </div>

          <!-- White Box para modificar familia -->
          <div v-if="familiaParaEditar" class="white-box">
            <h3>Modificar Familia</h3>
            <form @submit.prevent="actualizarFamilia">
              <label for="apellido"></label>
              <input
                v-model="familiaParaEditar.apellido"
                id="apellido"
                type="text"
                placeholder="Ingrese apellido"
              />
              <button type="submit" class="btn btn-primary">Actualizar Familia</button>
            </form>
          </div>
        </div>

        <!-- Contenedor derecho: Tabla -->
        <div class="table-container">
          <table class="styled-table">
            <caption>Familias</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Apellido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="familia in familiasFiltradas" :key="familia.id">
                <td class="centered">{{ familia.id }}</td>
                <td class="centered">{{ familia.apellido }}</td>
                <td class="centered">
                  <button @click="eliminarFamilia(familia.id)" class="btn btn-danger">Eliminar</button>
                  <button @click="editarFamilia(familia)" class="btn btn-primary">Modificar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FamiliasComponent",
  data() {
    return {
      familias: [], // Lista completa de familias
      familiasFiltradas: [], // Lista de familias que se muestran (originalmente todas)
      busqueda: "", // Texto ingresado en el buscador
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
        this.familias = response.data;
        this.familiasFiltradas = [...this.familias]; // Inicialmente muestra todas las familias
      } catch (error) {
        console.error("Error al obtener las familias:", error);
      }
    },
    filtrarFamilias() {
      if (!this.busqueda) {
        // Si no hay texto en el buscador, muestra todas las familias
        this.familiasFiltradas = [...this.familias];
      } else {
        // Filtra las familias cuyo apellido contiene el texto de búsqueda
        this.familiasFiltradas = this.familias.filter((familia) =>
          familia.apellido.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      }
    },
    async crearFamilia() {
      try {
        const nuevaFamilia = { apellido: this.nuevoApellido };
        const response = await axios.post("http://localhost:8000/familia/create", nuevaFamilia);
        this.familias.push(response.data);
        this.familiasFiltradas.push(response.data); // Agrega la nueva familia también a la lista filtrada
        this.nuevoApellido = "";
        this.mostrarFormularioCrearFamilia = false;
      } catch (error) {
        console.error("Error al crear la familia:", error);
      }
    },
    async eliminarFamilia(id) {
      try {
        await axios.delete(`http://localhost:8000/familia/delete/${id}`);
        this.familias = this.familias.filter((familia) => familia.id !== id);
        this.filtrarFamilias(); // Vuelve a aplicar el filtro después de eliminar
      } catch (error) {
        console.error("Error al eliminar la familia:", error);
      }
    },
    editarFamilia(familia) {
      this.familiaParaEditar = { ...familia };
    },
    async actualizarFamilia() {
      try {
        const response = await axios.put(
          `http://localhost:8000/familia/update/${this.familiaParaEditar.id}`,
          this.familiaParaEditar
        );
        const index = this.familias.findIndex(
          (familia) => familia.id === this.familiaParaEditar.id
        );
        this.$set(this.familias, index, response.data);
        this.filtrarFamilias(); // Vuelve a aplicar el filtro después de actualizar
        this.familiaParaEditar = null;
      } catch (error) {
        console.error("Error al actualizar la familia:", error);
      }
    },
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
  padding: 80px 20px;
  margin-top: 60px; /* Añadir margen superior para evitar que el contenido quede oculto detrás del encabezado fijo */
  overflow-y: auto; /* Permitir desplazamiento vertical en el contenido */
  box-sizing: border-box;
}

.main-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Layout principal */
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
</style>