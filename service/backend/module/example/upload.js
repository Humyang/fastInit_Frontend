var fs = require('fs');
var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
// var CONFIG = require('../../PREDEFINED/CONSTANT.js')
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

const Path = require('path');

var moveFile = function(oldPath,newPath) {
  return function(fn) {
    fs.rename(oldPath, newPath,fn)
  }
}

/*

在磁盘遍历给定的路径，如果没有找到就立即创建

*/
function pathCheckAndCreate(path){

  var parse_path = Path.parse(path)

  var dirname = Path.dirname(path)
  
  if(parse_path.root != dirname){
    
    pathCheckAndCreate(dirname)

    if(!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
  }
}
/* 上传 */
function * upload (next){
    debugger;
    // console.log(123)
    // console.log(this.request.token)
    var file = this.request.files[0]
    // './upload/'+ this.login_status.uid
    var root_path = process.cwd()
    var path = root_path + '/upload/'+ this.login_status.uid
    pathCheckAndCreate(path)
    // var file_exits = yield accessPath(path)
    // if(!file_exits){
    //   try{
    //   fs.mkdirSync(path)
    //   }
    //   catch(e){
    //     console.log(e)
    //   }
    // }

    // });

    // console.log(file_exits)

    var obj = yield moveFile(file.path, path +'/'+file.name)

    this.body = {
      status:1,
      img_url:"IPADDRESS:"+CONFIG.servePort+"/"+this.login_status.uid+'/'+file.name,
      size:file.size
    }
}
module.exports = {
    upload
}