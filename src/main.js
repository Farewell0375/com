import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import api from './views/pages/req/api.js'
const app = createApp(App)
app.use(router)
app.use(api)
app.use(ElementPlus)
app.mount('#app')


