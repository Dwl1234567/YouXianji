<template>
	<view>
		<view class="margin">
			<view class="cu-list solids-top">
				<view class="cu-item bg-white padding margin-bottom-sm" v-for="(item,index) in dataList">
					<view class="content">
						<view class="flex justify-between">
							<view>订单号:{{item.out_trade_no}}</view>
							<view class="cu-tag bg-red sm radius margin-left-xs" v-if="item.pay_type == 1">在线支付</view>
							<view class="cu-tag bg-red sm radius margin-left-xs" v-if="item.pay_type == 2">到货付款</view>
							<view class="cu-tag bg-red sm radius margin-left-xs" v-if="item.pay_type == 3">微信支付</view>
							<view class="cu-tag bg-red sm radius margin-left-xs" v-if="item.pay_type == 4">支付宝付</view>
						</view>
						<view class="text-gray text-content flex justify-around">
							<view class="">
								订单金额：
								<text class="text-red">{{item.order_price}}</text>
							</view>
							<view class="">
								实付金额：
								<text class="text-red">{{item.total_price}}</text>
							</view>
						</view>
						<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
							<view class="cu-list menu-avatar">
								<view class="cu-item arrow" v-for="(item1,index1) in item.goodslist" :key="index1">
									<view class="cu-avatar radius lg"
										:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
									<view class="content padding-tb-sm">
										<view class="text-grey">{{item1.title}}</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut">
												{{item1.spec}}
											</view>
										</view>
									</view>
									<view class="action">
										<view class="text-red text-sm">{{item1.price}}</view>
										<view class="sm">x{{item1.number}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.createtime}}</view>
							<view v-if="item.have_deliverede == 0">
								<text class="cu-btn bg-deepblue sm radius" @tap="showModal(item.id)"
									data-target="DialogModal1">去发货</text>
							</view>
						</view>

						<view class="margin-top-sm ">
							<view class="cu-steps">
								<view class="cu-item " :class="item.have_paid != 0 ? 'text-red':''">
									<text class="cuIcon-roundcheckfill"></text>
									已支付
								</view>
								<view class="cu-item" :class="item.have_deliverede != 0 ? 'text-red':''">
									<text class="cuIcon-roundcheckfill"></text>
									已发货
								</view>
								<view class="cu-item" :class="item.have_received != 0 ? 'text-red':''">
									<text class="cuIcon-roundcheckfill"></text>
									已收货
								</view>
								<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
									<text class="cuIcon-roundcheckfill"></text>
									已评论
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">发货</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<view class="cu-form-group margin-top">
								<view class="title">选择快递公司</view>
								<picker @change="PickerChange" :value="index" :range="picker" range-key="name">
									<view class="picker">
										{{index>-1?picker[index].name:'请选择快递公司'}}
									</view>
								</picker>
							</view>
							<view class="cu-form-group">
								<view class="title">快递单号</view>
								<input placeholder="请输入快递单号" v-model="expressnumber" name="input"></input>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="confirmModal">确定</button>

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		erporderlist,
		erporderdelivery
	} from "@/api/erpapi.js"
	export default {
		data() {
			return {
				modalName: null,
				picker: [],
				expressnumber:'',
				orderid:'',
				index: -1,
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				ifBottomRefresh: false,
			};
		},
		onLoad() {
			//加载虚拟数据
			this.$nextTick(() => {
				uni.startPullDownRefresh({})
			})
		},
		onPullDownRefresh() {
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			// 获取列表
			getDataList() {
				let that = this;
				let paramsData = {
					...that.queryInfo
				}
				erporderlist(paramsData).then(res => {
						let data = res.data.list;
						if (data) {
							this.picker = res.data.express;
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'

						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			showModal(e) {
				this.modalName = 'DialogModal1'
				this.orderid = e;
			},
			confirmModal(){
				
				if(this.index == -1){
					return 	this.$u.toast('请选择快递公司');
				}
				if(!this.expressnumber){
					return 	this.$u.toast('请输入订单号');
				}
				erporderdelivery({
					order_id:this.orderid,
					express_number:this.expressnumber,
					express_company:this.picker[this.index].value
				}).then(res=>{
					this.$u.toast('发货成功！');
					this.modalName = null;
					uni.startPullDownRefresh({
						
					})
				})
			},
			hideModal(e) {
				this.modalName = null
			},
			PickerChange(e) {
				console.log(e);
				this.index = e.detail.value
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		padding-bottom: 100upx;
	}

	.cu-modal {
		z-index: 99;
	}
</style>
