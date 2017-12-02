<template>
	<div id="login">
	    <div class="input">
	    	<input id="username" v-model="username" type="text" placeholder="账号">
	    </div>
	    <div>
	    	<input id="password" v-model="password" type="password" placeholder="密码">
	    </div>
	    <a class="btn_" href="#" @click.prevent="login()" >登录</a>
	    <a class="btn_" href="#" @click.prevent="regiest()" >注册</a>
	</div>
</template>

<script>

import * as API from '../service/fontend/index.js'
import * as BASE from '../service/fontend/base.js'
import co from 'co'

export default {
  name: 'hello',
  data () {
    return {
      username: '',
      password:''
    }
  },
    methods:{
        login:function(){

            var self = this
            API.LOGIN.login(this.username,this.password)
            .then(function(res){
                console.log('logon success',res)
                self.$root.username = BASE.getUsername()
                self.$router.push('ProjectList')
            }).catch(function(err){
                console.log('login fail',err)
                alert(err.msg)
            })
        },
        regiest:function(){
            var self = this
            co(function*(){
                let regiest_res = yield API.LOGIN.regiest(self.username,self.password)
                if(confirm('注册成功，立即登录')){
                    var login = yield API.LOGIN.login(self.username,self.password)
                    self.$router.push('ProjectList')
                }

                

            }).catch(function(err){
                console.log('regiest fail',err)
                alert(err.msg)
            })
            
        }
    },
}
</script>
<style scoped>

	
#login {
    background-color: #36474f;
    height: 100%;
    color: #fff;
    font-size: 28px;
    padding-top: 70px;
    text-align: center
}

#login input {
    font-size: 28px;
    padding: 10px;
    border-radius: 10px;
    border: 0;
    margin-bottom: 10px;
    width: 80%
}

#login a {
    color: #fff
}

a.btn_ {
    display: block;
    margin-bottom: 20px;
    margin-top: 10px
}
</style>

