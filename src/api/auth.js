// Auth object represents authentication-related API endpoints and their methods
const Auth = {
  // Endpoint for sending OTP during account login
  accountLogin: {
    url: '/login',
    method: 'POST'
  },

  // Endpoint for user account signup
  accountSignUp: {
    url: '/signup',
    method: 'POST'
  },

  // Endpoint for resetting user account password
  ResetPassword: {
    url: '/reset-password',
    method: 'POST'
  },

  // Endpoint for user account logout
  accountLogout: {
    url: '/logout',
    method: 'GET'
  },

  // Endpoint for requesting a password reset email
  forgotPassword: {
    url: '/forgot-password',
    method: 'POST'
  },

  // Endpoint for requesting a get details
  accountInfo: {
    url: '/account/me',
    method: 'GET'
  }

}

// Export the Auth object for use in other modules
export default Auth
