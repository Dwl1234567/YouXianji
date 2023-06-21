<template>
	<view>
		<!--同回收 区别：设置了一些默认值 type=2、remark->
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack adress="/pages/tabbarerp/home">
			<block slot="content">调拨货品</block>
		</bar-title>

		<view class="margin bg-white radius-4">
			<view class="cu-form-group" @tap="goMenDian">
				<view class="title">门店选择</view>
				{{mendians}}
			</view>
			<view class="cu-form-group">
				<view class="title">货品</view>
				<view class="cu-capsule radius">
					<view class="" @tap="selectAllotTap">
						<view class="cu-tag bg-green">
							<text class="cuIcon-check text-white"></text>
						</view>
						<view class="cu-tag line-green">
							选
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in goodsList"
					:key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
					:data-target="'move-box-' + index">
					<image class="cu-avatar lg" :src="$httpImage + item.backPhoto" mode="widthFix" />
					<view class="content">
						<view class="text-grey">{{item.title}}</view>
						<view class="text-grey">序列号：{{item.deviceNo}}</view>
						<view class="text-gray text-sm">
							收:<text class="text-red margin-right-xs">{{item.recyclePrice}}</text> 调:<text
								class="margin-right-xs">{{item.allotPrice}}</text> 销:<text
								class="margin-right-xs">{{item.sellPrice}}</text>
						</view>
					</view>
					<view class="move">
						<view class="bg-red" @tap="delectTap(index)">删除</view>
					</view>
				</view>
			</view>
			<!-- <view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in goodsList"
					:key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
					:data-target="'move-box-' + index">

					<view class="cu-item-box">
						<view class="cu-avatar lg" :style="[{backgroundImage:'url('+ ($httpImage + item.backPhoto) +')'}]">
						</view>
						<view class="content">
							<view class="text-grey">{{item.title}}</view>
							<view class="text-gray text-sm">
								收:<text class="text-red margin-right-xs">{{item.recyclePrice}}</text> 调:<text
									class="margin-right-xs">{{item.allotPrice}}</text> 销:<text
									class="margin-right-xs">{{item.sellPrice}}</text>
							</view>
							<view class="text-gray text-sm">
								成本价：<text class="text-red margin-right-xs">{{item.recyclePrice + item.maintainPrice}}</text>
							</view>
						</view>
						<view class="move">
							<view class="bg-red" @tap="delectTap(index)">删除</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="cu-form-group">
				<view class="title">调拨总数</view>
				{{goodsList.length}}
			</view>
			<view class="cu-form-group">
				<view class="title">调拨总价</view>
				{{allmoney}}元
			</view>
			<view class="cu-form-group">
				<view class="title">调拨总价</view>
				{{allmoney}}元
			</view>
			<view class="cu-form-group">
				<view class="title">调拨总价</view>
				{{allmoney}}元
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">实付款</view>
				<view class="cu-capsule radius" @tap="showModal" data-target="Modal">
					<view class="cu-tag line-green">
						填写收款方式及价格
					</view>
					<view class="cu-tag bg-green">
						<text class="cuIcon-unfold text-white"></text>
					</view>
				</view>
			</view> -->
			<!-- <view class="cu-form-group pingzheng" :class="switchGD?'hide':''">
				<view class="title">付款凭证</view>
				<view class="cu-capsule radius" @tap="paiTap">
					<view class="cu-tag bg-blue">
						<text class="cuIcon-camera text-white"></text>
					</view>
					<view class="cu-tag line-blue">
						图
					</view>
				</view>
			</view>
			<view class="cu-form-group" v-if="imgList.length > 0">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
				</view>
			</view> -->
			<!-- <view class="cu-form-group">
				<view class="title">付款账户信息</view>
				<input placeholder="请输入付款账户信息" v-model="account" name="input"></input>
			</view> -->
			<view class="cu-form-group">
				<view class="title">备注</view>
				<input placeholder="请输入备注" v-model="remark" name="input"></input>
			</view>
		</view>

		<view class="orderview-footer-fixed">
			<view class="flex flex-direction margin-lg">
				<button class="cu-btn bg-red radius-4 margin-tb-sm lg" @click="confirmFuc">确定</button>
			</view>
		</view>
		<!-- <u-action-sheet :actions="upimageList" :closeOnClickAction="true" @close="closeUpimg" :cancelText="'取消'"
			@select="selectUpimg" :show="showupimage"></u-action-sheet> -->
		<!--回收价填写-->
		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">填写回收价格</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-list grid col-2">
						<view class="cu-item">
							<input class="text-green" placeholder="微信" name="input"></input>
						</view>
						<view class="cu-item">
							<input class="text-blue" placeholder="支付宝" name="input"></input>
						</view>
						<view class="cu-item">
							<input class="text-red" placeholder="现金" name="input"></input>
						</view>
						<view class="cu-item">
							<input class="text-purple" placeholder="抵货款" name="input"></input>
						</view>
					</view>
					<view class="margin-top">总计：<text class="text-red">123</text></view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub " @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="allotTop(3)">确定</view>
				</view>
			</view>
		</view> -->
		<!-- 选择仓库 -->
		<u-picker :show="cangkushow" keyName="lable" ref="uPicker" :columns="columns" @confirm="confirm"
			@change="changeHandler" @cancel="closecheck(1)"></u-picker>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		storeAllot
	} from "@/api/erp.js";
	import {
		raiseUpload
	} from "@/api/upload.js";
	export default {
		name: 'push',
		components: {
			barTitle
		},
		data() {
			return {
				storeId: null,
				mendians: '选择门店',
				thatgoodsindex: '',
				cangkushow: false,
				columns: [],
				columnData: [],
				filterbasicList: {},
				scrollLeft: 0,
				switchGD: false,
				modalName: null,
				allotCode: '',
				showupimage: false,
				upimageList: [{
						name: '拍照',
						value: 1,
					},
					{
						name: '相册选图',
						value: 2,
					}
				],
				goods_id: '',
				goodsList: [],
				imgList: [],
				upgetimgList: [],
				remark: '', //备注
				account: '', //付款账户信息
				allmoney: 0, //调拨总价
				warehouse_id: '', //主仓库
				warehouse_name: '',
				partition_id: '', //分仓库
				partition_name: '', //分仓库
			}
		},
		onLoad() {
			const mendian = uni.getStorageSync('mendian_list');
			if (mendian) {
				this.storeId = mendian.storeId
				this.mendians = mendian.storeName
			}
			const modelList = uni.getStorageSync('model_list');
			if (modelList) {
				this.goodsList = modelList
				modelList.map(item => {
					this.allmoney = Number(this.allmoney) + item.recyclePrice + item.maintainPrice
				})
			}
		},
		onShow() {},
		watch: {
			goodsList() {
				this.allmoney = 0
				this.goodsList.map(item => {
					this.allmoney = Number(this.allmoney) + item.recyclePrice + item.maintainPrice
				})
			}
		},
		onUnload() {
			this.goodsList = []
			uni.removeStorageSync('model_list')
			uni.removeStorageSync('mendian_list')
		},
		methods: {
			// 跳转门店选择 
			goMenDian() {
				uni.navigateTo({
					url: '/pages/erp/allot/mendian_list'
				})
			},
			// 获取筛选项
			// erpProductGetBasicDataFuc() {

			// 	let that = this;
			// 	erpProductGetBasicData({}).then(res => {
			// 		let data = res.data;
			// 		that.filterbasicInfo = data;
			// 		that.filterbasicList = data.house;
			// 		let houseData = data.house;
			// 		console.log('接口读取->', that.filterbasicInfo);
			// 		//that.copycanku();
			// 		this.columns[0] = houseData.map((iii, ddd) => {
			// 			// let info = {
			// 			// 	value: iii.value,
			// 			// 	lable: iii.text
			// 			// }
			// 			return iii.text
			// 		});
			// 		if (houseData[0].children.length == 0) {
			// 			this.columns[1] = [无分仓]
			// 		} else {
			// 			this.columns[1] = houseData[0].children.map((e) => {
			// 				// let info = {
			// 				// 	value: iii.value,
			// 				// 	lable: iii.text
			// 				// }
			// 				return e.text
			// 			});
			// 		}
			// 		const picker = this.$refs.uPicker
			// 		picker.setColumns(this.columns)


			// 		this.columnData = houseData.map((iiii, dddd) => {
			// 			let child = [];
			// 			if (iiii.children.length == 0) {
			// 				child = [{
			// 					value: 0,
			// 					lable: '无分仓'
			// 				}, ]
			// 			} else {
			// 				child = iiii.children.map((cii, cdd) => {
			// 					return {
			// 						value: cii.value,
			// 						lable: cii.text
			// 					}
			// 				})
			// 			}

			// 			return child;
			// 		});
			// 	})
			// },
			checkruku() {
				let checkstatus = false;
				this.goodsList.forEach((item, index) => {
					if (!item.warehouse_name) {
						checkstatus = true;
					}
				})
				return checkstatus;
			},
			closecheck() {
				this.cangkushow = false;
			},
			// 确认提交
			confirmFuc() {
				if (!this.goodsList.length > 0) {
					return this.$u.toast('请选择货品！');
				}
				let goodsinfojson = this.goodsList.map((item, index) => {
					let info = {
						deviceId: item.deviceId,
						qualityInfoId: item.qualityInfoId,
						recycleFormId: item.recycleFormId,
						allotNumber: '1'
					}
					return info;
				})

				let params = {
					approveStore: this.storeId,
					storeAllotList: goodsinfojson,
					remark: this.remark
				}
				console.log(params, '222222');
				storeAllot(params).then(res => {
					this.$u.toast('提交成功！');
					setTimeout(() => {
						this.storeId = null
						this.mendians = '选择门店'
						this.goodsList = []
						this.allmoney = 0
						uni.removeStorageSync('model_list')
						uni.removeStorageSync('mendian_list')
						uni.navigateTo({
							url: '/pages/tabbarerp/home'
						})
					}, 1000);
				})
			},

			// 多级联动  ---- start
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// console.log(columnIndex);
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					let items = this.filterbasicList[index].children.map((e) => {
						return e.text
					})
					picker.setColumnValues(1, items)
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				let cindex = e.indexs;
				//console.log('this.filterbasicList',this.filterbasicList[0]);
				this.goodsList[this.thatgoodsindex].warehouse_id = this.filterbasicList[cindex[0]].value;
				this.goodsList[this.thatgoodsindex].warehouse_name = this.filterbasicList[cindex[0]].text + ' - ' + this
					.filterbasicList[cindex[0]].children[cindex[1]].text;
				this.goodsList[this.thatgoodsindex].partition_id = this.filterbasicList[cindex[0]].children[cindex[1]].value;
				this.goodsList[this.thatgoodsindex].partition_name = this.filterbasicList[cindex[0]].children[cindex[1]].text;
				this.cangkushow = false;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			getValue(list) {
				console.log(list, 'B页面传递的数据')
				this.goods_id = list.goods_id;
				let checkSnID = false;
				this.goodsList.forEach((item, index) => {
					if (item.sn_id == this.goods_id) {
						checkSnID = true;
					}
				})
				if (!checkSnID) {
					this.getoncegoods();
				}

			},
			getoncegoods() {
				erpProductGetAllotdata({
					sn_id: this.goods_id
				}).then(res => {
					this.goodsList.push(res.data);
					this.allmoney = Number(this.allmoney) + Number(res.data.peer_price);
				})
			},
			//入仓
			rukuFuc(index) {
				let that = this;
				that.thatgoodsindex = index;
				that.cangkushow = true;
			},
			// 打印
			dayinFuc(info) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定打印该商品嘛？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							erpDayin({}).then(res => {
								that.$u.toast('打印成功!');
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			editTap() {},
			delectTap(index) {
				console.log(this.goodsList)
				this.goodsList.splice(index, 1);
				uni.setStorageSync('model_list', this.goodsList)
			},
			deliveryTap() {
				let that = this;
				updatesingletransfer({
					allot_id: '',
					allot_status: '',
					remarks: this.remark
				}).then(res => {

				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log(this.TabCur);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			scanTap() {
				let that = this;
				// console.log(
				// 	'调用摄像头扫一扫【二维码】,拿获取单个商品信息接口[/erp/product/getdata],前端(还是后端？)判断store_id是否本店，是本店不输出商品信息并tips提示【不允许调拨本店商品！】'
				// );
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function(res) {
						console.log('获取到货品号，调用接口', res)
						// 微信小程序
						if (res.errMsg == "scanCode:ok") {
							// 扫描到的信息
							let code = res.result
							that.goods_id = code;
							that.getoncegoods();
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
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
				let uplength = 9 - Number(that.imgList.length);
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
					},
					complete: function() {
						that.checkimgshow = false;
					}

				});
			},
			// 使用相册功能
			openpictrue() {
				let that = this;
				let uplength = 9 - Number(that.imgList.length);
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
					},
					complete: function() {
						that.checkimgshow = false;
					}
				});
			},
			ChooseImage() {
				let that = this;
				let uplength = 9 - Number(this.imgList.length);
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
						console.log(this.imgList);
					}
				});

			},
			// 上传分享图片
			upShareimg() {
				let that = this;
				if (this.goodsList.length <= 0) {
					return that.$u.toast('请录入货品');
				}
				// if(this.imgList.length <= 0){
				// 	return that.$u.toast('请上传付款凭证');
				// }
				let promisearr = [];
				that.imgList.forEach((item, index) => {
					if (item.indexOf('shousifang') == -1) {
						promisearr.push(raiseUpload(item));
					} else {
						that.upgetimgList.push(item);
					}
				})

				Promise.all(promisearr).then((res) => {
						// console.log(res);
						res.forEach((iii) => {
							that.upgetimgList.push(iii.data.imgurl);
						})
					})
					.finally(() => {
						that.deliveryTap();
					})

			},
			DelImg(e) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: res => {
						if (res.confirm) {
							that.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			selectAllotTap() {
				uni.navigateTo({
					url: '/pages/erp/allot/product_list?storeId=' + this.storeId
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
		}
	}
</script>

<style lang="scss">
	.cu-form-group {
		background-color: unset;
	}

	.cu-list {
		.cu-item {
			position: unset;
			display: block;
			padding-right: unset;
			padding-top: 20rpx;
			height: 200rpx;
			background-color: unset;
			justify-content: unset;
			align-items: unset;

			.cu-item-box {
				justify-content: flex-end;
				height: 100rpx;
				display: flex;
				position: relative;

				.cu-avatar {
					left: 10rpx;
					position: absolute;
				}

				.action {
					.print {
						padding: 20rpx 10rpx;
						font-size: 24rpx;
					}
				}

				.content {
					left: 120rpx;
				}
			}

			.ruku {
				padding: 10rpx 20rpx;
				font-size: 24rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>