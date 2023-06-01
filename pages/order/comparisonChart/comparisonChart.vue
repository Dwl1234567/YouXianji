<template>
	<view class="page flex-col">
		<view class="block_2 flex-col">
			<view class="group_1 flex-row">
				<!-- <view class="group_2 flex-col"></view> -->
				<text class="text_71">验机评估报告</text>
			</view>
			<view class="group_3 flex-row">
				<view class="box_1 flex-col">
					<text class="text_4">隐私清除&nbsp;|&nbsp;专业验机&nbsp;|&nbsp;整机清洁</text>
				</view>
				<view class="box_2 flex-col"></view>
			</view>
			<view class="group_5 flex-col">
				<view class="text-wrapper_1 flex-row justify-between">
					<!-- <text class="text_5">{{modelName}}</text> -->
					<text class="text_6">质检时间:2023-04-12</text>
				</view>
				<view class="image-text_1 flex-row justify-between">
					<view class="single-avatar_1 flex-col"></view>
					<view class="text-group_1 flex-col">
						<text class="text_7">刘康维</text>
						<text class="text_8">官方认证&nbsp;|&nbsp;验机工程师&nbsp;|&nbsp;已检测4567件</text>
					</view>
				</view>
				<text class="text_9">本机价格影响因素</text>
				<view class="box_3 flex-row justify-between">
					<view id="echarts" class="echarts" @click="echarts.onClick" :prop="optionData"
						:change:prop="echarts.updateEcharts"></view>
				</view>
				<text class="paragraph_4">
					本机价格影响因素
					<br />
					(12张）
				</text>
				<view class="box_7 flex-row justify-between">
					<view class="list_1 flex-row">
						<!-- <view
							class="list-items_1 flex-col"
							:style="{ 'background': item }"
							v-for="(item, index) in urls"
							:key="index"
						></view> -->
						<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
							<view class="scroll-view-item_H demo-text-1" v-for="(item, index) in urls" @tap="viewImgs(urls, index)">
								<image :src="item" mode="aspectFit" style="width: 122rpx; height: 122rpx"></image>
							</view>
						</scroll-view>
					</view>
					<image class="image_5" referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/326f64c9428b49b7be6a6dde77919c89_mergeImage.png" />
				</view>
				<text class="text_27">本机质检报告</text>
				<view class="box_8 flex-row">
					<view class="text-group_2 flex-col">
						<text class="text_28">用户</text>
						<text class="text_29">物品信息</text>
					</view>
					<view class="text-group_3 flex-col">
						<text class="text_30">平台质检</text>
						<text class="text_31">物品信息</text>
					</view>
					<text class="text_32">图片</text>
					<image class="icon_1" referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPnga597ec45a52edbf114174b4311c090dc456df8afc59303b9e27a69ef8117cd6a.png" />
				</view>
				<view class="box_9 flex-col">
					<view class="section_3 flex-row justify-between" v-for="(item, index) in Pricepramitems"
						v-if="item.indexs === 1" :key="index">
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<image :src="Pricepramitems[index].pic" mode="" style="width: 65rpx;height: 65rpx;"></image>
						</view>
					</view>
				</view>
				<view class="box_14 flex-row justify-between">
					<text class="text_53">成色情况</text>
					<image class="icon_2" referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
				</view>
				<view class="box_9 flex-col">
					<view class="section_3 flex-row justify-between" v-for="(item, index) in qualityInfoList"
						v-if="item.indexs == 2">
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<image :src="Pricepramitems[index].pic" mode="" style="width: 65rpx;height: 65rpx;"></image>
						</view>
					</view>
				</view>
				<view class="box_14 flex-row justify-between">
					<text class="text_53">功能情况</text>
					<image class="icon_2" referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
				</view>
				<view class="box_9 flex-col">
					<view class="section_3 flex-row justify-between" v-for="(item, index) in qualityInfoList"
						v-if="item.indexs == 3">
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<image :src="Pricepramitems[index].pic" mode="" style="width: 65rpx;height: 65rpx;"></image>
						</view>
					</view>
				</view>
				<view class="box_14 flex-row justify-between">
					<text class="text_53">维修情况</text>
					<image class="icon_2" referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
				</view>
				<view class="box_9 flex-col">
					<view class="section_3 flex-row justify-between" v-for="(item, index) in Pricepramitems"
						v-if="item.indexs == 4">
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<image :src="Pricepramitems[index].pic" mode="" style="width: 65rpx;height: 65rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block_4 flex-col">
			<button class="button_1 flex-col" @click="onClick_1">
				<text class="text_72">提交订单</text>
			</button>
		</view>
	</view>
</template>
<script>
	import {
		selectReceiptDetail,
		agreeReceipt
	} from '@/api/commons.js';
	export default {
		data() {
			return {
				urls: [],
				receiptId: 0,
				receiptPrice: null,
				loopData0: [{
						lanhuBg0: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/1a7ec9be42154e8e848d643e6e0fa0ad_mergeImage.png)',
					},
					{
						lanhuBg0: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/b5e20fdd1ebd476c95ec163fed246fe7_mergeImage.png)',
					},
					{
						lanhuBg0: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/654b8b702c9f4a648e8ecdd2b6601137_mergeImage.png)',
					},
					{
						lanhuBg0: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c9e497210c7f49c29a3f0e089004fcca_mergeImage.png)',
					},
					{
						lanhuBg0: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/d2072cb6a71c48058875a07e9c3c8fe4_mergeImage.png)',
					},
				],
				loopData1: [{
						lanhutext0: '屏幕显示',
						lanhutext1: '显示色差'
					},
					{
						lanhutext0: '屏幕显示',
						lanhutext1: '显示色差'
					},
				],
				constants: {},
				Pricepramitems: [],
				qualityInfoList: [],
				qualityInfo: {},
				recycleOrderId: '',
				receiptQualityPhotoList: [],
				optionData: {
					title: {
						text: '',
					},
					legend: {
						data: ['Allocated Budget', 'Actual Spending'],
					},
					radar: {
						// shape: 'circle',
						indicator: [{
								name: '物品信息',
								max: 0
							},
							{
								name: '成色情况',
								max: 0
							},
							{
								name: '功能情况',
								max: 0
							},
						],
					},
					series: [{
						name: 'Budget vs spending',
						type: 'radar',
						data: [{
							value: [0, 0, 0],
							// name: 'Allocated Budget'
						}, ],
					}, ],
				},
			};
		},
		onLoad(option) {
			this.receiptId = option.receiptId;
			this.selectReceiptDetail(option.receiptId);
		},
		methods: {
			//查看图片
			viewImgs(url, index) {
				//需要分割url并去除空数组
				if (url) {
					if (url[index]) {
						uni.previewImage({
							current: index,
							urls: url,
						});
					}
				} else {}
			},
			selectReceiptDetail(receiptId) {
				selectReceiptDetail(receiptId).then(res => {
					if (res.code == 200) {
						this.qualityInfoList = JSON.parse(res.data.orderQualityInfo.qualityInfoList);
						this.Pricepramitems = JSON.parse(res.data.receiptQualityInfo.qualityInfoList);
						let urls = []
						if (res.data.orderQualityInfo.backPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.backPhoto)
						}
						if (res.data.orderQualityInfo.bottomPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.bottomPhoto)
						}
						if (res.data.orderQualityInfo.cameraPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.cameraPhoto)
						}
						if (res.data.orderQualityInfo.frontPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.frontPhoto)
						}
						if (res.data.orderQualityInfo.leftPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.leftPhoto)
						}
						if (res.data.orderQualityInfo.rightPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.rightPhoto)
						}
						if (res.data.orderQualityInfo.topPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.topPhoto)
						}
						if (res.data.orderQualityInfo.otherPhoto) {
							urls.push(this.$httpImage + res.data.orderQualityInfo.otherPhoto)
						}
						this.urls = urls
						this.Pricepramitems.map(item => {
							let pic = ''
							for (let key in res.data.receiptQualityPhoto) {
								if (item.keyId == key) {
									pic = this.$httpImage + res.data.receiptQualityPhoto[key]
								}
							}
							item.pic = pic
							return
						})
						// 整理三角雷达图每个角落的max值
						this.Pricepramitems.map(item => {
							if (item.indexs === 1) {
								this.optionData.radar.indicator[0].max = this.optionData.radar.indicator[0].max + 1
							} else if (item.indexs === 2) {
								this.optionData.radar.indicator[1].max = this.optionData.radar.indicator[1].max + 1
							} else if (item.indexs === 3) {
								this.optionData.radar.indicator[2].max = this.optionData.radar.indicator[2].max + 1
							}
						})
					}
				})
			},
			checkInformation(left, right, index) {
				console.log(left, right, index);
				this.$nextTick(() => {
					if (left === right) {
						return false;
					} else {
						this.optionData.series[0].data[0].value[0] = this.optionData.series[0].data[0].value[0] + 1;
						console.log(this.optionData.series[0].data[0].value[0]);
						return true;
					}
				});
				if (left === right) {
					return false;
				} else {
					// this.optionData.series[0].data[0].value[2] = this.optionData.series[0].data[0].value[2] + 1;
					return true;
				}
			},
			checkFineness(left, right) {
				this.$nextTick(() => {
					if (left === right) {
						return false;
					} else {
						this.optionData.series[0].data[0].value[1] = this.optionData.series[0].data[0].value[1] + 1;
						return true;
					}
				});
				if (left === right) {
					return false;
				} else {
					// this.optionData.series[0].data[0].value[2] = this.optionData.series[0].data[0].value[2] + 1;
					return true;
				}
			},
			checkFunctional(left, right) {
				this.$nextTick(() => {
					if (left === right) {
						return false;
					} else {
						this.optionData.series[0].data[0].value[2] = this.optionData.series[0].data[0].value[2] + 1;
						return true;
					}
				});
				if (left === right) {
					return false;
				} else {
					// this.optionData.series[0].data[0].value[2] = this.optionData.series[0].data[0].value[2] + 1;
					return true;
				}
			},
			onClick_1() {
				agreeReceipt(this.receiptId).then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: '/pages/order/recycle/list?type=2'
						})
					}
				});
			},
		},
	};
