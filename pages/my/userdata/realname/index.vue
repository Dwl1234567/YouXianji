<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">实名认证</block>
		</bar-title>
		
		<!--状态图标-->
		<view class="zaiui-status-image-view">
			<image src="/static/real_name/non_real_name.png" mode="widthFix" v-if="!status"/>
			<image src="/static/real_name/real_name.png" mode="widthFix" v-if="status"/>
		</view>
		
		<!--状态信息-->
		<view class="text-black text-xl text-center margin-bottom-sm" v-if="!status">您尚未实名认证</view>
		
		<view class="text-black text-lg text-center margin-bottom-sm" v-if="status">
			<text class="margin-right">{{userInfo.realname}}</text>
			<text>{{userInfo.realcard}}</text>
		</view>
		<view class="text-black text-xl text-center margin-bottom-sm" v-if="status">您已完成实名认证</view>
		
		<!--文字说明-->
		<view class="text-gray text-left zaiui-content-view" v-if="!status">
			实名认证是由优闲集合作的第三方提供的一项个人身份认证服务，通过与公安网数据校验，确保个人身份真实性。实名认证后，可提升您在二手交易中的信任值。
		</view>
		<view class="text-gray text-left zaiui-content-view" v-if="status">
			实名认证是由优闲集合作的第三方提供的一项个人身份认证服务，通过与公安网数据校验，确保个人身份真实性。
		</view>
		
		<!--按钮-->
		<view class="zaiui-btn-view" v-if="!status">
			<button class="cu-btn bg-red radius" @tap="btnTap">去认证</button>
		</view>
		
	</view>
</template>

<script>
	import{
		getRecycleUserinfo
	} from "@/api/user.js"
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				status: false,
				userInfo:''
			}
		},
		onLoad() {
			this.getRecycleUserinfoFuc();
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			// 获取用户信息
			getRecycleUserinfoFuc(){
				getRecycleUserinfo().then(res=>{
					this.userInfo = res.data;
					this.status = res.data.verification == 1?true:false;
				})
			},
			statusTap() {
				if(this.status) {
					this.status = false;
				} else {
					this.status = true;
				}
			},
			btnTap() {
				uni.navigateTo({
					url: "/pages/my/userdata/realname/form"
				});
			}
		}
	}
</script>

<style lang="scss">
	page { background: #FFFFFF; }
	.zaiui-status-image-view {
		position: relative;
		text-align: center;
		margin-top: 90.9rpx;
		margin-bottom: 18.18rpx;
		image {
			width: 472.72rpx;
		}
	}
	.zaiui-content-view {
		position: relative;
		padding: 0 72.72rpx;
	}
	.zaiui-btn-view {
		position: relative;
		text-align: center;
		margin-top: 90.9rpx;
		.cu-btn {
		    padding: 0 45.45rpx;	
		}
	}
</style>
