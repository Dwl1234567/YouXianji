
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabbar/home","pages/tabbar/stores","pages/tabbar/sell","pages/tabbar/cart","pages/tabbar/my","pages/tabbarerp/home","pages/tabbarerp/push","pages/tabbarerp/my","pages/home/search","pages/home/sort","pages/home/sort_list","pages/home/video","pages/home/video_detail","pages/common/login/login","pages/common/login/mallreg","pages/common/login/register","pages/stores/goods","pages/chat/index","pages/chat/chat","pages/news/details","pages/news/notice","pages/common/map","pages/goods/goods","pages/goods/goodsNew","pages/goods/coupon","pages/goods/special","pages/goods/my_cart","pages/goods/cart","pages/goods/settlement","pages/goods/pay","pages/goods/express","pages/goods/evaluate","pages/goods/refund","pages/status/pay_status","pages/goods/sales/kanyidao","pages/erp/customer/customer","pages/erp/customer/add","pages/erp/supplier/supplier","pages/erp/supplier/add","pages/erp/purchase/shangjia","pages/erp/purchase/list","pages/erp/purchase/product","pages/erp/purchase/add/select_diyattr","pages/erp/purchase/add/select_diyform","pages/erp/purchase/add/select_product","pages/erp/purchase/add/select_recycleinfo","pages/erp/purchase/add/select_recycleform","pages/erp/sell/list","pages/erp/sell/out","pages/erp/sell/outadd","pages/erp/sell/product","pages/erp/sell/add/select_product","pages/erp/shop/add","pages/erp/goods/list","pages/erp/allot/allot_push","pages/erp/sn/list","pages/erp/purchase/local","pages/erp/purchase/local_receipt","pages/erp/stores/kefurece","pages/erp/inventory/check/add","pages/erp/inventory/check/list","pages/erp/inventory/check/goods","pages/erp/inventory/check/status","pages/erp/stores/list","pages/erp/task/product_list","pages/erp/stores/transferlist","pages/erp/stores/sales","pages/erp/user/yeji","pages/erp/user/salary","pages/erp/user/recyclelist","pages/erp/user/selllist","pages/erp/finance/fukuan","pages/erp/finance/list","pages/erp/finance/spending/list","pages/erp/finance/income/list","pages/erp/task/quality","pages/erp/task/diandianUnpload","pages/erp/task/select_recycleform","pages/erp/warehouse/quality","pages/erp/warehouse/add","pages/erp/quality/list","pages/erp/quality/edit","pages/erp/third/list","pages/erp/third/add","pages/erp/stores/shenhe","pages/erp/user/attrlist","pages/erp/user/editAttrlist","pages/erp/purchase/tasklocal","pages/erp/recycleList/index","pages/erp/recycleList/recycleListDetail/recycleListDetail","pages/erp/recycleList/recycling-new","pages/erp/recycleList/comparisonChart/comparisonChart","pages/erp/user/attrprice","pages/erp/user/auditlist","pages/erp/chat/list","pages/erp/chat/chatAdmin","pages/erp/chat/chatList","pages/erp/chat/view","pages/erp/order/list","pages/my/item/item","pages/my/item/card","pages/my/item/tixian_add1","pages/my/item/tixian_list","pages/my/item/user_list","pages/my/item/item_order","pages/my/item/money_log","pages/my/item/money_state","pages/my/item/user_rank","pages/my/item/level_list","pages/my/item/level_up","pages/my/item/leveltask_list","pages/my/userdata/index","pages/my/userdata/address","pages/my/userdata/add-address","pages/my/userdata/edit-address","pages/my/userdata/avatar","pages/my/userdata/edit-name","pages/my/userdata/edit-phone","pages/my/userdata/edit-synopsis","pages/my/address/address","pages/my/address/addressManage","pages/my/userdata/realname/index","pages/my/userdata/realname/form","pages/my/footmark","pages/my/collect","pages/my/coupon/list","pages/order/recycle/list","pages/order/recycle/details","pages/order/comparisonChart/comparisonChart","pages/order/goods/list","pages/order/goods/details","pages/my/set/set-up","pages/about/about","pages/about/explain","pages/recycling/classify","pages/recycling/recycling","pages/recycling/recycling-new","pages/recycling/search","pages/recycling/preview","pages/recycling/form","pages/recycling/new-report","pages/recycling/diyform","pages/recycling/go-delivery","pages/my/pay/paylist","pages/my/pay/add-pay","pages/my/pay/edit-pay","pages/my/evaluate/list","pages/idphoto/idphoto","pages/common/city","pages/erp/allot/product_list","pages/erp/allot/mendian_list","pages/erp/shop/goods_list","App","pages/erp/diandianUnpload/diandianUnpload","pages/erp/maintenance/select_recycleform","pages/erp/maintenance/diandianUnpload","pages/erp/maintenance/list","pages/erp/shop/list","pages/erp/shop/configList","pages/erp/shop/storehouse","pages/tabbarerp/storehouse","pages/tabbarerp/commodity","pages/tabbarerp/classify","pages/tabbarerp/recycling-new","pages/tabbarerp/form","pages/erp/sell/form","pages/tabbar/settlement","pages/erp/adjustmentList/list","pages/erp/commodity/payment","pages/erp/commodity/delivery","pages/erp/commodity/receipt","pages/erp/commodity/refund","pages/order/goods/evaluate","pages/erp/stock/index","pages/erp/mallList/list","pages/erp/pendingList/list"],"window":{"navigationBarBackgroundColor":"#ffffff","backgroundColor":"#ffffff","navigationBarTextStyle":"black"},"tabBar":{"color":"#646464","selectedColor":"#262626","borderStyle":"white","backgroundColor":"#ffffff","height":"1px","list":[{"pagePath":"pages/tabbar/home","iconPath":"static/images/1-001.png","selectedIconPath":"static/images/1-002.png","text":"首页","visible":false},{"pagePath":"pages/tabbar/stores","iconPath":"static/images/4-001.png","selectedIconPath":"static/images/4-002.png","text":"门店","visible":false},{"pagePath":"pages/tabbar/sell","iconPath":"static/images/4-001.png","selectedIconPath":"static/images/4-002.png","text":"卖货","visible":false},{"pagePath":"pages/tabbar/cart","iconPath":"static/images/4-001.png","selectedIconPath":"static/images/4-002.png","text":"购物车","visible":false},{"pagePath":"pages/tabbar/my","iconPath":"static/images/4-001.png","selectedIconPath":"static/images/4-002.png","text":"我的","visible":false}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"优闲集","compilerVersion":"3.7.11","entryPagePath":"pages/tabbar/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabbar/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/tabbar/stores","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"门店","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/tabbar/sell","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"卖货","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/tabbar/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/tabbar/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","enablePullDownRefresh":true,"navigationBarTextStyle":"black"}},{"path":"/pages/tabbarerp/home","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/tabbarerp/push","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/tabbarerp/my","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/home/search","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/home/sort","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/home/sort_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/home/video","meta":{},"window":{"navigationBarTitleText":"短视频","enablePullDownRefresh":true}},{"path":"/pages/home/video_detail","meta":{},"window":{"navigationBarTitleText":"视频详情"}},{"path":"/pages/common/login/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationStyle":"custom"}},{"path":"/pages/common/login/mallreg","meta":{},"window":{"navigationBarTitleText":"商城注册"}},{"path":"/pages/common/login/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationStyle":"custom"}},{"path":"/pages/stores/goods","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/pages/chat/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/chat/chat","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/news/details","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/news/notice","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/common/map","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/goods/goods","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/goods/goodsNew","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/goods/coupon","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/goods/special","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/goods/my_cart","meta":{},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/goods/cart","meta":{},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/goods/settlement","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/goods/pay","meta":{},"window":{"navigationBarTitleText":"立即支付"}},{"path":"/pages/goods/express","meta":{},"window":{"navigationBarTitleText":"查看物流","enablePullDownRefresh":true,"bounce":"none"}},{"path":"/pages/goods/evaluate","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"发表评论"}},{"path":"/pages/goods/refund","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"申请售后"}},{"path":"/pages/status/pay_status","meta":{},"window":{"navigationBarTitleText":"支付状态"}},{"path":"/pages/goods/sales/kanyidao","meta":{},"window":{"navigationBarTitleText":"砍一刀"}},{"path":"/pages/erp/customer/customer","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/customer/add","meta":{},"window":{"navigationBarTitleText":"添加客户"}},{"path":"/pages/erp/supplier/supplier","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/supplier/add","meta":{},"window":{"navigationBarTitleText":"添加供应商"}},{"path":"/pages/erp/purchase/shangjia","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTitleText":"审上架"}},{"path":"/pages/erp/purchase/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"回收列表"}},{"path":"/pages/erp/purchase/product","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"回收商品详情"}},{"path":"/pages/erp/purchase/add/select_diyattr","meta":{},"window":{"navigationBarTitleText":"未上架机型"}},{"path":"/pages/erp/purchase/add/select_diyform","meta":{},"window":{"navigationBarTitleText":"未上架机型"}},{"path":"/pages/erp/purchase/add/select_product","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/purchase/add/select_recycleinfo","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择回收产品"}},{"path":"/pages/erp/purchase/add/select_recycleform","meta":{},"window":{"navigationBarTitleText":"回收产品"}},{"path":"/pages/erp/sell/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTitleText":"销售列表"}},{"path":"/pages/erp/sell/out","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"退款记录","navigationStyle":"custom"}},{"path":"/pages/erp/sell/outadd","meta":{},"window":{"navigationBarTitleText":"退款登记"}},{"path":"/pages/erp/sell/product","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/sell/add/select_product","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/shop/add","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTitleText":"新设采购"}},{"path":"/pages/erp/goods/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/allot/allot_push","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/erp/sn/list","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/erp/purchase/local","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"上门回收"}},{"path":"/pages/erp/purchase/local_receipt","meta":{},"window":{"navigationBarTitleText":"回单处理"}},{"path":"/pages/erp/stores/kefurece","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"客服接待"}},{"path":"/pages/erp/inventory/check/add","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/erp/inventory/check/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/inventory/check/goods","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/inventory/check/status","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/erp/stores/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/task/product_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/stores/transferlist","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/stores/sales","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/user/yeji","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的业绩"}},{"path":"/pages/erp/user/salary","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/user/recyclelist","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/user/selllist","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/finance/fukuan","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"待付款"}},{"path":"/pages/erp/finance/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/finance/spending/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/finance/income/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/task/quality","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTitleText":"待分拣"}},{"path":"/pages/erp/task/diandianUnpload","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"分拣列表"}},{"path":"/pages/erp/task/select_recycleform","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"回收产品"}},{"path":"/pages/erp/warehouse/quality","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTitleText":"仓库管理"}},{"path":"/pages/erp/warehouse/add","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"添加仓库"}},{"path":"/pages/erp/quality/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"分拣记录"}},{"path":"/pages/erp/quality/edit","meta":{},"window":{"navigationBarTitleText":"分拣处理"}},{"path":"/pages/erp/third/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"回收方列表","navigationStyle":"custom"}},{"path":"/pages/erp/third/add","meta":{},"window":{"navigationBarTitleText":"添加回收方"}},{"path":"/pages/erp/stores/shenhe","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"审核上架"}},{"path":"/pages/erp/user/attrlist","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/user/editAttrlist","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/purchase/tasklocal","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"同城上门"}},{"path":"/pages/erp/recycleList/index","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTitleText":"回收列表"}},{"path":"/pages/erp/recycleList/recycleListDetail/recycleListDetail","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"订单详情"}},{"path":"/pages/erp/recycleList/recycling-new","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"回收"}},{"path":"/pages/erp/recycleList/comparisonChart/comparisonChart","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"对比图"}},{"path":"/pages/erp/user/attrprice","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/user/auditlist","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/chat/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"聊天记录"}},{"path":"/pages/erp/chat/chatAdmin","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/erp/chat/chatList","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/erp/chat/view","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"聊天详情"}},{"path":"/pages/erp/order/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"订单列表"}},{"path":"/pages/my/item/item","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/my/item/card","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/item/tixian_add1","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/item/tixian_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/my/item/user_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/my/item/item_order","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/item/money_log","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom","backgroundColor":"#F0F0F0"}},{"path":"/pages/my/item/money_state","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/item/user_rank","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/my/item/level_list","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/item/level_up","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/item/leveltask_list","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/index","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/my/userdata/address","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/add-address","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/edit-address","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/avatar","meta":{},"window":{"navigationBarTitleText":"修改头像"}},{"path":"/pages/my/userdata/edit-name","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/edit-phone","meta":{},"window":{"navigationBarTitleText":"手机号换绑"}},{"path":"/pages/my/userdata/edit-synopsis","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/address/address","meta":{},"window":{"navigationBarTitleText":"我的地址"}},{"path":"/pages/my/address/addressManage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/realname/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/userdata/realname/form","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/footmark","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/my/collect","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/my/coupon/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的优惠券"}},{"path":"/pages/order/recycle/list","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"我卖出的"}},{"path":"/pages/order/recycle/details","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/order/comparisonChart/comparisonChart","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"回执单"}},{"path":"/pages/order/goods/list","meta":{},"window":{"navigationBarTitleText":"我买到的"}},{"path":"/pages/order/goods/details","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/set/set-up","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/about/explain","meta":{},"window":{"navigationBarTitleText":"平台说明"}},{"path":"/pages/recycling/classify","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/recycling/recycling","meta":{},"window":{"navigationBarTitleText":"机器报价"}},{"path":"/pages/recycling/recycling-new","meta":{},"window":{"navigationBarTitleText":"机器回收报价"}},{"path":"/pages/recycling/search","meta":{},"window":{"navigationBarTitleText":"机器搜索"}},{"path":"/pages/recycling/preview","meta":{},"window":{"navigationBarTitleText":"评估详情","navigationStyle":"custom"}},{"path":"/pages/recycling/form","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/recycling/new-report","meta":{},"window":{"navigationBarTitleText":"每日报价","navigationStyle":"custom"}},{"path":"/pages/recycling/diyform","meta":{},"window":{"navigationBarTitleText":"未上架机型"}},{"path":"/pages/recycling/go-delivery","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"发货"}},{"path":"/pages/my/pay/paylist","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"账户信息"}},{"path":"/pages/my/pay/add-pay","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"添加银行卡"}},{"path":"/pages/my/pay/edit-pay","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"编辑银行卡"}},{"path":"/pages/my/evaluate/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的评价"}},{"path":"/pages/idphoto/idphoto","meta":{"isNVue":true},"window":{"navigationStyle":"custom","backgroundColor":"#000000"}},{"path":"/pages/common/city","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择城市"}},{"path":"/pages/erp/allot/product_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/allot/mendian_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/erp/shop/goods_list","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/App","meta":{},"window":{}},{"path":"/pages/erp/diandianUnpload/diandianUnpload","meta":{},"window":{"navigationBarTitleText":"开单","enablePullDownRefresh":false}},{"path":"/pages/erp/maintenance/select_recycleform","meta":{},"window":{"navigationBarTitleText":"回收产品"}},{"path":"/pages/erp/maintenance/diandianUnpload","meta":{},"window":{"navigationBarTitleText":"开单","enablePullDownRefresh":false}},{"path":"/pages/erp/maintenance/list","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"我卖出的"}},{"path":"/pages/erp/shop/list","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/erp/shop/configList","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/erp/shop/storehouse","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/tabbarerp/storehouse","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/tabbarerp/commodity","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/tabbarerp/classify","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/tabbarerp/recycling-new","meta":{},"window":{"navigationBarTitleText":"回收开单","enablePullDownRefresh":false}},{"path":"/pages/tabbarerp/form","meta":{},"window":{"navigationBarTitleText":"回收开单","enablePullDownRefresh":false}},{"path":"/pages/erp/sell/form","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/tabbar/settlement","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/erp/adjustmentList/list","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/erp/commodity/payment","meta":{},"window":{"navigationBarTitleText":"代付款","enablePullDownRefresh":false}},{"path":"/pages/erp/commodity/delivery","meta":{},"window":{"navigationBarTitleText":"代发货","enablePullDownRefresh":false}},{"path":"/pages/erp/commodity/receipt","meta":{},"window":{"navigationBarTitleText":"代收货","enablePullDownRefresh":false}},{"path":"/pages/erp/commodity/refund","meta":{},"window":{"navigationBarTitleText":"退款/售后","enablePullDownRefresh":false}},{"path":"/pages/order/goods/evaluate","meta":{},"window":{"navigationBarTitleText":"评价","enablePullDownRefresh":false}},{"path":"/pages/erp/stock/index","meta":{},"window":{"enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/erp/mallList/list","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/erp/pendingList/list","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
