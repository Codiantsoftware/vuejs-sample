import userRoutes from './User'
import adminRoutes from './Admin'

// Combine and export the routes defined in the admin and user modules for better organization and easier usage.
const moduleRoutesMap = {
  admin: { ...adminRoutes },
  user: { ...userRoutes }
}
export default moduleRoutesMap
