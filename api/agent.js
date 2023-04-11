
// 分销 模块  ---------------------------S
import request from "@/utils/request.js";

/**
 * 等级列表
 * 
 */
export function login(data) {
	return request.get('/sendCaptcha',data,{'noLogin':true});
}
