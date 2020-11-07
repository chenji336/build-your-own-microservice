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

const srcMap = {
  app1: "http://localhost:8081/app.js",
  app2: "http://localhost:8082/app.js"
};

const project = location.hash.split('/')[1]

loadScript(srcMap.app1);
loadScript(srcMap.app2);
// render 应该在 loadScript 加载完 app1 和 app2 时候才进行 render
// 这里偷懒用 setTimeout 替代
setTimeout(() => {
  render(project);
}, 1000);

// loadScript(srcMap[project])

function loadScript(src) {
  var s = document.createElement("script");
  s.src = src;
  s.id = "subScript";
  s.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(s);
}

function render(project) {
   window[project] && window[project].mount(project)
}

function removeScript(id) {
  const dom = document.querySelector(`#${id}`);
  dom && document.getElementsByTagName("head")[0].removeChild(dom);
}

function routeChange(name) {
  removeScript("subScript");
  changeTabClass(name)
  // loadScript(srcMap[name]);
  render(name)
}

// 路由手动切换时候，样式也需要更改
function changeTabClass(name) {
   const appIndexMap = { app1: 0, app2: 1 }
  const elem = document.querySelector('#nav').querySelectorAll('a')[appIndexMap[name]]

  document.querySelectorAll('#nav a').forEach(e => e.classList.remove('router-link-exact-active'))
  elem.classList.add('router-link-exact-active')
}

const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState')
window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState')
window.onhashchange = patchedUpdateState(window.onhashchange, 'onhashchange')
/**
 * 装饰器，增强 pushState 和 replaceState 方法
 * @param {*} updateState 
 */
function patchedUpdateState (updateState, name) {
  return function (...args) {
    const preProject = location.hash.split("/")[1];
    const result = Reflect.apply(updateState, this, args)
    const afterProject = location.hash.split("/")[1];
    console.log(preProject, afterProject)
    console.log(`reroute ${name}`);
    if (preProject !== afterProject) {
      routeChange(afterProject)
    }
    return result
  }
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
