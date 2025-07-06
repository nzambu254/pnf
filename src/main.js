import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'material-icons/iconfont/material-icons.css'
import { auth } from './firebase'
import store from './store';

const app = createApp(App)

// Provide auth to components if needed
app.provide('auth', auth)

app.use(router)
app.use(store)
app.mount('#app')