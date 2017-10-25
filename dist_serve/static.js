var koa = require('koa')
var app = new koa();
var serve = require('koa-static');
// app.use(async function(ctx,next){
//     await serve(__dirname+'./../dist',{maxage:3153600000})
// })
app.use(serve(__dirname+'./../dist',{maxage:3153600000}))
app.listen(8300);

console.log('listening on port 8300');