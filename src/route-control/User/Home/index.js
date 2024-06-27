import { baseRoutes } from '@/helpers/base-routes'

// Define access route for the user interface, including a path for the home page.
const accessRoute = {
  HOME: {
    path: `${baseRoutes.userBaseRoutes}dashboard`
  },
  UPDATE_PROFILE: {
    path: `${baseRoutes.userBaseRoutes}update-profile`
  }
}

export default accessRoute
