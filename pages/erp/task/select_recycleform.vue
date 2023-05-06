<template>
	<view class="content">
		<view class="cu-form-group">
			<view class="title">标题</view>
			<input placeholder="请输入产品标题" v-model="formList.title" name="input" disabled="true"></input>
		</view>
		
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='cuIcon-title text-red'></text>
				<text class="title">序列号/IMEI</text>
				<text class="margin-left-xs text-sm">
					<input placeholder="请输入设备序列号/IMEI" v-model="goodssn" name="input"></input>
				</text>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='cuIcon-title text-red'></text>
				<text class="title">机器图片</text>
				<text class="margin-left-xs text-sm">(添加照片，可提高回收效率哟)</text>
			</view>
		</view>
		<view class="pic padding flex justify-between align-center">
			<view class='cu-avatar xl radius' @tap="uploadImg(0)"
				:style="{'background-image': !phoneImgArr[0] ?  addpicicon : 'url('+phoneImgArr[0]+')' }">
				正面
				<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[0] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[0] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(0)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(1)"
				:style="{'background-image': !phoneImgArr[1] ?  addpicicon : 'url('+phoneImgArr[1]+')' }">
				背面<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[1] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[1] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(1)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(2)"
				:style="{'background-image': !phoneImgArr[2] ?  addpicicon : 'url('+phoneImgArr[2]+')' }">
				顶面
				<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[2] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[2] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(2)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(3)"
				:style="{'background-image': !phoneImgArr[3] ?  addpicicon : 'url('+phoneImgArr[3]+')' }">
				底面
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[3] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[3] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(3)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="pic padding flex justify-between align-center">
			<view class='cu-avatar xl radius' @tap="uploadImg(4)"
				:style="{'background-image': !phoneImgArr[4] ?  addpicicon : 'url('+phoneImgArr[4]+')' }">
				左侧
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[4] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[4] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(4)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(5)"
				:style="{'background-image': !phoneImgArr[5] ?  addpicicon : 'url('+phoneImgArr[5]+')' }">
				右侧
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[5] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[5] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(5)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(6)"
				:style="{'background-image': !phoneImgArr[6] ?  addpicicon : 'url('+phoneImgArr[6]+')' }">
				摄像头
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[6] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[6] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(6)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(7)"
				:style="{'background-image': !phoneImgArr[7] ?  addpicicon : 'url('+phoneImgArr[7]+')' }">
				其他
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[7] ? '#111f3a':'#dd514c'}">
					<view :class="phoneImgArr[7] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(7)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-sub text-center">
			<view class="tips padding-sm light bg-red">
				<text class="text-lg">回收指导价：</text>
				<text class="text-price text-lg">{{guidePrice}}</text>
			</view>
			
		</view>
		<view class="cu-form-group">
			<view class="title">回收价</view>
			<input placeholder="请输入回收价" v-model="ActualreceiptsAll" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">调拨价</view>
			<input placeholder="请输入调拨价" v-model="formList.allotPrice" name="input" disabled="true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售价</view>
			<input placeholder="请输入销售价" v-model="formList.sellPrice" name="input" disabled="true"></input>
		</view>

		<!--点点单-->
		<view class="cu-form-group">
			<view class="title">成色</view>
			<view>
				<u-radio-group style="display: flex;" v-model="colorvalue" placement="row" @change="groupChange">
					<u-radio :customStyle="{marginRight: '5px'}" :size="12" :labelSize="13" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.value" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		
		<!--选择SKU 与仓库-->
		<!-- <view class="cu-bar bg-white">
			<view class='action'>
				<text class='cuIcon-title text-red'></text>
				<text class="title">入库信息</text>
				<text class="margin-left-xs text-sm"></text>
			</view>
		</view> -->
		<!-- <view class="bg-white padding-lr">
			<view class="">
				仓库
			</view>
			<view class="canngku flex">
				<view class="cangkuItem margin-left-sm" v-for="item in warehouseLists" :key="item.warehouseId" v-if="item.parentId == 0" @tap="checkHouseId(item.warehouseId)">
					{{item.warehouseName}}
				</view>	
			</view>	
			
			<view class="">
				分仓
			</view>
			<view class="canngku flex">
				<view class="cangkuItem margin-left-sm" v-for="item in warehouseLists" :key="item.warehouseId" v-if="item.parentId == parentId" @tap="checkHouseFenId(item.warehouseId)">
					{{item.warehouseName}}
				</view>	
			</view>	
			
		</view> -->
		<!-- <view style="position: relative;">
			<LiFilter :isType="0" :alias="['分类','品牌','系列','机型']" @change="changebar" @select="selectbar" :datalist="filterbasiclist" :height="1" :isFixtop="false" ></LiFilter>
		</view> -->
		

		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='cuIcon-title text-red'></text>
				<text class="title">已选属性</text>
				<text class="margin-left-xs text-sm"></text>
			</view>
		</view>
		<view class="bg-white padding-lr">
			<view class="cu-list grid col-3 no-border padding-lr-sm">
				
				<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
					<view class="cu-item radius-2" :class="tabindex == tab_cur?'bg-red cur':''" @tap="tabSelect"
						:data-id="tabindex" style="padding-bottom: 5px;">
						<view class='text-bold' :class="tabindex == tab_cur?'text-white':'text-red'">{{tabitem}}</view>
					</view>
				</block>
				<view style="height: 10px;"></view>
				<!--选项列表111-->
				<view class="h-table" style="width: 100%;">
					<view class="h-tr h-tr-2 h-thead">
						<view class="h-td">属性</view>
						<view class="h-td">备注</view>
					</view>
					<!-- <block v-for="(item,index) in nav_list" :key="index"> -->
						<view class="process-box">
							<view class="h-tr h-tr-2" v-for="(recyitem,recyindex) in qualityInfoList" :key="recyindex" v-if="recyitem.indexs == tab_cur+1">
							  <view class="h-td" >
								<view class="text-bold">
								  {{recyitem.key}}
								</view>
								<view class="">
								  {{recyitem.value}}
								</view>
							  </view>
							  <view class="h-td">
								<input class=" text-sm" placeholder="请输入备注信息" @input="inputData($event, recyindex)" :value="recyitem.ramke"></input>
							  </view>
							</view>
						</view>
					<!-- </block>  -->
				</view>
			</view>
		</view>

		<view class="cu-form-group">
			<view class="title">是否直售</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>


		<view class="hight-view" />
		<view class="bg-white orderview-footer-fixed">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="erpclickattreditFuc">确定</button>
			</view>
		</view>
		
		
		<!-- 相机相册选择 -->
		<u-popup :show="checkimgshow" :round="8" mode="bottom" :closeOnClickOverlay="true">
			<view>
				<u-button type="default" :customStyle="{height:'120rpx'}" @click="opencamare" text="拍照"></u-button>
				<view style="height:2rpx;background-color: #EEEEEE;width: 100%;"></view>
				<u-button type="default" :customStyle="{height:'120rpx'}" @click="openpictrue" text="从手机相册选择"></u-button>
			</view>
			<view style="background-color: #EEEEEE;height: 10rpx;width: 100%;"></view>
			<view>
				<u-button type="default" @click="checkimgshow = false" :customStyle="{height:'120rpx'}" text="取消"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		upload
	} from "@/api/upload.js";
	import {
		erppurchaseclickattrview,
		erpProductGetBasicData,
		erpclickattredit
	} from "@/api/erpapi.js"
	import { empGetDeviceQuality, warehouseList, empCreateRecycleForm } from '@/api/erp.js'
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
				warehouseId: null,
				parentId: null,
				warehouseLists: [],
				qualityInfoList: [],
				formList: [],
				recycleOrderId: 0,
				attrRemark:{},
				phoneImgArr: [],
				addpicicon: "none",
				modalName: null,
				dataInfo: '',
				goodstitle: '',
				goodssn: '',
				ActualreceiptsJson:'',//实收款json
				weixinnum:'',
				alipaynum:'', 
				xianjinnum:'',  
				dihuonum:'',
				diaobojianum: '',
				xiaoshoujianum: '',
				ActualreceiptsAll:'',
				guidePrice:0,//回收指导价格
				imgList: [],
				checkimgshow:false,
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
				filterbasicInfo: '', //筛选数据
				filterbasiclist:{},
				warehouse_id: '', //主仓库
				partition_id: '', //分仓库
				category_id: '',
				brand_id: '',
				series_id: '',
				machine_id: '',
				// sales_price:'',//销售价
				// peer_price:'',//调拨价
				// cost_price:'',//成本价
				editid:'',
				imgParams:[],//图片
				tab_cur: 0,
				nav_list: [
					'物品信息',
					'成色情况',
					'功能情况',
					'维修情况'
				],
				retrieveList: [],
			}
		},
		onLoad(options) {
			this.recycleOrderId = options.recycleOrderId
			// this.editid = options.id;
			// this.erppurchaseclickattrviewFuc(options.id)
			// this.erpProductGetBasicDataFuc();
			this.guidePrice = options.forecastMoney;
			this.getInfoByRecycleOrderId();
			this.warehouseList()
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
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			// 选择分仓
			checkHouseFenId(e) {
				this.warehouseId = e;
			},
			// 选择仓库
			checkHouseId(e) {
			    this.parentId = e;	
			},
			// 仓库列表
			warehouseList() {
			 	warehouseList().then(res => {
					if (res.code == 200) {
						this.warehouseLists = res.rows;
					}
				})
			},
			// 查看详情
			getInfoByRecycleOrderId() {
			    empGetDeviceQuality(this.recycleOrderId).then(res => {
					this.formList = res.data;
					this.goodssn = res.data.deviceNo;
					this.ActualreceiptsAll = res.data.recyclePrice;
					this.qualityInfoList = JSON.parse(res.data.qualityInfoList);
				});
			},
			// 提交
			erpclickattreditFuc(){
				// if(!this.goodssn){
				// 	return this.$u.toast('请输入SN!');
				// }
				// if(!this.diaobojianum){
				// 	return this.$u.toast('请输入调拨价!');
				// }
				// if(!this.xiaoshoujianum){
				// 	return this.$u.toast('请输入销售价!');
				// }
				// if(!this.category_id){
				// 	return this.$u.toast('请选择SKU!');
				// }
				// if(!this.warehouse_id){
				// 	return this.$u.toast('请选择仓库!');
				// }
				//获取属性备注信息 value:JSON.stringify(this.Priceprams),
				let deviceLabel = uni.getStorageSync('goodsdesc')
				let paramsData={
					deviceId: this.formList.deviceId,
					deviceNo: this.goodssn,
					deviceLabel: deviceLabel,
					recycleOrderId: this.recycleOrderId,
					recyclePrice: this.ActualreceiptsAll + '',
					allotPrice: this.diaobojianum,
					sellPrice: this.xiaoshoujianum,
					warehouseId: this.warehouseId,
					directSellAble: this.switchA ? 1 : 0,
					qualityInfo: JSON.stringify(uni.getStorageSync('Priceprams')),
					qualityInfoList: JSON.stringify(this.qualityInfoList),
					recycleGuidePrice: this.guidePrice,
					modelId: this.formList.modelId,
					recycleFormId: this.formList.recycleFormId,
					title: this.formList.title
				}
				console.log(paramsData);
				empCreateRecycleForm(paramsData).then(res => {
					if (res.code == 200) {
						this.$u.toast('提交成功！')
					}
				});
				// return;
				// erpclickattredit(paramsData).then(res=>{
				// 	this.$u.toast('提交成功！')
				// 	// uni.redirectTo({
				// 	// 	url:'/pages/tabbarerp/push?huishouid='+res.data
				// 	// })
				// 	// uni.$emit('hsgoodsId',res.data)
				// 	let selectInfo = {
				// 		hsgoods_id: res.data
				// 	}
				// 	// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
				// 	let pages = getCurrentPages()
				// 	console.log('pages',pages);
				// 	// 2. 上一页面实例
				// 	// 注意是length长度，所以要想得到上一页面的实例需要 -2
				// 	// 若要返回上上页面的实例就 -3，以此类推
				// 	let prevPage = pages[pages.length - 2]
				// 	// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
				// 	prevPage.$vm.getValue(selectInfo)
				// 	// 4. 返回上一页面
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// })
			},
			// 获取筛选项
			erpProductGetBasicDataFuc() {
				let that = this;
				erpProductGetBasicData({}).then(res => {
					let data = res.data;
					//uni.setStorageSync('filterbasicInfo', JSON.stringify(res.data));
					//let filterbasicInfo = data;
					this.filterbasicInfo = data;
					console.log('接口读取->', this.filterbasicInfo);
					let tempdata = {
						filterType: 1,
						data: []
					};
					let skudata = this.filterbasicInfo.category; //SKU
					let housedata = this.filterbasicInfo.house; //仓库
					let skuItem = {
						title: '选择SKU', //排序头的名称
						value: 'a',
						alias:['分类','品牌','系列','机型'],
						type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
						data: skudata
					};
					let houseItem = {
						title: '选择仓库', //排序头的名称
						value: 'b',
						alias:['仓库','分仓'],
						type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
						data: housedata
					};
					tempdata.data.push(skuItem);
					tempdata.data.push(houseItem);
					this.filterbasiclist = tempdata;
					console.log('filterbasiclist',this.filterbasiclist);
				})
			},
			
			changebar(e) {
				//console.log('----------change----------');
				//console.log('changebar',e);
			},
			selectbar(e) {
				//console.log('----------select----------');
				let selectType = e.root;
				let selectedData = e.nodes;
				if(selectType.value=='b'){ //仓库处理
					if(selectedData.length>0){
						this.warehouse_id = selectedData[0]['value'];
					}
					if(selectedData.length>1){
						this.partition_id = selectedData[1]['value'];
					}
					 
				}else{
					switch(selectedData.length){
						case 4:
							this.category_id = selectedData[0]['value'];
							this.brand_id = selectedData[1]['value'];
							this.series_id = selectedData[2]['value'];
							this.machine_id = selectedData[3]['value'];
							break;
						case 3:
							this.category_id = selectedData[0]['value'];
							this.brand_id = selectedData[1]['value'];
							this.series_id = selectedData[2]['value'];
							break;
						case 2:
							this.category_id = selectedData[0]['value'];
							this.brand_id = selectedData[1]['value'];
							break;
						case 1:
							this.category_id = selectedData[0]['value'];
							break;
					}
				}
				
			},
			inputData(event,dataValue){
				this.qualityInfoList[dataValue].remark = event.target.value
			},
			groupChange(n) {
				console.log('groupChange', n);
				this.colorvalue = 2;
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			erppurchaseclickattrviewFuc(id) {
				erppurchaseclickattrview({
					id: id
				}).then(res => {
					this.dataInfo = res.data;
					this.goodstitle = res.data.name;
					this.guidePrice = res.data.guide_price;
					let attr_remark_value = res.data.attr_list??[];
					this.goodsvalue = res.data.value??[];
					attr_remark_value.forEach((item, i) =>{
						this.attrRemark[item.key]='';
					});
					this.retrieveList[0] = res.data.value.base.list??[];
					this.retrieveList[1] = res.data.value.colour.list??[];
					this.retrieveList[2] = res.data.value.function.list??[];
					console.log('retrieveList',this.retrieveList);
				})
			},
			hideModal(e) {
				this.modalName = null
			},
			// 使用拍照功能
			opencamare() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function(res) {
						let Imgdata = JSON.stringify(res.tempFilePaths);
						upload(res.tempFilePaths).then(res => {
							// console.log(res);
							// that.phoneImgArr[type] = 'https://mpb.waidu.cn'+res.data.imgurl;
							// that.$set(that.phoneImgArr, type, 'https://mpb.waidu.cn' + res.data.imgurl);
							that.$set(that.phoneImgArr, that.uploadImgtype, res.data.imgurl);
							that.imgParams.push(res.data.imgurl);
							// console.log(that.phoneImgArr[type]);
						})
					},
					complete: function() {
						that.checkimgshow = false;
					}
				});
			},
			// 使用相册功能
			openpictrue() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let Imgdata = JSON.stringify(res.tempFilePaths);
						upload(res.tempFilePaths).then(res => {
							// console.log(res);
							// that.phoneImgArr[type] = 'https://mpb.waidu.cn'+res.data.imgurl;
							// that.$set(that.phoneImgArr, type, 'https://mpb.waidu.cn' + res.data.imgurl);
							that.$set(that.phoneImgArr, that.uploadImgtype, res.data.imgurl);
							that.imgParams.push(res.data.imgurl);
							// console.log(that.imgParams);
							// console.log(that.phoneImgArr[type]);
						})
					},
					complete: function() {
						that.checkimgshow = false;
					}
				});
			},
			uploadImg(type) {
				let that = this;
				that.uploadImgtype = type;
				uni.navigateTo({
					url:'/pages/idphoto/idphoto'
				})
			},
			//设置图片
			setImage(e) {
				let that = this;
				console.log(e);
				//显示在页面
				//this.imagesrc = e.path;
				console.log(e.path);
				let Imgdata = [];
				Imgdata.push(e.path);
				// console.log(Imgdata);
				upload(Imgdata).then(res => {
					console.log(res.data.imgurl);
					that.$set(that.phoneImgArr, that.uploadImgtype, res.data.imgurl);
					that.imgParams.push(res.data.imgurl);
				})
			},
			// 提交图片
			uploadImg1(type) {
				let that = this;
				that.uploadImgtype = type;
				// console.log(!that.phoneImgArr[type]);
				if (that.pImgDeleteStatus) {
					that.pImgDeleteStatus = false;
					return false;
				}
				if (that.phoneImgArr[type]) {
					return false;
				}
				that.checkimgshow = true;
			},
			deleteImg(type) {
				let that = this;
				that.pImgDeleteStatus = true;
				if (!that.phoneImgArr[type]) {
					return false;
				}
				that.$set(that.phoneImgArr, type, '');
				that.imgParams.splice(type, 1);
				// console.log(that.imgParams);
			},
			// 实收款总计
			ActualreceiptsAllFuc(){
				// this.ActualreceiptsAll = 0;
				// this.ReceivablesMoney = 0;
				this.ActualreceiptsAll = Number(this.weixinnum) + Number(this.alipaynum) + Number(this.xianjinnum) + Number(this.dihuonum)
				this.ActualreceiptsJson =JSON.stringify({wexin:Number(this.weixinnum),alipay:Number(this.alipaynum),xianjin:Number(this.xianjinnum),dihuo:Number(this.dihuonum)});
				this.arrearsMoney = this.ReceivablesMoney - this.ActualreceiptsAll;
			},
			tabSelect(e) {
				// console.log(e.currentTarget);
				// if (e.currentTarget?.dataset?.id) {
				// 	this.curTabIndex = e.currentTarget.dataset.id;
				// }
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
			},
		}
	}
</script>

<style lang="scss">
	.cangkuItem{
		height: 40rpx;
		background: #afafb0;
		line-height: 40rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
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
	.h-table .h-td{
		display:inline-block;
		text-align: center;
	}
	.cu-bar .action .cuIcon-title{
		font-size:80rpx;
		line-height: 80rpx;
		margin-right:0 !important;
	}
	.cu-bar .title,
	.cu-form-group .title {
		color:#111f3a;
		font-weight: bold;
		white-space: nowrap;
	}
	
	.pic{
		background-color: #fff;
		.cu-avatar{
			border-radius: 30rpx;
			background-color: #f2f1f6;
			color:#afafb0;
			font-size:1.2em;
			.img{
				width:100%;
				height:100%;
				//z-index:9999;
				display: inline-flex;
				text-align: center;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.hide{
		display:none;
	}
</style>
