import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/index.scss'
import { globalRegister } from './global'
import { setupStore } from './store/index'
import directivesRegister from './directives'
const app = createApp(App)
app.use(store)
app.use(globalRegister)
app.use(directivesRegister)
setupStore()
app.use(router)
app.mount('#app')
