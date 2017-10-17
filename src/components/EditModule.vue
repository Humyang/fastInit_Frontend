<template>
  <div class="EditModule">
    <div class="floder">
        <div id="moduleTree" class="tree_block">
        
        </div>
    </div>
        <!-- 代码编辑 -->
    <div class="editArea">
      <p class="btn_wrap">
        <a @click.prevent="block_write" class="btn black" href="#" >写入</a>
        <a @click.prevent="block_split" class="btn black" href="#">分割</a>
      </p>
      <div class="textarea_wrap">
          <textarea v-for="(item,index) in blockCode.blockInput" 
          @click="block_textarea_select(index,$event)"
          placeholder="代码区域" 
          v-model="item.value"
          name="" id="" cols="30" rows="10">{{item.value}}</textarea>
      </div>
      <div id="codeBlock_wrap">

        <div id="codeblock1" class="codeblock" 
          v-for="(item,index) in blockCode.cacheList"
          @dragstart="codeBlockDragStart(index,$event)"
          draggable="true">
          {{item.value}}
        </div>
      </div>
    </div>
    <!-- 模块分类 -->
    <div class="classify">
      <p class="btn_wrap">
        <a 
        @click.prevent="fileBlock.visibleAddFileBlock=true" class="btn black" href="#">添加文件</a>
      </p>
      <div v-show="fileBlock.visibleAddFileBlock" class="add_wrap">
          <input v-model="fileBlock.newFileBlockName" placeholder="输入文章标题" type="" name="">
          <a @click.prevent="addFileBlock" class="btn btn_ok" href="#">保存</a>
          <a @click.prevent="fileBlock.visibleAddFileBlock=false" class="btn btn_cancel" href="#">取消</a>
      </div>
      <div 
      class="cell"
      v-for="(item,index) in fileBlock.list"
      :class="{dropover:fileBlock.dropOverIndex===index}"
      @dragover.prevent="fileBlockOnDropOver(index)"
      @dragleave.prevent="fileBlockOnDropOut($event)"
      @drop="fileBlockOnDrop(index,$event)" 
      :id="'cell'+index"
      >
        <p class="head">{{item.name}}</p>
        <code class="codeblock" v-for="(block,index) in item.blockList">{{block.value}}</code>
      </div>
    </div>
    {{saveData}}
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


export default {
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
      }
    }
  },
  watch:{
      "blockCode.blockInput": {handler: function(){
          if(this.locKsaveData){
            return
          }
          this.saveData()
        },deep: true},
      "blockCode.cacheList": {
        handler: function(){
          if(this.locKsaveData){
            return
          }
          this.saveData()
        },
        deep: true
      },
      "fileBlock.list": {
        handler: function(){
          if(this.locKsaveData){
            return
          }
          this.saveData()
        },
        deep: true
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
    saveData:function(){
      let blockInput = JSON.stringify(this.blockCode.blockInput)

      let cacheList = JSON.stringify(this.blockCode.cacheList)

      let fileBlock = JSON.stringify(this.fileBlock.list)
        
        if(this.Delay.push){
          console.log('push')
          this.Delay.push({
            blockInput,
            cacheList,
            fileBlock,
            selectId:this.selectedNodeId
          })
        }
    },
    saveTree:function(){
      // console.log(this)
      this.treeNode.EVA.value = JSON.stringify( $("#moduleTree").jstree("get_json"))
      // 保存数据
      API.MODULE.update(this.treeNode.EVA.patch_list)
      .then(function(res){
          // console.log(res)
          // self.list = res.list
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
    block_write:function(){
      // 将列表写入缓存块

      // 获取列表值
      var newObj = []
      for (var i = this.blockCode.blockInput.length - 1; i >= 0; i--) {
        newObj.push({value:this.blockCode.blockInput[i].value})
      }
      this.blockCode.cacheList = newObj
    },
    block_split:function(){

      // 获取当前选中的textarea

      // 获取selectionStart

      var selectionStart = this.blockCode.selectionStart
      var value = this.blockCode.blockInput[this.blockCode.selectedIndex].value
      // 分割文字
      var sp1 = value.substr(0,selectionStart)
      var sp2 = value.substr(selectionStart,value.length)


      var valueArray = [...this.blockCode.blockInput]
      valueArray.splice(this.blockCode.selectedIndex,0,{value:sp2})
      valueArray.splice(this.blockCode.selectedIndex,0,{value:sp1})
      valueArray.splice(this.blockCode.selectedIndex+2,1)

      this.blockCode.blockInput = [...valueArray]
      // textarea根据文字进行渲染
    },
    newModule:function(){

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


    this.Delay = new Delay(500,function(obj){
        console.log('saveNodeData',obj)
        API.MODULE.saveNodeData(obj)
    })

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
      // console.log('changed')
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
        if(self.selectedNodeId!=res.selectedNodeId){
          console.log('selectedNodeId not equart current node id')
          return 
        }
        try{
          self.blockCode.blockInput = JSON.parse(res.result.blockInput)
          self.blockCode.cacheList = JSON.parse(res.result.cacheList)
          self.fileBlock.list = JSON.parse(res.result.fileBlock)
        }catch(err){
            self.blockCode.blockInput = [{value:''}]
            self.blockCode.cacheList = []
            self.fileBlock.list = []
        }
        setTimeout(function() {
          self.locKsaveData = false
        }, 10);
      })
    });
  }
}
</script>

