var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var uid = require('uid')

var MODULE_CONFIG = {
    COLLECTION:'floders'
}
/*添加文集*/
function * add (next){

    let name = this.request.fields.name
    let token = this.request.fields.token
    let floder_uid = uid(40)
    let insert_obj = objectAssign({
                            name,
                            floder_uid,
                            isMove:false,
                            timemap:(new Date()).getTime(),
                            timemapTotal:0
                        },this.login_status)
    // let logined_uid = this.login_status.uid
    
    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)

    this.body = {
        status:true,
        msg:'更新成功',
        id:res.insertedIds[1],
        floder_uid
    }
}
/*返回列表*/
function * list (next){
    let filter_object = objectAssign(this.login_status,{isMove:{$ne:true}})
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(filter_object,{history:false})
                        .sort({_id:-1})
                        .toArray()
    this.body = {
        status:true,
        result:res
    }
}
function * remove (next){
    let floder_uid = this.request.fields.floder_uid
    // let logined_uid = this.login_status.uid

    let query_obj = objectAssign(
        {floder_uid},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{isMove:true}}
                            )
    // console.log(query_obj)
    this.body = {
        status:true,
        result:res
    }
}

function* _findOne(){

    let floder_uid = this.request.fields.floder_uid

    let query_obj = objectAssign(
        {floder_uid,isMove:{$ne:true}},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    return res
}
function Mfloder_list_modify(){
    return function * plugin (next) {

        // 为 floder 添加一个最后修改日期，用来排序
        // var timemap = (new Date()).timemap

        let floder_uid = this.request.fields.floder_uid

        let timemap = this.request.fields.timemap

        let timemapTotal = 0
        let findone = yield _findOne.call(this)
        if(findone.timemapTotal){
            timemapTotal = findone.timemapTotal
        }
        timemapTotal++

        // console.log(timemap)
        let query_obj = objectAssign(
        {floder_uid},
        this.login_status)

        let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{timemap,timemapTotal}},
                            {'upsert':true}
                            )




// console.log(query_obj)

        // let token = this.request.fields.token
        // let _login_check_res = yield this.mongo
        //             .db(this.LOGIN_CONFIG.dbname)
        //             .collection('logined_token')
        //             .findOne({token:token})
        // if(_login_check_res === null){
        //     // throw new Error('未登陆')
        //     throwError(CODE.LOGIN_NO_LOGIN)
        // }
        // if(_login_check_res.status === false){
        //     throwError(CODE.LOGIN_TOKEN_INVALID)
        // }

        // // // console.log('_login_check_res',_login_check_res)
        // // 2016年11月28日17:55:51 todo：
        // // _login_check_res.username
        // // 获取 user 的资料
        // let userinfo = yield this.mongo
        //                         .db(this.LOGIN_CONFIG.dbname)
        //                         .collection('user')
        //                         .findOne({username:_login_check_res.username})

        // this.login_status = {
        //     uid:userinfo.uid
        // }
        yield next
    } 
}


module.exports = {
    add,
    list,
    remove,
    Mfloder_list_modify
}