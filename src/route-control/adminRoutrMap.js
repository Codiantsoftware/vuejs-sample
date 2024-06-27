import adminRoute from "./Admin";

// Combine and export the routes defined in the admin module for better organization and easier usage.
const adminRouteMap = {
  ...adminRoute,
};
export default adminRouteMap;
