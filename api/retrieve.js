
// 分销 模块  ---------------------------S
import request from "@/utils/request.js";

/**
 * 获取所有分类
 * 
 */
export function getAllClassification(data) {
	return request.get('/yxj/app/common/getAllClassification' , data ,{'noLogin':true});
}

/**
 * 获取分类品牌
 * 
 */
export function getSeries(data) {
	return request.get('/yxj/app/common/getModel/'+ data ,{'noLogin':true});
}

/**
 * 获取机型价格模版
 * 
 */
export function getPriceTemplateByModel(data) {
	return request.get('/yxj/app/common/getPriceTemplateByModel/'+ data ,{'noLogin':true});
}

/**
 * 提交回收订单
 * 
 */
export function createRecycleOrder(data) {
	return request.post('/yxj/app/recycle/createRecycleOrder', data ,{'noLogin':true});
}

/**
 * 获取门店收货地址
 * 
 */
export function selectStoreAddress(data) {
	return request.get('/yxj/app/common/selectStoreAddress/' + data ,{'noLogin':true});
}

/**
 * 获取门店收货地址
 * 
 */
export function empCreateReceipt(data) {
	return request.post('/yxj/app/recycle/empCreateReceipt' , data ,{'noLogin':true});
}