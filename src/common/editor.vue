
<template>
    <div class="textarea_wrap">
      <div class="add_wrap">
        <slot name="button"></slot>
        <a v-show="changed===true" href="" class="saving">*</a>
      </div>
      <div class="textarea">
        <textarea name="" id="ta2" cols="30" rows="10"></textarea>
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

import '../css/CodeMirror_Theme.css'

import EVA from '../../service/fontend/Obj/EditorValueAdvance.js'

import Delay from '../../service/fontend/Obj/Delay.js'



export default {
  /*
    __ ____   ___  __   _____   __ ____     ____
    `M6MMMMb  `MM 6MM  6MMMMMb  `M6MMMMb   6MMMMb\
     MM'  `Mb  MM69 " 6M'   `Mb  MM'  `Mb MM'    `
     MM    MM  MM'    MM     MM  MM    MM YM.
     MM    MM  MM     MM     MM  MM    MM  YMMMMb
     MM    MM  MM     MM     MM  MM    MM      `Mb
     MM.  ,M9  MM     YM.   ,M9  MM.  ,M9 L    ,MM
     MMYMMM9  _MM_     YMMMMM9   MMYMMM9  MYMMMM9
     MM                          MM
     MM                          MM
    _MM_                        _MM_
  */

  props:{
    value:{
      type: String,
      default: ' '
    },
    offChange:{
      type: Boolean,
      default: false
    },
    nodeName:{
      type: String,
      default: 'default'
    },
    selectedNodeId:{
      type: String,
      default: 'default'
    },
    changed:{
      type: Boolean,
      default: false
    }
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

      project:{
        locKsaveData:false,
        selectedIndex:-1,
        EVA:"",
        nodeDataEVA:"",
        Delay:""
      },
      editor:"",
      Delay:""
    }
  },
/*


                                              ___
                                              `MM
                               /               MM
  ____    _    ___    ___     /M       ____    MM  __
  `MM(   ,M.   )M'  6MMMMb   /MMMMM   6MMMMb.  MM 6MMb
   `Mb   dMb   d'  8M'  `Mb   MM     6M'   Mb  MMM9 `Mb
    YM. ,PYM. ,P       ,oMM   MM     MM    `'  MM'   MM
    `Mb d'`Mb d'   ,6MM9'MM   MM     MM        MM    MM
     YM,P  YM,P    MM'   MM   MM     MM        MM    MM
     `MM'  `MM'    MM.  ,MM   YM.  , YM.   d9  MM    MM
      YP    YP     `YMMM9'Yb.  YMMM9  YMMMM9  _MM_  _MM_



*/


  watch:{
    nodeName:function(){
      console.log('change')
      this.change(this.nodeName)
    },
    value:function(){
      console.log('set value')
      this.project.nodeDataEVA.reset()
      this.project.nodeDataEVA.value = this.value
      this.editor.setValue(this.value)
      // this.project.value = res.result.content
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
    saveConfig:function(){

    },
    onEditorChange:function(value){
        if(!this.offChange){ return }
        this.$emit('update:changed', true)
        // this.value = this.editor.getValue()
        this.$emit('onchange', {value:this.editor.getValue()})
        
        this.project.Delay.push()
    },
    change:function(nodeText) {
      if(!nodeText){
        return
      }
      // 更改图标类型
      var val = nodeText, m, mode, spec;
      if (m = /.+\.([^.]+)$/.exec(val)) {
        var info = CodeMirror.findModeByExtension(m[1]);
        if (info) {
          mode = info.mode;
          spec = info.mime;
        }
      } else if (/\//.test(val)) {
        var info = CodeMirror.findModeByMIME(val);
        if (info) {
          mode = info.mode;
          spec = val;
        }
      } else {
        mode = spec = val;
      }
      if (mode) {
        console.log('change')
        this.editor.setOption("mode", spec);
        CodeMirror.autoLoadMode(this.editor, mode);
        console.log('change to ',spec)
        // document.getElementById("modeinfo").textContent = spec;
      } else {
        console.log("Could not find a mode corresponding to " + val);
      }
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

    var self = this

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
    CodeMirror.modeURL = "/vendors/codemirror/mode/%N/%N.js";

    self.project.nodeDataEVA = new EVA()
    // 加载数据
    var e = document.getElementById('ta2')
    this.editor = CodeMirror.fromTextArea(e, {
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping:true,
        theme: "zenburn",
        extraKeys: {
          "Enter": "newlineAndIndentContinueMarkdownList",
          "Alt-H": function(cm) {
            var spaces = cm.getSelection()
            cm.replaceSelection('```html\r\n'+spaces+'\r\n```');
          },
          "Alt-J": function(cm) {
            var spaces = cm.getSelection()
            cm.replaceSelection('```js\r\n'+spaces+'\r\n```');
          },
          "Alt-K": function(cm) {
            var spaces = cm.getSelection()
            cm.replaceSelection('```\r\n'+spaces+'\r\n```');
          },
          "Alt-L": function(cm) {
            var spaces = cm.getSelection()
            cm.replaceSelection('['+spaces+']()');
          },
          "Alt-1": function(cm) {
            let curosr = cm.getCursor()
            cm.setCursor(curosr.line,0)
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection("#"+spaces);
          },
          "Alt-2": function(cm) {
            let curosr = cm.getCursor()
            cm.setCursor(curosr.line,0)
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection("##"+spaces);
          },
          "Alt-3": function(cm) {
            let curosr = cm.getCursor()
            cm.setCursor(curosr.line,0)
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection("###"+spaces);
          }
        },
        keymap:"sublime"
    });
    var code_mirror = document.getElementsByClassName('CodeMirror')[0]
    code_mirror.style.height = window.innerHeight + "px"
    window.onresize = function() {
        code_mirror.style.height = window.innerHeight + "px"
    }
    // 接收drop事件
    // 获取selectionStart
    // 写入拖动内容
    var element = document.getElementsByClassName("textarea")[0]

    element.addEventListener("dragover", function( event ) {
      event.preventDefault();
    }, false);

    this.editor.on("change",this.onEditorChange)

    this.project.Delay = new Delay(500,function(obj){
        self.project.nodeDataEVA.value = self.editor.getValue()
        console.log('emit saveNodeData')
        self.$emit('saveNodeData', {patch_list:self.project.nodeDataEVA.patch_list,
                                    value:self.project.nodeDataEVA.value})
    })

    var code_mirror = document.getElementsByClassName('flex_contain')[0]
    code_mirror.style.height = window.innerHeight - 5 + "px"
    window.onresize = function() {
        code_mirror.style.height = window.innerHeight - 5 + "px"
    }
  }
}
</script>



