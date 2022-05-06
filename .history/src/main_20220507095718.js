import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font_3320783_qyv03gcx5t/iconfont.css'
import "./assets/css/global.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import JsonViewer from 'vue-json-viewer'


import CodeEditor from 'bin-code-editor';
Vue.use(CodeEditor);
Vue.use(JsonViewer)
import 'default-passive-events'


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router, store, render: h => h(App)
}).$mount('#app')
