import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/scss/all.scss'
import "bootstrap"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

