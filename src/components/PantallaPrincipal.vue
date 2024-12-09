<template>
    <div class="hello">
      <h1>Gestión de Familias</h1>
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
  
      <h1>Gestión de Inquilinos</h1>
      <button @click="mostrarFormularioCrearInquilino = true">Crear Inquilino</button>
  
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
              <button @click="eliminarInquilino(inquilino.id)">Eliminar</button>
              <button @click="editarInquilino(inquilino)">Modificar</button>
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
          <button type="submit">Añadir Inquilino</button>
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
          <button type="submit">Actualizar Inquilino</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'PantallaPrincipal',
    data() {
      return {
        familias: [], // Lista de familias
        nuevoApellido: "", // Campo para el nuevo apellido
        mostrarFormularioCrearFamilia: false,
        familiaParaEditar: null, // Familia seleccionada para editar
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
        inquilinoParaEditar: null // Inquilino seleccionado para editar
      };
    },
    mounted() {
      this.obtenerFamilias();
      this.obtenerInquilinos();
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
      }
    }
  };
  </script>
  
  <style scoped>
  .hello {
    text-align: center;
    margin-top: 60px;
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
    background-color: #f2f2f2;
  }
  button {
    margin: 5px;
  }
  </style>
  