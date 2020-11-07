<template>
  <div id="sub">
    App 2 is working ||
    <router-link to="/app2">app2</router-link> ||
    <router-link to="/app2/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<style>
#sub {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
