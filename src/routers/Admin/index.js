import PrivateLayoutVue from '@/layouts/Private.vue'
import privateRoutes from './private.route'
import publicRoutes from './public.route'

/**
 * Generates an array of route objects for the user section, including public and private layouts.
 * @param {function} t - Translation function (if used for internationalization).
 * @returns {Array} An array containing route objects for both public and private layouts.
 */
export const adminRoutes = (t) => [
  {
    path: '/admin/public',
    children: [...publicRoutes(t)] // Define child routes for the private layout
  },
  {
    path: '/admin/private',
    component: PrivateLayoutVue,
    children: [...privateRoutes(t)] // Define child routes for the private layout
  }
]
