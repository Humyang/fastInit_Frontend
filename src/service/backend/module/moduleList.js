var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'moduleList'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

// var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
// var dmp = new GDMP.diff_match_patch()

// let initNode = [{"id":"j2_1","text":"项目列表","icon":true,"li_attr":{"id":"j2_1"},"a_attr":{"href":"#","id":"j2_1_anchor"},"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"data":{},"children":[]}]

var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()

async function findlost(ctx){
  let query_obj = {
    uid:ctx.LOGIN_STATUS.uid
  }
  let module = await ctx.mongo
    .db(CONFIG.dbName)
    .collection('moduleTree')
    .findOne(query_obj)

  let treeNode = module.treeNode

  let list = await ctx.mongo
      .db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION)
      .find(query_obj,{treeNode:0})
      .sort({project_id:-1})
      .toArray()
  let result = []
  for (var i = list.length - 1; i >= 0; i--) {
    if(treeNode.search(list[i].selectId)<0){
      result.push(list[i])
    }
  }
  ctx.body = {
      status:true,
      result
  }
}
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
    saveNodeData,
    findlost
}

// 待删除节点
// [{"_id":"5a047fd097f3cdc08f4635a6","selectId":"MEsLouubLzAXGB8qudOGK2KFcH7Lsim1NmWokmJm","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a04747797f3cdc08f46243a","selectId":"bihZrfi5ce764faNgI8e4qJR8AiRSkpnyshhNzrD","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a04744197f3cdc08f4623d8","selectId":"BqkIxieUy0yuaIHqErC0NKCIDxccxOlPkT6PpzZB","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a04742d97f3cdc08f4623b8","selectId":"c7CKPghHKilcbAkVn4rKkTtMtXzwM0YA83i8XYjF","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a04736797f3cdc08f4622a0","selectId":"6NGREbOZoG3FjeHc1WnZXMEAYL6xJ4kKIMYQy1wk","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a041d7197f3cdc08f45d034","selectId":"XWSNIi4HCgyFS7eVdEJyQrNG6h0PRf2MjGGGk7XL","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03e3c697f3cdc08f459ce4","selectId":"PLS02YEWWyhQMptpAs99UNnc95Yot9KzsJGJSp7H","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03e21797f3cdc08f459a38","selectId":"UWCbN8gb9OtuDXHTdY6jmVQbNBMKe0pUIEHgAppa","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03e1b197f3cdc08f45997a","selectId":"TkqQ4mbzpyVd5Hs53gE2mYkXTmqAHuegauHFAElD","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03e0fa97f3cdc08f4598b0","selectId":"ERPsNlZBci4DwbfDQzCZ6H1lEDwB0CduRwDDyy20","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03d18397f3cdc08f458e62","selectId":"NFHZeknpn8n0PQETxD9BpnPM1zuEol61Nib2lG6u","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03d14a97f3cdc08f458e11","selectId":"CYwqKC3T9wNTZOYKAakCM83Yx6iqmjLWfiD2WRnJ","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03d11997f3cdc08f458dac","selectId":"wHN2JccSb0Z05YMUqL12fapEnNP1hUnCXoVe8puR","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03173497f3cdc08f4503d9","selectId":"SjzPHIdwyZckuFSj0nCW3DkHB0wE7LHWqvilyMsT","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a0315c897f3cdc08f450214","selectId":"Q9y2IlfG0hQCuJeLaInX6Y3VMoanoF8WBZDrSHfr","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03154997f3cdc08f45019c","selectId":"b6KWG1RgBH3GKESySxs3ZN8A40RVsRxncO1Hvtnz","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a0314d697f3cdc08f4500c1","selectId":"e9LaAw60cs2e1aRscnX18xV3ucGFjsYHLI1AIRY9","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a03147597f3cdc08f450035","selectId":"9EkSGLxeirf8uUF48ZFAZPHNSLG6sfp60B8zoaND","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""},{"_id":"5a02d46397f3cdc08f44cbf8","selectId":"g6wM9LG8wURWKCzdUnJ0Dd8FXFsn1Cf0iN5CIiw0","uid":"ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd","content":""}]