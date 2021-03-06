import mFetch from '../ajax.js'
// 模块
	// 读取节点所有节点
	// 添加节点
	// 移动节点
	// 重命名节点

	// 选中节点-加载模块
var module = {
	loadNode:function(projectId){

	},
	addMoveRenameNode:function(type,nodeId,param){

	},
	selectNode:function(nodeId){

	}
}


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
    return mFetch({path:'/project/create',data})
}
export const update = function(project_id,patch_list){
	let data={
    	patch_list,
    	project_id
    }
	return mFetch({path:'/project/update',data})
}
export const list = function(){
	return mFetch({path:'/project/list'})
}


export const loadNodeData = function(selectedNodeId,projectId){
	console.log('loadNodeData')
	let data = {
        selectedNodeId,
        projectId
    }
    return mFetch({path:'/project/loadNodeData',data}).then(function(res){
    	
        return Object.assign({},res,{selectedNodeId})
    })
	// return new Promise(function(reslove,reject){
	// 	setTimeout(function() {
	// 		reslove({value:Math.random().toString()})
	// 	}, 500);
	// })

}
export const saveNodeData = function(obj){
	console.log('saveNodeData')

	let data={
		projectId:obj.projectId,
    	selectedNodeId:obj.selectedNodeId,
    	patch_list:obj.patch_list
    }

   	return mFetch({path:'/project/saveNodeData',data})

	// return new Promise(function(reslove,reject){
	// 	setTimeout(function() {
	// 		reslove('node Data')
	// 	}, 500);
	// })
}

