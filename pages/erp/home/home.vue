<template>
	<view>
		<!--首页-->
		<home :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==0?true:false" v-if="loadOn.home" />
		<!--工作台-->
		<work :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==1?true:false" v-if="loadOn.work" />
		<!--发布-->
		<push :barClose="true" :customerInfo="customerInfo" :scrollY="scrollY" :scrollBottom="scrollBottom"
			:show="tabID==2?true:false" v-if="loadOn.push" @closeTap="sellCloseTap" />
		<!--统计-->
		<analy :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==3?true:false" v-if="loadOn.analy" />
		<!--我的-->
		<my :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==4?true:false" v-if="loadOn.my" />

		<!--底部导航-->
		<footer-tabbar :tabID='tabID' :msgDot='true' @tabTap='tabTap'></footer-tabbar>
	</view>
</template>

<script>
	//加载组件
	import home from '@/components/erp/page/home';
	import work from '@/components/erp/page/work';
	import push from '@/components/erp/page/push';
	import analy from '@/components/erp/page/analy';
	import my from '@/components/erp/page/my';

	//固定组件
	import footerTabbar from '@/components/erp/footer/footer-tabbar';

	//工具函数
	import _tool from '@/utils/tools.js';
	export default {
		components: {
			home,
			work,
			push,
			analy,
			my,
			footerTabbar
		},
		data() {
			return {
				loadOn: {
					home: true,
					work: false,
					push: false,
					analy: false,
					my: false,
				},
				scrollY: 0,
				scrollBottom: 0,
				tabID: 0,
				tabIndex: 0,
				customerInfo: {
					id: '',
					username: '选择客户'
				}, //客户信息
			}
		},
		onLoad() {

		},
		onShow() {
			let that = this;
			uni.$once('updatecustomer', function(data) {
				console.log('监听到事件来自 updatecustomer，携带参数为：', data);
				that.customerInfo = data;
			})
		},
		onReady() {
			_tool.setBarColor(true);
		},
		onPullDownRefresh() {

		},
		methods: {
			tabTap(index) {
				this.tabIndex = this.tabID;
				if (index == 1 && !this.loadOn.work) {
					this.loadOn.work = true;
				}
				if (index == 2 && !this.loadOn.push) {
					this.loadOn.push = true;
				}
				if (index == 3 && !this.loadOn.analy) {
					this.loadOn.analy = true;
				}
				if (index == 4 && !this.loadOn.my) {
					this.loadOn.my = true;
				}
				this.tabID = index;
				//设置颜色
				if (index == 0) {
					_tool.setBarColor(false);
				}
				if (index == 1 || index == 2 || index == 3) {
					_tool.setBarColor(true);
				}
				if (index == 4) {
					_tool.setBarColor(false);
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			sellCloseTap() {
				this.tabTap(this.tabIndex);
			},
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			//console.log(e.scrollTop);
		},
		onReachBottom(e) {
			let timestamp = new Date().getTime();
			this.scrollBottom = timestamp;
		},
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "@/uni_modules/colorui/main.css";
	@import "@/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
</style>
