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
      <div class="layout">
        <!-- Contenedor izquierdo -->
        <div class="left-container">
          <!-- White Box para crear inquilino -->
          <div class="white-box">
            <h3>Crear Inquilino</h3>
            <form @submit.prevent="crearInquilino">
              <label for="nombre"></label>
              <input
                v-model="nuevoInquilino.nombre"
                id="nombre"
                type="text"
                placeholder="Ingrese nombre"
              />
              <label for="categoria"></label>
              <input
                v-model="nuevoInquilino.categoria"
                id="categoria"
                type="text"
                placeholder="Ingrese categoría"
              />
              <label for="nacimiento"></label>
              <input
                v-model="nuevoInquilino.nacimiento"
                id="nacimiento"
                type="date"
              />
              <label for="muerte"></label>
              <input
                v-model="nuevoInquilino.muerte"
                id="muerte"
                type="date"
              />
              <label for="familia_id"></label>
              <input
                v-model="nuevoInquilino.familia_id"
                id="familia_id"
                type="number"
                placeholder="Ingrese ID de familia"
              />
              <label for="empleo_id"></label>
              <input
                v-model="nuevoInquilino.empleo_id"
                id="empleo_id"
                type="number"
                placeholder="Ingrese ID de empleo"
              />
              <label for="roles_id"></label>
              <input
                v-model="nuevoInquilino.roles_id"
                id="roles_id"
                type="number"
                placeholder="Ingrese ID de roles"
              />
              <label for="id_estancia"></label>
              <input
                v-model="nuevoInquilino.id_estancia"
                id="id_estancia"
                type="number"
                placeholder="Ingrese ID de estancia"
              />
              <button type="submit" class="btn btn-primary">Añadir Inquilino</button>
            </form>
          </div>

          <!-- White Box para buscar -->
          <div class="white-box">
            <h3>Buscador</h3>
            <form @submit.prevent="filtrarInquilinos">
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
        </div>

        <!-- Contenedor derecho: Tabla -->
        <div class="table-container">
          <div class="table-responsive">
            <table class="styled-table">
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
                <tr v-for="inquilino in inquilinosFiltrados" :key="inquilino.id">
                  <td class="centered">{{ inquilino.id }}</td>
                  <td class="centered">{{ inquilino.nombre }}</td>
                  <td class="centered">{{ inquilino.categoria }}</td>
                  <td class="centered">{{ inquilino.nacimiento }}</td>
                  <td class="centered">{{ inquilino.muerte }}</td>
                  <td class="centered">{{ inquilino.familia_id }}</td>
                  <td class="centered">{{ inquilino.empleo_id }}</td>
                  <td class="centered">{{ inquilino.roles_id }}</td>
                  <td class="centered">{{ inquilino.id_estancia }}</td>
                  <td class="centered">
                    <button @click="eliminarInquilino(inquilino.id)" class="btn btn-danger">Eliminar</button>
                    <button @click="editarInquilino(inquilino)" class="btn btn-primary">Modificar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InquilinosComponent",
  data() {
    return {
      inquilinos: [], // Lista completa de inquilinos
      inquilinosFiltrados: [], // Lista de inquilinos que se muestran (originalmente todos)
      busqueda: "", // Texto ingresado en el buscador
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
        this.inquilinos = response.data;
        this.inquilinosFiltrados = [...this.inquilinos]; // Inicialmente muestra todos los inquilinos
      } catch (error) {
        console.error("Error al obtener los inquilinos:", error);
      }
    },
    filtrarInquilinos() {
      if (!this.busqueda) {
        // Si no hay texto en el buscador, muestra todos los inquilinos
        this.inquilinosFiltrados = [...this.inquilinos];
      } else {
        // Filtra los inquilinos cuyo nombre contiene el texto de búsqueda
        this.inquilinosFiltrados = this.inquilinos.filter((inquilino) =>
          inquilino.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      }
    },
    async crearInquilino() {
      try {
        const response = await axios.post("http://localhost:8000/inquilino/create", this.nuevoInquilino);
        this.inquilinos.push(response.data);
        this.inquilinosFiltrados.push(response.data); // Agrega el nuevo inquilino también a la lista filtrada
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
        this.inquilinos = this.inquilinos.filter((inquilino) => inquilino.id !== id);
        this.filtrarInquilinos(); // Vuelve a aplicar el filtro después de eliminar
      } catch (error) {
        console.error("Error al eliminar el inquilino:", error);
      }
    },
    editarInquilino(inquilino) {
      this.inquilinoParaEditar = { ...inquilino };
    },
    async actualizarInquilino() {
      try {
        const response = await axios.put(
          `http://localhost:8000/inquilino/update/${this.inquilinoParaEditar.id}`,
          this.inquilinoParaEditar
        );
        const index = this.inquilinos.findIndex(
          (inquilino) => inquilino.id === this.inquilinoParaEditar.id
        );
        this.$set(this.inquilinos, index, response.data);
        this.filtrarInquilinos(); // Vuelve a aplicar el filtro después de actualizar
        this.inquilinoParaEditar = null;
      } catch (error) {
        console.error("Error al actualizar el inquilino:", error);
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
