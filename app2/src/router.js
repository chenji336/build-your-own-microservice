import Router from 'vue-router'
import Home from './views/Home.vue'

const isRun =  process.env.type === 'run';

// export default new Router({
//   // mode: isRun ? 'hash' : 'history',
//   mode:  'hash',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/app2',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/app2/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })

export default function buildRouter() {
  return new Router({
    mode:  'hash',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/app2',
        name: 'home',
        component: Home
      },
      {
        path: '/app2/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    ]
  })
}

