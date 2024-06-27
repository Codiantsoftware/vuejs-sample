// Configuration object for the application
const config = {
  // Node environment
  NODE_ENV: import.meta.env.NODE_ENV,
  // Key for storing/retrieving name in local storage
  NAME_KEY: import.meta.env.VITE_API_KEY,
  // Title of the application
  NAME_TITLE: import.meta.env.VUE_APP_NAME_TITLE,
  // Base URL for API requests
  API_BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
  // URL for downloading the resume
  RESUME_DOWNLOAD_URL: import.meta.env.VUE_APP_RESUME_DOWNLOAD_URL,
  // Default language for the application
  DEFAULT_LANGUAGE: import.meta.env.VUE_APP_DEFAULT_LANGUAGE || 'en',
  // Base URL for accessing images
  IMAGE_URL: import.meta.env.VUE_APP_IMAGE_PATH,
}

export default config

// Comment: The above code defines a configuration object for the application,
// containing various environment-specific settings such as API URLs, language,
// and image paths. These settings can be accessed throughout the application.
