<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor='bg-white'>
			<block slot="content">{{title}}</block>
		</bar-title>
		 -->
		
		<!--状态说明-->
		<view class="text-gray text-sm text-center padding"> {{introduce}} </view>
		<view class="text-gray text-sm text-center" style="padding-top:600rpx;"> 强子商贸 </view>
		
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
				title: '关于我们', introduce: '介绍',
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
