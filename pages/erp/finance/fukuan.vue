<template>
	<view>
		<view class="cu-list menu">
			<view class="margin-sm bg-white radius-4" v-for="(item,index) in dataList" :key="index">
				<view class="padding-xs flex justify-between text-xs">
					<view>单号:{{item.code}}</view>
					<view>
						时间:{{item.createtime}}
					</view>
				</view>
				<view class="margin-top-sm ">
					<view class="cu-steps text-xs">
						<view class="cu-item " :class="item.have_paid != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已回收
						</view>
						<view class="cu-item" :class="item.have_deliverede != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							待质检
						</view>
						<view class="cu-item" :class="item.have_received != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							质检中
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已质检
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已付款
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							验机报告
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已上架
						</view>
					</view>
				</view>
				<view class="padding-sm text-sm">
					<view class="flex" style="border-bottom:1px solid #efefef;"  v-for="(item1,index1) in item.goodslist" :key="index1">
						<view class="flex-sub padding-sm">
							<view class="goodsimg"
								:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
						</view>
						<view class="flex-treble padding-sm">
							<view class="text-deepblue">{{item1.title}}</view>
							<view class="flex justify-between">
								<view class="" v-if="item1.sn">序列号:{{item1.sn}}</view>
							</view>
							<!--支出-->
							<view class="flex justify-between" v-if="item.type == 'income'">
								<view class="" v-if="item1.money">销售价:{{item1.money}}</view>
								<view class="" v-if="item1.peer_price">调拨价:{{item1.peer_price}}</view>
								<view class="" v-if="item1.cost_price">回收价:{{item1.cost_price}}</view>
							</view>
							<!--收入-->
							<view class="flex justify-between" v-if="item.type == 'spending'">
								<view class="" v-if="item1.money">回收价:{{item1.money}}</view>
								<view class="" v-if="item1.peer_price">调拨价:{{item1.peer_price}}</view>
								<view class="" v-if="item1.sales_price">回收价:{{item1.sales_price}}</view>
							</view>
							<view class="flex justify-between">
								<view class="">直售:
									<text v-if="item1.is_ok ==1">是</text>
									<text v-else>否</text>
								</view>
								<view class="" v-if="item1.nums">数量:{{item1.nums}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="grid margin-bottom text-center col-2">
					<view class="padding-xs">
						<view class="cu-tag line-blue round sm">科目：{{item.subjectsname}}</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag round line-red sm">
							账单类型:
							<text v-if="item.type == 'income'">收入</text>
							<text v-else-if="item.type == 'spending'">支出</text>
							<text v-else>类型错误</text>
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag line-red round sm">
							财务类别：{{item.typename}}
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag line-green round sm">
							<text v-if="item.type == 'income'">收入</text>
							<text v-if="item.type == 'spending'">支出</text>
							时间：{{item.datatime}}
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag line-red round sm">
							发起人：{{item.createname}}
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-btn bg-red round sm" @tap="fukuanTap(item.id,'Modal')">
							付款/审批
						</view>
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-modal" :class="modalName2=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">填写付款方式及价格</view>
					<view class="action" @tap="hideModal2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<!---->
					<view class="cu-form-group"style="border:2rpx solid #EEEEEE">
						<textarea class="textarea" maxlength="-1" @input="textareaAInput"
							placeholder="请输入备注信息"  v-model="remark" name="input"></textarea>
						<!--{{TCid}}-->
						
					</view>
					<view class="cu-form-group pingzheng" :class="switchGD?'hide':''">
						<view class="title">付款凭证</view>
						<view class="cu-capsule round" @tap="paiTap">
							<view class="cu-tag bg-deepblue">
								<text class="cuIcon-camera text-white"></text>
							</view>
							<view class="cu-tag line-deepblue">
								图
							</view>
						</view>
					</view>
					<view class="cu-form-group" v-if="imgList1.length > 0">
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList1" :key="index" @tap="ViewImage"
								:data-url="imgList1[index]">
								<image :src="imgList1[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-btn bg-red" @tap="tijiaoTap">确定</view>
				</view>
				
			</view>
		</view>
		<u-action-sheet :actions="upimageList" :closeOnClickAction="true" @close="closeUpimg" :cancelText="'取消'"
			@select="selectUpimg" :show="showupimage"></u-action-sheet>
	</view>
</template>

<script>
	import {
		erpfinancewastebook,erpfinancefukuan
	} from "@/api/erpapi.js";
	import _tool from '@/utils/tools.js';	//工具函数
	import {
		raiseUpload
	} from "@/api/upload.js";
	// 科目类别
	const billtypeInfo = [
		{
			value:1,
			lable:'工资'
		},{
			value:2,
			lable:'采购'
		},{
			value:3,
			lable:'差旅'
		},{
			value:4,
			lable:'交通'
		},{
			value:5,
			lable:'招待'
		},{
			value:6,
			lable:'运营'
		},{
			value:7,
			lable:'租赁'
		},{
			value:8,
			lable:'办公'
		},{
			value:9,
			lable:'销售'
		},{
			value:10,
			lable:'快递'
		}
	]
	// 1=工资,2=采购,3=差旅,4=交通,5=招待,6=运营,7=租赁,8=办公,9=销售,10=快递
	export default {
		components: {
		},
		data() {
			return {
				ifBottomRefresh: false,
				dataList: [],
				dataList1: [],
				queryInfo: {
					page: 1,
					pagelist: 10,
				},
				queryInfo1: {
					page: 1,
					pagelist: 10,
				},
				modalName2: null,
				switchGD: false,
				upimageList: [{
						name: '拍照',
						value: 1,
					},
					{
						name: '相册选图',
						value: 2,
					}
				],
				imgList1: [],//付款凭证
				upgetimgList1:[],//付款凭证 ,隔开
				showupimage: false,
				TCid:0,
				remark:'',
				loadmore: 'more', //more 还有数据   noMore 无数据
				loadmore1: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad() {
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		onReady() {
			
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('进入刷新');
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
			tabGoods(id) {
				//弹出审批付款窗
				/*
				uni.navigateTo({
					url: "/pages/erp/finace/goods?checkId="+id
				});*/
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData['status'] = 'unaudited'
				erpfinancewastebook(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							that.dataList = that.dataList.concat(data)
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
							
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			fukuanTap(id,e){
				//弹出审批付款窗
				this.TCid = id
				console.log(id)
				this.modalName2 = e
			},
			hideModal2(e) {
				this.modalName2 = null
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
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
			opencamare(){
				let that = this;
				let uplength = 9;
				uplength = 9 - Number(that.imgList1.length);
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						if (that.imgList1.length != 0) {
							that.imgList1 = that.imgList1.concat(res.tempFilePaths)
						} else {
							that.imgList1 = res.tempFilePaths
						}
						return;
						
					},
					complete:function(){
						that.checkimgshow = false;
					}
					
				});
			},
			// 使用相册功能
			openpictrue(){
				let that = this;
				let uplength = 9;
				uplength = 9 - Number(that.imgList1.length);
				console.log(uplength);
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (that.imgList1.length != 0) {
							that.imgList1 = that.imgList1.concat(res.tempFilePaths)
						} else {
							that.imgList1 = res.tempFilePaths
						}
						return;
					},
					complete:function(){
						that.checkimgshow = false;
					}
				});
			},
			ChooseImage() {
				let that = this;
				let uplength = 9 - Number(this.imgList1.length);
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.push = false;
						if (this.imgList1.length != 0) {
							this.imgList1 = this.imgList1.concat(res.tempFilePaths)
						} else {
							this.imgList1 = res.tempFilePaths
						}
					}
				});
				
			},
			upbiaojiTap() {
			},
			
			DelImg(e) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: res => {
						if (res.confirm) {
							that.imgList1.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			tijiaoTap(){
				let that = this;
				console.log('提交',this.imgList1);
				if(that.imgList1.length <= 0){
					return that.$u.toast('请上传付款凭证');
				}
				
				let promisearr = [];
				that.imgList1.forEach((item,index)=>{
					if(item.indexOf('shousifang') == -1){
						promisearr.push(raiseUpload(item));
					}else{
						that.upgetimgList1.push(item);
					}
				})
				
				Promise.all(promisearr).then((res)=>{
					// console.log(res);
					res.forEach((iii)=>{
						that.upgetimgList1.push(iii.data.imgurl);
					})
				})
				.finally(() => {
					that.fukuanTap1();
				})
			},
			// 审核付款
			fukuanTap1() {
				let that = this;
				
				let paramstData = {
					id:this.TCid,
					images:this.upgetimgList1,
					remark:this.remark,
				}
				erpfinancefukuan(paramstData).then(res=>{
					that.$u.toast('付款成功');
					setTimeout(() => {
						this.TCid = 0;
						location.reload()
					}, 1000);
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.cu-list.menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
	.cu-modal{
		z-index: 99;
	}
</style>