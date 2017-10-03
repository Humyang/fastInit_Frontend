var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'porject'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

/*添加文集*/
async function loadNodes (next){

    let porjectId = this.request.fields.porjectId
    // let token = this.request.fields.token
    // let floder_uid = uid(40)
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

module.exports = {
    add
}