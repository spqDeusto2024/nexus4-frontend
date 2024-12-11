<template> 
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <img src="@/assets/logo.png" alt="Logo" class="login-logo" />
          <h2>Crear Nuevo Usuario</h2>
        </div>
        <form @submit.prevent="handleCreateUser" class="login-form">
          <label for="new-username">Nombre de Usuario</label>
          <input 
            type="text" 
            id="new-username" 
            v-model="newUsername" 
            placeholder="Ingresa un nombre de usuario"
            required
          />
  
          <label for="new-password">Contraseña</label>
          <input 
            type="password" 
            id="new-password" 
            v-model="newPassword" 
            placeholder="Ingresa una contraseña"
            required
          />
  
          <label for="confirm-password">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="confirmPassword" 
            placeholder="Repite la contraseña"
            required
          />
  
          <button type="submit">Crear Usuario</button>
        </form>
        <p class="register-link">
          ¿Ya tienes usuario? <a href="#">Inicia sesión aquí</a>.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "CreateUser",
    data() {
      return {
        newUsername: "",
        newPassword: "",
        confirmPassword: ""
      };
    },
    methods: {
      handleCreateUser() {
        if (this.newPassword !== this.confirmPassword) {
          alert('Las contraseñas no coinciden.');
          return;
        }
  
        const payload = {
        usuario: this.newUsername, // Cambiado de 'username' a 'usuario'
        password: this.newPassword
        };
  
        axios.post('http://localhost:8000/usuarios/create', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if (response.status === 200) {
                alert('Usuario creado exitosamente. Ahora puedes iniciar sesión.');
                this.$router.push({ name: 'Login' });
            } else {
                alert('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
            }
      })
        .catch(error => {
          console.error('Error en la creación del usuario:', error);
          if (error.response) {
            if (error.response.status === 400) {
              alert('El nombre de usuario ya existe.');
            } else {
              alert('Ocurrió un error en la creación del usuario. Por favor, intenta nuevamente.');
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
    overflow: hidden; /* Opcional, evita scroll en caso de contenido extra */
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
  