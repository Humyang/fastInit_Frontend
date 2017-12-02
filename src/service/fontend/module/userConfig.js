import mFetch from '../ajax.js'

export const floder_sort_type = function(type){
    let data = {
        type
    }
    return mFetch('/config/floder_sort_type_update',data)
}
export const getAll = function(){
    return mFetch('/config/getAll',{})
}