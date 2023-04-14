
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