import mFetch from '../ajax.js'
import md5 from 'md5'
import {saveUsername} from '../base.js'
import * as BASE from '../base.js'
import co from 'co'
export const login = function(username,password){
    
    let data = {
        username,
        password:md5(password),
        device:'html5'
    }
    return co(function*(){
        let obj = yield mFetch({ path:'/login',
                  data: { username: username, password: md5(password) },
                PORT:3000
                })
        let res = yield mFetch({ path:'/oauth_login',data: { 'token': obj.token }})
            
        saveUsername(username)
        BASE.saveToken(res.token)
        
        return res   
    })
    
        // .then(function(obj) {
        //     // 传递tokenA给后台验证
        //     mFetch({ path:'/oauth_login',data: { 'token': obj.token }})
        //     .then(function(res) {
        //         saveUsername(username)
        //         BASE.saveToken(res.token)
        //     })

        // })
}
// 注册
export const regiest = function(username,password){
    let data = {
        username,
        password:md5(password)
    }
    return mFetch({ path:'/regiest',
                    data: { username: username, password: md5(password) },
                    PORT:3000
                })

}
// 测试登录状态
export const login_status_check = function(token){
    
    return mFetch({path:'/regiest',data:{token}})
}