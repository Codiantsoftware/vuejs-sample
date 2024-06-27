import auth from '@/route-control/User/Auth'
import home from '@/route-control/User/Home'

// Combine and export different access control routes for the application, including routes for authentication, user profile, and home.
const AccessControl = {
  ...auth,
  ...home
}

export default AccessControl
