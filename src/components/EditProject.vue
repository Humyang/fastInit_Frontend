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
          v-for="(item,parent_index) in moduleList.list"
          :id="'cell'+parent_index" class="cell" >
            <p class="head">{{item.name}}</p>
            <code 
            v-for="(block,current_index) in item.blockList"
            @dragstart="codeBlockDragStart(parent_index,current_index,$event)"
            draggable="true"
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
        <div class="textarea">
          <textarea name="" id="ta1" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

/*



  68b
  Y89                                               /
  ___ ___  __    __   __ ____     _____   ___  __  /M
  `MM `MM 6MMb  6MMb  `M6MMMMb   6MMMMMb  `MM 6MM /MMMMM
   MM  MM69 `MM69 `Mb  MM'  `Mb 6M'   `Mb  MM69 "  MM
   MM  MM'   MM'   MM  MM    MM MM     MM  MM'     MM
   MM  MM    MM    MM  MM    MM MM     MM  MM      MM
   MM  MM    MM    MM  MM    MM MM     MM  MM      MM
   MM  MM    MM    MM  MM.  ,M9 YM.   ,M9  MM      YM.  ,
  _MM__MM_  _MM_  _MM_ MMYMMM9   YMMMMM9  _MM_      YMMM9
                       MM
                       MM
                      _MM_
*/


import '../css/common.css'
import  '../css/btn.css'
import '../css/editProject.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/zenburn.css'
// import '../css/CodeMirror_Theme.css'
// import 'highlight.js/styles/pojoaque.css'

import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm.js'

import EVA from '../../service/fontend/Obj/EditorValueAdvance.js'
// jstree

// 树节点数据
// 增删改查

// 模块数据列表
// 正删改查

// 配置列表
// 正删改查

export default {
  name: 'hello',
//
//
//        ___
//        `MM
//         MM             /
//     ____MM    ___     /M        ___
//    6MMMMMM  6MMMMb   /MMMMM   6MMMMb
//   6M'  `MM 8M'  `Mb   MM     8M'  `Mb
//   MM    MM     ,oMM   MM         ,oMM
//   MM    MM ,6MM9'MM   MM     ,6MM9'MM
//   MM    MM MM'   MM   MM     MM'   MM
//   YM.  ,MM MM.  ,MM   YM.  , MM.  ,MM
//    YMMMMMM_`YMMM9'Yb.  YMMM9 `YMMM9'Yb.
//
//
//
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
        ,select:-1
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
      project:{
        selectedIndex:-1,
        EVA:""
      },
      ui:{
        a:1
      },
      editor:"",
      Delay:""
    }
  },
//
//
//                                    ___                      ___
//                                    `MM                      `MM
//                              /      MM                       MM
//   ___  __    __     ____    /M      MM  __     _____     ____MM   ____
//   `MM 6MMb  6MMb   6MMMMb  /MMMMM   MM 6MMb   6MMMMMb   6MMMMMM  6MMMMb\
//    MM69 `MM69 `Mb 6M'  `Mb  MM      MMM9 `Mb 6M'   `Mb 6M'  `MM MM'    `
//    MM'   MM'   MM MM    MM  MM      MM'   MM MM     MM MM    MM YM.
//    MM    MM    MM MMMMMMMM  MM      MM    MM MM     MM MM    MM  YMMMMb
//    MM    MM    MM MM        MM      MM    MM MM     MM MM    MM      `Mb
//    MM    MM    MM YM    d9  YM.  ,  MM    MM YM.   ,M9 YM.  ,MM L    ,MM
//   _MM_  _MM_  _MM_ YMMMM9    YMMM9 _MM_  _MM_ YMMMMM9   YMMMMMM_MYMMMM9
//
//
//
  methods:{
    codeBlockDragStart:function(parent_index,current_index,event){
      this.project.parent_index = parent_index
      this.project.current_index = current_index
      // event.currentTarget.style.border = "dashed";
      event.effectAllowed = "copyMove";
    },
    saveConfig:function(){

    },
    onEditorChange:function(){
      console.log('change')
        // 为了使 editor off 执行生效，只能将push操作封装起来
        // 因为 on 和 off 是根据 function 来的
        // 如果使用匿名函数 function(){self.Delay.push()}
        // 会无法 off 回失效
        
        // self.article_content_style.changed = true

        // 为 article_markdown_preview_text 属性提供变量
        // self.article_content = self.editor.getValue()
        // self.article_content = self.editor.getValue()
        // self.EVA.value = self.editor.getValue()
        // console.log(self.EVA.diff_result)
        // self.Delay.push()
    }
  },
