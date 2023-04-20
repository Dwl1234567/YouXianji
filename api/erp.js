// 分销 模块  ---------------------------S
import request from "@/utils/request.js";

/**
 * 回收列表获取
 * 
 */
export function selectRecycleOrderList(data) {
	return request.get('/yxj/app/recycle/selectRecycleOrderList',data,{'noLogin':true});
}
