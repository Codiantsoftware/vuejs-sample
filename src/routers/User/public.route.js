import authRoute from "./Auth/index.route";

/**
 * Generates an array of routes for the authentication section.
 * @param {function} t - Translation function (if used for internationalization).
 * @returns {Array} An array containing route objects for the authentication section.
 */
export default function route(t) {
  // Combine and return the routes for the authentication section
  return [...authRoute(t)];
}