import mFetch from '../ajax.js'



// 读取节点所有节点
    // 添加节点
    // 移动节点
    // 重命名节点
    // 选中节点-加载代码
    // 保存节点代码（advnce历史记录）

export const create = function(project_name){
	let data={
    	project_name
    }
    return mFetch({path:'/module/create',data})
}
export const update = function(patch_list){
	let data={
    	patch_list
    }
	return mFetch({path:'/module/update',data})
}
// export const list = function(){
// 	return mFetch({path:'/module/list'})
// }


