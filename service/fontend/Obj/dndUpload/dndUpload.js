/*
封装的目的是什么？

1. 提取重复的代码。
2. 保持代码整洁。

拖动事件有哪些重复代码？

1. 拖动处理：hover （参数传入回调方法）
2. 拖动处理：结束 （参数传入回调方法）
3. 拖动处理：onDrop 响应 （参数传入回调方法）

因为拖动处理是 DOM 事件，需要绑定元素，所以要传入元素 Id。

*/

import Upload from '../upload/Upload.js'

var dndUpload = function(element,options){

    var options = Object.assign({
      onSuccess:undefined,
      onError:undefined,
      onComplete:undefined,
      onProcess:undefined,
      serve_url:undefined
    },options)
    // options.serve_url = 'http://localhost:3000/upload' || 
	var upload = new Upload({serve_url:options.serve_url,onSuccess:function(res){
		// console.log(res)
		options.onSuccess(JSON.parse(res.target.responseText))
		// var obj = JSON.parse(res.target.responseText)
		// console.log(obj)
	}})

	/* events fired on the draggable target */
	element.addEventListener("drag", function( event ) {
		// console.log(event.DataTransfer.files)
		// console.log(123)
		// upload.start(event.DataTransfer.files[0])
	}, false);





	element.addEventListener("dragstart", function( event ) {
	  // store a ref. on the dragged elem
	  // dragged = event.target;
	  // make it half transparent
	  // event.target.style.opacity = .5;
	  console.log(1233)
	}, false);

	element.addEventListener("dragend", function( event ) {
	  // reset the transparency
	  // event.target.style.opacity = "";
	}, false);

	/* events fired on the drop targets */
	element.addEventListener("dragover", function( event ) {
	  // prevent default to allow drop
	  event.preventDefault();
	  console.log(333)
	}, false);

	element.addEventListener("dragenter", function( event ) {
	  // highlight potential drop target when the draggable element enters it
	  // if ( event.target.className == "dropzone" ) {
	  //     event.target.style.background = "purple";
	  // }

	}, false);

	element.addEventListener("dragleave", function( event ) {
	  // reset background of potential drop target when the draggable element leaves it
	  // if ( event.target.className == "dropzone" ) {
	  //     event.target.style.background = "";
	  // }

	}, false);

	element.addEventListener("drop", function( event ) {

	  upload.start(event.dataTransfer.files[0])
	  
	  // prevent default action (open as link for some elements)
	  event.preventDefault();
	  // move dragged elem to the selected drop target
	  // if ( event.target.className == "dropzone" ) {
	  //     event.target.style.background = "";
	  //     dragged.parentNode.removeChild( dragged );
	  //     event.target.appendChild( dragged );
	  // }

	}, false);
}

export default dndUpload
// dndUpload.prototype.onDrop = function(){

// }
// dndUpload.prototype.onDragOver = function(){

// }
// dndUpload.prototype.startUpload = function(){

// }
// dndUpload.prototype.uploadSuccess = function(){

// }
// dndUpload.prototype.uploadEnd = function(){

// }
