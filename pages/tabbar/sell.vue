<template>
	<view class="content">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false" >
			<block slot="content">优闲集回收</block>
		</bar-title>
		<!-- 轮播图 -->
		<u-swiper :indicator="true" keyName="image" :list="bannerList" @change="change" @click="click"></u-swiper>
		<!-- 回收流程 -->
		<view class="process-box margin-top-sm">
			<image src="../../static/home/liucheng.png" class="img radius-2" mode="aspectFill"></image>
			<view v-if="phoneModel" class="process-info margin-top-xs bg-white radius-2">
				<u-row>
					<u-col span="6">
						<view class="">
							当前机型：<text class="model">{{phoneModel}}</text>
						</view>
					</u-col>
					<u-col span="6">
						<u-row align="center">
							<u-col span="6">
								<view class="">
									最高 <text class="price">￥{{UserPhoneMoney}}</text>
								</view>
							</u-col>
							<view class="line">
							</view>
							<u-col span="6">
								<view class="btn" @click="goevaluation()">
									立即估价
								</view>
							</u-col>
						</u-row>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="margin-tb-sm stores-box">
				<view class="bg-white cu-card article radius-2" @click="gostoreInfo(latelystoreInfo.id)">
					<!-- 同城到店回收-块1 -->
					<view class="margin-sm cu-item radius-4 bg-white"  v-if="latelystoreInfo.name">
						<view class="content" @click="gostoreInfo(item.id)"  v-if="latelystoreInfo.km < '10'">
							<image :src="latelystoreInfo.image" mode="aspectFill"></image>
							<view class="desc">
								<view class="title flex justify-between">
									<view class="text-cut">
										{{latelystoreInfo.name}}
									</view>
									<view class="right">
										<text class="margin-right-sm more text-red iconfont icon-nextpageorange"></text>
									</view>
								</view>
								<view class="text-content text-bold">
									<view class="text-sm">
										距离<text> {{latelystoreInfo.km}}km</text>
									</view>
									<view class="">
										<text class="text-red"> {{latelystoreInfo.nums}} 款在售机型</text>
									</view>
									<view class="">
										<text class="lg text-gray cuIcon-people"></text>
										{{latelystoreInfo.linkman}}
										<text class="lg text-gray cuIcon-mobile" style="margin-left:20rpx;"></text>
										{{latelystoreInfo.phone}}
									</view>
									<view class="">
										<text class="lg text-gray cuIcon-location"></text>
										{{latelystoreInfo.address}}
									</view>
								</view>
							</view>
						</view>
						<view class="margin-lr-sm margin-top-sm cate-box">
							<view class="action margin-bottom-sm text-bold">
								品类回收
							</view>
							<scroll-view class="scroll-view_H" :scroll-x="true">
								<image class="img" @click.stop="gocateFuc(0)" src="../../static/img/push/cate-1.png" mode="scaleToFill"></image>
								<image class="img" @click.stop="gocateFuc(1)" src="../../static/img/push/cate-2.png" mode="scaleToFill"></image>
								<image class="img" @click.stop="gocateFuc(2)" src="../../static/img/push/cate-3.png" mode="scaleToFill"></image>
								<image class="img" @click.stop="gocateFuc(3)" src="../../static/img/push/cate-3.png" mode="scaleToFill"></image>
							</scroll-view>
						</view>
					</view>
				</view>
				<view class="">
					<view class="shangmen flex justify-center margin-top-sm bg-white padding-lg radius-2" @click="gocClassfy(2)">
						<view class="text-center">
							<image class="img" @click.stop="gocateFuc(0)" src="../../static/img/push/kd-2.png" mode="widthFix"></image>
							<view class="text-red text-bold text-lg">同城上门</view>
						</view>
						<view class="text text-sm text-darkgrey padding-top-lg">
							<!--<view class="text-red text-bold text-lg">同城上门</view>-->
							<view>当面质检，当面秒款，放心看得见</view>
							<view>同城半小时极速上门，就是快！</view>
						</view>
						<view class="right">
							<text class="margin-right-sm more text-red text-xl iconfont icon-nextpageorange"></text>
						</view>
					</view>
					<view class="kuaidi margin-top-sm bg-white padding-sm radius-2">
						<view class="title padding-sm">
							<view class="big text-lg text-red text-bold text-center">邮寄回收</view>
							<view class="small text-sm text-center text-darkgrey">
								<view class="">当天收货,当日秒款</view>
								<view class="">拒绝到手刀,简单回收不套路</view>
							</view>
						</view>
						<view class="youji flex flex-wrap">
							<view class="basis-df" @click="gocClassfy(1)">
								<view class="a text-center radius-2 shadow shadow-lg bg-white">
									<view class="ziji">
										<image class="img" @click.stop="gocateFuc(0)" src="../../static/img/push/kd-3.png" mode="widthFix"></image>
									</view>
									<view class="text">
										<view class="text-red text-bold text-lg">自行寄件</view>
										<view class="text-darkgrey text-sm">更自由，时间随性</view>
									</view>
									<view class="right">
										<text class="margin-right-sm more text-red text-xl iconfont icon-nextpageorange"></text>
									</view>
								</view>
							</view>
							<view class="basis-df" @click="gocClassfy(0)">
								<view class="b text-center radius-2 shadow shadow-lg bg-white">
									<view class="shunfeng">
										<image class="img" @click.stop="gocateFuc(0)" src="../../static/img/push/kd-1.png" mode="widthFix"></image>
									</view>
									<view class="text">
										<view class="text-red text-bold text-lg">顺丰上门</view>
										<view class="text-darkgrey text-sm">免邮费，一键下单</view>
									</view>
									<view class="right">
										<text class="margin-right-sm more text-red text-xl iconfont icon-nextpageorange"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>
		<view class="bg-white radius-2">
			<view class="action padding-top-lg text-bold text-center">
				回收流程和指南
			</view>
			<view class="cu-list grid col-5 no-border">
				<view class="cu-item" v-for="(item,index) in newslist" :key="index" @tap="tabSelect" :data-id="index">
					<view class="iconfont" :class="[item.icon,index==TabCur?'text-red cur':'text-darkgrey']"></view>
					<text :class="index==TabCur?'text-red':'text-darkgrey'">{{item.name}}</text>
				</view>
			</view>
			<view class="">
				<scroll-view scroll-x class="bg-white nav text-center text-sm" v-if="TabCur == 1">
					<view class="cu-item" :class="index==miniTabCur?'text-red cur':''" v-for="(item,index) in newslist[1].child" :key="index" @tap="minitabSelect" :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
				<!--内容列表-->
				<view class="list">
					<u-collapse accordion  :border="false">
					    <u-collapse-item :border="false" :title="item.title" v-for="(item,index) in newslist[0].list" :key="index" v-if="TabCur == 0">
					      <text class="u-collapse-content">{{item.view}}</text>
					    </u-collapse-item>
					</u-collapse>
					
					<block v-if="TabCur == 1">
						<u-collapse accordion @change="change" @close="close" @open="open" :border="false">
							<u-collapse-item :title="items.title" v-for="(items,index1) in newslist[1].child[miniTabCur].list" :key="index1">
							  <text class="u-collapse-content">{{items.view}}</text>
							</u-collapse-item>
						</u-collapse>
					</block>
					
					<u-collapse accordion  :border="false">
					    <u-collapse-item :title="item.title" v-for="(item,index) in newslist[2].list" :key="index" v-if="TabCur == 2">
					      <text class="u-collapse-content">{{item.view}}</text>
					    </u-collapse-item>
					</u-collapse>
					
					<u-collapse  accordion  :border="false">
					    <u-collapse-item :title="item.title" v-for="(item,index) in newslist[3].list" :key="index" v-if="TabCur == 3">
					      <text class="u-collapse-content">{{item.view}}</text>
					    </u-collapse-item>
					</u-collapse>
					
					<u-collapse  accordion  :border="false">
					    <u-collapse-item :title="item.title" v-for="(item,index) in newslist[4].list" :key="index" v-if="TabCur == 4">
					      <text class="u-collapse-content">{{item.view}}</text>
					    </u-collapse-item>
					</u-collapse>
					
				</view>
			</view>
		</view>
		
		<view class="duibi margin-top-sm">
			<img class="img radius-2" src="../../static/img/push/duibi.jpg"></img>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!-- 下拉加载提示 -->
		
		<!--客服悬浮球-->
		<view class="kefu">
			<drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
		</view>
		
		<footer-tabbar :tabID='2' :msgDot='true' />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';
	import {
		Wxlogin,
		getIndexPrice,
		showIndex,
		lunboList,
		getGlobalInfo,
		storesstorelatelystore
	} from '@/api/common.js'
	import {
		storelist,
	} from "@/api/common.js"

	import barTitle from '@/components/common/basics/bar-title';
	export default {
		name: 'sell',
		components: {
			barTitle,
			footerTabbar
		},
		data() {
			return {
				bannerList: [],
				btmStyle: {
					borderBottom: '2rpx solid #A8A8A8'
				},
				phoneModel: '',
				UserPhoneMoney: '-.-',
				xiulist: [],
				thistime: new Date(),
				TabCur:0,
				miniTabCur:0,
				newslist:[],
				addressList: [{
						"title": "小强回收",
						"latitude": 18.251298,
						"longitude": 109.506593,
						"addressdesc": "海南省三亚市新风街88号"
					},
					{
						"title": "寻ta靓机",
						"latitude": 18.251298,
						"longitude": 109.506593,
						"addressdesc": "海南省三亚市新风街88号"
					},
					{
						"title": "小强二手",
						"latitude": 18.251298,
						"longitude": 109.506593,
						"addressdesc": "海南省三亚市新风街88号"
					}
				],
				twoId: 0,
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				latitude: '',
				longitude: '',
				shop_latitide:'',
				shop_longtude:'',
				latelystoreInfo: ''
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('进入下拉刷新');
			// this.queryInfo.page = 1; //重置分页页码
			// this.getDataList();
			this.getmodelprice();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onLoad(data) {
			let that = this;
			// #ifdef MP
			this.WxloginFuc();
			// #endif
			this.getmodelprice();
			this.getshowIndex();
			this.lunboListFuc();
			this.newListFuc(); //图文列表
			// this.getGlobalInfoFuc();
			// #ifndef APP-PLUS
			this.getstoresstorelatelystore();
			// #endif
			// #ifdef APP-PLUS
			uni.getLocation({
				type: 'wgs84',
				geocode: true, //设置该参数为true可直接获取经纬度及城市信息
				success: function(res) {
					console.log(res)
					that.latitude = res.latitude
					that.longitude = res.longitude
				},
				fail: function() {
					uni.showToast({
						title: '获取地址失败，将导致部分功能不可用',
						icon: 'none'
					});
				},
				complete() {
					that.getstoresstorelatelystore();
				}
			});
			// #endif
		},
		methods: {
			// 获取最近门店
			getstoresstorelatelystore() {
				storesstorelatelystore({
					latitude: this.latitude,
					longitude: this.longitude
				}).then(res => {
					this.latelystoreInfo = res.data;
					this.shop_latitide = res.data.latitude;
					this.shop_longtude = res.data.longitude;
				})
			},
			// 去门店详情
			gostoreInfo(id) {
				uni.navigateTo({
					url: '/pages/stores/goods?id=' + id
				})
			},
			
			// 获取设备价格
			getmodelprice() {
				let that = this;
				uni.getSystemInfo({
					success: function(res) {
						// console.log(res);
						// console.log(res.model);
						if (res.model == 'M2004J19C') {
							that.phoneModel = '红米9';
						} else {
							that.phoneModel = res.model;
							// that.phoneModel = "inphone<)"
							let index = that.phoneModel.lastIndexOf("(");
							let index1 = that.phoneModel.lastIndexOf("<");
							if (index != -1) {
								that.phoneModel = that.phoneModel.substring(0, index);
							} else if (index1 != -1) {
								that.phoneModel = that.phoneModel.substring(0, index1);
							}
						}
						let parmas = {
							'model': that.phoneModel
						}
						getIndexPrice(parmas).then(res => {
							if (res.code == 1) {
								that.UserPhoneMoney = res.data.money;
								if (res.data.goods_info.name) {
									that.phoneModel = res.data.goods_info.name;
								}
							}
						})
					}
				});
			},
			// 获取全局信息
			getGlobalInfoFuc() {
				let that = this;
				getGlobalInfo({}).then(res => {

				})
			},
			// 获取轮播图
			lunboListFuc() {
				let that = this;
				let params = {
					'tag': 'recycle_mp'
				}
				lunboList(params).then(res => {
					if (res.code == 1) {
						that.bannerList = res.data;
					}
				})
			},
			storeTap(id) {
				//到店回收
				uni.navigateTo({
					url: '/pages/stores/goods?id=' + id
				})
			},
			gocClassfy(type) {
				//回收报价
				uni.navigateTo({
					url: '/pages/recycling/classify?type=' + type
				})
			},
			// 去门店
			gomap(info) {
				uni.openLocation({
					scale: 18,
					latitude: info.latitude,
					longitude: info.longitude,
					address: info.title,
					success: function() {
						console.log('success');
					}
				});
			},
			// 获取首页分享秀
			getshowIndex() {
				let that = this;
				showIndex().then(res => {
					that.xiulist = res.data;
				})
			},
			// 微信小程序登录
			WxloginFuc() {
				let that = this;
				wx.login({
					success: function(res) {
						console.log(res); //这里的返回值里面便包含code
						let params = {
							'code': res.code
						}
						uni.setStorageSync('wxcode', res.code);
						Wxlogin(params).then(res => {
							if (res.data.token) {
								that.$store.commit("LOGIN", {
									'token': res.data.token
								});
							}
							if (res.data.user_token) {
								that.$store.commit("SETUID", res.data.user_token);
							}
						})
					},
					fail: function(res) {
						console.log('登陆失败');
					},

				})

			},
			/*
			change(index) {

			},*/
			click(index) {

			},
			gocateFuc(type) {
				// console.log(type);
				uni.setStorageSync('cattype', type);
				uni.switchTab({
					url: '../classify/classify'
				})
			},
			gonowpriceFuc() {
				//每日报价
				uni.navigateTo({
					url: '../recycling/new-report'
				})
			},
			goevaluation() {
				//去估价
				let that = this;
				let parmas = {
					'model': that.phoneModel
				}
				getIndexPrice(parmas).then(res => {
					if (res.code == 1) {
						if (res.data.money == 0 || res.data.length == 0) {
							that.$u.toast('未找到该机型，请去分类寻找！')
						} else {
							uni.navigateTo({
								url: '../recycling/recycling-new?id=' + res.data.goods_info.id +
									'&cate_id=' + res.data.goods_info.cate_id
							})
						}
					}
				})

			},
			gocateFuc(type) {
				console.log(type);
				uni.setStorageSync('cattype', type);
				uni.navigateTo({
					url: '/pages/recycling/classify'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				// this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			minitabSelect(e) {
				console.log(e.currentTarget.dataset.id)
				this.miniTabCur = e.currentTarget.dataset.id;
				// this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			open(e) {
			  //console.log('open', e)
			},
			close(e) {
			  //console.log('close', e)
			},
			change(e) {
			  // console.log('change', e)
			},
			newListFuc(){
				this.newslist =[
					{
						"icon":"icon-checktouploadgray",
						"name":"线上下单",
						"list":[
							{
								"title":"1.预估价格是最后成交价格么？",
								"view":"预估价格不是最后的成交价，最后成交价以机器经优闲集检测后报价为准。"
							},
							{
								"title":"2.你们的预估价是怎么来的？",
								"view":"优闲集的回收价格是依据二手市场行情，通过大数据计算来决定的。电子产品更新换代的节奏较快，产品交易价格市场波动较大，另不同产品的品牌、上市的时间和成色等也会对交易价格产生很大的影响。"
							}
						]
					},
					{
						"icon":"icon-tubiao-22",
						"name":"上门/到店",
						"child":[
							{
								"name":"上门回收",
								"list":[
									{
										"title":"1. 提交订单最快多久可以上门？",
										"view":"取决于您下单时选择的时间段，具体上门时间上门人员会与您电话沟通确认。"
									},
									{
										"title":"2. 哪些地区支持上门回收？",
										"view":"系统会根据您的地址信息自动匹配您是否可以使用上门回收服务，如您在下订单时有上门回收的选项，则表示您可以使用上门回收服务"
									}
								]
							},
							{
								"name":"门店回收",
								"list":[
									{
										"title":"1. 如何查看我的周边是否有门店？",
										"view":"您可在优闲集app/官网/小程序首页的【门店列表】中查看线下门店及具体地址。"
									},
									{
										"title":"2.门店回收前需要注意什么？",
										"view":"1） 进行交易的用户需年满18周岁，具有完全的民事行为能力；\n2） 交易中，用户需要出示电子身份证(E证通)或中华人民共和国第二代居民身份证/临时身份证、护照、港澳居民来往内地通行证、台湾居民来往内地通行证等身份证件；\n3） 交易前请用户将回收的设备提前充好电，如回收的设备为机身/镜头/闪光灯，则用户需携带配套的设备用于检测回收设备的性能。"
									}
								]
							},
							{
								"name":"快递回收",
								"list":[
									{
										"title":"1. 机器寄出后有什么保障？",
										"view":"在回收交付过程中因优闲集方面的原因导致用户旧机损坏，用户可直接进行投诉索赔，经核实后将立即进行赔付，我们将竭尽全力保障用户的合法权益。"
									},
									{
										"title":"2. 物品邮寄后快递单在哪里填写？",
										"view":"在首页点击【我的】一登录后进入【订单中心】在订单列表对应订单处点击【发货】，进入后可以填写快递单号"
									}
								]
							}
						]
					},
					{
						"icon":"icon-qualitypromise",
						"name":"专业质检",
						"list":[
							{
								"title":"1. 检测出机器情况与提交订单填写不同如何处理？",
								"view":"如优闲集检测后估价低于您提交订单时的估价，优闲集会通过以下方式和您进行确认：\n1） 快递回收：若检测末通过您可以到【我的】查看质检结果确认是否交易或保持电话畅通等待专员与您联系。\n 2） 上门/门店：若检测未通过，店员会与您当面确认质检结果确认是否交易。"
							},
							{
								"title":"2. 质检需要多长时间？",
								"view":"优闲集承诺会在收到您的设备后24小时内检测完毕。但由于您的原因导致质检延迟的或发生不可抗力等情形的，请您理解并知悉，该种情况不属于优闲集违约，优闲集将在障碍排除后尽快进行质检。"
							}
							
						]
					},
					{
						"icon":"icon-cashin",
						"name":"确认收款",
						"list":[
							{
								"title":"1.回收款多久可以到账？",
								"view":"物流回收：我们会在收到机器后24小时内进行检测，检测通过会在2小时内放款到您的钱包账户/微信/支付宝/银行卡；若检测未通过您可以到【我的】 查看质检结果确认是否交易。\n门店/上门回收：我们会在完成质检，确认支付后，会在当面转到您的钱包账户/微信/支付宝/银行卡。"
							},
							{
								"title":"2. 收款方式是什么，提现方式有哪些？",
								"view":"门店/上门方式回收的，您可以选择通过您的钱包/支付宝/微信/银行卡/现金方式进行收款；快递方式回收的使用优闲集钱包进行收款，\n优闲集钱包支持三种提现方式，可提现至支付宝、微信账号与银行卡"
							}
							
						]
					},
					{
						"icon":"icon-privacy",
						"name":"隐私清除",
						"list":[
							{
								"title":"1. 我的隐私数据泄露怎么办？如何赔付？",
								"view":"如因优闲集原因导致用户个人信息被泄露（限手机、平板、笔记本电脑），优闲集将按照用户产品回收价格的一百倍进行赔付 。"
							},
							{
								"title":"2. 你们怎么做隐私清除？",
								"view":"程序和个人信息，以保障用户个人信息隐私安全。在隐私清除完成后，优闲集将发送详细的隐私清除报告给用户。"
							}
							
						]
					}
				]
			},
			// 联系客服
			btnClick() {
				console.log('球被点击');
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 20rpx 100rpx 20rpx;

	}
	
	.process-box {
		.img {
			width: 100%;
			height: 113rpx;
		}

		.process-info {
			color: #929292;
			padding: 20rpx 10rpx;
			.model {
				font-size: 28rpx;
				color: #323232;
				font-weight: bold;
			}

			.price {
				font-size: 28rpx;
				color: #F48D31;
				font-weight: bold;
			}

			.btn {
				text-align: center;
				color: #D0D7E2;
				box-shadow: 0px 0px 10rpx 0px rgba(136, 136, 136, 1);
				background-color: #0F366F;
				padding: 2rpx 6rpx;
				border-radius: 20rpx;
			}

			.line {
				height: 30rpx;
				background-color: #929292;
				padding: 0 1rpx;
				margin-left: -20rpx;
				margin-right: 10rpx;
			}
		}
	}
	
	.stores-box{
		.cu-card.article>.cu-item {
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			.cate-box {
				width: 100%;
			
				.scroll-view_H {
					width: 100%;
					height: 160rpx;
					white-space: nowrap;
				}
			
				.img {
					width: 205rpx;
					height: 154rpx;
					// padding: 20rpx;
					margin-right: 20rpx;
					border:1px solid #ccc;
					border-radius: 10rpx;
					display: inline-block;
				}
			}
		}
		
		.cu-card.article>.cu-item .content>uni-image {
			width: 200rpx;
			height: 200rpx;
			margin-left:10px;
			border-radius: 15rpx;
			border: 1px solid #ccc;
		}
		
		.cu-card.article>.cu-item .title {
			padding: 20rpx 0 0 0;
			line-height: 30rpx;
			font-size: 30rpx;
			color: #333
		}
		
		.cu-card.article>.cu-item .content {
			padding: 0;
		}
		
		.cu-card.article>.cu-item .content .text-content {
			height: auto;
			color: #333;
			font-size: 20rpx;
			font-weight: normal;
			line-height: 32rpx;
		}
		
		.cu-card.article>.cu-item .content .right {
			display: flex;
			justfy-content: center;
			align-items: center;
		
			.more {
				font-size: 42rpx;
			}
		}
	}
	

	.more-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;

		.item {
			position: relative;
			width: 49%;
			height: 210rpx;
			box-shadow: 0px 0px 10rpx 0px rgba(136, 136, 136, 0.5);
			border-radius: 20rpx;

			.tap {
				color: #FFFFFF;
				font-size: 26rpx;
				height: 80rpx;
				line-height: 70rpx;
				background-color: #EE5873;
				border-radius: 20rpx 20rpx 0 0;
				padding-left: 10rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.tap:nth-child(1) {
				background-color: #3B999B;
			}

			.tap:nth-child(2) {
				background-color: #3B629C;
				margin-top: -10rpx;
			}

			.tap:nth-child(3) {
				border-radius: 20rpx;
				margin-top: -14rpx;
			}

			.img {
				position: absolute;
				bottom: 15rpx;
				right: 10rpx;
				width: 67rpx;
				height: 67rpx;
			}

			.title {
				font-size: 26rpx;
				color: #929292;
				font-weight: bold;
				padding: 20rpx;
				margin-top: 40rpx;
			}

			.time-box {
				display: flex;
				justify-content: space-around;
				margin-top: 20rpx;

				.day {
					padding: 6rpx;
					font-size: 48rpx;
					font-weight: bold;
					border-radius: 20rpx;
					box-shadow: 0px 0px 6rpx 0px rgba(136, 136, 136, 0.6);
				}

				.day:nth-child(1) {
					color: #EE5873;
				}

				.day:nth-child(2) {
					color: #3B629C;
				}

				.day:nth-child(3) {
					color: #3B999B;
				}
			}
		}
	}

	.goStore-box {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.item {
			width: 32%;
			height: 180rpx;
			text-align: center;
			background-color: #3B999B;
			border-radius: 20rpx;
			padding: 30rpx 0;
			color: #FFFFFF;

			.name {
				font-size: 30rpx;
				font-weight: bold;
			}

			.adr {
				padding-top: 10rpx;
				font-size: 20rpx;
			}
		}

		.item:nth-child(2) {
			background-color: #3B629C;
		}

		.item:nth-child(3) {
			background-color: #EE5873;
		}
	}
	.shangmen{
		position: relative;
		.img{
			width:90rpx;
			width:90rpx;
		}
		.text{
			margin-top:5rpx;
			margin-left:30rpx;
		}
		.right{
			position: absolute;
			right:20rpx;
			bottom:50rpx;
		}
	}
	.kuaidi{
		.title{
			.big{
				
			}
			.small{
				
			}
		}
		.youji{
			padding-top: 8rpx;
			.a, .b{
				padding:10rpx 0;
				margin-left:20rpx;
				margin-right:20rpx;
				border: 1px solid #D0D7E2;
				position: relative;
				.right{
					position: absolute;
					right:5rpx;
					bottom:46rpx;
				}
			}
			.shunfeng{
				.img{
					width:90rpx;
					height:90rpx;
				}
			}
			.ziji{
				.img{
					width:90rpx;
					height:90rpx;
				}
			}
		}
	}
	.cu-list.grid.no-border{
		padding-top: 0;
		padding-bottom: 0;
	}
	.nav .cu-item{
		height:40rpx;
		line-height:40rpx;
	}
	/deep/ .u-collapse-item {
		.u-cell__title {
			.u-cell__title-text {
				font-size:13px;
			}
		}
		&__content {
			&__text {
				padding: 8px 10px;
				font-size: 12px;
			}
		}
	}
	.duibi{
		.img{
			width:100%;
		}
	}
</style>
