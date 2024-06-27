import { baseRoutes } from '@/helpers/base-routes'

// Define access routes for the user interface, including paths for landing page, FAQ, privacy policy, terms and conditions, login, and signup.
const accessRoute = {
  HOME: {
    path: `${baseRoutes.adminBaseRoutes}/dashboard`,
  },
}

export default accessRoute
