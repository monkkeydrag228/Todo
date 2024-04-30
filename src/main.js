import { createApp } from 'vue'
import App from './App.vue'
import Project from './HelloWorld.vue'

const app = createApp(App)
app.component("my-component", Project)
app.mount('#app')
