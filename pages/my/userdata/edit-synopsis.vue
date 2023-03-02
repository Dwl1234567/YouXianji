<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">个人简介</block>
			<block slot="right">
				<text class="text-orange" @click="save()">保存</text>
			</block>
		</bar-title>
		
		<view class="cu-form-group solid-top">
			<textarea v-model="bio" placeholder="优秀的用户会这么写。例如:我是XX熊，最爱收集各种闲置物品，交朋友。在架的宝贝都可以交易，快来联系我吧!"/>
			<text class="text-gray font-num-view">{{bio.length}} / 100</text>
		</view>
		
		
		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red" @click="save()">保存个人简介</button>
			</view>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import {
		userset
	} from "@/api/user.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				bio:''
			}
		},
		onLoad(options) {
			this.bio = options.bio
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			save(){
				let that = this;
				console.log(that.bio.length)
				if(that.bio.length > 100){
					that.$u.toast('字数不能多余100哦！');
					return false;
				}
				let params = {
					"key": "bio",
					"value": that.bio
				}
				userset(params).then(res => {
						that.$u.toast('修改成功!');
					})
					.catch(err => {
						that.$u.toast(err);
					})
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group {
		textarea {
			height: 8.6em;
		}
		.font-num-view {
		    position: absolute;
		    bottom: 9.09rpx;
		    right: 27.27rpx;	
		}
	}
</style>
