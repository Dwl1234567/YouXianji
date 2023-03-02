
// 分销 模块  ---------------------------S
import request from "@/utils/request.js";

/**
 * 等级列表
 * 
 */
export function agentUserLevellist(data) {
	return request.get('/agent/user/levellist',data,{'noLogin':true});
}
/**
 * 我的等级记录
 * 
 */
export function agentUserMylevellog(data) {
	return request.get('/agent/user/mylevellog',data,{'noLogin':true});
}
/**
 * 等级任务列表
 * 
 */
export function agentUserLeveltask(data) {
	return request.get('/agent/user/leveltask',data,{'noLogin':true});
}
/**
 * 我的等级任务记录
 * 
 */
export function agentUsermyLevelTask(data) {
	return request.get('/agent/user/my_level_task',data,{'noLogin':true});
}
/**
 * 用户申请提现
 * 
 */
export function agentUserApplymoney(data) {
	return request.post('/agent/user/applymoney',data,{'noLogin':true});
}
/**
 * 用户提现列表
 * 
 */
export function agentUserCashlist(data) {
	return request.get('/agent/user/cashlist',data,{'noLogin':true});
}

/**
 * 用户可提现余额
 */
export function agentIndexMyCash(data) {
	return request.post('/agent/index/mycash',data,{'noLogin':true});
}

/**
 * 我的分销数据概况
 * 
 */
export function agentIndex(data) {
	return request.post('/agent/index',data,{'noLogin':true});
}
/**
 * 下级直推成员列表
 * 
 */
export function agentuserteamuser(data) {
	return request.post('/agent/user/teamuser',data,{'noLogin':true});
}
/**
 * 佣金明细列表
 * 
 */
export function agentuserfeelist(data) {
	return request.post('/agent/user/feelist',data,{'noLogin':true});
}


/**
 * 我等级任务完成情况
 * 
 */
export function agentusermyleveltaskyes(data) {
	return request.get('/agent/user/my_leveltask_yes',data,{'noLogin':true});
}

/**
 * 购买提升用户等级-付款
 * 
 */
export function agentuserlevelgopay(data) {
	return request.post('/agent/user/level_gopay',data,{'noLogin':true});
}

/**
 * 购买提升用户等级-添加到订单表
 * 
 */
export function agentuserleveladdorder(data) {
	return request.post('/agent/user/level_add_order',data,{'noLogin':true});
}

/**
 * 等级详情
 * 
 */
export function agentuserlevelview(data) {
	return request.get('/agent/user/levelview',data,{'noLogin':true});
}

/**
 * 分销排行榜
 * 
 */
export function agentuserranking(data) {
	return request.get('/agent/user/ranking',data,{'noLogin':true});
}



// 分销 模块  ---------------------------E