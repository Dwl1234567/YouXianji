<template>
	
	<view class="margin-top-xs cu-list card-menu">
		<view class="bg-white arrow margin-bottom-xs padding-tb-xs radius-4" v-for="(item,index) in list_data" :key="index">
			<view class="padding-sm flex justify-between text-sm">
				<view>
					<text class="text-bold text-red">{{item.type_name}}</text>
				</view>
				<view>
					<text class="text-deepblue text-bold">单号:</text>
					<text class="text-darkgrey">{{item.code}}</text>
				</view>
				
			</view>
			<view class="padding-sm flex justify-between text-sm" style="padding-top:0;padding-bottom: 0;">
				<view >
					<text class="text-deepblue text-bold">时间:</text>
					<text class="text-darkgrey">{{item.createtime}}</text>
				</view>
			</view>
			
			<view class="margin-top-xs text-sm">
				<view class="flex"  v-for="(item1,index1) in item.goodslist" :key="index1"  @tap="listTap(item1.id)">
					<view class="flex-sub padding-lr-sm radius">
						<view class="goodsimg"
							:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
					</view>
					<view class="flex-treble padding-lr-sm radius" >
						<view class="flex justify-between">
							<view class="text-deepblue text-sm text-bold">{{item1.name}}</view>
							<view class="text-darkgrey" ></view>
						</view>
						<view class="text-xs">
							<view class="grid col-2">
								<view class="">序列号:{{item1.sn}}</view>
								<view class="">回收:<text class="text-red">{{item1.cost_price}}</text>元</view>
							</view>
							<view class="grid col-2">
								<view class="">调拨:<text class="text-red">{{item1.peer_price}}</text>元</view>
								<view class="">销售:<text class="text-red">{{item1.sales_price}}</text>元</view>
							</view>
							<view class="grid col-3">
								<view>
									<text class="text-bold">回单状态:</text>
									<text v-if="item1.receipt_status == 1">是</text>
									<text v-else>否</text>
								</view>
								<view>
									<text class="text-bold">处理方式:</text>
									<text v-if="item1.is_ok == 1">分拣</text>
									<text v-else>直售</text>
								</view>
								<view>
									<text class="text-bold">是否维修:</text>
									<text v-if="item1.is_wx == 1">是</text>
									<text v-else>否</text>
								</view>
							</view>
							<view class="grid col-3">
								<view>
									<text class="text-bold">维修状态:</text>
									<text v-if="item1.wx_status == 1">待送修</text>
									<text v-else-if="item1.wx_status == 2">已送修</text>
									<text v-else-if="item1.wx_status == 3">已取回</text>
									<text v-else>否</text>
								</view>
								<view>
									<text class="text-bold">是否抛售:</text>
									<text v-if="item1.is_ps >0">是</text>
									<text v-else>否</text>
								</view>
								<view>
									<text class="text-bold">抛售状态:</text>
									<text v-if="item1.ps_status == 1">待抛售</text>
									<text v-else-if="item1.ps_status == 2">抛售中</text>
									<text v-else-if="item1.ps_status == 3">已抛售</text>
									<text v-else>否</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="padding-lr-sm margin-top-sm">
				<view class="grid col-2">
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">回收人:</text>
						<text class="">{{item.name}}</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">客户:</text>
						<text class="">{{item.username}}</text>
					</view>
				</view>
				
				<view class="grid col-2">
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">开单状态:</text>
						<text v-if="item.push_status == 0">正式单</text>
						<text v-else>预制单</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">回收类型:</text>
						<text class="">{{item.types}}</text>
					</view>
					
				</view>
				
				<view class="grid col-2">
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">付款状态:</text>
						<text class="" v-if="item.paystatus == 0">未付款</text>
						<text class="" v-else>已付款</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">审批状态:</text>
						<text v-if="item.status == 0">待审批</text>
						<text v-else-if="item.status == 1">通过</text>
						<text v-else>不通过</text>
					</view>
					
				</view>
				<view class="padding-bottom-sm">
					<text class="text-darkgrey">备注:</text>
					<text class="text-lightgrey">{{item.remark}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'sell0',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			listTap(data) {
				console.log(data)
				/*
				this.$emit('listTap', {
					data
				});*/
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list.card-menu{
		margin-right: 0;
		margin-left: 0;
	}
	.card-menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
</style>
