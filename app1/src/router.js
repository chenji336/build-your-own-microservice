import Router from 'vue-router'
import Home from './views/Home.vue'


const router =  new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/app1',
      name: 'home',
      component: Home
    },
  ]
})


export default function buildRouter() {
  // return router // 这种在 history replace 情况下有问题

  return new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/app1',
        name: 'home',
        component: Home
      },
    ]
  })
}
