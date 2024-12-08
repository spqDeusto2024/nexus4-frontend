<template>
    <div class="hello">
      <h3>Gestión de Familias</h3>
      <button @click="mostrarFormularioCrear = true">Crear Familia</button>
  
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
  
      <div v-if="mostrarFormularioCrear">
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
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'PantallaPrincipal',
    data() {
      return {
        familias: [], // Lista de familias
        nuevoApellido: "", // Campo para el nuevo apellido
        mostrarFormularioCrear: false,
        familiaParaEditar: null // Familia seleccionada para editar
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
          this.mostrarFormularioCrear = false;
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