//erp相关接口
import request from "@/utils/request.js";

/**
 * 用户中心ERP入口图标的显示和隐藏
 * 
 */
export function erpuserislogin() {
	return request.get('/erp/user/islogin',{},{'noLogin':true});
}

/**
 * 获取用户在erp角色权限和用户信息
 * 
 */
export function erpUserAuth(data) {
	return request.post('/erp/user/auth',data,{'noLogin':true});
}

/**
 * 获取单个商品信息
 * 
 */
export function erpProductGetdata(data) {
	return request.get('/erp/product/getdata',data,{'noLogin':true});
}

/**
 * 获取单个调拨商品信息
 * 
 */
export function erpProductGetAllotdata(data) {
	return request.get('/erp/product/getallotdata',data,{'noLogin':true});
}
/**
 * 获取新设采购单个商品信息
 * 
 */
export function erpProductGetNewdata(data) {
	return request.get('/erp/product/getnewdata',data,{'noLogin':true});
}


/**
 * 采购单列表 
 * 
 */
export function erppurchasegetlist(data) {
	return request.get('/erp/purchase/getlist',data,{'noLogin':true});
}

/**
 * 查询单个采购单的货品列表
 * 
 */
export function erppurchasegetdata(data) {
	return request.get('/erp/purchase/getdata',data,{'noLogin':true});
}

/**
 * 查询采购单的单个货品详情
 * 
 */
export function erppurchaseproductdata(data) {
	return request.get('/erp/purchase/getproductdata',data,{'noLogin':true});
}

/**
 * 销售单列表
 * 
 */
export function erpsellGetlist(data) {
	return request.get('/erp/sell/getlist',data,{'noLogin':true});
}
/**
 * 查询销售单的单个货品详情
 * 
 */
export function erpsellproductdata(data) {
	return request.get('/erp/sell/getproductdata',data,{'noLogin':true});
}
/**
 * 盘点单列表
 * 
 */
export function erpcheckgetlist(data) {
	return request.get('/erp/check/getlist',data,{'noLogin':true});
}

/**
 * 查询单个盘点单的货品列表
 * 
 */
export function erpcheckgetdata(data) {
	return request.get('/erp/check/getdata',data,{'noLogin':true});
}

/**
 * 单个盘点产品修改
 * 
 */
export function geteditproduct(data) {
	return request.get('/erp/check/geteditproduct',data,{'noLogin':true});
}

/**
 * 单个盘点产品详情
 * 
 */
export function getcheckproductinfo(data) {
	return request.get('/erp/check/getcheckproductinfo',data,{'noLogin':true});
}

/**
 * 查找商品列表
 * 
 */
export function erpproductgetlist(data) {
	return request.get('/erp/product/getlist',data,{'noLogin':true});
}
/**
 * 查找调拨商品列表
 * 
 */
export function erpproductgetallotlist(data) {
	return request.get('/erp/product/getallotlist',data,{'noLogin':true});
}
/**
 * 查找客户列表
 * 
 */
export function erpclientgetlist(data) {
	return request.get('/erp/client/getlist',data,{'noLogin':true});
}
/**
 * 我的客户列表
 * 
 */
export function erpclientmylist(data) {
	return request.post('/erp/client/mylist',data,{'noLogin':true});
}
/**
 * 录入客户
 * 
 */
export function erpclientadd(data) {
	return request.post('/erp/client/add',data,{'noLogin':true});
}

/**
 * 查询单个销售单的货品列表
 * 
 */
export function erpSellGetdata(data) {
	return request.get('/erp/sell/getdata',data,{'noLogin':true});
}

/**
 * 查找供应商列表
 * 
 */
export function erpsuppliergetlist(data) {
	return request.get('/erp/supplier/getlist',data,{'noLogin':true});
}

/**
 * 查找商品筛选
 * 
 */
export function erpProductGetBasicData(data) {
	return request.get('/erp/product/get_basic_data',data,{'noLogin':true});
}

/**
 * 销售开单 选择自己门店SN商品
 * 
 */
export function erpSellAddStoreProductlist(data) {
	return request.get('/erp/product/getsellproductlist',data,{'noLogin':true});
}

/**
 * 新设采购 选择新品
 * 
 */
export function getErpNewProductlist(data) {
	return request.get('/erp/product/getnewproductlist',data,{'noLogin':true});
}

/**
 * 录入供应商
 * 
 */
export function erpsupplieradd(data) {
	return request.post('/erp/supplier/add',data,{'noLogin':true});
}
/**
 * 财务收付款列表
 * 
 */
export function erpfinancewastebook(data) {
	return request.get('/erp/finance/wastebook',data,{'noLogin':true});
}
/**
 * 财务付款确定
 * 
 */
export function erpfinancefukuan(data) {
	return request.post('/erp/finance/queryfukuan',data,{'noLogin':true});
}

/**
 * 我的商品列表
 * 
 */
