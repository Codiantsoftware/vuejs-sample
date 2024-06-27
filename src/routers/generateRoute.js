// import { AdminLayout, UserLayout } from "../layouts";
import NotFoundVue from '@/views/NotFound.vue'
import { adminRoutes } from './Admin'
import { userRoutes } from './User'
import AdminLayout from '@/layouts/Admin.vue'

// Define the routess function to generate routes
export default function routes() {
  const adminRoutesConfig = {
    path: '/admin',
    component: AdminLayout, // Make sure AdminLayout is correctly imported
    children: [...adminRoutes()] // Placeholder for adminRoutes() function
  }

  const userRoutesConfig = {
    path: '/',
    // name: 'auth.login',
    // component: AdminLayout, // Make sure AdminLayout is correctly imported
    children: [...userRoutes()] // Placeholder for userRoutes() function
  }

  const notFoundRouteConfig = {
    path: '/:pathMatch(.*)*',
    component: NotFoundVue // Make sure NotFoundVue is correctly imported
  }
  const ExceptionConfig = {
    path: '/exception',
    name: 'route.exception',
    component: NotFoundVue // Make sure NotFoundVue is correctly imported
  }

  return [adminRoutesConfig, userRoutesConfig, notFoundRouteConfig, ExceptionConfig]
}
