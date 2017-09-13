<template>
  <div class="hello">
    <h2>技术探索</h2>
    <ul>
      <router-link to="/edit_module">配置模块</router-link>
      <router-link to="/set_module">编辑模块</router-link>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
