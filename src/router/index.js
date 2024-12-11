import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import PantallaPrincipal from '../components/PantallaPrincipal.vue';
import DashboardPage from '../components/DashboardPage.vue';
import CreateUsuario from '../components/CreateUsuario.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/principal',
    name: 'PantallaPrincipal',
    component: PantallaPrincipal,
    meta: { requiresAuth: true }, // Protege esta ruta
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/login', // Redirige a login por defecto
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login', // Maneja rutas no definidas
  },

  {
    path: '/crear-usuario',
    name: 'CreateUsuario',
    component: CreateUsuario,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'Login' }); // Redirige a login si no está autenticado
  } else {
    next();
  }
});

export default router;