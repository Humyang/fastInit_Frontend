var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'project'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()

/*添加文集*/
async function loadTree (ctx){

    let project_id = ctx.request.fields.project_id
    console.log(project_id)
    let query_obj = {
      uid:ctx.LOGIN_STATUS.uid,
      project_id:project_id*1
    }
    console.log(query_obj)
    let project = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

    console.log(project)

    ctx.body = project.treeNode
}
async function update (ctx){

}
function * update (next){
    let selfuid = this.request.fields.selfuid
    let content = this.request.fields.content
    let title = this.request.fields.title

    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        this.login_status)

    let query_content = yield _getContent.call(this)
    
    // let patches = dmp.patch_make(content)
    let patches = content
    let targer_value = query_content.content
    if(targer_value === undefined){
        targer_value = ""
    }
    query_content.history.push(patches)
    let dmp_patch_result = dmp.patch_apply(patches, targer_value)
    for (var i = dmp_patch_result[1].length - 1; i >= 0; i--) {
        if(dmp_patch_result[1][i] != true){

            throwError(ERROR_CODE.CODE.ARTICLE_SAVE_ERROR)
        }
    }

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{content:dmp_patch_result[0],title,history:query_content.history}},
                            {'upsert':true}
                        )
    this.body = {
        status:true,
        result:res
    }
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

// 项目初始节点
  let initNode = [
      { "text" : "项目列表", 
      "state": {
          opened    : true,  // is the node open
          disabled  : false,  // is the node disabled
          selected  : false  // is the node selected
        }}]
  

  query_obj = Object.assign(query_obj,
    { project_name,
      project_id:++new_project_id
    })
      

  let res = await ctx.mongo
      .db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION)
      .update(query_obj,
          { 
            '$set':Object.assign(query_obj,{ treeNode:initNode})
          },
          {'upsert':true}
      )


  console.log(res)
  ctx.body = {
      status:true,
      msg:'新建成功'
  }
}

// 获取列表
async function list(ctx){
  let query_obj = {
    uid:ctx.LOGIN_STATUS.uid
  }
  let list = await ctx.mongo
      .db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION)
      .find(query_obj,{treeNode:0})
      .sort({project_id:-1})
      .toArray()

  ctx.body = {
      status:true,
      list
  }
}

module.exports = {
    loadTree,
    create,
    list
}