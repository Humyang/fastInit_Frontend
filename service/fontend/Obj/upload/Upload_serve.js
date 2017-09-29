

var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var serve = require('koa-static');

var fs = require('fs');
var moveFile = function(oldPath,newPath) {
  return function(fn) {
    fs.rename(oldPath, newPath,fn)
  }
}
router.options('/upload', function*(next){
  this.body=true
})
router.post('/upload', body(), function * (next) {

    var file = this.request.files[0]
    // console.log(file)
    var obj = yield moveFile(file.path, './temp/'+file.name)

    this.body = {
      status:1,
      img_url:"http://localhost:3000/temp/"+file.name,
      size:file.size
    }
    console.log(this.body)
    
})
router.get('/', body(), function * (next) {

    this.body = {
      status:1
    }
})
app.use(cors())
app.use(serve('.'));
app.use(router.routes())

app.listen(3000)

var format = require('util').format
var host = 'http://localhost:4292'
var cmd = 'curl -i %s/upload -F "source=@%s/.editorconfig"'

console.log('start serve on localhost:3000')

// console.log('Try it out with below CURL for `koa-better-body` repository.')
// console.log(format(cmd, host, __dirname))