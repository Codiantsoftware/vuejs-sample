import routesMap from '@/route-control/adminRoutrMap'
import AdminLogin from '@/views/Admin/AdminLogin.vue'
/**
 * Generates an array of route objects for admin-related pages.
 * @returns {Array} An array of route objects.
 */
export default function route() {
  return [
    {
      path: routesMap.LOGIN.path,
      name: 'adminLogin',
      key: routesMap.LOGIN.path,
      meta: {
        auth: false, // No authentication required
        isFrontend: true // Frontend route
      },
      component: AdminLogin // Component to render for this route
    }
  ]
}
