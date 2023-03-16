<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">修改昵称</block>
			<block slot="right">
				<!-- <text class="text-orange cu-btn bg-deepblue radius-2"  @tap="editname">保存</text> -->
			</block>
		</bar-title>
		
		<!--提示栏-->
		<!--<u-alert title="昵称90天只能修改一次，请慎重哦" type = "success" showIcon="true" effect="dark" description = "uView的目标是成为uni-app生态最优秀的UI框架"></u-alert>-->
		<!-- <view class="bg-red light text-sm padding-sm">
			<text class="cuIcon-warnfill"/>
			<text class="margin-left-xs">
				昵称90天只能修改一次，请慎重哦
			</text>
			<text class="cuIcon-close"/>
		</view> -->
		
		<view class="cu-form-group input">
			<!-- <view class="title">新昵称</view> -->
			<input placeholder="请输入新昵称" maxlength="13" v-model="name" value="二柱"></input>
		</view>
		
		<view class="text-sm text-gray padding-sm">13个字以内，仅支持汉字、字母、数字或下划线</view>
		
		<!-- #ifdef APP-PLUS -->
		<view class="text-color-yellow radius-6 button text-center text-xl text-4F4F50"  @tap="editname">保存</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="text-color-yellow radius-6 button text-center text-xl text-4F4F50"  @tap="editname">保存</view>
		<!-- #endif -->
		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red" @tap="editname">保存昵称</button>
			</view>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import {
		userset
	} from "@/api/user.js"
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				name:''
			}
		},
		onLoad(options) {
			this.name = options.name;
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			// editname
			editname(){
				let that = this;
				let params = {
					"key":"nickname",
					"value":that.name
				}
				userset(params).then(res=>{
					that.$u.toast('修改成功!');
					setTimeout(()=>{
						uni.navigateBack()
					}, 1000)
				})
				.catch(err=>{
					that.$u.toast(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F0F0F0;
	}
	.input{
		margin-top: 14px;
	}
	.button{
		width: 326px;
		height: 44px;
		line-height: 44px;
		margin: 0 auto;
		margin-top: 16px;
	}
	.cu-form-group {
		.title {
			&:before {
			    content: "";
			    position: absolute;
			    height: 27.27rpx;
			    width: 3.63rpx;
			    background: #e6e6e6;
			    top: 16.36rpx;
			    right: 12.72rpx;
			}
		}
		input {
			color: #333333;
		}
		.button{
			width: 326px;
			height: 44px;
		}
	}
</style>
