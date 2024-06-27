// Importing global CSS styles
import './assets/main.css'

// Importing necessary modules from Vue ecosystem
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// Importing the root Vue component, router, and i18n utility
import App from './App.vue'
import router from './routers'
import i18n from './utils/i18n'
import store from './stores/store'

// Creating the Vue app instance
const app = createApp(App)

// Adding Ant Design Vue as a plugin
app.use(Antd)

// Adding Pinia for state management
app.use(createPinia())

// Adding Vue Router for navigation
app.use(router)

// Adding internationalization (i18n) support
app.use(i18n)
app.use(store)

// Mounting the app to the DOM element with the ID 'app'
app.mount('#app')
