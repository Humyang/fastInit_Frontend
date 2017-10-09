var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'articles'
}
// 搜索目录和文章

function * search (next){
	let keywords = this.request.fields.keywords
	// console.log(keywords
	// 	)
	// let filter_object = objectAssign(this.login_status,{isMove:{$ne:true}})
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find({$or:[{content:{$regex:".*"+keywords+".*"}},{title:{$regex:".*"+keywords+".*"}}]},	
                    		  { score: { $meta: "textScore" },content:0,history:false})
                        .sort( { score: { $meta: "textScore" }})
                        .toArray()

                        // 这种方式要建立索引
                        // .find({$text:{$search:keywords}},
                    		  // { score: { $meta: "textScore" },content:0,history:false})
                        // .sort( { score: { $meta: "textScore" }})
                        // .toArray()
    this.body = {
        status:true,
        result:res
    }

}

// 搜索历史记录

module.exports = {
	search
}