<template>
	<view>
		<!--标题栏-->
		<!-- 	<bar-title bgColor="bg-white" isBack>
			<block slot="content">收款管理</block>
		</bar-title> -->

		<!--列表-->
		<block v-for="(item,index) in bankList" :key="index">
			<view class="bg-red pay-card-view padding shadow margin-top" :class="item.accountType === 0 ? 'weixin' : item.bank_type === 1 ? 'zhifubao' : 'bank'" @tap="editPayTap(item.accountId)">
				<view class="flex text-black text-lg" > 
				<!-- @tap="editPayTap(item.id)" -->
					<view class="cu-avatar  margin-right round lg"  />
					<view class="flex-sub text-left">
						<view class="text-white">
							{{item.bankName}}
						</view>
						<view class="margin-tb text-xxl text-white">
							{{item.accountNo}}
						</view>
					</view>
				</view>
				<view class="right-view">
					<text v-if="item.defaultAble == 0" class="cuIcon-write"
						@tap.stop="handleDefaultBankFuc(item.accountId)">设为默认</text>
					<!-- <text class="cuIcon-write" @tap="editPayTap(item.id)">编辑</text> -->
					<text class="cuIcon-delete" @tap.stop="deleteBankFuc(item.accountId)">删除</text>
				</view>
			</view>
		</block>

		<!--按钮-->
		<view class="bg-white button">
			<view class="flex flex-direction">
				<button class="cu-btn bg-white" @tap="AddPayTap">
					添加银行卡
				</button>
			</view>
		</view>
		<u-modal :show="showConfirm" @cancel="showConfirm = false" @confirm="confirmFuc" title="确定要删除吗？"
			:showCancelButton="true"></u-modal>
	</view>
</template>

<script>
	import {
		handleDefaultBank,
		getBankList,
		deleteBank
	} from "@/api/common.js";
	import {
		defaltUserAccount,
		delectUserAccount,
		userAccountList
	} from "@/api/commons.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				nums: '',
				tempico: '',
				bankList: [],
				showConfirm: false,
				deleteBankId: ''
			}
		},
		onLoad() {
			let str = '工商';
			if (str.indexOf('工商') != -1) {
				this.tempico = '/static/bank/icbc.png';
			} else {
				this.tempico = '';
			}
		},
		onShow() {
			this.getBankListInfo();
		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			editPayTap(id) {
				uni.navigateTo({
					url: '/pages/my/pay/edit-pay?bankid=' + id
				});
			},
			AddPayTap() {
				uni.navigateTo({
					url: '/pages/my/pay/add-pay'
				});
			},
			// 获取银行卡列表
			getBankListInfo() {
				let that = this;
				userAccountList().then(res => {
					// console.log(res);
					if (res.code == 200){
						that.bankList = res.rows;
					}
				})
			},
			// 设为默认
			handleDefaultBankFuc(id) {
				let that = this;

				defaltUserAccount(id).then(res => {
					if (res.code) {
						this.getBankListInfo();
						uni.showToast({
							icon: 'success',
							title: '设置成功!',
							duration: 1000
						})
					}
				})
			},
			//删除地址
			deleteBankFuc(id) {
				this.deleteBankId = id;
				this.showConfirm = true;
			},
			confirmFuc() {
				let that = this;
				delectUserAccount(this.deleteBankId).then(res => {
					if (res.code == 200){
						that.showConfirm = false;
						that.getBankListInfo();
						uni.showToast({
							icon: 'success',
							title: '删除成功!',
							duration: 1000
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: #F0F0F0;
	}
		
	.button{
		margin-top: 21px;
	}
	.cu-btn{
		height: 54px;
		line-height: 54px;
	}
	.bank{
		background-image: url('https://storage.youxianji.cc/images/20230313150224640eca800ccfb.png');
		background-size: 100%;
	}
	.weixin{
		background: url('https://storage.youxianji.cc/images/20230313150156640eca6461120.png');
		background-size: 100%;
	}
	.zhifubao{
		background: url('https://storage.youxianji.cc/images/20230313150013640ec9fd3db7c.png');
		background-size: 100%;
	}
	.pay-card-view {
		position: relative;
		margin: 36.36rpx 27.27rpx;
		border-radius: 10.9rpx;

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

			text+text {
				margin-left: 20px;
			}
		}
	}

	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}

	.cu-avatar {
		width: 48rpx;
		height: 48rpx;
	}
</style>