</script>
<script module="echarts" lang="renderjs">
	import * as echarts from 'echarts';
	let myChart;
	export default {
		mounted() {
			this.initEcharts()
		},
		methods: {
			//初始化
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				myChart && myChart.setOption && myChart.setOption(this.optionData)
			},
			// 监听逻辑层配置变化
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				myChart && myChart.setOption && myChart.setOption(newValue)

			},
			onClick(event, ownerInstance) {
				//修复H5端tooltip不显示,app端tooltip不好点击显示问题
				const touche = event.changedTouches[0];
				const x = touche.pageX;
				const y = touche.pageY - event.target.offsetTop;
				var xIndex = myChart.convertFromPixel({
					seriesIndex: 0
				}, [x, y])[0];
				myChart.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: xIndex
				});
			}
		}
	}
</script>
<style lang="css">
	@import './common.css';
	@import './index.rpx.css';

	.echarts {
		width: 90%;
		height: 600rpx;
	}

	.page-section-spacing {
		margin-top: 60rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
	}

	.scroll-view-item {
		height: 300rpx;
	}

	.scroll-view-item_H {
		margin-left: 20rpx;
		display: inline-block;
		/* width: 100%; */
		/* height: 300rpx; */
	}

	.scroll-view-item_H:first-child {
		margin-left: 0px;
	}
</style>