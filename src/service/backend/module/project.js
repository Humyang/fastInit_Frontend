var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
  COLLECTION: 'project'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()

/*添加文集*/
async function loadTree(ctx) {

  let project_id = ctx.request.fields.project_id

  let query_obj = {
    uid: ctx.LOGIN_STATUS.uid,
    project_id: project_id * 1
  }
  console.log(query_obj)
  let project = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

    console.log(project)
    ctx.set('Content-Type','application/json; charset=utf-8')
    ctx.body = project.treeNode
}
async function update(ctx) {
  let patch_list = ctx.request.fields.patch_list
  let project_id = ctx.request.fields.project_id

  let query_obj = {
    uid: ctx.LOGIN_STATUS.uid,
    project_id: project_id * 1
  }

  let project = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .findOne(query_obj)

  let oldContent = project.treeNode

  let targer_value = project.treeNode
  if (targer_value === undefined) {
    targer_value = ""
  }
  if (typeof targer_value === "string") {

  } else {
    targer_value = JSON.stringify(targer_value)
  }
  let dmp_patch_result = dmp.patch_apply(patch_list, targer_value)
  for (var i = dmp_patch_result[1].length - 1; i >= 0; i--) {
    if (dmp_patch_result[1][i] != true) {
      throwError(ERROR_CODE.CODE.ARTICLE_SAVE_ERROR)
    }
  }

  let res = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .update(query_obj, {
      '$set': {
        treeNode: dmp_patch_result[0]
      }
    })
  ctx.body = {
    status: true,
    result: res
  }
}
async function create(ctx) {
  let project_name = ctx.request.fields.project_name

  /*{
    项目名称
    归属用户
  }*/
  let query_obj = {
    uid: ctx.LOGIN_STATUS.uid
  }
  let list = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .find(query_obj, {
      content: 0
    })
    .sort({
      project_id: -1
    })
    .toArray()

  var new_project_id = (list[0] && list[0].project_id) || 0
  if (isNaN(new_project_id)) {
    new_project_id = 0
  }

  // 项目初始节点
  let initNode = [{
    "id": "j2_1",
    "text": "项目列表",
    "icon": true,
    "li_attr": {
      "id": "j2_1"
    },
    "a_attr": {
      "href": "#",
      "id": "j2_1_anchor"
    },
    "state": {
      "loaded": true,
      "opened": true,
      "selected": false,
      "disabled": false
    },
    "data": {},
    "children": []
  }]


  query_obj = Object.assign(query_obj, {
    project_name,
    project_id: ++new_project_id
  })


  let res = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .update(query_obj, {
      '$set': Object.assign(query_obj, {
        treeNode: initNode
      })
    }, {
      'upsert': true
    })


  console.log(res)
  ctx.body = {
    status: true,
    msg: '新建成功'
  }
}

// 获取列表
async function list(ctx) {
  let query_obj = {
    uid: ctx.LOGIN_STATUS.uid
  }
  let list = await ctx.mongo
    .db(CONFIG.dbName)
    .collection(MODULE_CONFIG.COLLECTION)
    .find(query_obj, {
      treeNode: 0
    })
    .sort({
      project_id: -1
    })
    .toArray()

  ctx.body = {
    status: true,
    list
  }
}

module.exports = {
  loadTree,
  create,
  list,
  update
}
