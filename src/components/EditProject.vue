<template>
  <div class="EditProject">
    <div class="preConfig_wrap">
      <div class="add_wrap">
        <a class="btn btn_ok" href="">保存项目</a>
          
      </div>
      <ul class="temp_config">
        <li>临时配置</li>
      </ul>
      <ul>
        <li>配置1</li>
        <li>配置2</li>
        <li>配置3</li>
        <li>配置4</li>
        <li>配置5</li>
      </ul>
    </div>
    <div class="module_wrap">
      <div id="moduleTree" class="tree_block">
        
      </div>
      <div class="blockList_wrap">
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
          <div id="cell2" class="cell" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
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
          <div id="cell3" class="cell" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
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
          <div id="cell4" class="cell" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
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
    <div class="project_wrap">
      <div id="projectTree" class="tree_block">
        
      </div>
      <div class="textarea_wrap">
        <div class="add_wrap">
          <a class="btn btn_ok black" href="">保存</a>
        </div>
        <textarea name="" id="ta1" cols="30" rows="10"></textarea>
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

import '../css/common.css'
import  '../css/btn.css'
import '../css/editProject.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/zenburn.css'
// import '../css/CodeMirror_Theme.css'
// import 'highlight.js/styles/pojoaque.css'

import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm.js'

export default {
  name: 'hello',
  data () {
    return {
      ui:{
        a:1
      }
    }
  },
  mounted(){
      $('#moduleTree').jstree({
      'core' : {
        'data' : [
          { "text" : "模块列表", 
            "children" : [
              { "text" : "koa-static" },
              { "text" : "koa" }
          ]}
        ],
        'themes' : {
                'responsive' : false,
                'variant' : 'small',
                'stripes' : true
              }
      }
    }).on('changed.jstree', function (e, data) {
      console.log(123)
    });
    $('#projectTree').jstree({
      'core' : {
        'data' : [
          { "text" : "项目列表", 
          "children" : [
              { "text" : "package.json" },
              { "text" : "index.js" }
          ]}
        ],
        'themes' : {
                'responsive' : false,
                'variant' : 'small',
                'stripes' : true
              }
      }
    }).on('changed.jstree', function (e, data) {
      
    });
    // 加载数据

    var e = document.getElementById('ta1')
      var editor = CodeMirror.fromTextArea(e, {
          mode: 'gfm',
          lineNumbers: true,
          theme: "3024-day",
          extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
      });
      // console.log(editor)
      var code_mirror = document.getElementsByClassName('CodeMirror')[0]
      code_mirror.style.height = window.innerHeight - 106 + "px"
      window.onresize = function() {
          code_mirror.style.height = window.innerHeight - 106 + "px"
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
