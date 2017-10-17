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
          v-for="(item,parent_index) in MODULE.fileBlock"
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

import * as CONSTANT from '../../service/PREDEFINED/CONSTANT.js'
import * as BASE from '../../service/fontend/base.js'
import * as API from '../../service/fontend/index.js'

import Delay from '../../service/fontend/Obj/Delay.js'
import uid2 from 'uid2'

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
        locKsaveData:false,
        selectedIndex:-1,
        EVA:"",
        nodeDataEVA:"",
        Delay:"",
        selectedNodeId:""
      },
      ui:{
        a:1
      },
      editor:"",
      Delay:"",
      selectedNodeId:""
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
    onEditorChange:function(value){
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
        console.log('on change',this.project.locKsaveData)
        if(!this.project.locKsaveData){
          this.project.nodeDataEVA.value = self.editor.getValue()
          this.project.Delay.push({patch_list:this.project.nodeDataEVA.patch_list,selectedNodeId:this.project.selectedNodeId})
        }
    },
    saveTreeProject:function(){
      // console.log(this)
      this.project.EVA.value = JSON.stringify( $("#projectTree").jstree("get_json"))
      // 保存数据
      API.PROJECT.update(this.$route.params.projectId,this.project.EVA.patch_list)
      .then(function(res){
          // console.log(res)
          // self.list = res.list
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
          'url' : CONSTANT.IP+":"+CONSTANT.PORT+'/module/tree',
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
          // self.blockCode.blockInput = JSON.parse(res.result.blockInput)
          // self.blockCode.cacheList = JSON.parse(res.result.cacheList)
          self.MODULE.fileBlock = JSON.parse(res.result.fileBlock)
        }catch(err){
            // self.blockCode.blockInput = [{value:''}]
            // self.blockCode.cacheList = []
            self.MODULE.fileBlock = []
            // self.fileBlock.list = []
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
    $('#projectTree').jstree({
      'core' : {
        'data' : {
          'url' : CONSTANT.IP+":"+CONSTANT.PORT+'/project/tree',
          'data' : function (node) {
            return { 'token' : BASE.getToken(),
                     'project_id':self.$route.params.projectId 
                   };
          }
        },
        "check_callback" : true,
        
        },
        "plugins" : [ "contextmenu","dnd","wholerow"  ],
        contextmenu: {
          "items": {
            "create": {
                "label": "增加节点",
                "action": function (data) {
                      // TODO: 添加节点
                      var inst = $.jstree.reference(data.reference),
                          obj = inst.get_node(data.reference);
                      inst.create_node(obj, {}, "last", function (new_node) {
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
      // console.log('changed')
    }).on('move_node.jstree',function(data,element,helper,event){
      console.log('move_node')
      self.saveTreeProject('move_node')
      // 获取项目JSON
      // 对比旧JSON数据，获取差异
      
      
      // TODO: 移动节点

      // 保存新JSON

    })
    .on('rename_node.jstree',function(){self.saveTreeProject('rename_node');console.log('rename_node')})
    .on('delete_node.jstree',function(){self.saveTreeProject('delete_node');console.log('delete_node')})
    .on('ready.jstree',function(){

      self.project.EVA = new EVA()
      // 初始化值
      self.project.EVA.value = JSON.stringify( $("#projectTree").jstree("get_json"))

    }).on('select_node.jstree',function(obj,node){
      
      self.project.selectedNodeId = node.node.a_attr.module_id
      self.project.locKsaveData = true
      API.PROJECT
      .loadNodeData(node.node.a_attr.module_id,self.$route.params.projectId)
      .then(function(res){

        self.project.nodeDataEVA.reset()

        try{
          self.editor.setValue(res.value)
        } catch (ex) {
          self.editor.setValue("")
        }

        setTimeout(function() {
          console.log('set lock false')
          self.project.locKsaveData = false
        }, 10);
      })
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
    self.project.nodeDataEVA = new EVA()
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
    }, false);
    this.editor.on("drop", function( event,e2 ) {
        let value = self.MODULE.fileBlock[self.project.parent_index].blockList[self.project.current_index].value
        let current_line = self.editor.getCursor().line
        self.editor.replaceRange(value,{line:current_line})
    }, false);

    this.editor.on("change",this.onEditorChange)

    this.project.Delay = new Delay(500,function(obj){
        let data = JSON.parse(obj)
        API.PROJECT.saveNodeData({
          patch_list:data.patch_list,
          selectedNodeId:data.selectedNodeId,
          projectId:self.$route.params.projectId 
        })
    })
  }
}
</script>


