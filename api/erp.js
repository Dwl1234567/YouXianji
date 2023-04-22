// 分销 模块  ---------------------------S
import request from "@/utils/request.js";

/**
 * 回收列表获取
 * 
 */
export function selectRecycleOrderList(data) {
	return request.get('/yxj/app/recycle/empSelectRecycleOrderList',data,{'noLogin':true});
}

/**
 * 员工抢单
 * 
 */
export function empRobRecycleOrder(data) {
	return request.get('/yxj/app/recycle/empRobRecycleOrder/' + data,{'noLogin':true});
}

/**
 * 回收列表详情
 * 
 */
export function empSelectRecycleOrderDetail(data) {
	return request.get('/yxj/app/recycle/empSelectRecycleOrderDetail/' + data,{'noLogin':true});
}