export function erpUserMyproduct(data) {
	return request.get('/erp/user/myproduct',data,{'noLogin':true});
}

/**
 * 门店的商品列表
 * 
 */
export function erpProductStorelist(data) {
	return request.get('/erp/product/storelist',data,{'noLogin':true});
}

/**
 * 财务处理待付款
 * 
 */
export function erpFinanceAddpurchase(data) {
	return request.post('/erp/finance/addpurchase',data,{'noLogin':true});
}

/**
 * 我的业绩列表
 * 
 */
export function erpUserSales(data) {
	return request.get('/erp/user/sales',data,{'noLogin':true});
}

/**
 * 首页个人销售、回收数据-
 * 
 */
export function getAccountData(data) {
	return request.get('/erp/user/get_account_data',data,{'noLogin':true});
}

/**
 * 数据汇总列表
 * 本店 个人共用
 */
export function getDatalist(data) {
	return request.get('/erp/store/datalist',data,{'noLogin':true});
}
/**
 * 店长调拨列表
 * 
 */
export function transferlist(data) {
	return request.get('/erp/sell/transferlist',data,{'noLogin':true});
}

/**
 * 仓库及分仓列表
 * 
 */
export function warehousegetList(data) {
	return request.get('/erp/warehouse/get_list',data,{'noLogin':true});
}
/**
 * 盘点开单
 * 
 */
export function erpCheckAdd(data) {
	return request.get('/erp/check/add',data,{'noLogin':true});
}

/**
 * 打印接口
 * 
 */
export function erpDayin(data) {
	return request.post('/erp/dayin',data,{'noLogin':true});
}

/**
 * 店长处理单个商品的调拨
 * 
 */
export function updatesingletransfer(data) {
	return request.post('/erp/sell/updatesingletransfer',data,{'noLogin':true});
}

/**
 * 销售开单
 * 
 */
export function selladd(data) {
	return request.post('/erp/sell/add',data,{'noLogin':true});
}

/**
 * 待办事项数据
 * 
 */
export function erpuserbacklog(data) {
	return request.post('/erp/user/backlog',data,{'noLogin':true});
}

/**
 * 店长修改商品信息
 * 
 */
export function erpusereditproductmoney(data) {
	return request.post('/erp/user/edit_product_money',data,{'noLogin':true});
}

/**
 * 查找回收方列表
 * 
 */
export function erpthirdgetlist(data) {
	return request.get('/erp/third/getlist',data,{'noLogin':true});
}

/**
 * 录入回收方
 * 
 */
export function erpthirdadd(data) {
	return request.post('/erp/third/add',data,{'noLogin':true});
}

/**
 * 质检员待验机列表
 * 
 */
export function erppurchasequalitylist(data) {
	return request.get('/erp/purchase/qualitylist',data,{'noLogin':true});
}

/**
 * 质检员处理单个机器状态
 * 
 */
export function erppurchasequalityedit(data) {
	return request.post('/erp/purchase/qualityedit',data,{'noLogin':true});
}

/**
 * 采购开单-第一步创建属性
 * 
 */
export function erppurchaseclickattradd(data) {
	return request.post('/erp/purchase/clickattradd',data,{'noLogin':true});
}


/**
 * 采购开单-查询回收属性及商品信息
 * 
 */
export function erppurchaseclickattrview(data) {
	return request.post('/erp/purchase/clickattrview',data,{'noLogin':true});
}
/**
 * 采购开单-查询回收商品信息
 * 
 */
export function erppurchaseclickattrview1(data) {
	return request.post('/erp/purchase/clickattrview1',data,{'noLogin':true});
}

/**
 * 采购开单-获取回收商品标题和模型
 * 
 */
export function erppurchasegetrecycleinfo(data) {
	return request.get('/erp/product/getrecycleinfo',data,{'noLogin':true});
}

/**
 * 采购开单-第二步提交回收产品
 * 
 */
export function erpclickattredit(data) {
	return request.post('/erp/purchase/clickattredit',data,{'noLogin':true});
}

/**
 * 采购开单-采购开单
 * 
 */
export function erppurchaseadd(data) {
	return request.post('/erp/purchase/add',data,{'noLogin':true});
}

/**
 * 用户工资数
 * 
 */
export function erpusersalary(data) {
	return request.post('/erp/user/salary',data,{'noLogin':true});
}



/**
 * 回收调价商品列表查询
 * 
 */
export function erprecycletaskattrlist(data) {
	return request.post('/erp/recycle/taskattrlist',data,{'noLogin':true});
}


/**
 * 回收属性调价信息查询
 * 
 */
export function erprecycletaskattrview(data) {
	return request.post('/erp/recycle/taskattrview',data,{'noLogin':true});
}

/**
 * 回收属性调价提交
 * 
 */
export function erprecycletaskattredit(data) {
	return request.post('/erp/recycle/taskattredit',data,{'noLogin':true});
}

