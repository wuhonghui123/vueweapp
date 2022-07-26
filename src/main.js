import {createApp} from 'vue'
import App from './App.vue'
import {router} from "@/router";
import api from "@/http/index"
import store from '@/store/index'

// router作为全局插件来使用

createApp(App).use(router).use(api).use(store).mount('#app')
