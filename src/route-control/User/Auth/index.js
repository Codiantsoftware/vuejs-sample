import { baseRoutes } from '@/helpers/base-routes'

// Define access routes for the user interface, including paths for landing page, FAQ, privacy policy, terms and conditions, login, and signup.
const accessRoute = {
  LANDING_PAGE: {
    path: `${baseRoutes.userBaseRoutes}`
  },
  LOGIN: {
    path: `${baseRoutes.userBaseRoutes}login`
  },
  SIGNUP: {
    path: `${baseRoutes.userBaseRoutes}signup`
  },
  FORGOT_PASSWORD: {
    path: `${baseRoutes.userBaseRoutes}forgot-password`
  },
  RESET_PASSWORD: {
    path: `${baseRoutes.userBaseRoutes}reset-password/:token`
  }
}

export default accessRoute
