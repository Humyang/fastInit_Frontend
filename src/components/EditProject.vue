<template>
  <div class="EditProject">
    <div class="preConfig_wrap">
      <div class="add_wrap">
        <a 
        @click="saveConfig"
        class="btn btn_ok" href="">保存项目</a>
      </div>
      <ul class="temp_config">
        <li>临时配置</li>
      </ul>
      <ul>
        <li v-for="item in configList.list">{{item.name}}</li>
      </ul>
    </div>
    <div class="module_wrap">
      <div id="moduleTree" class="tree_block">
        
      </div>
      <div class="blockList_wrap">
          <div 
          v-for="(item,index) in moduleList.list"
          :id="'cell'+index" class="cell" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
            <p class="head">{{item.name}}</p>
            <code 
            v-for="block in item.blockList"
            class="codeblock">
              {{block.value}}
          </code>
          </div>
      </div>
    </div>
    <div class="project_wrap">
      <div id="projectTree" class="tree_block">
        
      </div>
      <div class="textarea_wrap">
        <div class="add_wrap">
          <a class="btn btn_ok" href="">保存</a>
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

// jstree

// 树节点数据
// 增删改查

// 模块数据列表
// 正删改查

// 配置列表
// 正删改查

export default {
  name: 'hello',
  data () {
    return {
      moduleList:{
        list:[{
          name:'package.json',
          blockList:[
          {
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          }]
        },{
          name:'index.js',
          blockList:[
          {
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          }]
        },{
          name:'index.js',
          blockList:[
          {
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          }]
        },
        {
          name:'index.js',
          blockList:[
          {
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          },{
            value:'adasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcvadasfasxzvxzcv'
          }]
        }]
      },
      configList:{
        list:[{name:"配置1"},{name:"配置2"}],
      },
      ui:{
        a:1
      }
    }
  },
  mounted(){

    // 读取节点所有节点
    // 添加节点
    // 移动节点
    // 重命名节点

    // 选中节点-加载模块

    $('#moduleTree').jstree({
      'core' : {
        'data' : [
          { "text" : "模块列表", 
            "state": {
              opened    : true,  // is the node open
              disabled  : false,  // is the node disabled
              selected  : false  // is the node selected
            },
            "children" : [
              { "text" : "koa-static",li_attr:{a:111},a_attr:{b:222} },
              { "text" : "koa" }
          ]}
        ],
        'themes' : {
                'responsive' : false,
                'variant' : 'small',
                'stripes' : true
              },
        expand_selected_onload:true
      }
    }).on('changed.jstree', function (e, data) {
      console.log(123)
    });

    // 读取节点所有节点
    // 添加节点
    // 移动节点
    // 重命名节点
    // 选中节点-加载代码
    // 保存节点代码（advnce历史记录）
    $('#projectTree').jstree({
      'core' : {
        'data' : [
          { "text" : "项目列表", 
          "state": {
              opened    : true,  // is the node open
              disabled  : false,  // is the node disabled
              selected  : false  // is the node selected
            },
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
    var code_mirror = document.getElementsByClassName('CodeMirror')[0]
    code_mirror.style.height = window.innerHeight - 106 + "px"
    window.onresize = function() {
        code_mirror.style.height = window.innerHeight - 106 + "px"
    }
    // 接收drop事件
    // 获取selectionStart
    // 写入拖动内容

  }
}
</script>


