var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'project'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

/*添加文集*/
async function loadTree (ctx){

    // let porjectId = this.request.fields.porjectId
    // let token = this.request.fields.token
    // let floder_uid = uid(40)
    // let insert_obj = objectAssign({
    //                         name,
    //                         floder_uid,
    //                         isMove:false,
    //                         timemap:(new Date()).getTime(),
    //                         timemapTotal:0
    //                     },this.login_status)
    // let logined_uid = this.login_status.uid
    
    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    // let res = await this.mongo
    //                     .db(CONFIG.dbName)
    //                     .collection(MODULE_CONFIG.COLLECTION)
    //                     .insert(insert_obj)

    ctx.body = [
      { "text" : "项目列表", 
      "state": {
          opened    : true,  // is the node open
          disabled  : false,  // is the node disabled
          selected  : false  // is the node selected
        },
      "children" : [
          { "text" : "package.json" },
          { "text" : "index.js" },
           { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
          { "text" : "package.json" },
          { "text" : "index.js" },
    ]}]
}
async function create(ctx){
  let project_name = ctx.request.fields.project_name
  
  /*{
    项目名称
    归属用户
  }*/
  let query_obj = {
    uid:ctx.LOGIN_STATUS.uid
  }
  let list = await ctx.mongo
      .db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION)
      .find(query_obj,{content:0})
      .sort({project_id:-1})
      .toArray()

  var new_project_id = (list[0] && list[0].project_id) || 0
  if(isNaN(new_project_id)){
    new_project_id = 0
  }

  query_obj = Object.assign(query_obj,{project_name,project_id:++new_project_id})

  let res = await ctx.mongo
      .db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION)
      .update(query_obj,
          { 
            '$set':query_obj
          },
          {'upsert':true}
      )
  console.log(res)
  ctx.body = {
      status:true,
      msg:'新建成功'
  }
}
module.exports = {
    loadTree,
    create
}