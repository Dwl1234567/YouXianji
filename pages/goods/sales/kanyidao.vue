<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">砍一刀</block>
		</bar-title> -->
		<view class="">
			<view class="cu-card case" :class="isCard?'no-card':''">
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://storage.youxianji.cc/images/2022042416461462650e567d182.jpg"
						 mode="widthFix"></image>
						<view class="cu-tag bg-blue">99新</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">iPhone 13 Pro Max 64g 白色</text></view>
					</view>
					<!--限时秒杀-->
					<view class="limited-seckill-box">
						<text class="text-price text-xxl">10000</text>
						<view class="text-xs cost-price-num">
							<view class="text-through">原价￥200</view>
							<view>剩余1件</view>
						</view>
					
						<view class="text-right time-right">
							<view>最高可砍至10元</view>
							<view class="text-xs">邀请好友砍一刀</view>
						</view>
					</view>
				</view>
				
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://storage.youxianji.cc/images/2022042416461462650e567d182.jpg"
						 mode="widthFix"></image>
						<view class="cu-tag bg-blue">99新</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">iPhone 13 Pro Max 64g 白色</text></view>
					</view>
					<!--限时秒杀-->
					<view class="limited-seckill-box">
						<text class="text-price text-xxl">10001</text>
						<view class="text-xs cost-price-num">
							<view class="text-through">原价￥200</view>
							<view>剩余1件</view>
						</view>
					
						<view class="text-right time-right">
							<view>最高可砍至10元</view>
							<view class="text-xs">邀请好友砍一刀</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				list_data:[]
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
		},
		
	}
</script>

<style lang="scss">
	.limited-seckill-box {
		position: relative;
		//background-image: url('/static/delect_images/home/sundry/aiu.png');
		//background-repeat: no-repeat;
		//background-size: 100% 100%;
		padding: 18.18rpx 27.27rpx;
		color: #ffffff;
		width: 100%;
		.text-xxl {
		    font-size: 54.54rpx;
		}
		.cost-price-num {
		    position: absolute;
			font-weight: 200;
			right: 250.99rpx;
		    top: 21.81rpx;
		}
		.cost-price-num.price-6{
			left: 254.54rpx;
		}
		.cost-price-num.price-5 {
			left: 227.27rpx;
		}
		.cost-price-num.price-4 {
			left: 199.99rpx;
		}
		.cost-price-num.price-3 {
			left: 163.63rpx;	
		}
		.cost-price-num.price-2{
			left: 136.36rpx;
		}
		.cost-price-num.price-1{
			left: 99.99rpx;	
		}
		.time-right {
			position: absolute;
			right: 27.27rpx;
			top: 16.36rpx;
		}
	}
</style>
