<template>
  <div class="hello">
    <div class="floder">
        <a class="btn back_home">回到首页</a>
            <p class="p_add"><i class="i_add">+</i>新建文集</p>
            <div class="add_wrap">
                <input placeholder="输入文章标题" type="" name="">
                <a class="btn btn_ok" href="">保存</a>
                <a class="btn btn_cancel" href="">取消</a>
            </div>
            <p class="list_mode"><i class="iconfont icon-zhankai"></i><i class="iconfont icon-icon1460187848267"></i></p>
            <div class="list_mode_group">
                <p class="p1">文集排序方式</p>
                <select name="" id="">
                    <option value="">创建日期</option>
                    <option value="">最近使用</option>
                    <option value="">使用频率</option>
                </select>



            </div>
            <div class="list_mode_group">
                <p class="p1">搜索</p>
                <input class="search" type="text" placeholder="搜索文集和文章">
                <a class="btn btn_ok" href="">确定</a>
            </div>
            <ul class="item">
                <li class="active">脚本 <i class="iconfont icon-gengduo i1"></i></li>
                <li >日志</li>
                <li>数据库</li>
                <li>React</li>
                <li class="active editor">
                    <input type="" placeholder="前端布局" name="">
                    <a class="btn btn_ok" href="">保存</a>
                    <a class="btn btn_cancel" href="">取消</a>
                </li>
                <li>微信小程序</li>
                <li class="active">单元测试 <i class="iconfont icon-gengduo i1"></i>
                </li>

            </ul>
    </div>

  </div>
</template>

<script>

// var data = 
// [{
//   module:'基础',
//   content:`var app = require('koa')()` 
// }]

import  '../css/btn.css'
import '../css/editModule.css'

export default {
  name: 'hello',
  data () {
    return {
      ui:{
        a:1
      }
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
