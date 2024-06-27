import routesMap from '@/route-control/userRouteMap'
import ForgotPasswordVue from '@/views/User/ForgotPassword.vue'
import LoginVue from '@/views/User/Login.vue'
import LandingPage from '@/views/User/LandingPage.vue'
import ResetPasswordVue from '@/views/User/ResetPassWord.vue'
import SignupVue from '@/views/User/Signup.vue'
/**
 * Generates an array of route objects for user authentication and landing page.
 * @returns {Array} An array containing route objects for login, signup, and landing page.
 */
export default function route() {
  return [
    // Landing Page Route
    {
      path: routesMap.LANDING_PAGE.path,
      name: 'LandingPage',
      key: routesMap.LANDING_PAGE.path,
      meta: {
        auth: false, // No authentication required
        isFrontend: true // Frontend route
      },
      component: LandingPage
    },
    // Signup Route
    {
      path: routesMap.SIGNUP.path,
      name: 'Signup',
      key: routesMap.SIGNUP.path,
      meta: {
        auth: false, // No authentication required
        isFrontend: true // Frontend route
      },
      component: SignupVue
    },

    // Login Route
    {
      path: routesMap.LOGIN.path,
      name: 'auth.login',
      key: routesMap.LOGIN.path,
      meta: {
        auth: false, // No authentication required
        isFrontend: true // Frontend route
      },
      component: LoginVue
    },

    // Forgot Password Route
    {
      path: routesMap.FORGOT_PASSWORD.path,
      name: 'Forgot_Password',
      key: routesMap.FORGOT_PASSWORD.path,
      meta: {
        auth: false, // No authentication required
        isFrontend: true // Frontend route
      },
      component: ForgotPasswordVue // Consider customizing the element for the landing page
    },

    // Reset Password Route
    {
      path: routesMap.RESET_PASSWORD.path,
      name: 'Reset_Password',
      key: routesMap.RESET_PASSWORD.path,
      meta: {
        auth: false, // No authentication required
        isFrontend: true // Frontend route
      },
      component: ResetPasswordVue // Consider customizing the element for the landing page
    }
  ]
}
