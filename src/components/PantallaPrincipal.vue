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

    <h1>Gestión de Estancias</h1>
    <button @click="mostrarFormularioCrearEstancia = true">Crear Estancia</button>

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
            <button @click="eliminarEstancia(estancia.id)">Eliminar</button>
            <button @click="editarEstancia(estancia)">Modificar</button>
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
        <button type="submit">Añadir Estancia</button>
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
        <button type="submit">Actualizar Estancia</button>
      </form>
    </div>

    <h1>Gestión de Empleos</h1>
    <button @click="mostrarFormularioCrearEmpleo = true">Crear Empleo</button>

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
            <button @click="eliminarEmpleo(empleo.id)">Eliminar</button>
            <button @click="editarEmpleo(empleo)">Modificar</button>
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
        <button type="submit">Añadir Empleo</button>
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
        <button type="submit">Actualizar Empleo</button>
      </form>
    </div>
    <h1>Gestión de Recursos</h1>
    <button @click="mostrarFormularioCrearRecurso = true">Crear Recurso</button>

    <table>
      <caption>Recursos</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Capacidad Mínima</th>
          <th>Capacidad Máxima</th>
          <th>Capacidad Actual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recurso in recursos" :key="recurso.id">
          <td>{{ recurso.id }}</td>
          <td>{{ recurso.nombre }}</td>
          <td>{{ recurso.capacidad_min }}</td>
          <td>{{ recurso.capacidad_max }}</td>
          <td>{{ recurso.capacidad_actual }}</td>
          <td>
            <button @click="eliminarRecurso(recurso.id)">Eliminar</button>
            <button @click="editarRecurso(recurso)">Modificar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="mostrarFormularioCrearRecurso">
      <h3>Crear Recurso</h3>
      <form @submit.prevent="crearRecurso">
        <label for="nombre">Nombre:</label>
        <input v-model="nuevoRecurso.nombre" id="nombre" type="text" />
        <label for="capacidad_min">Capacidad Mínima:</label>
        <input v-model="nuevoRecurso.capacidad_min" id="capacidad_min" type="number" />
        <label for="capacidad_max">Capacidad Máxima:</label>
        <input v-model="nuevoRecurso.capacidad_max" id="capacidad_max" type="number" />
        <label for="capacidad_actual">Capacidad Actual:</label>
        <input v-model="nuevoRecurso.capacidad_actual" id="capacidad_actual" type="number" />
        <button type="submit">Añadir Recurso</button>
      </form>
    </div>

    <div v-if="recursoParaEditar">
      <h3>Modificar Recurso</h3>
      <form @submit.prevent="actualizarRecurso">
        <label for="nombre">Nombre:</label>
        <input v-model="recursoParaEditar.nombre" id="nombre" type="text" />
        <label for="capacidad_min">Capacidad Mínima:</label>
        <input v-model="recursoParaEditar.capacidad_min" id="capacidad_min" type="number" />
        <label for="capacidad_max">Capacidad Máxima:</label>
        <input v-model="recursoParaEditar.capacidad_max" id="capacidad_max" type="number" />
        <label for="capacidad_actual">Capacidad Actual:</label>
        <input v-model="recursoParaEditar.capacidad_actual" id="capacidad_actual" type="number" />
        <button type="submit">Actualizar Recurso</button>
      </form>
    </div>
    <h1>Gestión de Roles</h1>
<button @click="mostrarFormularioCrearRole = true">Crear Role</button>

<table>
  <caption>Roles</caption>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="role in roles" :key="role.id">
      <td>{{ role.id }}</td>
      <td>{{ role.nombre }}</td>
      <td>
        <button @click="eliminarRole(role.id)">Eliminar</button>
        <button @click="editarRole(role)">Modificar</button>
      </td>
    </tr>
  </tbody>
</table>

<div v-if="mostrarFormularioCrearRole">
  <h3>Crear Role</h3>
  <form @submit.prevent="crearRole">
    <label for="nombre">Nombre:</label>
    <input v-model="nuevoRole.nombre" id="nombre" type="text" />
    <button type="submit">Añadir Role</button>
  </form>
</div>

