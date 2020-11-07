<template>
<!-- id必须是app1 跟 root-html-file.html 中的id一直，因为vue mount会把最外层的也替换掉（如果不一致下次切换的时候就没反应了） -->
  <div id="sub">
    App1 is working! ||
    <router-link to="/app1">App1</router-link>
    <router-view></router-view>
  </div>
</template>

<style>
#sub {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
