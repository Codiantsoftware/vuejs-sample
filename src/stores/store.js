import { createStore } from 'vuex'
// import { moduleA } from
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { authModule } from './auth'

// Create a SecureLS instance for secure local storage
var ls = new SecureLS({ isCompression: false })
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule // Import and include the auth module
  },
  plugins: [
    // Use vuex-persistedstate plugin for persistent state management
    createPersistedState({
      key: 'VueX', // Key for the stored state
      paths: ['auth'], // Specify which modules to persist
      storage: {
        // Use SecureLS for storage management
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
})
