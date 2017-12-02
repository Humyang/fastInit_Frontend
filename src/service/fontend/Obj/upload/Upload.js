/*
封装的目的是什么？

1. 提取重复的代码。
2. 保持代码整洁。

上传事件有哪些重复代码？

1. 上传进度 通过参数传入回调
2. 上传完成 通过参数传入回调
3. 请求错误 通过参数传入回调
4. 中断请求 通过参数传入回调

*/

import * as BASE from '../../base.js'
import {
    IP
} from '../../PREDEFINED/CONSTANT.js'
var Upload = function(options){

    var options = Object.assign({
      onSuccess:undefined,
      onError:undefined,
      onComplete:undefined,
      onProcess:undefined
    },options)

    this.serve_url = IP + ":8202/upload"

    this.fd = new FormData();
    
    this.xhr = new XMLHttpRequest();

    // xhr.enctype = "multipart/form-data";
    //上传中设置上传的百分比
    this.xhr.upload.addEventListener("progress", function(evt){
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            if(options.onError!=undefined){
              options.onProcess(percentComplete)
            }
        }else {

        }
    }, false);
    //请求完成后执行的操作
    this.xhr.addEventListener("load", function(event){
        var obj = JSON.parse(event.target.responseText)
        if(obj.status == 1){
            if(options.onSuccess!=undefined){
              options.onSuccess(event)
            }
        }else{
            if(options.onError!=undefined){
              options.onError(event)
            }
        }
    }, false);
    //请求error
    this.xhr.addEventListener("error", function(event){
        if(options.onError!=undefined){
            options.onError(event)
        }
    }, false);
    //请求中断
    this.xhr.addEventListener("abort", function(event){
        if(options.onError!=undefined){
            options.onError(event)
        }
    }, false);
    //发送请求 服务器请求地址 

    
}
Upload.prototype.start = function(file){
  this.fd.append("file", file);
  this.fd.append("token", BASE.getToken());
  
  this.xhr.open("post",this.serve_url,true);
  this.xhr.send(this.fd);
  this.fd.delete("file")
  this.fd.delete("token")
}
Upload.prototype.abort = function(){
  // 中断文件上传
} 

export default Upload