<template>
	<view>
		<view class="bg-white radius-4">
			<view class="cu-form-group">
				<view class="title">销售单号</view>
				<view class="cu-capsule radius" @tap="sellorderTap">
					<view class="">
						{{sellInfo.sellFormNo ? sellInfo.sellFormNo :'请选择销售单'}}
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">退款金额</view>
				<input placeholder="请输入退款金额" v-model="ReceivablesMoney"></input>
			</view> -->
			<!--拍照-->
			<view class="cu-form-group pingzheng">
				<view class="title">客户收款账户</view>
				<view class="cu-capsule round" @tap="paiTap">
					<view class="cu-tag bg-deepblue">
						<text class="cuIcon-camera text-white"></text>
					</view>
					<view class="cu-tag line-deepblue">
						图
					</view>
				</view>
			</view>
			<view class="cu-form-group" v-if="imgList.length > 0">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
				</view>
			</view>
			<u-action-sheet :actions="upimageList" :closeOnClickAction="true" @close="closeUpimg" :cancelText="'取消'"
				@select="selectUpimg" :show="showupimage"></u-action-sheet>
			<view class="cu-form-group" style="border:2rpx solid #EEEEEE">
				<textarea class="textarea" maxlength="-1" placeholder="请输入备注信息" v-model="remark" name="input"></textarea>
			</view>

			<view class="margin">
				<view class="flex flex-direction">
					<button class="cu-btn bg-red radius-4 margin-tb-sm lg" @click="actionTap">退款申请</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		returnRegistration
	} from "@/api/erp.js"
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		raiseUpload
	} from "@/api/upload.js";
	export default {
		components: {},
		data() {
			return {
				sellInfo: {},
				ReceivablesMoney: '',
				imgList: [], //回收图片
				upgetimgList: [], //回收图片
				showupimage: false,
				btnStatus: false,
				upimageList: [{
						name: '拍照',
						value: 1,
					},
					{
						name: '相册选图',
						value: 2,
					}
				],
				remark: ''

			}
		},
		onLoad() {

			// 进入页面刷新
			/*
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
			*/
		},
		onShow() {
			let that = this;
			that.sellInfo = uni.getStorageSync('updatesell')
			//打印code
			console.log(that.sellInfo)
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 下拉刷新
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
			sellorderTap() {
				//去选择销售单
				uni.navigateTo({
					url: '/pages/erp/sell/list'
				});
			},
			actionTap() {
				//提交接口
				let that = this;
				if (that.btnStatus) {
					return that.$u.toast('提交中，请稍等……');
				}
				that.btnStatus = true;
				//销售单号
				// if (!that.sellInfo.code) {
				// 	that.btnStatus = false;
				// 	return that.$u.toast('请选择销售单号');
				// }
				// if (that.sellInfo.fundsReceived < that.ReceivablesMoney) {
				// 	return that.$u.toast('退款金额大于销售金额');
				// }
				// if (that.ReceivablesMoney == 0) {
				// 	that.btnStatus = false;
				// 	return that.$u.toast('请填写退款金额');
				// }
				if (that.imgList.length == 0) {
					that.btnStatus = false;
					return that.$u.toast('请上传客户收款账户');
				}
				let promisearr = [];

				that.imgList.forEach((item, index) => {
					promisearr.push(raiseUpload(item));
				})

				Promise.all(promisearr).then((res) => {
						// console.log(res);
						res.forEach((iii) => {
							that.upgetimgList.push(iii.fileName);
						})
					})
					.finally(() => {
						that.refundTap();
					})
			},
			refundTap() {
				let that = this;
				let paramsData = {};
				paramsData['sellFormId'] = that.sellInfo.sellFormId;
				paramsData['returnPrice'] = that.ReceivablesMoney;
				paramsData['remark'] = that.remark;
				paramsData['returnVoucher'] = that.upgetimgList.join(',');
				returnRegistration(paramsData).then(res => {
						that.btnStatus = false;
						if (res.code == 200) {
							// uni.$u.toast(res.msg);
							uni.removeStorage('updatesell')
							this.sellInfo = {}
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/erp/sell/out"
								});
							}, 1000)
						} else {
							uni.$u.toast(res.msg);
						}
					})
					.catch(err => {
						that.btnStatus = false;
						uni.$u.toast(err.msg);
					})
			},
			paiTap() {
				console.log('拍照、选图');
				this.showupimage = true;
			},
			closeUpimg() {
				this.showupimage = false;
			},
			selectUpimg(e) {
				console.log(e);
				if (e.value == 1) {
					this.opencamare();
				} else {
					this.openpictrue();
				}
			},
			// 使用拍照功能
			opencamare() {
				let that = this;
				let openimg_num = Number(that.imgList.length)
				let uplength = 9 - openimg_num;
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						console.log(that.imgList);
						return;
					},
					complete: function() {
						that.checkimgshow = false;
					}

				});
			},
			// 使用相册功能
			openpictrue() {
				let that = this;
				let imgNumber = 0;
				imgNumber = Number(that.imgList.length);
				let uplength = 9 - imgNumber;
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {

						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						console.log(that.imgList);
						return;
					},
					complete: function() {
						that.checkimgshow = false;
					}
				});
			},
			ChooseImage() {
				let that = this;
				let imglist_num = Number(this.imgList.length);
				let uplength = 9 - imglist_num;
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.push = false;
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});

			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
</style>