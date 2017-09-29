import mFetch from '../ajax.js'
import md5 from 'md5'
import {saveUsername} from '../base.js'
import * as BASE from '../base.js'
export const login = function(username,password){
    
    let data = {
        username,
        password:md5(password),
        device:'html5'
    }
    return mFetch('/login',data)
        .then(function(res){
            saveUsername(username)
            BASE.saveToken(res.token)
            return res
        })
}
// 注册
export const regiest = function(username,password){
    let data = {
        username,
        password:md5(password)
    }
    return mFetch('/regiest',
        data)
}
// 测试登录状态
export const login_status_check = function(token){
    
    return mFetch('/login_status_check',{token})
}