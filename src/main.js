import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import bus from 'common/mitt'

// const app = createApp(App)
// app.config.globalProperties.$bus = bus

createApp(App).use(router).mount('#app')


// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// const app =createApp(App)

// import bus from 'common/mitt'

// app.use(router).mount('#app')
// app.config.globalProperties.$bus=bus

