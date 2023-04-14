

import request from "@/utils/request.js";

/**
 * 获取地区信息
 * 
 */
export function getProvinceList() {
	return request.get('/yxj/app/common/getProvinceList',{'noLogin':true});
}

/**
 * 获取下级地区信息
 * 
 */
export function getAreaByPid(data) {
	return request.get('/yxj/app/common/getAreaByPid/' + data,{'noLogin':true});
}

/**
 * 保存地址
 * 
 */
export function saveUserAddress(data) {
	return request.post('/yxj/app/user/saveUserAddress' , data,{'noLogin':true});
}

/**
 * 查询所有地址
 * 
 */
export function selectUserAddressList(data) {
	return request.get('/yxj/app/user/selectUserAddressList' ,{'noLogin':true});
}

/**
 * 删除地址
 * 
 */
export function deleteUserAddress(data) {
	return request.get('/yxj/app/user/deleteUserAddress/' + data ,{'noLogin':true});
}

/**
 * 根据位置获取门店
 * 
 */
export function getNearestStoreList(data) {
	return request.get('/yxj/app/common/getNearestStoreList' , data ,{'noLogin':true});
}