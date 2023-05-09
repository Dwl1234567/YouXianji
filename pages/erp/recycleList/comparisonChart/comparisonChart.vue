<template>
	<view class="page flex-col">
		<view class="block_1 flex-col">
			<view class="section_2 flex-row justify-between">
				<text class="text_2">最终价格</text>
				<view class="input_1 flex-col" style="width: 200px">
					<input type="text" v-model="receiptPrice" />
				</view>
			</view>
		</view>
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
					<text class="text_5">{{modelName}}</text>
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
					<!-- <text class="paragraph_2">
            物品信息
            <br />
            （4）
          </text>
          <view class="box_4 flex-col">
            <view class="box_5 flex-col">
              <view class="box_6 flex-col">
                <image
                  class="image_2"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_zhijianbaogaoduibitu/SketchPngd3fd274ae21490f8ca656e84d06df9fc9fffbfc9f5d58a2234e0767ad001546b.png"
                />
                <image
                  class="image_3"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_zhijianbaogaoduibitu/SketchPngc420b376bb8ff4dfc30f586ea7952e2b6d13a71806d890ce8b0a49b8c1a9c4ea.png"
                />
                <view class="image-wrapper_1 flex-col">
                  <image
                    class="image_4"
                    referrerpolicy="no-referrer"
                    src="/static/lanhu_zhijianbaogaoduibitu/SketchPng771ba99fef016892c174d1418e8f2a6c50897b554c5a1ff95bca7755ca3b1964.png"
                  />
                </view>
              </view>
            </view>
          </view>
          <text class="paragraph_3">
            物品信息
            <br />
            （4）
          </text> -->
					<view
						id="echarts"
						class="echarts"
						@click="echarts.onClick"
						:prop="optionData"
						:change:prop="echarts.updateEcharts"
					></view>
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
					<image
						class="image_5"
						referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/326f64c9428b49b7be6a6dde77919c89_mergeImage.png"
					/>
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
					<image
						class="icon_1"
						referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPnga597ec45a52edbf114174b4311c090dc456df8afc59303b9e27a69ef8117cd6a.png"
					/>
				</view>
				<view class="box_9 flex-col">
					<view
						class="section_3 flex-row justify-between"
						v-for="(item, index) in Pricepramitems"
						v-if="item.indexs === 1"
						:key="index"
					>
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<view v-if="checkInformation(qualityInfoList[index].valueId, Pricepramitems[index].valueId, index)">
								<!-- {{$httpImage +phoneImgArr[index].photo}} -->
								<view
									class="cu-avatar xl radius"
									:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }"
								>
									<view class="img" @tap="viewImg(phoneImgArr,index)">
										<text class="text"></text>
									</view>
									<!-- {{phoneImgArr[index].photo == ''}} -->
									<view
										class="cu-tag badge"
										:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
										@tap="uploadImg(index)"
									>
										<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
											<u-icon name="plus" color="#ffffff" size="10"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box_14 flex-row justify-between">
					<text class="text_53">成色情况</text>
					<image
						class="icon_2"
						referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png"
					/>
				</view>
				<view class="box_9 flex-col">
					<view
						class="section_3 flex-row justify-between"
						v-for="(item, index) in qualityInfoList"
						v-if="item.indexs == 2"
					>
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<view v-if="checkFineness(qualityInfoList[index].valueId, Pricepramitems[index].valueId, index)">
								<view
									class="cu-avatar xl radius"
									:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }"
								>
									<view class="img" @tap="viewImg(phoneImgArr,index)">
										<text class="text"></text>
									</view>
									<!-- {{phoneImgArr[index].photo == ''}} -->
									<view
										class="cu-tag badge"
										:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
										@tap="uploadImg(index)"
									>
										<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
											<u-icon name="plus" color="#ffffff" size="10"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box_14 flex-row justify-between">
					<text class="text_53">功能情况</text>
					<image
						class="icon_2"
						referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png"
					/>
				</view>
				<view class="box_9 flex-col">
					<view
						class="section_3 flex-row justify-between"
						v-for="(item, index) in qualityInfoList"
						v-if="item.indexs == 3"
					>
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<view v-if="checkFunctional(qualityInfoList[index].valueId, Pricepramitems[index].valueId)">
								<view
									class="cu-avatar xl radius"
									:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }"
								>
									<view class="img" @tap="viewImg(phoneImgArr,index)">
										<text class="text"></text>
									</view>
									<!-- {{phoneImgArr[index].photo == ''}} -->
									<view
										class="cu-tag badge"
										:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
										@tap="uploadImg(index)"
									>
										<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
											<u-icon name="plus" color="#ffffff" size="10"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box_14 flex-row justify-between">
					<text class="text_53">维修情况</text>
					<image
						class="icon_2"
						referrerpolicy="no-referrer"
						src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png"
					/>
				</view>
				<view class="box_9 flex-col">
					<view
						class="section_3 flex-row justify-between"
						v-for="(item, index) in Pricepramitems"
						v-if="item.indexs == 4"
					>
						<view class="text-group_4 flex-col">
							<text class="text_33">{{qualityInfoList[index].key}}</text>
							<text class="text_34">{{qualityInfoList[index].value}}</text>
						</view>
						<view class="text-group_5 flex-col">
							<text class="text_35">{{Pricepramitems[index].key}}</text>
							<text class="text_36">{{Pricepramitems[index].value}}</text>
						</view>
						<view class="box_10 flex-col">
							<view v-if="checkFunctional(qualityInfoList[index].valueId, Pricepramitems[index].valueId)">
								<view
									class="cu-avatar xl radius"
									:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }"
								>
									<view class="img" @tap="viewImg(phoneImgArr,index)">
										<text class="text"></text>
									</view>
									<!-- {{phoneImgArr[index].photo == ''}} -->
									<view
										class="cu-tag badge"
										:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
										@tap="uploadImg(index)"
									>
										<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
											<u-icon name="plus" color="#ffffff" size="10"></u-icon>
										</view>
									</view>
								</view>
							</view>
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
	import { upload } from '@/api/upload.js';
	import { empCreateReceipt } from '@/api/retrieve.js';
	export default {
		data() {
			return {
				setImg: false,
				urls: [],
				uploadImgtype: null,
				addpicicon: 'none',
				priceId: 0,
				modelName: '',
				Priceprams: {},
				receiptPrice: null,
				data: [1, 2, 3],
				phoneImgArr: [],
				loopData0: [
					{
						lanhuBg0:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/1a7ec9be42154e8e848d643e6e0fa0ad_mergeImage.png)',
					},
					{
						lanhuBg0:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/b5e20fdd1ebd476c95ec163fed246fe7_mergeImage.png)',
					},
					{
						lanhuBg0:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/654b8b702c9f4a648e8ecdd2b6601137_mergeImage.png)',
					},
					{
						lanhuBg0:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c9e497210c7f49c29a3f0e089004fcca_mergeImage.png)',
					},
					{
						lanhuBg0:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/d2072cb6a71c48058875a07e9c3c8fe4_mergeImage.png)',
					},
				],
				loopData1: [
					{ lanhutext0: '屏幕显示', lanhutext1: '显示色差' },
					{ lanhutext0: '屏幕显示', lanhutext1: '显示色差' },
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
						indicator: [
							{ name: '物品信息', max: 0 },
							{ name: '成色情况', max: 0 },
							{ name: '功能情况', max: 0 },
							{ name: '维修情况', max: 0 },
						],
					},
					series: [
						{
							name: 'Budget vs spending',
							type: 'radar',
							data: [
								{
									value: [0, 0, 0],
									// name: 'Allocated Budget'
								},
							],
						},
					],
				},
			};
		},
		onLoad(option) {
			this.urls = uni.getStorageSync('imgList');
			this.priceId = option.priceId;
			// 指导价
			this.forecastMoney = option.forecastMoney;
			this.receiptPrice = option.forecastMoney;
			// 整理三角雷达图每个角落的max值
			this.optionData.radar.indicator[0].max = uni.getStorageSync('dataListNum')[0];
			console.log(this.optionData.radar.indicator[0].max);
			this.optionData.radar.indicator[1].max = uni.getStorageSync('dataListNum')[1];
			this.optionData.radar.indicator[2].max = uni.getStorageSync('dataListNum')[2];
			this.optionData.radar.indicator[3].max = uni.getStorageSync('dataListNum')[3];
			this.modelName = uni.getStorageSync('modelName');
			this.Priceprams = uni.getStorageSync('Priceprams');
			this.qualityInfoList = uni.getStorageSync('qualityInfoList');
			this.Pricepramitems = uni.getStorageSync('Pricepramitems');
			this.Pricepramitems.map((item) => {
				this.phoneImgArr.push({
					propKeyId: item.keyId,
					photo: '',
				});
			});
			this.qualityInfo = uni.getStorageSync('qualityInfo');
			this.recycleOrderId = uni.getStorageSync('recycleOrderId');
		},
		methods: {
			deleteImg(type) {
				let that = this;
				that.pImgDeleteStatus = true;
				if (!that.phoneImgArr[type]) {
					return false;
				}
				that.phoneImgArr[type].photo = '';
			},
			uploadImg(type) {
				if (this.phoneImgArr[type].photo == '') {
					this.optionData.series[0].data[0].value = [0, 0, 0];
					let that = this;
					that.uploadImgtype = type;
					uni.navigateTo({
						url: '/pages/idphoto/idphoto',
					});
				} else {
					const a = this.optionData.series[0].data[0].value.map((item) => {
						const i = item / 2;
						return i;
					});
					this.optionData.series[0].data[0].value = a;
					this.deleteImg(type);
				}
			},
			//设置图片
			setImage(e) {
				let that = this;
				//显示在页面
				let Imgdata = [];
				Imgdata.push(e.path);
				upload(Imgdata).then((res) => {
					that.phoneImgArr[that.uploadImgtype].photo = res.fileName;
				});
			},
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
				} else {
				}
			},
			//查看图片
			viewImg(url, index) {
				//需要分割url并去除空数组
				if (url) {
					const urll = url.map((item) => {
						return this.$httpImage + item;
					});
					if (url[index]) {
						uni.previewImage({
							current: index,
							urls: urll,
						});
					}
				} else {
				}
			},
			checkInformation(left, right, index) {
				// console.log(33333);
				// console.log(this.optionData.series[0].data[0].value);
				// if (this.setImg) {
				// 	console.log(this.optionData.series[0].data[0].value);
				// 	if (left === right) {
				// 		return false;
				// 	} else {
				// 		this.optionData.series[0].data[0].value[0] = this.optionData.series[0].data[0].value[0] + 1;
				// 	}
				// }
				this.$nextTick(() => {
					if (left === right) {
						return false;
					} else {
						this.optionData.series[0].data[0].value[0] = this.optionData.series[0].data[0].value[0] + 1;
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
				let receiptQualityPhotoList = [];
				this.phoneImgArr.map((item) => {
					if (item.photo !== '') {
						receiptQualityPhotoList.push(item);
					}
				});
				let deviceLabel = uni.getStorageSync('goodsdesc');
				empCreateReceipt({
					deviceLabel: deviceLabel,
					basicPriceId: this.priceId,
					receiptGuidePrice: Number(this.forecastMoney),
					receiptPrice: this.receiptPrice,
					qualityInfoList: JSON.stringify(this.Pricepramitems),
					qualityInfo: JSON.stringify(this.Priceprams),
					recycleOrderId: this.recycleOrderId,
					receiptQualityPhotoList: receiptQualityPhotoList,
					receiver: uni.getStorageSync('createById'),
					deviceId: uni.getStorageSync('deviceId'),
				}).then((res) => {
					uni.navigateTo({
						url: '/pages/erp/recycleList/index',
					});
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
