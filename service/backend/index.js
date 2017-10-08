var koa = require('koa')
var koaRouter = require('koa-router')
var body = require('koa-better-body')
// var koaBody = require('koa-body')
var mongo = require('koa-mongo')
var uid = require('uid2')
var cors = require('koa-cors')
// var serve = require('koa-static');


var OAUTCH_CLIENT = require('../../../oauth_client/lib/index.js')

var LOGIN = require('flogin')

const app = new koa();
const router = new koaRouter();

var mongo = require('koa-mongo')



// var CONSTANT = require('../PREDEFINED/CONSTANT.js')
var objectAssign = require('object-assign')

var CONFIG = require('../PREDEFINED/APP_CONFIG.js')

// var LOGIN = require('flogin')
// var ARTICLE = require('./module/article.js')
// var FLODER = require('./module/floder.js')
// var UPLOAD = require('./module/upload.js')
// var USERCONFIG = require('./module/userConfig.js')
// var SEARCH = require('./module/search.js')

var serve = require('koa-static');

var root_path = process.cwd()
app.use(serve(root_path+"/upload",{maxage:3153600000}))


app.use(cors())

router.post('/oauth_login',OAUTCH_CLIENT.oauth_client())

// // 搜索
// router.post('/search',LOGIN.login_check(),SEARCH.search)

// // 添加文章
// router.post('/article/add',LOGIN.login_check(),FLODER.Mfloder_list_modify(),ARTICLE.add)
// router.post('/article/list',LOGIN.login_check(),ARTICLE.list)
// router.post('/article/update',LOGIN.login_check(),FLODER.Mfloder_list_modify(),ARTICLE.update)
// router.post('/article/content',LOGIN.login_check(),ARTICLE.content)
// router.post('/article/remove',LOGIN.login_check(),ARTICLE.remove)



// // 添加目录
// router.post('/floder/add',LOGIN.login_check(),FLODER.add)
// router.post('/floder/list',LOGIN.login_check(),FLODER.list)
// router.post('/floder/remove',LOGIN.login_check(),FLODER.remove)
// // router.post('/floder/sorttype',LOGIN.login_check(),FLODER.sorttype)

// // 登陆注册
// router.all('/username/valid/:username',LOGIN.username_repeat)
// router.post('/regiest',/*LOGIN.verify_code(),*/LOGIN.regiest)
// router.post('/login',/*LOGIN.verify_code(),*/LOGIN.login)
// router.post('/login_status_check',LOGIN.login_check(),function *(next){
//     this.body = {
//         status:true,
//         msg:'在线'
//     }
// })

    
// // 个人配置
// router.post('/config/getAll',LOGIN.login_check(),USERCONFIG.getAll)
// router.post('/config/floder_sort_type_update',LOGIN.login_check(),USERCONFIG.floderSortTypeUpdate)

// // 上传
// router.options('/upload', function*(next){
//   this.body=true
// })
// router.post('/upload', LOGIN.login_check(), UPLOAD.upload)

// 项目
var Project = require('./module/project.js')
router.get('/project/tree',async function(ctx,next){
    ctx.request.fields = {token:ctx.URL.searchParams.get('token')}
    await next()
},
OAUTCH_CLIENT.oauth_login_check()
,Project.loadTree)
router.post('/project/create',OAUTCH_CLIENT.oauth_login_check(),Project.create)

app.use(mongo())
app.use(body({textLimit:'10000kb',formLimit:'10000kb',jsonLimit:'10000kb'}))
app.use(async function (ctx,next){
    try{
        await next()
    }catch (err) {
        try{
            // 业务逻辑错误
            ctx.body = objectAssign({status:false},JSON.parse(err.message));
        }catch(err2){
            // console.log(this)
            ctx.body = {
                status:false,
                msg:err.message,
                path:ctx.request.url
            }
        }
        console.log(err)
    }
})
app.use(router.routes()).use(router.allowedMethods());


app.listen(CONFIG.servePort)

console.log("listen serve on port ",CONFIG.servePort)