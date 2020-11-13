<template>
  <div id="navbar">
    <div id="nav">
      <router-link to="/app1">App1</router-link> |
      <router-link to="/app2">App2</router-link>
      <div id="sub"></div>
    </div>
  </div>
</template>

<script>
// import { mount } from 'app1' // app1.js 跟 http://localhost:8081/app.js 一样
// console.log('mount:', mount)
window.isMicroService = true // 告诉子项目现在是微服务集成了

const srcMap = {
  app1: "http://localhost:8081/app.js",
  app2: "http://localhost:8082/app.js"
};
const project = location.hash.split('/')[1]

const TYPE = 'once' // simple/dynamic/once

// 通过切换 script 可以做到重新渲染
function setUpSimple() {
  // loadScript(srcMap.app1)
  loadScript(srcMap.app2)
}

function setUpDynamic() {
  loadScript(srcMap[project])
  overrideRoute()
}

// 子项目需要打包成 umd，暴露生命周期函数
function setUpOnce() { // 只加载一次 script
  const loadApp1 = loadScript(srcMap.app1);
  const loadApp2 = loadScript(srcMap.app2);
  Promise.all([loadApp1, loadApp2]).then(() => {
    render(project);
  })
  overrideRoute()
}
TYPE === 'simple' && setUpSimple()
TYPE === 'dynamic' && setUpDynamic()
TYPE === 'once' && setUpOnce()

// 路由改变时候重新渲染
function routeChange(name) {
  removeScript("subScript");
  changeTabClass(name)
  TYPE === 'dynamic' && loadScript(srcMap[name]);
  TYPE === 'once' && render(name)
}

function overrideRoute() {
  // 是否只要重写 onhashcchange 就可以? 不行， vue-router 在 2.8 之后即使是 hash 路由也是通过 history 拦截
  window.onhashchange = patchedUpdateState(window.onhashchange, 'onhashchange')
  window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState')
  window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState')
}

function loadScript(src) {
  return new Promise(resolve => {
    var s = document.createElement("script");
    s.src = src;
    s.id = "subScript";
    s.TYPE = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(s);
    s.onload = function() {
      console.log(`${src} 加载完成`)
      resolve()
    }
  })
}

function render(project) {
   window[project] && window[project].mount(project)
}

function removeScript(id) {
  const dom = document.querySelector(`#${id}`);
  dom && document.getElementsByTagName("head")[0].removeChild(dom);
}

/**
 * 装饰器，增强 pushState 和 replaceState 方法
 */
function patchedUpdateState (updateState, name) {
  return function (...args) {
    const preProject = location.hash.split("/")[1];
    const result = Reflect.apply(updateState, this, args)
    const afterProject = location.hash.split("/")[1];
    console.log(preProject, afterProject)
    console.log(`reroute ${name}`);

    // 不相等表示路由已经进行了改变
    if (preProject !== afterProject) {
      routeChange(afterProject)
    }
    return result
  }
}

// (解决样式问题，可以忽略)路由手动切换时候，样式也需要更改
function changeTabClass(name) {
   const appIndexMap = { app1: 0, app2: 1 }
  const elem = document.querySelector('#nav').querySelectorAll('a')[appIndexMap[name]]

  document.querySelectorAll('#nav a').forEach(e => e.classList.remove('router-link-exact-active'))
  elem.classList.add('router-link-exact-active')
}

export default {
  method: {}
};
</script>

<style>
#navbar {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
