<template>
	<view>
		<!--标题栏-->
	<!-- 	<bar-title bgColor='bg-white'>
			<block slot="content">{{title}}</block>
		</bar-title> -->
		
		<!--状态图标-->
		<view class="status-view">
			<image class="status-img" src="/static/img/pay.png" mode="widthFix"/>
			<view class="bg-red status-bg-view">
				<text class="cuIcon-check icon"></text>
			</view>
		</view>
		
		<!--状态标题-->
		<view class="text-bold text-black text-xl text-center">{{title}}</view>
		
		<!--状态说明-->
		<view class="text-gray text-sm text-center padding"> {{introduce}} </view>
		
		<!--按钮-->
		<view class="btn-view">
			<button class="cu-btn radius line-red">查看订单详情</button>
		</view>
		
		<!--广告信息-->
		<!--
		<view class="padding ad-view">
			<view class="text-gray text-sm text-center">
				<text>扫描下方二维码，或打开微信搜索【</text>
				<text class="text-blue">测试的内容</text>
				<text>】 ,微信关注公众号【</text>
				<text class="text-blue">测试的内容</text>
				<text>】优惠信息早知道，更多福利等你来拿!</text>
			</view>
			<view class="qrcode-img-view">
				<image class="qrcode-img" src="/static/delect_images/reward/qrcode.png" mode="widthFix"/>
			</view>
		</view>
		-->
		
	</view>
</template>

<script>
	//各种状态显示内容，可自行修改或判断法显示，这里我就不一一写出来了。
	
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				title: '支付成功', introduce: '平台已收到您的钱款，已通知卖家发货。平台会及时通知您的交易状态，请您关注。',
			}
		},
		onLoad() {
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "/uni_modules/colorui/main.css";
		@import "/uni_modules/colorui/icon.css";
		@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	@import "@/uni_modules/mpb-ui/shop/pay-status.scss";
</style>
