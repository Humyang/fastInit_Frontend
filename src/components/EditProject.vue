<template>
  <div class="EditProject">
    <div class="navbar">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/all">模块列表</router-link></li>
    </div>
    <div class="flex_contain">
            <div class="flex_left">
              <div id="moduleTree" class="tree_block">
              
              </div>
              <div id="projectTree" class="tree_block">
                
              </div>
            </div>
            <div class="flex_right">
              <editor :value="project.value"
                      :offChange="project.offChange"
                      :nodeName="project.nodeName"
                      :changed.sync="project.changed"
                      v-on:saveNodeData="saveNodeData"
                      style="width:50%;">
                        <div slot="button" style="    float: left;">
                          <!-- <a @click="newPreview" class="btn btn_ok" href="#">生成</a> -->
                        </div>
                      </editor>
              <div class="blockList_wrap markdown_parse_preview_wrap" style="width:50%;">
                  <div id="markdown_parse_preview" v-html="article_markdown_preview_text" >
                  </div>
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

// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/zenburn.css'

import '../css/CodeMirror_Theme.css'
// import 'highlight.js/styles/pojoaque.css'

// import CodeMirror from 'codemirror'
// import loadmode from 'codemirror/addon/mode/loadmode.js'

import EVA from '../service/fontend/Obj/EditorValueAdvance.js'

import * as CONSTANT from '../service/PREDEFINED/CONSTANT.js'
import * as BASE from '../service/fontend/base.js'
import * as API from '../service/fontend/index.js'

import Delay from '../service/fontend/Obj/Delay.js'
import uid2 from 'uid2'

import editor from '../common/editor.vue'

import '../../node_modules/highlight.js/styles/pojoaque.css'
import '../css/custom_markdown_preview.css'
var marked = require('marked');
var renderer = new marked.Renderer();
var radCode = renderer.code
renderer.code = function (code, lang, escaped) {
    if(lang === 'raw'){
        return '<p class="lang-raw">'+code+'</p>'
    }
    // return `<pre><code class="lang-${lang}">${code}</code></pre>`
    var self = this
    return radCode.call(self,code,lang,escaped)
}
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code,type,sss) {
    return require('highlight.js').highlightAuto(code).value;
  },renderer:renderer
});

// jstree
import ICON_OBJ from '../vendors/jstree/icon_obj.js'
var JSTREE_PROJECT = ""
// 树节点数据
// 增删改查

// 模块数据列表
// 正删改查

// 配置列表
// 正删改查

