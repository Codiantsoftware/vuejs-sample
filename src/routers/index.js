// import { AdminLayout, UserLayout } from "../layouts";
import { createRouter, createWebHistory } from 'vue-router'
import routess from './generateRoute'
import store from '@/stores/store'

const router = createRouter({
  history: createWebHistory(),
  routes: routess() // Use the exported routes function from the routes file
})

const auth = store.state.auth



router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.auth === true) {
    // Check if the user is authenticated
    if (auth?.authStatus) {
      // Proceed to the route if authenticated
      next()
    } else {
      // Redirect to login if not authenticated
      next({ name: 'auth.login' })
    }
  } else if (to.meta.isFrontend === false && !auth?.isAdmin) {
    // Check if the route requires admin privileges
    // Redirect to exception if not admin
    next({ name: 'route.exception' })
  } else if (to.name === 'auth.login' && auth.authStatus) {
    // Redirect to home if already authenticated and trying to access the login page
    next({ name: 'Home' })
  } else if (to.meta.access === true && !auth?.isAdmin) {
    // Check if the route requires admin access and user is not an admin
    // Redirect to exception or handle as needed
    next({ name: 'route.exception' })
  } else {
    // Proceed to the route for other cases
    next()
  }
})




export default router // Export the router instance
