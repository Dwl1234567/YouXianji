<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">我的地址</block>
		</bar-title>
		
		<!--列表-->
		<view v-for="(item,index) in addressList" :key="index" class="bg-white address-card-view">
			<view class="flex text-black text-lg">
				<view class="flex-sub text-left">{{item.name}} <text class="isdefault" v-if="item.isdefault == '1'">默认</text></view>
				<view class="flex-sub text-right">{{item.phone}}</view>
			</view>
			<view class="margin-tb-sm text-gray">
				{{item.all_detail}}
			</view>
			<view class="line-view"/>
			<view class="right-view">
				<text v-if="item.isdefault != '1'" class="cuIcon-write" @tap="defaAddressTap(item.address_id)">设为默认</text>
				<text class="cuIcon-write" @tap="editAddressTap(item.address_id)">编辑</text>
				<text class="cuIcon-delete" @tap="deleteAddress(item.address_id)">删除</text>
			</view>
		</view>
		
		<!--按钮-->
		<view class="bg-white wecanui-footer-fixed foot-pb">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red" @tap="AddAddressTap">添加新地址</button>
			</view>
		</view>
		<u-modal :show="deleteShow" @cancel="deleteShow = false" @confirm="confirmFuc" title="设为默认地址" :showCancelButton="true"></u-modal>
	</view>
</template>

<script>
	import {
		getUserAddress,
		deleteUserAddress,
		setUserDefaultAddress
	} from "@/api/common.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				addressList:[],
				deleteShow:false,
				deleteId:''
			}
		},
		onShow() {
			this.pullgetUserAddress();
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			pullgetUserAddress(){
				let that = this;
				getUserAddress().then(res=>{
					if(res.code == 1){
						that.addressList = res.data;
					}
				})
			},
			// 设为默认
			defaAddressTap(id){
			   setUserDefaultAddress({address_id:id}).then(res=>{
				   if(res.code == 1){
					   this.pullgetUserAddress();
				   }
			   })
			},
			//删除地址
			deleteAddress(id){
				this.deleteId = id;
				this.deleteShow = true;
			},
			confirmFuc(){
				deleteUserAddress({address_id:this.deleteId}).then(res=>{
					if(res.code == 1){
						this.deleteShow = false;
						this.pullgetUserAddress();
						uni.showToast({
							icon:'success',
							title:'删除成功!',
							duration:1000
						})
					}
				})
			},
			editAddressTap(id) {
				uni.navigateTo({
					url: '/pages/my/userdata/edit-address?adrid='+id
				});
			},
			AddAddressTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/add-address'
				});
			}
		}
	}
</script>

<style lang="scss">
	.address-card-view {
	    position: relative;
	    margin: 36.36rpx 27.27rpx;
		border-radius: 10.9rpx;
		padding: 18.18rpx;
		.isdefault{
			color:#e54d42;
			border:2rpx solid #e54d42;
			padding:5rpx 10rpx;
			margin-left:20rpx;
			font-size: 20rpx;
		}
		.line-view {
		    position: relative;
		    background: #f9f9f9;
			margin-bottom: 20rpx;
		    height: 2rpx;
		}
		.right-view {
			position: relative;
			text-align: right;
			text {
				&:before {
				    margin-right: 5px;
				}
			}
			text + text {
			    margin-left: 20px;	
			}
		}
	}
	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}
</style>
