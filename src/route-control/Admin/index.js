import auth from './Auth'
import home from './Home'
// Combine and export access control modules related to various features such as user management, authentication, dashboard, CMS management, and admin account.
const AccessControl = {
  ...auth,
  ...home
}

export default AccessControl
