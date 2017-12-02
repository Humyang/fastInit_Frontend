var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid')
var objectAssign = require('object-assign')
var GDMP = require('../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()
var MODULE_CONFIG = {
    COLLECTION:'articles'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')
/*插入和更新文章*/
function * add (next){

    let title = this.request.fields.title
    let floder_uid = this.request.fields.floder_uid
    let selfuid = UUID(40)

    let insert_obj = objectAssign(
        {title,floder_uid,selfuid,isMove:false},
        this.login_status)
    
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)
    this.body = {
        status:true,
        msg:'新建成功',
        selfuid
    }
}
/*返回列表*/
function * list (next){
    let floder_uid = this.request.fields.floder_uid

    let query_obj = objectAssign(
        {floder_uid,isMove:{$ne:true}},
        this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(query_obj,{content:0,history:false})
                        .sort({_id:-1})
                        .toArray()

    this.body = {
        status:true,
        result:res
    }
}
/*更新列表*/
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
function * remove (next){
    let selfuid = this.request.fields.selfuid

    let query_obj = objectAssign(
        {selfuid},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{isMove:true}}
                            )
    this.body = {
        status:true,
        result:res
    }
}
/*
    result
        {
            _id
            content
            floder_uid
            isMove
            selfuid
            title
            uid,
            history
        }
*/

function* _getContent(){

    let selfuid = this.request.fields.selfuid

    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    if(res.history === undefined){
        res.history = []
    }
    return res
}

function * content (next){
    

    // let query_obj = objectAssign(
    //     {selfuid,isMove:{$ne:true}},
    //     this.login_status)

    // let res = yield this.mongo
    //                     .db(CONFIG.dbName)
    //                     .collection(MODULE_CONFIG.COLLECTION)
    //                     .findOne(query_obj)

    let res = yield _getContent.call(this)
    res.history=[]
    this.body = {
        status:true,
        result:res
    }
}

function * first (next){
    yield next
}
module.exports = {
    add,
    list,
    update,
    content,
    remove
}