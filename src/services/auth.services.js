import APIrequest from '@/services/axios'
import Auth from '@/api/auth'
import logger from '@/utils/logger'

// Service functions related to user authentication and profile management.
export const UserAuthServices = {
  /**
   * Logs in a user.
   * @param {Object} bodyData - Request payload for user login.
   * @returns {Promise} A promise that resolves to the response data.
   */
  userLogin: async (bodyData) => {
    try {
      const payload = {
        ...Auth.accountLogin,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  /**
   * Signs up a new user.
   * @param {Object} bodyData - Request payload for user signup.
   * @returns {Promise} A promise that resolves to the response data.
   */
  userSignUp: async (bodyData) => {
    try {
      const payload = {
        ...Auth.accountSignUp,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  /**
   * Logs out the user.
   * @returns {Promise} A promise that resolves to the response data.
   */
  userLogout: async () => {
    try {
      const payload = {
        ...Auth.accountLogout
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  /**
   * Resets the user's password.
   * @param {Object} bodyData - Request payload for resetting password.
   * @param {Object} queryParams - Query parameters for resetting password.
   * @returns {Promise} A promise that resolves to the response data.
   */
  resetPasswordService: async (bodyData, queryParams) => {
    try {
      const payload = {
        ...Auth.ResetPassword,
        bodyData,
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  /**
   * Initiates the process of resetting a forgotten password.
   * @param {Object} bodyData - Request payload for initiating forgotten password reset.
   * @param {Object} queryParams - Query parameters for initiating forgotten password reset.
   * @returns {Promise} A promise that resolves to the response data.
   */
  forgotPassword: async (bodyData, queryParams) => {
    try {
      const payload = {
        ...Auth.forgotPassword,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  accountInfo: async () => {
    try {
      const payload = {
        ...Auth.accountInfo,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
}
