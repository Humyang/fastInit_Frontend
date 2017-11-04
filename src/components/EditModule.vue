<template>
  <div class="EditModule">
    <div class="floder">
        <div id="moduleTree" class="tree_block">
        
        </div>
    </div>
        <!-- 代码编辑 -->
    <div class="flex_contain">
      <div class="editArea">
        <editor :value="project.value"
          :offChange="project.offChange"
          :changed.sync="project.changed"
          v-on:saveNodeData="saveNodeData"
          v-on:onchange="editorOnchange">
          <div slot="button" style="    float: left;">
            <a @click="newPreview" class="btn btn_ok" href="#">生成</a>
          </div>
          </editor>
      </div>
      <div class="preview markdown_parse_preview_wrap"> 
        <div id="markdown_parse_preview" v-html="article_markdown_preview_text">
                
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//
//
//
//   68b
//   Y89                                               /
//   ___ ___  __    __   __ ____     _____   ___  __  /M
//   `MM `MM 6MMb  6MMb  `M6MMMMb   6MMMMMb  `MM 6MM /MMMMM
//    MM  MM69 `MM69 `Mb  MM'  `Mb 6M'   `Mb  MM69 "  MM
//    MM  MM'   MM'   MM  MM    MM MM     MM  MM'     MM
//    MM  MM    MM    MM  MM    MM MM     MM  MM      MM
//    MM  MM    MM    MM  MM    MM MM     MM  MM      MM
//    MM  MM    MM    MM  MM.  ,M9 YM.   ,M9  MM      YM.  ,
//   _MM__MM_  _MM_  _MM_ MMYMMM9   YMMMMM9  _MM_      YMMM9
//                        MM
//                        MM
//                       _MM_
import '../css/common.css'
import  '../css/btn.css'
import '../css/editModule.css'

import EVA from '../../service/fontend/Obj/EditorValueAdvance.js'
import * as CONSTANT from '../../service/PREDEFINED/CONSTANT.js'
import * as BASE from '../../service/fontend/base.js'
import * as API from '../../service/fontend/index.js'
import Delay from '../../service/fontend/Obj/Delay.js'
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

export default {
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
      Delay:"",
      selectedNodeId:"",
      locKsaveData:false,
      treeNode:{
        EVA:""
      },
      moduleList:{
        newModuleName:"",
        visibleAddModule:false,
        list:[]
      },
      blockCode:{
        blockInput:[{value:""}],
        selectedIndex:0,
        element:null,
        selectionStart:0,
        cacheList:[]
      },
      fileBlock:{
        newFileBlockName:"",
        visibleAddFileBlock:false,
        list:[],
        dropOverIndex:-1,
        selectedIndex:-1,
      },
      ui:{
        add_module:1
      },
      project:{
        value:"",
        offChange:false,
        nodeName:"",
        changed:false,
        rawValue:""
      },
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
  methods:
  {
    editorOnchange:function(event){
      this.project.rawValue = event.value
    },
    newPreview:function(){

    },
    saveTree:function(){
      this.treeNode.EVA.value = JSON.stringify( $("#moduleTree").jstree("get_json"))
      // 保存数据
      API.MODULE.update(this.treeNode.EVA.patch_list)
      .then(function(res){
      })
    },
    addModule:function(){
      // 创建模块

      this.moduleList.list.push({name:this.moduleList.newModuleName})
      this.moduleList.newModuleName=""
      this.moduleList.visibleAddModule = false

    },

    codeBlockDragStart:function(index,event){
      this.fileBlock.selectedIndex = index
      // event.currentTarget.style.border = "dashed";
      event.effectAllowed = "copyMove";
    },
    fileBlockOnDrop:function(index,event){

      // 获取来源 index
      // this.fileBlock.selectedIndex
      // 获取cell index
      // 移动数据
      var list = this.fileBlock.list[index].blockList || []
      list.push(this.blockCode.cacheList[this.fileBlock.selectedIndex])
      this.fileBlock.list[index].blockList = list
      
      this.blockCode.cacheList.splice(this.fileBlock.selectedIndex,1)

      this.fileBlock.dropOverIndex = -1
    },
    fileBlockOnDropOver:function(index){
      this.fileBlock.dropOverIndex = index
    },
    fileBlockOnDropOut:function(event){
      console.log(event)
      var parent = document.querySelector(".classify")
      if(event.fromElement === parent){
        this.fileBlock.dropOverIndex = -1
      }
    },
    addFileBlock:function(){
      let newName = this.fileBlock.newFileBlockName
      this.fileBlock.list.push({name:newName,blockList:[]})
      this.fileBlock.visibleAddFileBlock = false
    },
    block_textarea_select:function(index,event){
      // console.log(index,event)
      // var element = 

      this.blockCode.element = event.target

      this.blockCode.selectedIndex = index

      this.blockCode.selectionStart = event.target.selectionStart

    },
    saveNodeData:function(event){
      let self = this
      API.MODULE.saveNodeData(
          event.patch_list,
          self.selectedNodeId)
        .then(function(res){
          self.project.changed = false
        })
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
        
        return marked(this.project.rawValue)
    },
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
  mounted:function(){

    var self = this

    // 读取已有模块列表
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
        "plugins" : [ "contextmenu","dnd" ],
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
    }).on('move_node.jstree',function(data,element,helper,event){
      console.log('move_node')
      self.saveTree('move_node')
    })
    .on('rename_node.jstree',function(){self.saveTree('rename_node');console.log('rename_node')})
    .on('delete_node.jstree',function(){self.saveTree('delete_node');console.log('delete_node')})
    .on('ready.jstree',function(){

      self.treeNode.EVA = new EVA()
      // 初始化值
      self.treeNode.EVA.value = JSON.stringify( $("#moduleTree").jstree("get_json"))

    }).on('select_node.jstree',function(obj,node){
      self.locKsaveData = true
      self.selectedNodeId = node.node.a_attr.module_id
      API.MODULE
      .loadNodeData(node.node.a_attr.module_id)
      .then(function(res){
        self.project.selectedNodeId = node.node.a_attr.module_id
        self.project.offChange = false
        if(self.selectedNodeId!=res.selectedNodeId){
          console.log('selectedNodeId not equart current node id')
          return 
        }
        self.project.nodeName = node.node.text
        try{
            self.project.value = res.result.content

          } catch (ex) {
            self.project.value = ""
          }
          self.project.rawValue = self.project.value
          setTimeout(function() {
            self.project.offChange = true
          }, 10);
      })
    });
  }
}
</script>

