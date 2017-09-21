<template>
  <div id="app">
    <h2>技术探索</h2>
    <ul>
      
    <router-link to="/EditProject">编辑项目</router-link>
      <router-link to="/edit_module">配置模块</router-link>
      <router-link to="/EditModule">编辑模块</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
