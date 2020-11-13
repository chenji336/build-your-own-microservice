import './set-public-path'
import Vue from 'vue';
import Router from 'vue-router'
import App from './App.vue';
import buildRouter from './router';

Vue.config.productionTip = false;


function render() {
  Vue.use(Router)
  new Vue({
    el: "#sub",
    router: buildRouter(),
    render: (h) => h(App),
  })
}

// !window.isMicroService && render()
render()

export function mount(props) {
  console.log('[vue] props from main framework', props);
  render();
}