<div v-if="roleParaEditar">
  <h3>Modificar Role</h3>
  <form @submit.prevent="actualizarRole">
    <label for="nombre">Nombre:</label>
    <input v-model="roleParaEditar.nombre" id="nombre" type="text" />
    <button type="submit">Actualizar Role</button>
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
      nuevoInquilino: 
      {
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
      estancias: [], // Lista de estancias
      nuevaEstancia: 
      {
        nombre: "",
        categoria: "",
        personas_actuales: 0,
        capacidad_max: 0,
        recurso_id: 0
      },
      mostrarFormularioCrearEstancia: false,
      estanciaParaEditar: null, // Estancia seleccionada para editar
      empleos: [], // Lista de empleos
      nuevoEmpleo: {
        empleo: "",
        edad_minima: 0,
        id_estancia: 0
      },
      mostrarFormularioCrearEmpleo: false,
      empleoParaEditar: null, // Empleo seleccionado para editar
      recursos: [],
      nuevoRecurso: {
        nombre: '',
        capacidad_min: 0,
        capacidad_max: 0,
        capacidad_actual: 0
      },
      mostrarFormularioCrearRecurso: false,
      recursoParaEditar: null,
      roles: [], // Lista de roles
      nuevoRole: {
      nombre: "",
      },
      mostrarFormularioCrearRole: false,
      roleParaEditar: null, 
      };
  },
  mounted() {
    this.obtenerFamilias();
    this.obtenerInquilinos();
    this.obtenerEstancias();
    this.obtenerEmpleos();
    this.obtenerRecursos();
    this.obtenerRoles();

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
    },
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
    async obtenerEmpleos() {
    try {
      const response = await axios.get("http://localhost:8000/empleo/get_all");
      console.log("Datos obtenidos:", response.data); // Verifica los datos obtenidos
      this.empleos = response.data;
    } catch (error) {
      console.error("Error al obtener los empleos:", error);
    }
  },
  async crearEmpleo() {
    try {
      const response = await axios.post("http://localhost:8000/empleo/create", this.nuevoEmpleo);
      this.empleos.push(response.data);
      this.nuevoEmpleo = {
        empleo: "",
        edad_minima: 0,
        id_estancia: 0,
      };
      this.mostrarFormularioCrearEmpleo = false;
    } catch (error) {
      console.error("Error al crear el empleo:", error);
    }
  },
  async eliminarEmpleo(id) {
    try {
      await axios.delete(`http://localhost:8000/empleo/delete/${id}`);
      this.empleos = this.empleos.filter(empleo => empleo.id !== id);
    } catch (error) {
      console.error("Error al eliminar el empleo:", error);
    }
  },
  editarEmpleo(empleo) {
    this.empleoParaEditar = { ...empleo };
  },
  async actualizarEmpleo() {
    try {
      const response = await axios.put(`http://localhost:8000/empleo/update/${this.empleoParaEditar.id}`, this.empleoParaEditar);
      const index = this.empleos.findIndex(empleo => empleo.id === this.empleoParaEditar.id);
      this.$set(this.empleos, index, response.data);
      this.empleoParaEditar = {
        empleo: "",
        edad_minima: 0,
        id_estancia: 0,
      };
    } catch (error) {
      console.error("Error al actualizar el empleo:", error);
    }
  },
  async obtenerRecursos() {
      try {
        const response = await axios.get("http://localhost:8000/recurso/get_all");
        this.recursos = response.data;
      } catch (error) {
        console.error("Error al obtener los recursos:", error);
      }
    },
    async crearRecurso() {
      try {
        const response = await axios.post("http://localhost:8000/recurso/create", this.nuevoRecurso);
        this.recursos.push(response.data);
        this.nuevoRecurso = {
          nombre: "",
          capacidad_min: 0,
          capacidad_max: 0,
          capacidad_actual: 0
        };
        this.mostrarFormularioCrearRecurso = false;
      } catch (error) {
        console.error("Error al crear el recurso:", error);
      }
    },
    async eliminarRecurso(id) {
      try {
        await axios.delete(`http://localhost:8000/recurso/delete/${id}`);
        this.recursos = this.recursos.filter(recurso => recurso.id !== id);
      } catch (error) {
        console.error("Error al eliminar el recurso:", error);
      }
    },
    editarRecurso(recurso) {
      this.recursoParaEditar = { ...recurso };
    },
    async actualizarRecurso() {
      try {
        const response = await axios.put(`http://localhost:8000/recurso/update/${this.recursoParaEditar.id}`, this.recursoParaEditar);
        const index = this.recursos.findIndex(recurso => recurso.id === this.recursoParaEditar.id);
        this.$set(this.recursos, index, response.data);
        this.recursoParaEditar = null;
      } catch (error) {
        console.error("Error al actualizar el recurso:", error);
      }
    },
      async obtenerRoles() {
    try {
      const response = await axios.get("http://localhost:8000/roles/get_all");
      this.roles = response.data;
    } catch (error) {
      console.error("Error al obtener los roles:", error);
    }
  },
  async crearRole() {
    try {
      const response = await axios.post("http://localhost:8000/roles/create", this.nuevoRole);
      this.roles.push(response.data);
      this.nuevoRole = {
        nombre: "",
      };
      this.mostrarFormularioCrearRole = false;
    } catch (error) {
      console.error("Error al crear el role:", error);
    }
  },
  async eliminarRole(id) {
    try {
      await axios.delete(`http://localhost:8000/roles/delete/${id}`);
      this.roles = this.roles.filter(role => role.id !== id);
    } catch (error) {
      console.error("Error al eliminar el role:", error);
    }
  },
  editarRole(role) {
    this.roleParaEditar = { ...role };
  },
  async actualizarRole() {
    try {
      const response = await axios.put(`http://localhost:8000/roles/update/${this.roleParaEditar.id}`, this.roleParaEditar);
      const index = this.roles.findIndex(role => role.id === this.roleParaEditar.id);
      this.$set(this.roles, index, response.data);
      this.roleParaEditar = null;
    } catch (error) {
      console.error("Error al actualizar el role:", error);
    }
  },
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