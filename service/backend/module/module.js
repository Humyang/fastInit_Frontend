var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'module'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

var GDMP = require('../../../src/vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()

let initNode = [{"id":"j2_1","text":"项目列表","icon":true,"li_attr":{"id":"j2_1"},"a_attr":{"href":"#","id":"j2_1_anchor"},"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"data":{},"children":[]}]

/*添加文集*/
async function loadTree (ctx){


    let query_obj = {
      uid:ctx.LOGIN_STATUS.uid
    }
    let module = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

    // debugger
    

    let treeNode = (module && module.treeNode) || initNode    
    ctx.set('Content-Type','application/json; charset=utf-8')
    ctx.body = treeNode
}

async function update (ctx){
  let patch_list = ctx.request.fields.patch_list

  let query_obj = {
      uid:ctx.LOGIN_STATUS.uid
    }

  let module = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

  // let oldContent = module.treeNode

  let targer_value = (module && module.treeNode) || initNode
  if(targer_value === undefined){
      targer_value = ""
  }
  if(typeof targer_value === "string"){

  }else{
    targer_value = JSON.stringify(targer_value)
  }
debugger
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
          '$set':{treeNode:dmp_patch_result[0]}
        },
        {'upsert':true}
    )

  ctx.body = {
      status:true,
      result:res
  }
}

module.exports = {
    loadTree,
    update
}