import mFetch from '../ajax.js'
// 新建文章
export const add = function(title,floder_uid){
    let timemap = (new Date()).getTime()
    let data={
        title,
        floder_uid,
        timemap
    }
    return mFetch('/article/add'
            ,data
            )
}
// 搜索文章
export const search = function(keywords){
    let data={
        keywords
    }
    return mFetch('/search'
            ,data
            )
}
// 更新文章
export const update = function(content,title,selfuid,floder_uid){
    let timemap = (new Date()).getTime()
    let data={
        content,
        title,
        selfuid,
        floder_uid,
        timemap
    }
    return mFetch('/article/update'
            ,data
            )
}
// 查询文章
export const content = function(selfuid){
    
    let data={
        selfuid
    }
    return mFetch('/article/content'
            ,data
            ).then(function(obj){
                if(!obj){
                    return obj
                }
                if(obj.result!=undefined && obj.result.content === undefined){
                    obj.result.content = ""
                }
                return obj
            })
}
// 列表
export const list = function(floder_uid){
    
    let data={
        floder_uid
    }
    return mFetch('/article/list',data)
}
// 列表
// 使用delete无法通过编译
export const remove = function(selfuid){
    
    let data={
        selfuid
    }
    return mFetch('/article/remove',data)
}