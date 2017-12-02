var koa = require('koa')
var koaRouter = require('koa-router')
var body = require('koa-better-body')
// var koaBody = require('koa-body')
var mongo = require('koa-mongo')
var uid = require('uid2')
var cors = require('koa-cors')
// var serve = require('koa-static');


var OAUTCH_CLIENT = require('../../oauth_client/lib/index.js')

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

var bugfix = require('./module/bugfix.js')
// router.get('/bugfix',bugfix.fix1)

//
//
//                                    ___           ___
//                                    `MM           `MM
//                                     MM            MM
//     ___  __    __     _____     ____MM ___   ___  MM   ____
//     `MM 6MMb  6MMb   6MMMMMb   6MMMMMM `MM    MM  MM  6MMMMb
//      MM69 `MM69 `Mb 6M'   `Mb 6M'  `MM  MM    MM  MM 6M'  `Mb
//      MM'   MM'   MM MM     MM MM    MM  MM    MM  MM MM    MM
//      MM    MM    MM MM     MM MM    MM  MM    MM  MM MMMMMMMM
//      MM    MM    MM MM     MM MM    MM  MM    MM  MM MM
//      MM    MM    MM YM.   ,M9 YM.  ,MM  YM.   MM  MM YM    d9
//     _MM_  _MM_  _MM_ YMMMMM9   YMMMMMM_  YMMM9MM__MM_ YMMMM9
//
//
//

var ModuleList = require('./module/moduleList.js')
router.post('/module/saveNodeData',OAUTCH_CLIENT.oauth_login_check(),ModuleList.saveNodeData)
router.post('/module/loadNodeData',OAUTCH_CLIENT.oauth_login_check(),ModuleList.loadNodeData)
router.get('/findlost',async function(ctx,next){
    ctx.request.fields = {
        token:ctx.URL.searchParams.get('token')
    }
    await next()
},OAUTCH_CLIENT.oauth_login_check(),ModuleList.findlost)

var ModuleTree = require('./module/moduleTree.js')
router.post('/module/update',OAUTCH_CLIENT.oauth_login_check(),ModuleTree.update)
router.get('/module/tree',async function(ctx,next){
    ctx.request.fields = {
        token:ctx.URL.searchParams.get('token')
    }
    await next()
},
OAUTCH_CLIENT.oauth_login_check()
,ModuleTree.loadTree)


//
//
//     ________
//     `MMMMMMMb.                       68b
//      MM    `Mb                       Y89                     /
//      MM     MM ___  __   _____       ___   ____     ____    /M
//      MM     MM `MM 6MM  6MMMMMb      `MM  6MMMMb   6MMMMb. /MMMMM
//      MM    .M9  MM69 " 6M'   `Mb      MM 6M'  `Mb 6M'   Mb  MM
//      MMMMMMM9'  MM'    MM     MM      MM MM    MM MM    `'  MM
//      MM         MM     MM     MM      MM MMMMMMMM MM        MM
//      MM         MM     MM     MM      MM MM       MM        MM
//      MM         MM     YM.   ,M9      MM YM    d9 YM.   d9  YM.  ,
//     _MM_       _MM_     YMMMMM9       MM  YMMMM9   YMMMM9    YMMM9
//                                       MM
//                                   (8) M9
//                                    YMM9

var ProjectList = require('./module/projectList.js')
router.post('/project/loadNodeData',OAUTCH_CLIENT.oauth_login_check(),ProjectList.loadNodeData)
router.post('/project/saveNodeData',OAUTCH_CLIENT.oauth_login_check(),ProjectList.saveNodeData)
var Project = require('./module/project.js')
router.post('/project/update',OAUTCH_CLIENT.oauth_login_check(),Project.update)
router.post('/project/list',OAUTCH_CLIENT.oauth_login_check(),Project.list)
router.post('/project/create',OAUTCH_CLIENT.oauth_login_check(),Project.create)
router.get('/project/tree',async function(ctx,next){
    ctx.request.fields = {
        token:ctx.URL.searchParams.get('token'),
        project_id:ctx.URL.searchParams.get('project_id')
    }
    await next()
},
OAUTCH_CLIENT.oauth_login_check()
,Project.loadTree)


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