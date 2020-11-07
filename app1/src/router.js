import Router from 'vue-router'
import Home from './views/Home.vue'


// export default new Router({
//   mode: 'hash',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/app1',
//       name: 'home',
//       component: Home
//     },
//   ]
// })


export default function buildRouter() {
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