export default {
  name: 'hello',
  components:{
    editor
  },
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
      MODULE:{
        fileBlock:[]
      },
      moduleList:{
        list:[]
      },
      configList:{
        list:[{name:"配置1"},{name:"配置2"}],
      },
      project:{
        value:"",
        offChange:false,
        nodeName:"",
        changed:false,
        EVA:""
      },
      ui:{
        a:1
      },
      editor:"",
      Delay:"",
      selectedNodeId:"",
      rawValue:""
    }
  },

  /*


                                                                                 ___
                                                                                 `MM
                                                             /                    MM
      ____     _____   ___  __    __   __ ____   ___   ___  /M       ____     ____MM
     6MMMMb.  6MMMMMb  `MM 6MMb  6MMb  `M6MMMMb  `MM    MM /MMMMM   6MMMMb   6MMMMMM
    6M'   Mb 6M'   `Mb  MM69 `MM69 `Mb  MM'  `Mb  MM    MM  MM     6M'  `Mb 6M'  `MM
    MM    `' MM     MM  MM'   MM'   MM  MM    MM  MM    MM  MM     MM    MM MM    MM
    MM       MM     MM  MM    MM    MM  MM    MM  MM    MM  MM     MMMMMMMM MM    MM
    MM       MM     MM  MM    MM    MM  MM    MM  MM    MM  MM     MM       MM    MM
    YM.   d9 YM.   ,M9  MM    MM    MM  MM.  ,M9  YM.   MM  YM.  , YM    d9 YM.  ,MM
     YMMMM9   YMMMMM9  _MM_  _MM_  _MM_ MMYMMM9    YMMM9MM_  YMMM9  YMMMM9   YMMMMMM_
                                        MM
                                        MM
                                       _MM_
  */
  computed:{
    article_markdown_preview_text:function(){
        return marked(this.rawValue)
    },
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
    htmlOnchange:function(){
      console.log('changed')
    },
    codeBlockDragStart:function(event){
      console.log('drag')
      event.originalEvent.dataTransfer.setData("text/plain", $(event.currentTarget).text());
      event.effectAllowed = "copyMove";
    },
    saveConfig:function(){

    },
    saveTreeProject:function(){
      // console.log(this)
      this.Delay.push();
    },
    saveNodeData:function(event){
      let self = this
      API.PROJECT.saveNodeData({
          patch_list:event.patch_list,
          selectedNodeId:this.project.selectedNodeId,
          projectId:this.$route.params.projectId 
        }).then(function(res){
          console.log(123)
          self.project.changed = false
        })
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
    var self = this;
    self.Delay = new Delay(50, function(obj) {
      self.project.EVA.value = JSON.stringify( $("#projectTree").jstree("get_json"))
      API.PROJECT.update(self.$route.params.projectId,self.project.EVA.patch_list)
      
    });

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
        'data' : {
          'url' : CONSTANT.IP+'/module/tree',
          'data' : function (node) {
            return { 'token' : BASE.getToken()}
          }
        },
        "check_callback" : true,
        },
        "plugins" : [ "contextmenu", "wholerow"  ],
        contextmenu: {
          "items": {
            "refresh": {
                "label": "刷新",
                "action": function (data) {
                    // TODO: 重命名节点
                    // var inst = $.jstree.reference(data.reference),
                    //     obj = inst.get_node(data.reference);

                    // inst.edit(obj);
                    console.log('jump to url')
                }
            },
            "rename": {
                "label": "编辑模块",
                "action": function (data) {
                    // TODO: 重命名节点
                    // var inst = $.jstree.reference(data.reference),
                    //     obj = inst.get_node(data.reference);

                    // inst.edit(obj);
                    console.log('jump to url')
                }
            }
        }
    }
    }).on('select_node.jstree',function(obj,node){

      API.MODULE
      .loadNodeData(node.node.a_attr.module_id)
      .then(function(res){
        console.log(res)
        try{
          self.rawValue = res.result.content
          // self.MODULE.fileBlock = JSON.parse(res.result.c)
        }catch(err){
            self.rawValue = ""
        }
      })
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

    // 选中节点-加载代码
    // 保存节点代码（advnce历史记录）
    console.log(ICON_OBJ)
    $('#projectTree').jstree({
      'core' : {
        'data' : {
          'url' : CONSTANT.IP+'/project/tree',
          'data' : function (node) {
            return { 'token' : BASE.getToken(),
                     'project_id':self.$route.params.projectId 
                   };
          }
        },
        "check_callback" : true,
        
        },
        "types" : ICON_OBJ,
        "plugins" : [ "contextmenu","dnd","wholerow","types"],
        contextmenu: {
          "items": {
            "create": {
                "label": "增加节点",
                "action": function (data) {
                      // TODO: 添加节点
                      var inst = $.jstree.reference(data.reference),
                          obj = inst.get_node(data.reference);
                      inst.create_node(obj, {}, "last", function (new_node) {
                        new_node.a_attr.module_id = uid2(40)  
                        try {
                          inst.edit(new_node);
                        } catch (ex) {
                          setTimeout(function () { inst.edit(new_node); },0);
                        }
                      });
                }
            },
            "rename": {
                "label": "重命名",
                "action": function (data) {
                    // TODO: 重命名节点
                    var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                    inst.edit(obj);
                }
            },
            "remove": {
                "label": "删除",
                "action": function (data) {
                    // TODO: 删除
                    var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                    if(inst.is_selected(obj)) {
                      inst.delete_node(inst.get_selected());
                    }
                    else {
                      inst.delete_node(obj);
                    }
                }
            }
        },
        dnd:{
          dnd_stop:function(){
            console.log(123)
          }
        }
    }
    }).on('changed.jstree', function (e, data) {
      console.log('changed')

      self.saveTreeProject('move_node')
    }).on('move_node.jstree',function(data,element,helper,event){
      console.log('move_node')
      self.saveTreeProject('move_node')
      // 获取项目JSON
      // 对比旧JSON数据，获取差异
      
      
      // TODO: 移动节点

      // 保存新JSON

    })
    .on('rename_node.jstree',function(event,node){

      var node = JSTREE_PROJECT.get_node(node.node.id)

      var fileType = /[^\.]+$/.exec(node.text)[0]

      JSTREE_PROJECT.set_type(node,fileType)
      for(let i in ICON_OBJ){
        if(fileType === i){
          fileType = false
        }
      }
      if(fileType){
        JSTREE_PROJECT.set_type(node,'default')
      }
      // switch(fileType){
      //   case 'html':break
      //   default:
      //   JSTREE_PROJECT.set_type(node,'default')
      //   break
      // }

      self.saveTreeProject('rename_node');
      
      console.log('rename_node')

    })
    .on('delete_node.jstree',function(){self.saveTreeProject('delete_node');console.log('delete_node')})
    .on('ready.jstree',function(){

      self.project.EVA = new EVA()
      // 初始化值
      self.project.EVA.value = JSON.stringify( $("#projectTree").jstree("get_json"))

      JSTREE_PROJECT = $.jstree.reference("#projectTree")

    }).on('select_node.jstree',function(obj,node){
      
      self.project.selectedNodeId = node.node.a_attr.module_id
      self.project.offChange = false
      self.project.value = undefined
      API.PROJECT
      .loadNodeData(node.node.a_attr.module_id,self.$route.params.projectId)
      .then(function(res){
        if(self.project.selectedNodeId !=res.selectedNodeId){
          console.log('selectedNodeId error')
          return
        }
        self.project.nodeName = node.node.text
        // self.change(node.node.text)
        try{
          self.project.value = res.result.content
        } catch (ex) {
          self.project.value = ""
        }
        setTimeout(function() {
          self.project.offChange = true
        }, 10);
      })
    });

    $("#markdown_parse_preview").on("DOMSubtreeModified",function(){
      $("pre code").prop("draggable",true)
      console.log('bind')
    })
    $("body").on("dragstart","pre code",self.codeBlockDragStart)
  }

}
</script>


