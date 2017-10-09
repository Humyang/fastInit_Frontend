<template>
	<div class="ProjectList">
        <div class="nav_bar">
            <a @click.prevent="createShow=true" class="btn btn_ok" href="">新建项目</a>
            <div class="projectProperty" v-show="createShow">
                <input type="text" name="" placeholder="项目名称" v-model="project_name">
                <div class="btn_wrap">
                    <a @click.prevent="createProject" class="btn btn_ok" href="">确定</a>
                    <a @click.prevent="createShow=false" class="btn btn_cancel" href="">取消</a>
                </div>
            </div>
        </div>
        <div >
            <h3>项目列表</h3>
            <div class="cell" v-for="(item,index) in list"
                @click="jumpProject(item.id)">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>

import * as API from '../../service/fontend/index.js'
import * as BASE from '../../service/fontend/base.js'
import co from 'co'
import '../css/ProjectList.css'

export default {
  name: 'hello',
  data () {
    return {
        createShow:false,
        project_name:'',
      list:[{
        name:"fastInit",
        id:1
      },{
        name:"fastInit2",
        id:2
      }]
    }
  },
    methods:{
        jumpProject:function(id){
            // this.$router.push('EditProject',)
            this.$router.push('/EditProject?id='+id)
        },
        createProject:function(){
            let self = this
            // 获取参数
            let project_name = this.project_name

            API.PROJECT.create(project_name)
            .then(function(res){
                self.project_name = ''
                // 刷新项目列表
                console.log('创建项目成功')
            })
            .catch(function(err){
                alert('创建项目失败')
            })
            // 调用接口
            this.createShow = false
        }
    },
}
</script>


