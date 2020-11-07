<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
      <div @click="changeStore">改变store值</div>
      <div>store: {{this.$store.state.key}}</div>
    </div>
    <router-link to="/app2/about">App2's about page</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    console.log('app1 mounted store.state.key:', this.$store.state.key)
  },
  methods: {
    changeStore() {
      this.$store.state.key = 'changedKey'
    }
  }
}
</script>
