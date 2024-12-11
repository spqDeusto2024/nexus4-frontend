<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/logo.png" alt="Logo" class="login-logo" />
        <h2>Iniciar Sesión</h2>
      </div>
      <form @submit.prevent="handleSubmit" class="login-form">
        <label for="username">Usuario</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          placeholder="Ingresa tu usuario"
          required
        />

        <label for="password">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="Ingresa tu contraseña"
          required
        />

        <button type="submit">Acceder</button>
      </form>
      <p class="register-link">
        ¿No tienes usuario? <router-link to="/crear-usuario">Crea aquí tu usuario</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSubmit() {
      // Crear un objeto URLSearchParams para enviar datos como formulario
      const params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);

      axios.post('http://localhost:8000/usuarios/verificar', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        // Verificar si se recibió el access_token
        if (response.data.access_token) {
          // Guardar el token en localStorage
          localStorage.setItem('access_token', response.data.access_token);

          // Configurar Axios para incluir el token en futuros requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

          // Redirigir al usuario a la página principal
          this.$router.push({ name: 'Dashboard' });
        } else {
          // Mostrar mensaje de error si no se recibió el token
          alert('Error en la autenticación. Por favor, intenta nuevamente.');
        }
      })
      .catch(error => {
        console.error('Error en la verificación:', error);
        
        if (error.response) {
          if (error.response.status === 401) {
            alert('Usuario o contraseña incorrectos.');
          } else if (error.response.status === 422) {
            alert('Datos inválidos. Por favor, verifica los campos.');
          } else {
            alert('Ocurrió un error en la verificación. Por favor, intenta nuevamente.');
          }
        } else {
          alert('No se pudo conectar con el servidor. Verifica tu conexión.');
        }
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #1a1a1a, #4a4a4a);
  color: #fff;
  overflow: hidden; /* Opcional, evita scroll en caso de algún contenido extra */
}

.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
}

.login-box {
  background: #1a1a1a;
  padding: 40px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.6s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 5px #f2cf74);
}

.login-header h2 {
  font-weight: 700;
  font-size: 1.6rem;
  margin: 0;
  color: #ffffff;
}

.login-form {
  width: 100%;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #f0f0f0;
}

.login-form input {
  width: 100%;
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

.login-form input::placeholder {
  color: #888;
}

.login-form input:focus {
  background: #262626;
  box-shadow: 0 0 4px #f2cf74;
}

.login-form button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background: #f2cf74;
  color: #211f27;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
}

.login-form button:hover {
  background: #CFA04A;
  box-shadow: 0 0 8px rgba(184, 134, 54, 0.5);
}

.register-link {
  text-align: center;
  margin-top: 15px;
  color: #bbb;
  font-size: 14px;
}

.register-link a {
  color: #f2cf74;
  text-decoration: none;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #CFA04A;
  text-decoration: underline;
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
</style>
