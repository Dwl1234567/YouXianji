<template>
	<view class="content b-t">
		<view class="address-box" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="padding-tb-sm bg-white margin-top-sm">
				<!-- <view class="">
					<view class="text-sl" v-if="item.is_default">
						<text class="text-red cuIcon-roundcheckfill"></text>
					</view>
					<view class="text-sl" v-else>
						<text class="text-grey cuIcon-roundcheckfill"></text>
					</view>
				</view> -->
				
				<!-- <text class="address">{{item.province.name+item.city.name+item.area.name+' '+item.address}}</text> -->
				<view class="cont-box text-lg title padding-lr-sm">
					<view class="margin-top-xs" style="padding-top:8rpx;">
						<text class="name ">{{item.name}}</text>
						<text class="mobile margin-left-sm ">{{item.mobile}}</text>
					</view>
					<view class="address text-929294 text-sm">{{item.address}}</view>
				</view>
				<view class="bottom flex justify-between padding-lr-sm">
					<view class="">
						<view class="text-xxl" v-if="item.is_default">
							<text class="text-yellow cuIcon-roundcheckfill"></text>
						</view>
						<view class="" v-else style="border: 1px gray solid; border-radius: 20px; width: 20px; height: 20px;">
							<text class="text-white cuIcon-roundcheckfill"></text>
						</view>
					</view>
					<view class="action">
						<view class="yticon margin-right-lg" @click.stop="addAddress('edit', item.id)">编辑</view>
						<view class="yticon " @click.stop="deleteAddress(item.id,index)">删除</view>
					</view>
				</view>
				<!-- <view class="action">
					<text class="yticon icon-bianji margin-right-lg" @click.stop="addAddress('edit', item.id)"></text>
					<text class="yticon icon-lajitong" @click.stop="deleteAddress(item.id,index)"></text>
				</view> -->
			</view>
		</view>

		<button class="add-btn text-color-yellow radius-6 text-xl text-4F4F50" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	import{
		getUserAddress,
		deleteUserAddress
	} from "@/api/common.js"
	import {
		AddressAll,
		AddressDelete
	} from "@/api/mall.js";
	//import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			//barTitle
		},
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option) {
			// console.log(option.source);
			this.source = option.source;
		},
		onShow() {
			this.getList();
		},
		methods: {
			//获取我的收货地址
			async getList() {
				// let list = await this.$api.request('/address/all', 'POST', {
				// 	page: 1,
				// 	pagesize: 50
				// });
				let params = {
					'page':1,
					'pagesize':50
				}
				getUserAddress(params).then(res=>{
					if (res) {
						this.addressList = res.data;
					}
				})
				
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, id = 0) {
				uni.navigateTo({
					url: `/pages/my/address/addressManage?type=${type}&id=${id}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type) {
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);

				console.log(data, type);
			},
			async deleteAddress(id, index) {
				let [error, res] = await uni.showModal({
					title: '确定删除地址？',
					content: this.addressList[index].address
				})

				if (res.confirm) {
					let params = {
						"id":id
					}
					deleteUserAddress(params).then(res=>{
						// let data = await this.$api.request('/address/delete?id=' + id);
						if (res) {
							// if (this.$api.prePage().addressData && this.$api.prePage().addressData.id) {
							// 	if (this.$api.prePage().addressData.id == this.addressList[index].id) {
							// 		this.$api.prePage().addressData = {};
							// 	}
							// }
							
							this.addressList.splice(index, 1);
						}
					})
					
				}

			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
		background: #F0F0F0;
	}
    page{
		background: #F0F0F0;
	}
	.content {
		position: relative;
	}
	.title{
		border-bottom: 1px #D8D8D8 solid;
		padding-bottom: 24px;
		.address{
			margin-top: 7px;
		}
	}
	.bottom{
		padding-top: 20px;
	}
	.address-box {
		.cont-box{
			width:100%;
		}
		.action{
			display: flex;
			justify-content: space-between;
			line-height: 100rpx;
			.yticon{
				line-height: 24px;
				text-align: center;
				width: 63px;
				height: 24px;
				border: 1px solid rgba(216,216,216,1);
				border-radius: 12px;
				font-size: 14px;
				color: #232323;
				font-weight: 400;
			}
		}
	}
	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 25upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
