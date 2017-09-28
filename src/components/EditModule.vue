<template>
  <div class="EditModule">
    <div class="floder">
        <!-- <a class="btn back_home">回到首页</a> -->
            <p @click.prevent="moduleList.visibleAddModule=true"
            class="p_add"><i class="i_add">+</i>添加模块</p>
            <div 
            v-show="moduleList.visibleAddModule"
            class="add_wrap">
                <input v-model="moduleList.newModuleName" 
                  placeholder="输入模块文章" 
                  type="" 
                  name="">
                <a @click.prevent="addModule" class="btn btn_ok" href="">保存</a>
                <a @click.prevent="moduleList.visibleAddModule=false" class="btn btn_cancel" href="">取消</a>
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
                <li v-for="(item,index) in moduleList.list">{{item.name}}</li>
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
        <a @click.prevent="block_write" class="btn black" href="#" >写入</a>
        <a @click.prevent="block_split" class="btn black" href="#">分割</a>
      </p>
      <div class="textarea_wrap">
          <textarea v-for="(item,index) in blockCode.blockInput" 
          @click="block_textarea_select(index,$event)"
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
import '../css/editModule.css'

export default {
  data () {
    return {
      moduleList:{
        newModuleName:"",
        visibleAddModule:false,
        list:[]
      },
      blockCode:{
        blockInput:[{value:"aaaa"},{value:"bbbb"}],
        selectedIndex:0,
        element:null,
        selectionStart:0,
        cacheList:[{value:"aaaa"},{value:"bbbb"}]
      },
      fileBlock:{
        newFileBlockName:"",
        visibleAddFileBlock:false,
        list:[{name:"aaaa"}],
        dropOverIndex:-1,
        selectedIndex:-1,
      },
      ui:{
        
        add_module:1
      }
    }
  },
  methods:{
    addModule:function(){
      this.moduleList.list.push({name:this.moduleList.newModuleName})
      this.moduleList.newModuleName=""
      this.moduleList.visibleAddModule = false

    },

    codeBlockDragStart:function(index,event){
      console.log(123)
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
      console.log(222) 
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
  }
}
</script>

