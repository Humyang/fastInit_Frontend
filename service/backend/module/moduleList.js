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
  let blockInput = ctx.request.fields.blockInput
  let cacheList = ctx.request.fields.cacheList
  let fileBlock = ctx.request.fields.fileBlock
  let selectId = ctx.request.fields.selectId

  let query_obj = {
      uid:ctx.LOGIN_STATUS.uid,
      selectId
  }

  let res = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .update(query_obj,
        { 
          '$set':Object.assign(query_obj,{
            blockInput,
            cacheList,
            fileBlock
          })
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