/**
 * 回收属性调价提交
 * 
 */
export function erprecycleattrpricelist(data) {
	return request.post('/erp/recycle/attrpricelist',data,{'noLogin':true});
}

/**
 * 店长待调价列表
 * 
 */
export function erpUserTaskProduct(data) {
	return request.get('/erp/user/task_product',data,{'noLogin':true});
}

/**
 * 店长处理调价
 * 
 */
export function erprecycleattrpriceaction(data) {
	return request.post('/erp/recycle/attrpriceaction',data,{'noLogin':true});
}

/**
 * 本店聊天记录列表
 * 
 */
export function erpchatlist(data) {
	return request.post('/erp/chat/list',data,{'noLogin':true});
}

/**
 * 聊天记录详情
 * 
 */
export function erpchatview(data) {
	return request.post('/erp/chat/view',data,{'noLogin':true});
}

/**
 * 商城订单列表
 * 
 */
export function erporderlist(data) {
	return request.post('/erp/order/list',data,{'noLogin':true});
}

/**
 * 商城订单发货
 * 
 */
export function erporderdelivery(data) {
	return request.post('/erp/order/delivery',data,{'noLogin':true});
}

/**
 * 同城待上门列表
 */
export function getsamecitylocallist(data) {
	return request.get('/erp/local/getlist',data,{'noLogin':true});
}

/**
 * 同城待上门 接单
 */
export function updatetakerinfo(data) {
	return request.get('/erp/local/updatetakerinfo',data,{'noLogin':true});
}

/**
 * 我的 同城上门列表
 */
export function getusertakerlist(data) {
	return request.get('/erp/local/getusertakerlist',data,{'noLogin':true});
}
/**
 *取消 我的 同城上门订单
 */
export function undotakerrecycleorder(data) {
	return request.post('/erp/local/undotakerrecycleorder',data,{'noLogin':true});
}
/**
 * 工作人员 处理自己上门收机的打款信息
 * takerupdatepaymoneydata
 */
export function takerupdatepaymoneydata(data) {
	return request.post('/erp/local/takermoneyinfo',data,{'noLogin':true});
}
/**
 * 退款记录列表
 */
export function getrefundlist(data) {
	return request.get('/erp/refund/getlist',data,{'noLogin':true});
}
/**
 * 退款记录添加
 */
export function takerrefunddata(data) {
	return request.post('/erp/refund/adddata',data,{'noLogin':true});
}
/**
 * 串码追踪
 */
export function getsndata(data) {
	return request.get('/erp/sn/getdata',data,{'noLogin':true});
}

/**
 * 门店数据统计 - 获取基础筛选数据
 * 
 */
export function erpStatisticGetData(data) {
	return request.get('/erp/statistic/get_data',data,{'noLogin':true});
}

/**
 * 门店数据统计 - 获取销售或回收汇总
 * 
 */
export function erpStatisticGetTotalData(data) {
	return request.get('/erp/statistic/gettotaldata',data,{'noLogin':true});
}

/**
 * 销售汇总
 * 销售统计列表
 */
export function getSalesList0(data) {
	return request.get('/erp/statistic/getsaleslist0',data,{'noLogin':true});
}
/**
 * 销售汇总
 * 销售员汇总列表
 */
export function getSalesList1(data) {
	return request.get('/erp/statistic/getsaleslist1',data,{'noLogin':true});
}
/**
 * 销售汇总
 * 按客户汇总列表
 */
export function getSalesList2(data) {
	return request.get('/erp/statistic/getsaleslist2',data,{'noLogin':true});
}
/**
 * 销售汇总
 * 按机型汇总列表
 */
export function getSalesList3(data) {
	return request.get('/erp/statistic/getsaleslist3',data,{'noLogin':true});
}
/**
 * 回收汇总
 * 回收统计汇总列表
 */
export function getRecycleList0(data) {
	return request.get('/erp/statistic/getrecyclelist0',data,{'noLogin':true});
}
/**
 * 回收汇总
 * 按回收人汇总列表
 */
export function getRecycleList1(data) {
	return request.get('/erp/statistic/getrecyclelist1',data,{'noLogin':true});
}
/**
 * 回收汇总
 * 按客户汇总列表
 */
export function getRecycleList2(data) {
	return request.get('/erp/statistic/getrecyclelist2',data,{'noLogin':true});
}
/**
 * 回收汇总
 * 按机型汇总列表
 */
export function getRecycleList3(data) {
	return request.get('/erp/statistic/getrecyclelist3',data,{'noLogin':true});
}
/**
 * 审上架列表
 */
export function getShangjiaList(data) {
	return request.get('/erp/product/shangjia',data,{'noLogin':true});
}

/**
 * 审上架列表 审核
 */
export function erpShangjiaCheck(data) {
	return request.post('/erp/product/shangjiacheck',data,{'noLogin':true});
}