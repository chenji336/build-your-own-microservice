import "./set-public-path"
import Vue from "vue"
import Router from "vue-router"
import App from "./App.vue"
import buildRouter from "./router"
import store from "./store"

Vue.config.productionTip = false // 开发环境vue会有tip提示，关闭掉
Vue.use(Router)

function render() {
  const router = buildRouter()
  new Vue({
    el: "#sub",
    router,
    render: (h) => h(App),
    store,
  })
}

// !window.isMicroService && render()
render()

export function mount(props) {
  console.log('[vue] props from main framework', props);
  render();
}
