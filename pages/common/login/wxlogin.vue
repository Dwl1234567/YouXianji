<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack @rightTap="rightTap">
			<block slot="content">授权登录</block>
		</bar-title>
		
		<!--登录图标-->
		<view class="user-login-avatar-view">
			<view class="cu-avatar round lg" style="background-image:url(/static/img/avatar/1.jpg);"/>
		</view>
		
		<!--按钮-->
		<view class="flex flex-direction btn-view" @tap="wxLogin()">
			<button class="cu-btn bg-red">
				<text class="cuIcon-weixin icon"/>
				<text>登录开启环保大师之旅</text>
			</button>
		</view>
		
		<!--协议-->
		<view class="agreement-checked-view">
			<checkbox class='round red sm checked checked'/>
			<view class="text-sm text-black-view">
				<view class="text-gray">已阅读并同意以下协议</view>
				<view class="text-red">《收四方用户服务协议》《收四方隐私政策》</view>
			</view>
		</view>
		
		<!--底部说明-->
		<view class="text-sm text-gray foot-ad-view">收四方-更专业的闲置二手交易平台</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/common/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			//等三方微信登录
			wxLogin() {
				uni.showToast({ title: '授权登录成功,即将跳转', icon: 'none' });
				setTimeout(function(){ 
					//返回并刷新
					uni.navigateBack('refresh');	
				}, 1000);

			}
		}
	}
</script>

<style lang="scss">
	
	.user-login-avatar-view {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 218.18rpx;
		.cu-avatar {
		    width: 181.81rpx;
		    height: 181.81rpx;	
		}
	}
	.btn-view {
		position: relative;
		margin-top: 72.72rpx;
		padding: 0 45.45rpx;
		.cu-btn .icon {
			position: relative;
			font-size: 47.27rpx;
			right: 9.09rpx;
			top: -3.63rpx;	
		}
	}
	.agreement-checked-view {
		position: relative;
		padding: 27.27rpx 45.45rpx;
		.checked {
			position: absolute;
			transform: scale(0.7);
		}
		.text-black-view {
			padding-left: 54.54rpx;
			line-height: 47.27rpx;
		}
	}
	.foot-ad-view {
		position: fixed;
		text-align: center;
	    bottom: 72.72rpx;
	    width: 100%;	
	}
</style>
