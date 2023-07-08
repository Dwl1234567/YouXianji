<template>
	<view class="content">
		<view class="cu-form-group">
			<view class="title">标题</view>
			<input placeholder="请输入产品标题" v-model="formList.title" name="input" disabled="true"></input>
		</view>

		<view class="cu-bar bg-white">
			<view class='action'>
				<text class="title">序列号/IMEI</text>
				<text class="margin-left-xs text-sm">
					<input placeholder="请输入设备序列号/IMEI" v-model="formList.deviceNo" name="input" disabled="true"></input>
				</text>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class="title">机器图片</text>
				<text class="margin-left-xs text-sm">(添加照片，可提高回收效率哟)</text>
			</view>
		</view>
		<view class="pic padding flex justify-between align-center">
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,0)"
				:style="{'background-image': !phoneImgArr[0] ?  addpicicon : 'url('+$httpImage + phoneImgArr[0]+')' }">
				正面
			</view>
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,1)"
				:style="{'background-image': !phoneImgArr[1] ?  addpicicon : 'url('+$httpImage +phoneImgArr[1]+')' }">
				背面
			</view>
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,2)"
				:style="{'background-image': !phoneImgArr[2] ?  addpicicon : 'url('+$httpImage +phoneImgArr[2]+')' }">
				顶面
			</view>
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,3)"
				:style="{'background-image': !phoneImgArr[3] ?  addpicicon : 'url('+$httpImage +phoneImgArr[3]+')' }">
				底面
			</view>
		</view>
		<view class="pic padding flex justify-between align-center">
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,4)"
				:style="{'background-image': !phoneImgArr[4] ?  addpicicon : 'url('+$httpImage +phoneImgArr[4]+')' }">
				左侧
			</view>
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,5)"
				:style="{'background-image': !phoneImgArr[5] ?  addpicicon : 'url('+$httpImage +phoneImgArr[5]+')' }">
				右侧
			</view>
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,6)"
				:style="{'background-image': !phoneImgArr[6] ?  addpicicon : 'url('+$httpImage +phoneImgArr[6]+')' }">
				摄像头
			</view>
			<view class='cu-avatar xl radius' @tap="viewImgs(phoneImgArr,7)"
				:style="{'background-image': !phoneImgArr[7] ?  addpicicon : 'url('+$httpImage +phoneImgArr[7]+')' }">
				其他
			</view>
		</view>
		<!-- <view class="flex-sub text-center">
			<view class="tips padding-sm light bg-red">
				<text class="text-lg">回收指导价：</text>
				<text class="text-price text-lg">{{guidePrice}}</text>
			</view>

		</view> -->
		<view class="cu-form-group">
			<view class="title">回收价</view>
			<input placeholder="请输入回收价" v-model="formList.recyclePrice" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">组合成本</view>
			<input placeholder="请输入组合成本" v-model="formList.combinationPrice" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">回收佣金</view>
			<input placeholder="" v-model="formList.totalRecycleCommission" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">门店杂费</view>
			<input placeholder="" v-model="formList.pettyExpenses" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">维修费用</view>
			<input placeholder="" v-model="formList.maintenancePrice" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">调拨价</view>
			<input placeholder="请输入调拨价" v-model="formList.allotPrice" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售价</view>
			<input placeholder="请输入销售价" v-model="formList.sellPrice" name="input" disabled="true"></input>
		</view>
		<view v-if="formList.sellFormFittingsList" v-for="(item,index) in formList.sellFormFittingsList">
			<view class="cu-form-group">
				<view class="title">配件名称</view>
				<input placeholder="请输入销售价" v-model="item.fittingsName" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">配件颜色</view>
				<input placeholder="请输入销售价" v-model="item.fittingsColor" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">配件数量</view>
				<input placeholder="请输入销售价" v-model="item.fittingsNumber" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">配件成本</view>
				<input placeholder="请输入销售价" v-model="item.fittingsCostPrice" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">配件销售价</view>
				<input placeholder="请输入销售价" v-model="item.fittingsSellPrice" name="input" disabled="true"></input>
			</view>
		</view>

		<!--点点单-->
		<view class="cu-form-group">
			<view class="title">成色</view>
			<view>
				<u-radio-group style="display: flex;" v-model="colorvalue" placement="row">
					<u-radio :customStyle="{marginRight: '5px'}" :size="12" :labelSize="13" v-for="(item, index) in radiolist1"
						:key="index" :label="item.name" :name="item.value">
					</u-radio>
				</u-radio-group>
			</view>
		</view>

		<!--选择SKU 与仓库-->
		<!-- <view style="position: relative;">
			<LiFilter :isType="0" :alias="['分类','品牌','系列','机型']" @change="changebar" @select="selectbar" :datalist="filterbasiclist" :height="1" :isFixtop="false" ></LiFilter>
		</view> -->


		<view class="cu-bar bg-white">
			<view class='action'>
				<text class="title">已选属性</text>
				<text class="margin-left-xs text-sm"></text>
			</view>
		</view>
		<view class="bg-white padding-lr">
			<view class="cu-list grid col-3 no-border">
				<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 95vw;text-align: left;">
					<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
						<view class="cu-item radius-2 shuxing" :class="tabindex == tab_cur?'bg-red cur':''" @tap="tabSelect"
							:data-id="tabindex" style="padding-bottom: 5px;display: inline-block;">
							<view class=''>{{tabitem}}</view>
						</view>
					</block>
				</scroll-view>

				<view style="height: 10px;"></view>
				<!--选项列表111-->
				<view class="h-table" style="width: 100%;">
					<view class="h-tr h-tr-2 h-thead">
						<view class="h-td">属性</view>
						<view class="h-td">备注</view>
					</view>
					<!-- <block v-for="(item,index) in nav_list" :key="index"> -->
					<view class="process-box">
						<view class="h-tr h-tr-2" v-for="(recyitem,recyindex) in qualityInfoList" :key="recyindex"
							v-if="recyitem.indexs == tab_cur+1">
							<view class="h-td">
								<view class="text-bold">
									{{recyitem.key}}
								</view>
								<view class="">
									{{recyitem.value}}
								</view>
							</view>
							<view class="h-td">
								<input class=" text-sm" placeholder="请输入备注信息" @input="inputData($event, recyindex)"
									:value="recyitem.remark"></input>
							</view>
						</view>
					</view>
					<!-- </block>  -->
				</view>
			</view>
		</view>
		<view class="hight-view" />


		<!-- 相机相册选择 -->
		<!-- <u-popup :show="checkimgshow" :round="8" mode="bottom" :closeOnClickOverlay="true">
			<view>
				<u-button type="default" :customStyle="{height:'120rpx'}" @click="opencamare" text="拍照"></u-button>
				<view style="height:2rpx;background-color: #EEEEEE;width: 100%;"></view>
				<u-button type="default" :customStyle="{height:'120rpx'}" @click="openpictrue" text="从手机相册选择"></u-button>
			</view>
			<view style="background-color: #EEEEEE;height: 10rpx;width: 100%;"></view>
			<view>
				<u-button type="default" @click="checkimgshow = false" :customStyle="{height:'120rpx'}" text="取消"></u-button>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	import {
		upload
	} from "@/api/upload.js";
	import {
		getInfoByRecycleOrderId,
		warehouseList,
		empCreateRecycleForm,
		getStoreOnlineCostConfig,
		selectRecycleFormDetail,
		secondGoods,
		selectSellFormDetail,
		selectRecycleListDetail
	} from '@/api/erp.js'
	import barTitle from '@/components/common/basics/bar-title';
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue';
	//import SelectData from '@/components/RecyclingList/SelectData.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			LiFilter
			//SelectData
		},
		data() {
			return {
				recId: null,
				sellFormId: null,
				goodsId: null,
				radiolist2: [{
						name: '分拣',
						disabled: false,
						id: 0
					},
					{
						name: '直售',
						disabled: false,
						id: 1
					},
					{
						name: '整备',
						disabled: false,
						id: 2
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: 0,
				combinationPrice: '',
				online: {},
				isDistribution: false,
				modelId: 0,
				warehouseId: null,
				parentId: null,
				warehouseLists: [],
				qualityInfoList: [],
				formList: [],
				recycleOrderId: 0,
				attrRemark: {},
				phoneImgArr: [],
				addpicicon: "none",
				modalName: null,
				dataInfo: '',
				goodstitle: '',
				goodssn: '',
				ActualreceiptsJson: '', //实收款json
				weixinnum: '',
				alipaynum: '',
				xianjinnum: '',
				dihuonum: '',
				diaobojianum: '',
				xiaoshoujianum: '',
				ActualreceiptsAll: '',
				guidePrice: 0, //回收指导价格
				imgList: [],
				checkimgshow: false,
				colorvalue: 1,
				radiolist1: [{
						value: 1,
						name: '99新'
					},
					{
						value: 2,
						name: '95新'
					},
					{
						value: 3,
						name: '9新'
					},
					{
						value: 4,
						name: '9新以下'
					}
				],
				// TabKey:'base',
				curTabIndex: 'base',
				goodsvalue: [],
				allmoney: 0,
				switchA: true,
				switchB: false,
				switchC: false,
				switchD: false,
				filterbasicInfo: '', //筛选数据
				filterbasiclist: {},
				warehouse_id: '', //主仓库
				partition_id: '', //分仓库
				category_id: '',
				brand_id: '',
				series_id: '',
				machine_id: '',
				// sales_price:'',//销售价
				// peer_price:'',//调拨价
				// cost_price:'',//成本价
				editid: '',
				imgParams: [], //图片
				tab_cur: 0,
				nav_list: [
					'物品信息',
					'成色情况',
					'功能情况',
					'维修情况'
				],
				retrieveList: [],
				recycleFormId: null
			}
		},
		onLoad(options) {
			this.recId = options.recId
			this.sellFormId = options.sellFormId
			this.recycleFormId = options.recycleFormId
			this.goodsId = options.goodsId
			this.recycleOrderId = options.recycleOrderId
			this.guidePrice = options.forecastMoney;
			if (this.recId) {
				this.selectRecycleListDetail()
			} else {
				this.selectRecycleFormDetail()
			}

		},
		onShow() {

		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			//查看图片
			viewImgs(url, index) {
				//需要分割url并去除空数组
				let a = url.map((item) => {
					return this.$httpImage + item;
				});
				uni.previewImage({
					current: index,
					urls: a,
				});
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
			},
			selectRecycleListDetail() {
				selectRecycleListDetail(this.recId).then(res => {
					if (res.code === 200) {
						this.formList = res.data
						this.qualityInfoList = JSON.parse(res.data.qualityInfoList)
						this.phoneImgArr.push(res.data.frontPhoto)
						this.phoneImgArr.push(res.data.backPhoto)
						this.phoneImgArr.push(res.data.topPhoto)
						this.phoneImgArr.push(res.data.bottomPhoto)
						this.phoneImgArr.push(res.data.leftPhoto)
						this.phoneImgArr.push(res.data.rightPhoto)
						this.phoneImgArr.push(res.data.cameraPhoto)
						this.phoneImgArr.push(res.data.otherPhoto)
					}
				})
			},
			// 获取详情
			selectRecycleFormDetail() {
				if (this.recycleFormId) {
					selectRecycleFormDetail(this.recycleFormId).then(res => {
						if (res.code === 200) {
							this.formList = res.data
							this.qualityInfoList = JSON.parse(res.data.qualityInfoList)
							this.phoneImgArr.push(res.data.frontPhoto)
							this.phoneImgArr.push(res.data.backPhoto)
							this.phoneImgArr.push(res.data.topPhoto)
							this.phoneImgArr.push(res.data.bottomPhoto)
							this.phoneImgArr.push(res.data.leftPhoto)
							this.phoneImgArr.push(res.data.rightPhoto)
							this.phoneImgArr.push(res.data.cameraPhoto)
							this.phoneImgArr.push(res.data.otherPhoto)
						}
					})
				} else if (this.goodsId) {
					secondGoods(this.goodsId).then(res => {
						if (res.code === 200) {
							this.formList = res.data
							this.qualityInfoList = JSON.parse(res.data.qualityInfoList)
							this.phoneImgArr.push(res.data.frontPhoto)
							this.phoneImgArr.push(res.data.backPhoto)
							this.phoneImgArr.push(res.data.topPhoto)
							this.phoneImgArr.push(res.data.bottomPhoto)
							this.phoneImgArr.push(res.data.leftPhoto)
							this.phoneImgArr.push(res.data.rightPhoto)
							this.phoneImgArr.push(res.data.cameraPhoto)
							this.phoneImgArr.push(res.data.otherPhoto)
						}
					})
				} else if (this.sellFormId) {
					selectSellFormDetail({
						sellFormId: this.sellFormId
					}).then(res => {
						if (res.code === 200) {
							this.formList = res.data
							this.qualityInfoList = JSON.parse(res.data.qualityInfo.qualityInfoList)
							this.phoneImgArr.push(res.data.qualityInfo.frontPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.backPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.topPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.bottomPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.leftPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.rightPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.cameraPhoto)
							this.phoneImgArr.push(res.data.qualityInfo.otherPhoto)
						}
					})
				}

			},
			// 获取门店杂费
			getStoreOnlineCostConfig() {
				getStoreOnlineCostConfig().then(res => {
					if (res.code === 200) {
						this.online = res.data
					}
				})
			},
			SwitchB(e) {
				this.switchB = e.detail.value
				// if (this.switchB) {
				// 	this.switchC = false;
				// 	this.switchD = false;
				// }
			},
			SwitchC(e) {
				this.switchC = e.detail.value
				// if (this.switchC) {
				// 	this.switchB = false;
				// 	this.switchD = false;
				// }
			},
			SwitchD(e) {
				this.switchD = e.detail.value
				// if (this.switchD) {
				// 	this.switchC = false;
				// 	this.switchB = false;
				// }
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			// 实收款总计
			ActualreceiptsAllFuc() {
				// this.ActualreceiptsAll = 0;
				// this.ReceivablesMoney = 0;
				this.ActualreceiptsAll = Number(this.weixinnum) + Number(this.alipaynum) + Number(this.xianjinnum) + Number(this
					.dihuonum)
				this.ActualreceiptsJson = JSON.stringify({
					wexin: Number(this.weixinnum),
					alipay: Number(this.alipaynum),
					xianjin: Number(this.xianjinnum),
					dihuo: Number(this.dihuonum)
				});
				this.arrearsMoney = this.ReceivablesMoney - this.ActualreceiptsAll;
			},
		}
	}
</script>

<style lang="scss">
	.scroll-view_H {
		white-space: nowrap;
		display: flex;
	}

	.cur {
		background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%) !important;
		color: #FFFFFF !important;
	}

	.shuxing {
		margin-right: 20rpx;
		width: 197rpx;
		height: 53rpx;
		background: #D8D8D8;
		color: #101010;
		border-radius: 11rpx;
		line-height: 53rpx;
		text-align: center;
		font-size: 27rpx;
		font-weight: 400;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.camgkuCheck {
		background: #FFE6E6 !important;
		border-radius: 11rpx;
		border: 1rpx solid #FD4C4C;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FD4C4C !important;
		line-height: 61rpx;
	}

	.canngku {
		display: flex;
		flex-wrap: wrap;
	}

	.cangkuItem {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #101010;
		line-height: 61rpx;
		margin-bottom: 20.99rpx;
		min-width: 155rpx;
		height: 59rpx;
		background: #F0F0F0;
		border: 1rpx solid #F0F0F0;
		text-align: center;
		border-radius: 11rpx;
		line-height: 61rpx;
		padding-left: 26rpx;
		padding-right: 26rpx;
	}

	.cu-avatar {
		background-color: #ccc;
	}

	.translate45 {
		transform: rotate(45deg);
		transition-duration: 1s;
	}


	.hight-view {
		height: 290rpx;
	}

	.orderview-footer-fixed {
		position: fixed;
		z-index: 1;
		bottom: 0;
		width: 100%;
		box-shadow: 0 -3.63rpx 10.9rpx 0 #eaeaea;
		padding: 18.18rpx 27.27rpx;
		text-align: right;

		.cu-btn {
			margin-left: 10px;
		}
	}

	.h-table .h-td {
		display: inline-block;
		text-align: center;
	}

	.cu-bar .action .cuIcon-title {
		font-size: 80rpx;
		line-height: 80rpx;
		margin-right: 0 !important;
	}

	.cu-bar .title,
	.cu-form-group .title {
		color: #111f3a;
		font-weight: bold;
		white-space: nowrap;
	}

	.pic {
		background-color: #fff;

		.cu-avatar {
			border-radius: 30rpx;
			background-color: #f2f1f6;
			color: #afafb0;
			font-size: 1.2em;

			.img {
				width: 100%;
				height: 100%;
				//z-index:9999;
				display: inline-flex;
				text-align: center;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.hide {
		display: none;
	}
</style>