//
//
//                                                                       ___
//                                                                       `MM
//                                                   /                    MM
//   ___  __    __     _____   ___   ___ ___  __    /M       ____     ____MM
//   `MM 6MMb  6MMb   6MMMMMb  `MM    MM `MM 6MMb  /MMMMM   6MMMMb   6MMMMMM
//    MM69 `MM69 `Mb 6M'   `Mb  MM    MM  MMM9 `Mb  MM     6M'  `Mb 6M'  `MM
//    MM'   MM'   MM MM     MM  MM    MM  MM'   MM  MM     MM    MM MM    MM
//    MM    MM    MM MM     MM  MM    MM  MM    MM  MM     MMMMMMMM MM    MM
//    MM    MM    MM MM     MM  MM    MM  MM    MM  MM     MM       MM    MM
//    MM    MM    MM YM.   ,M9  YM.   MM  MM    MM  YM.  , YM    d9 YM.  ,MM
//   _MM_  _MM_  _MM_ YMMMMM9    YMMM9MM__MM_  _MM_  YMMM9  YMMMM9   YMMMMMM_
//
//
//
  mounted(){


/*
     ##                                  ##                                                                ##            ###
     ##                                  ##                                                                ##             ##
     ##                                                                                                    ##             ##
   ######   ## ###    #####    #####   ####     ### ##    #####   ##   ##           ### ##    #####    ######  ##   ##    ##      #####
     ##     ###      ##   ##  ##   ##    ##      ## #    ##   ##  ## # ##           ## # ##  ##   ##  ##   ##  ##   ##    ##     ##   ##
     ##     ##       #######  #######    ##      ## #    #######  ## # ##           ## # ##  ##   ##  ##   ##  ##   ##    ##     #######
     ##     ##       ##       ##         ##       ##     ##       ## # ##           ## # ##  ##   ##  ##   ##  ##  ###    ##     ##
      ###   ##        #####    #####   ######     ##      #####    ## ##            ##   ##   #####    ######   ### ##   ####     #####
*/

    var self = this

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

/*
     ##                                           ##                                                               ##                       ##
     ##                                           ##                                                               ##                       ##
     ##                                                                                                                                     ##
   ######   ## ###    #####    #####   ### ##   ####      #####   ##   ##           ######   ## ###    #####     ####    #####    #####   ######
     ##     ###      ##   ##  ##   ##   ## #      ##     ##   ##  ## # ##           ##   ##  ###      ##   ##      ##   ##   ##  ##         ##
     ##     ##       #######  #######   ## #      ##     #######  ## # ##           ##   ##  ##       ##   ##      ##   #######  ##         ##
     ##     ##       ##       ##         ##       ##     ##       ## # ##           ##   ##  ##       ##   ##      ##   ##       ##         ##
      ###   ##        #####    #####     ##     ######    #####    ## ##            ######   ##        #####       ##    #####    #####      ###
                                                                                    ##                             ##
                                                                                    ##                          ####
*/


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
          ]}],
        "check_callback" : true,
        
        },
        "plugins" : [ "contextmenu","dnd" ],
        contextmenu: {
          "items": {
            "create": {
                "label": "增加节点",
                "action": function (obj) {
                    // DOCUMENT_NODE_PCS.createNode(obj)
                }
            },
            "rename": {
                "label": "修改名称",
                "action": function (obj) {
                    DOCUMENT_NODE_PCS.renameNode(obj)
                }
            },
            "remove": {
                "label": "删除节点",
                "action": function (obj) {
                    DOCUMENT_NODE_PCS.deleteNode(obj)
                }
            },
            "ccp": {
                "label": "操作",
                "submenu": {
                    "reload": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "刷新节点",
                        "action": function (obj) {
                            DOCUMENT_NODE_PCS.reload(obj);
                        }
                    },
                    "cut": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "剪切",
                        "action": function (obj) {
                            DOCUMENT_NODE_PCS.cut(obj);
                        }
                    },
                    "copy": {
                        "separator_before": false,
                        "icon": false,
                        "separator_after": false,
                        "label": "复制",
                        "action": function (obj) {
                            DOCUMENT_NODE_PCS.copy(obj);
                        }
                    },
                    "paste": {
                        "separator_before": false,
                        "icon": false,
                        "separator_after": false,
                        "label": "粘贴",
                        "action": function (obj) {
                            DOCUMENT_NODE_PCS.paste(obj);
                        }
                    }
                }
            }
        },
        dnd:{
          dnd_stop:function(){
            console.log(123)
          }
        }
    },

    }).on('changed.jstree', function (e, data) {
      console.log(1)
    }).on('move_node.jstree',function(data,element,helper,event){
      // 获取项目JSON
      // 对比旧JSON数据，获取差异
      self.project.EVA.value = JSON.stringify( $("#projectTree").jstree("get_json"))
      
      // 保存新JSON
      // TODO:ajax 移动节点，保存节点JSON
    }).on('ready.jstree',function(){

      self.project.EVA = new EVA()
      // 初始化值
      self.project.EVA.value = JSON.stringify( $("#projectTree").jstree("get_json"))
    });
    
    
/*
                          ##                      ##
     ####                 ##           ##   ##    ##
    ##  ##                ##           ##   ##
   ##        #####    ######   #####   ### ###  ####     ## ###   ## ###    #####   ## ###
   ##       ##   ##  ##   ##  ##   ##  ## # ##    ##     ###      ###      ##   ##  ###
   ##       ##   ##  ##   ##  #######  ## # ##    ##     ##       ##       ##   ##  ##
    ##  ##  ##   ##  ##   ##  ##       ##   ##    ##     ##       ##       ##   ##  ##
     ####    #####    ######   #####   ##   ##  ######   ##       ##        #####   ##


*/

    // 加载数据
    var e = document.getElementById('ta1')
    this.editor = CodeMirror.fromTextArea(e, {
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
    var element = document.getElementsByClassName("textarea")[0]

    element.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
      console.log(333)
    }, false);
    // this.editor.on("dragover", function( event ) {
    //   let current_ch = self.editor.getCursor().ch
    //   console.log(current_ch)
    // }, false);
    this.editor.on("drop", function( event ) {
      console.log(event)
      // setTimeout(function() {
        let value = self.moduleList.list[self.project.parent_index].blockList[self.project.current_index].value
        let current_line = self.editor.getCursor().line
        self.editor.replaceRange(value,{line:current_line})
      // }, 100);
    }, false);

    this.editor.on("change",this.onEditorChange)

    // this.Delay = new Delay(5000,function(){
    //     // self.old_text =""
    //     // let new_text = self.editor.getValue()
    //     self.EVA.value = self.editor.getValue()
    //     // console.log(self.EVA.diff_result)

    //     self.article_content_save(self.EVA.patch_list,self.article_title,self.article_active,self.floder_active)
    // })
  }
}
</script>


