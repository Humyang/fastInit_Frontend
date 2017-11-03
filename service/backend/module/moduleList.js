var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'moduleList'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

// var GDMP = require('../../../src/vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
// var dmp = new GDMP.diff_match_patch()

// let initNode = [{"id":"j2_1","text":"项目列表","icon":true,"li_attr":{"id":"j2_1"},"a_attr":{"href":"#","id":"j2_1_anchor"},"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"data":{},"children":[]}]

var GDMP = require('../../../src/vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()


async function loadNodeData(ctx){
  let selectId = ctx.request.fields.selectedNodeId

  let query_obj = {
      uid:ctx.LOGIN_STATUS.uid,
      selectId
  }

  let module = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

  ctx.body = {
      status:true,
      result:module
  }
}
async function saveNodeData(ctx){
  debugger
  let patch_list = ctx.request.fields.patch_list
  let selectId = ctx.request.fields.selectedNodeId

  let query_obj = {
      uid:ctx.LOGIN_STATUS.uid,
      selectId
  }


  let project = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

  let targer_value = project && project.content
  if(!targer_value || targer_value === undefined){
      targer_value = ""
  }
  if(typeof targer_value === "string"){

  }else{
    targer_value = JSON.stringify(targer_value)
  }
  console.log(patch_list,selectId,targer_value)
  let dmp_patch_result = dmp.patch_apply(patch_list, targer_value)
  for (var i = dmp_patch_result[1].length - 1; i >= 0; i--) {
      if(dmp_patch_result[1][i] != true){
          throwError(ERROR_CODE.CODE.ARTICLE_SAVE_ERROR)
      }
  }

  let res = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .update(query_obj,
        { 
          '$set':Object.assign({},query_obj,{content:dmp_patch_result[0]})
        },
        {'upsert':true}
    )

  ctx.body = {
      status:true,
      result:res
  }
}
module.exports = {
    loadNodeData,
    saveNodeData
}