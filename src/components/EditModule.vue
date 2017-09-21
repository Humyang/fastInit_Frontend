<template>
  <div class="EditModule">
    <div class="floder">
        <a class="btn back_home">回到首页</a>
            <p class="p_add"><i class="i_add">+</i>新建模块</p>
            <div class="add_wrap">
                <input placeholder="输入模块文章" type="" name="">
                <a class="btn btn_ok" href="">保存</a>
                <a class="btn btn_cancel" href="">取消</a>
            </div>
            <p class="list_mode">
              <!-- <i class="iconfont icon-zhankai"></i> -->
              <!-- <i class="iconfont icon-icon1460187848267"></i> -->
            </p>
            <!-- <div class="list_mode_group">
                <p class="p1">文集排序方式</p>
                <select name="" id="">
                    <option value="">创建日期</option>
                    <option value="">最近使用</option>
                    <option value="">使用频率</option>
                </select>



            </div> -->
            <!-- <div class="list_mode_group">
                <p class="p1">搜索</p>
                <input class="search" type="text" placeholder="搜索文集和文章">
                <a class="btn btn_ok" href="">确定</a>
            </div> -->

            <ul class="item">
                <li v-for="(item,index) in theList">123</li>
                <!-- <li class="active">脚本 <i class="iconfont icon-gengduo i1"></i></li>
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
                </li> -->

            </ul>
    </div>
        <!-- 代码编辑 -->
    <div class="editArea">
      <p class="btn_wrap">
        <a class="btn black" href="">写入</a>
        <a class="btn black" href="">分割</a>
      </p>
      <div class="textarea_wrap">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div id="codeBlock_wrap">
        <div id="codeblock1" class="codeblock" draggable="true" >
          def get_pid_close(port):
          status,output = commands.getstatusoutput('lsof -i:'+str(port))
          if status == 0:
              res = output.split("\n")[1]
              pid = re.findall(r'(\b[0-9]+)',res)
              print pid[0]
              close_api_serve_result,info = commands.getstatusoutput("kill -9 "+str(pid[0]))
              print 'close_api_serve_result',close_api_serve_result
              if close_api_serve_result == 0:
                  print "close process is :",pid[0]
                  return 1
          return 0
      </div>
      </div>
    </div>
    <!-- 模块分类 -->
    <div class="classify">
      <div id="cell1" class="cell" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
        <p class="head">package.json</p>
        <code class="codeblock">
          def get_pid_close(port):
          status,output = commands.getstatusoutput('lsof -i:'+str(port))
          if status == 0:
              res = output.split("\n")[1]
              pid = re.findall(r'(\b[0-9]+)',res)
              print pid[0]
              close_api_serve_result,info = commands.getstatusoutput("kill -9 "+str(pid[0]))
              print 'close_api_serve_result',close_api_serve_result
              if close_api_serve_result == 0:
                  print "close process is :",pid[0]
                  return 1
          return 0
      </code>
      <code class="codeblock">
          def get_pid_close(port):
          status,output = commands.getstatusoutput('lsof -i:'+str(port))
          if status == 0:
              res = output.split("\n")[1]
              pid = re.findall(r'(\b[0-9]+)',res)
              print pid[0]
              close_api_serve_result,info = commands.getstatusoutput("kill -9 "+str(pid[0]))
              print 'close_api_serve_result',close_api_serve_result
              if close_api_serve_result == 0:
                  print "close process is :",pid[0]
                  return 1
          return 0
      </code>
      </div>
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
  data () {
    return {
      theList:[{
        name:111,
        id:222
      },{
        name:111,
        id:222
      },{
        name:111,
        id:222
      }]
      ,
      ui:{
        add_module:1
      }
    }
  },
  method:{
    newModule:function(){

    },
  }
}
</script>

