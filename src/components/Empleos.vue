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
      <div class="layout">
        <!-- Contenedor izquierdo -->
        <div class="left-container">
          <!-- White Box para crear empleo -->
          <div class="white-box">
            <h3>Crear Empleo</h3>
            <form @submit.prevent="crearEmpleo">
              <label for="nombre"></label>
              <input
                v-model="nuevoEmpleo.nombre"
                id="nombre"
                type="text"
                placeholder="Ingrese nombre del empleo"
              />
              <label for="edad_minima"></label>
              <input
                v-model="nuevoEmpleo.edad_minima"
                id="edad_minima"
                type="number"
                placeholder="Ingrese edad mínima"
              />
              <label for="estancia_id"></label>
              <input
                v-model="nuevoEmpleo.estancia_id"
                id="estancia_id"
                type="number"
                placeholder="Ingrese ID de estancia"
              />
              <button type="submit" class="btn btn-primary">Añadir Empleo</button>
            </form>
          </div>

          <!-- White Box para buscar -->
          <div class="white-box">
            <h3>Buscador</h3>
            <form @submit.prevent="filtrarEmpleos">
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

          <!-- White Box para modificar empleo -->
          <div v-if="empleoParaEditar" class="white-box">
            <h3>Modificar Empleo</h3>
            <form @submit.prevent="actualizarEmpleo">
              <label for="nombre"></label>
              <input
                v-model="empleoParaEditar.nombre"
                id="nombre"
                type="text"
                placeholder="Ingrese nombre del empleo"
              />
              <label for="edad_minima"></label>
              <input
                v-model="empleoParaEditar.edad_minima"
                id="edad_minima"
                type="number"
                placeholder="Ingrese edad mínima"
              />
              <label for="estancia_id"></label>
              <input
                v-model="empleoParaEditar.estancia_id"
                id="estancia_id"
                type="number"
                placeholder="Ingrese ID de estancia"
              />
              <button type="submit" class="btn btn-primary">Actualizar Empleo</button>
            </form>
          </div>
        </div>

        <!-- Contenedor derecho: Tabla -->
        <div class="table-container">
          <div class="table-responsive">
            <table class="styled-table">
              <caption>Empleos</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edad Mínima</th>
                  <th>Estancia ID</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="empleo in empleosFiltrados" :key="empleo.id">
                  <td class="centered">{{ empleo.id }}</td>
                  <td class="centered">{{ empleo.nombre }}</td>
                  <td class="centered">{{ empleo.edad_minima }}</td>
                  <td class="centered">{{ empleo.estancia_id }}</td>
                  <td class="centered">
                    <button @click="eliminarEmpleo(empleo.id)" class="btn btn-danger">Eliminar</button>
                    <button @click="editarEmpleo(empleo)" class="btn btn-primary">Modificar</button>
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
  name: "EmpleosComponent",
  data() {
    return {
      empleos: [], // Lista completa de empleos
      empleosFiltrados: [], // Lista de empleos que se muestran (originalmente todos)
      busqueda: "", // Texto ingresado en el buscador
      nuevoEmpleo: {
        nombre: "",
        edad_minima: 0,
        estancia_id: 0,
      },
      empleoParaEditar: null, // Empleo seleccionado para editar
    };
  },
  mounted() {
    this.obtenerEmpleos();
  },
  methods: {
    async obtenerEmpleos() {
      try {
        const response = await axios.get("http://localhost:8000/empleo/get_all");
        this.empleos = response.data;
        this.empleosFiltrados = [...this.empleos]; // Inicialmente muestra todos los empleos
      } catch (error) {
        console.error("Error al obtener los empleos:", error);
      }
    },
    filtrarEmpleos() {
      if (!this.busqueda) {
        // Si no hay texto en el buscador, muestra todos los empleos
        this.empleosFiltrados = [...this.empleos];
      } else {
        // Filtra los empleos cuyo nombre contiene el texto de búsqueda
        this.empleosFiltrados = this.empleos.filter((empleo) =>
          empleo.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      }
    },
    async crearEmpleo() {
      try {
        const response = await axios.post("http://localhost:8000/empleo/create", this.nuevoEmpleo);
        this.empleos.push(response.data);
        this.empleosFiltrados.push(response.data); // Agrega el nuevo empleo también a la lista filtrada
        this.nuevoEmpleo = {
          nombre: "",
          edad_minima: 0,
          estancia_id: 0,
        };
      } catch (error) {
        console.error("Error al crear el empleo:", error);
      }
    },
    async eliminarEmpleo(id) {
      try {
        await axios.delete(`http://localhost:8000/empleo/delete/${id}`);
        this.empleos = this.empleos.filter((empleo) => empleo.id !== id);
        this.filtrarEmpleos(); // Vuelve a aplicar el filtro después de eliminar
      } catch (error) {
        console.error("Error al eliminar el empleo:", error);
      }
    },
    editarEmpleo(empleo) {
      this.empleoParaEditar = { ...empleo };
    },
    async actualizarEmpleo() {
      try {
        const response = await axios.put(
          `http://localhost:8000/empleo/update/${this.empleoParaEditar.id}`,
          this.empleoParaEditar
        );
        const index = this.empleos.findIndex(
          (empleo) => empleo.id === this.empleoParaEditar.id
        );
        this.$set(this.empleos, index, response.data);
        this.filtrarEmpleos(); // Vuelve a aplicar el filtro después de actualizar
        this.empleoParaEditar = null;
      } catch (error) {
        console.error("Error al actualizar el empleo:", error);
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
  padding: 80px 20px;
  margin-top: 60px; /* Evita que el contenido quede oculto detrás del encabezado fijo */
  overflow-y: auto; /* Permite el desplazamiento vertical */
  box-sizing: border-box;
  max-height: calc(100vh - 60px); /* Altura máxima basada en la altura de la ventana menos el header */
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