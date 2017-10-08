
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
import * as BASE from './base.js'
var CODE = require('../PREDEFINED/CONSTANT.js').CODE
var CONFIG = require('../PREDEFINED/APP_CONFIG.js')
import {
    IP,
    HTTP_FAIL
} from '../PREDEFINED/CONSTANT.js'


// 业务逻辑错误处理

// 对返回报文进行预处理
// 返回 false 表示发生业务逻辑问题
// 返回 true 表示未发生业务逻辑问题，继续执行
const preProcessRsp = function(store,reslove,reject) {
    if (!store.status) {
        reject(store)
        return false
    }
    return true;
};

const mFetch = function(options) {
    let opt = Object.assign({
        data:{},
        path:'',
        token:'',
        IP:IP,
        PORT:CONFIG.servePort
    },options)
    return new Promise(function(reslove,reject){

        // path,data,token
        let comb_data = {}
        if(opt.data===undefined){
            opt.data = {}
        }else{
            comb_data = opt.data
            if(opt.data.token === undefined){
                comb_data = Object.assign(opt.data,{token:BASE.getToken()})
            }
        }
        let root = this
        fetch(opt.IP+':'+opt.PORT+opt.path,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comb_data)
        })
        .then(function(response) {
            // HTTP 错误处理
            if (response.status != 200) {
                // throw new Error("Bad response from server: status",response.status);
                reject("Bad response from server: status",response.status)
            }
            return response.json();
        })
        .then(function(res) {
            if(preProcessRsp(res,reslove,reject)){
                reslove(res)
            }else{
                reject(res.msg)
            }
        })
        .catch(function(ex){
            reject({
                MSG:ex.message
            })
        });
    })   
};
export default mFetch