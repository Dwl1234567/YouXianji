<template>
	<view class="content">
		<view class="header">
			<view class="left">
				{{PhoneName}}
			</view>
			<view class="right" v-if="ProcessShow">
				当前进度 {{Process}}
			</view>
		</view>
		<!-- main -->
		<view class="process-box">
			<scroll-view style="height: 100vh;" :scroll-y="true" class="scroll-Y" :scroll-into-view="scrollId">
				<view class="recy-item" v-if="isNew == 1" id="item-000">
					<!-- tag 标题 -->
					<view class="title">
						<text>{{isnewDataList.name}}</text>
					</view>
					<!-- check-list -->
					<view class="check-list-box">
						<view class="item" v-for="(checkitem,checkindex) in isnewDataList.children" :key="checkindex"
							@click="isnewclick(checkitem,checkindex)"
							:style="{backgroundColor:checkitem.check ? '#e54d42':'#eeeeee',color:checkitem.check ? '#FFFFFF':'#999999'}">
							{{checkitem.name}}
						</view>
					</view>
				</view>
				<!-- <RecyclingList v-if="isNew == 1" v-show="isnewDataList.show" :isnew="isNew" :title="isnewDataList.name" :checklist="isnewDataList.children" @itemclick="isnewclick"></RecyclingList> -->
				<view v-for="(item,index) in liuchengDataList" :key="index" :id="'item-'+index">
					<RecyclingList :patIndex="index" v-show="item.show" :title="item.name" :checklist="item.children"
						@itemclick="selectclick">
					</RecyclingList>
				</view>
			</scroll-view>
		</view>
		<view class="getoffer-box">
			<u-button text="获取报价" :disabled="!showoffer"
				:customStyle="{height:'88rpx',borderRadius:'30rpx',color:'#ffffff',backgroundColor:'#e54d42'}"
				@click="getGodsgoodsPrice"></u-button>
		</view>
	</view>
</template>

<script>
	import RecyclingList from '@/components/RecyclingList/RecyclingList.vue';

	import {
		GodsgoodsDetail,
		GodsgoodsPrice
	} from "@/api/common.js"

	export default {
		components: {
			RecyclingList
		},
		data() {
			return {
				goodsId: '',
				PhoneName: '--',
				isNew: 0,
				Process: '1/7',
				ProcessShow: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				checkData: [],
				goodsInfo: '',
				allDataList: [],
				isnewDataList: [],
				liuchengDataList: [],
				showoffer: false,
				Priceprams: {},
				scrollId: ''
			}
		},
		onLoad(option) {
			// console.log(option);
			this.goodsInfo = option;
			this.goodsId = option.id;
			this.isNew = Number(option.isnew);
			// console.log(this.isNew);
			this.getGodsgoodsDetail();
		},
		methods: {
			// 获取报价步骤
			getGodsgoodsDetail() {
				let that = this;
				let params = {
					'goods_id': that.goodsInfo.id,
					'cate_id': that.goodsInfo.cateid
				}
				GodsgoodsDetail(params).then(res => {
					let data = res.data;
					if (res.code == 1) {
						that.allDataList = res.data;
						// console.log(that.isNew);
						if (that.isNew == 1) {
							that.isnewDataList = data.attr_data;
							that.isnewDataList.children = that.isnewDataList.children.filter((item) => {
								item.check = false;
								return item
							})
							that.isnewDataList['show'] = true;
							// console.log(that.isnewDataList);
						} else {
							that.liuchengDataList = data.attr_data;
							that.liuchengDataList.map((item, index) => {
								if (index == 0) {
									item['show'] = true;
								} else {
									item['show'] = false;
								}
							})
						}
						that.PhoneName = data.name
					}
				})
			},
			// 获取报价
			getGodsgoodsPrice() {
				let that = this;
				that.Priceprams['goods_id'] = that.goodsInfo.id;
				that.Priceprams['cate_id'] = that.goodsInfo.cateid;
				GodsgoodsPrice(that.Priceprams).then(res => {
					let data = res.data;
					if (res.code == 1) {
						uni.navigateTo({
							url: 'preview?money=' + data.money + '&model=' + that.PhoneName +
								'&detailId=' + data.detail_id
						})
					}
				})
			},
			isnewclick(data, index1) {
				// console.log(data);
				let that = this;
				let index = index1;
				if (that.isnewDataList.children[index1].check) {
					return false;
				}
				that.showoffer = false;
				that.Priceprams['attr_1'] = data.key_value;
				that.isnewDataList.children.forEach((item, index2) => {
					item.check = index === index2 ? true : false
					// return item
				})
				// console.log(that.Priceprams);
				that.liuchengDataList = that.isnewDataList.children[index].children;
				that.liuchengDataList.map((item, index) => {
					if (index == 0) {
						item['show'] = true;
					} else {
						item['show'] = false;
					}
				})
				// console.log(that.liuchengDataList);
			},
			selectclick(data) {
				let that = this;
				if (data == 'tiaozou') {
					that.liuchengDataList = that.liuchengDataList.filter((item, index) => {
						if (index >= 1) {
							item.show = false;
						}
						return item;
					})
					// console.log(that.liuchengDataList)
					return false;
				}
				let parindex = data.parindex;
				that.Priceprams['attr_' + (parindex + 1)] = data.keyvalue;

				// if(that.Priceprams['attr_1'] == 'a0'){
				// 	if (parindex >= that.liuchengDataList.length) {
				// 		that.showoffer = true;
				// 	}
				// }else{
				// 	if (parindex >= that.liuchengDataList.length - 1) {
				// 		that.showoffer = true;
				// 	}
				// }
				if (parindex >= that.liuchengDataList.length) {
					that.showoffer = true;
					return false;
				}

				that.liuchengDataList[parindex]['show'] = true;
				this.$set(this.liuchengDataList, parindex, that.liuchengDataList[parindex]);
				setTimeout(() => {
					that.scrollId = 'item-' + (parindex);
				}, 200)

			},

			clickTips(data) {
				console.log(data)
			},
			upper: function(e) {
				// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// this.scrollTop = this.old.scrollTop
				// this.$nextTick(() => {
				// 	this.scrollTop = 0
				// });
				// uni.showToast({
				// 	icon: "none",
				// 	title: "纵向滚动 scrollTop 值已被修改为 0"
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 80rpx;
		padding-bottom: 180rpx;
	}

	.header {
		position: fixed;
		/* #ifndef H5 */
		// top: var(--status-bar-height);
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 80rpx;
		/* #endif */
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		border-bottom: 2rpx solid #dddddd;
		z-index: 999;
		background-color: #FFFFFF;

		.left {
			font-size: 32rpx;
		}

		.right {
			font-size: 30rpx;
			color: #1CBBB4;
		}
	}

	.process-box {
		width: 100%;
	}

	.getoffer-box {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
	}

	.recy-item {
		width: 100%;
		padding: 20rpx 30rpx;

		.title {
			width: 100%;
			text-align: left;
			font-size: 32rpx;
			border-left: 6rpx solid $uni-color-success;
			border-bottom: 2rpx solid #EEEEEE;
			padding-left: 20rpx;
			padding-bottom: 20rpx;
		}

		.check-list-box {
			padding: 0 10rpx;

			.active {
				background-color: $uni-color-success !important;
				color: #FFFFFF !important;
			}

			.item {
				position: relative;
				background-color: #eeeeee;
				color: #999999;
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;
				text-align: center;
				font-size: 30rpx;
			}
		}
	}
</style>
