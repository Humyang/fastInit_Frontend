var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var uid = require('uid')

var MODULE_CONFIG = {
    COLLECTION:'userconfigs'
}

function * floderSortTypeUpdate (next){
    let type = this.request.fields.type
    // let obj = objectAssign({
    //                         floder_sort_type:type
    //                     },this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(
                            this.login_status,
                            {'$set':{floder_sort_type:type}},
                            {'upsert':true}
                        )

    this.body = {
        status:true,
        msg:'成功'
    }
}
function * getAll (next){

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(this.login_status)
    this.body = {
        status:true,
        result:res
    }
}
module.exports = {
    getAll,
    floderSortTypeUpdate
}