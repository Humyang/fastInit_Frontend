var GDMP = require('../../../src/vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
console.log(GDMP)
// import GDMP from '../../../src/vendors/google-diff-match-patch-js/diff_match_patch.js'
// 编辑器增量更新
// 使用方式
/*
import EVA from '../../serve/fontend/Obj/EditorValueAdvance.js'
this.EVA = new EVA()
self.EVA.reset() // 重置对比值

self.EVA.value = 11 //设置值
self.EVA.value = 22 //再次设置值，这时与之前的值开始进行比较

var cc = self.EVA.value //获取值

self.EVA.patch_list //获取差异值
`
*/
function EditorValueAdvance(){
	let old_value = ""
	let value = ""
	let patch_list = undefined

	let dmp = new GDMP.diff_match_patch()
	Object.defineProperty(this, 'value', {
		get:function(){
			return value
		},
	    set: function(text) {
			old_value = value
			value = text
	    }
	})
	Object.defineProperty(this, 'reset', {
		value:function(){
			old_value = ""
			value = ""
			patch_list = undefined
		}
	})
	Object.defineProperty(this, 'patch_list', {
		get: function(){
			let diffs = dmp.diff_main(old_value, value, true)
			let result = dmp.patch_make(old_value, value, diffs)
			return result
		}
	})
}
export default EditorValueAdvance
