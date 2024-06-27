import axios from 'axios'
import momentTimezone from 'moment-timezone'

import config from '@/config'
import logger from '@/utils/logger'
import modalNotification from '@/utils/notification'
import {
  getLocalStorageToken,
  removeLocalStorageToken,
  removeSessionStorageToken
} from '@/utils/common.util'

/*
  Handles API requests with axios library.
  @method: HTTP method (GET, POST, PUT, DELETE, etc.).
  @url: API endpoint URL.
  @baseURL: Base URL for the API.
  @queryParams: Query parameters for the API request.
  @bodyData: Request body data for the API.
  @cancelFunction: Function to cancel the API request.
  @formHeaders: Additional headers for the request.
  @removeHeaders: Flag to remove headers from the request.
*/
const APIrequest = async ({
  method,
  url,
  baseURL,
  queryParams,
  bodyData,
  cancelFunction,
  formHeaders,
  removeHeaders
}) => {
  // Retrieve API token from local storage.
  const apiToken = getLocalStorageToken()
  // const language = getLocalStorageLanguage();

  try {
    // Configuration for axios request.
    const axiosConfig = {
      method: method || 'GET',
      baseURL: config.API_BASE_URL,
      headers: {
        'content-type': 'application/json',
        'X-Frame-Options': 'sameorigin',
        timezone: momentTimezone.tz.guess(true)
        // language,
      }
    }

    // Merge additional headers if provided.
    if (formHeaders) {
      axiosConfig.headers = { ...axiosConfig.headers, ...formHeaders }
    }

    // Set base URL if provided.
    if (baseURL) {
      axiosConfig.baseURL = baseURL
    }

    // Set URL if provided.
    if (url) {
      axiosConfig.url = url
    }

    // Set query parameters if provided.
    if (queryParams) {
      const queryParamsPayload = {}
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key]
          if (typeof element === 'string') {
            element = element.trim()
          }
          if (!['', null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element
          }
        }
      }
      axiosConfig.params = queryParamsPayload
    }

    // Set request body data if provided.
    if (bodyData) {
      const bodyPayload = {}
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key]
          if (typeof element === 'string') {
            element = element.trim()
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element
          }
        }
      }
      axiosConfig.data = bodyPayload
    }

    // Set cancel token if cancel function provided.
    if (cancelFunction) {
      axiosConfig.cancelToken = new axios.CancelToken((cancel) => {
        cancelFunction(cancel)
      })
    }

    // Remove headers if specified.
    if (removeHeaders) {
      delete axiosConfig.headers
    }

    // Set authorization header with API token if available.
    if (apiToken) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        authorization: `Bearer ${apiToken}`
      }
    }

    // Make the API request using axios.
    const res = await axios(axiosConfig)
    return res.data
  } catch (error) {
    // if (error.response.status === 500) {
    //   console.log("Error message", error.response);
    //   return error.response.data ||;
    // }

    // Handle different error scenarios.
    if (axios.isCancel(error)) {
      logger('API canceled', error)
      throw new Error(error)
    } else {
      // Handle different HTTP status codes and provide appropriate notifications.
      const errorRes = error.response
      logger('Error in the api request', errorRes)
      if (errorRes && errorRes.status && errorRes.status === 403) {
        /** *Update permission***** */
        // store.dispatch(loadPermission({}, true));
      }
      if (errorRes && errorRes.status && errorRes.status === 500) {
        modalNotification({
          type: 'error',
          message: errorRes.data.message || errorRes.data.error.description
        })
        return errorRes.data
      }
      if (errorRes && errorRes.status && errorRes.status === 400) {
        if (errorRes.data.message) {
          modalNotification({
            type: 'warning',
            message: errorRes.data.message
          })
        }
        // if ([401].includes(errorRes.data.error.status)) {
        //   removeLocalStorageToken();
        //   removeSessionStorageToken();
        //   let path =
        //     window.location.pathname.search("admin") > 0 ? "/admin" : "/";
        //   window.location.replace(path);
        // }
      } else {
        // modalNotification({
        //   type: "warning",
        //   message: errorRes?.data?.error[0]?.message || "Not Found",
        // });
      }
      if (
        'error' in errorRes.data &&
        Object.keys(errorRes.data.error).length &&
        [401].includes(errorRes.data.error.status)
      ) {
        removeSessionStorageToken()
      }
      if (errorRes && errorRes.status && errorRes.status === 401) {
        modalNotification({
          type: 'error',
          message: errorRes?.data?.message
        })
        if ([401].includes(errorRes.data.error.status)) {
          removeLocalStorageToken()
          removeSessionStorageToken()
          let path = window.location.pathname.search('admin') > 0 ? '/admin' : '/'
          window.location.replace(path)
        }
      }
      if (errorRes && errorRes.status && errorRes.status === 429) {
        modalNotification({
          type: 'error',
          message: errorRes.data.message || errorRes.data.error.description
        })
      }
      if (errorRes?.data?.message) {
        // modalNotification({
        //   type: "error",
        //   message: errorRes?.data?.message,
        // });
      } else if (errorRes?.data?.error?.length > 0 && errorRes?.data?.error) {
        modalNotification({
          type: 'error',

          message: errorRes?.data?.error[0]?.message
        })
      }
      return null
    }
  }
}

export default APIrequest
