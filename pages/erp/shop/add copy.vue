<template>
	<view>
		<view class="margin-sm bg-white radius-4">
			<view class="cu-form-group supplier">
				<view class="title">供货商</view>
				<view class="cu-capsule radius" @tap="supplierTap">
					<view class="picker">
						{{supplierInfo.name ? supplierInfo.name :'请选择供货商'}}
						<text class="lg cuIcon-right text-grey"></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">采购货品</view>
				<view class="cu-capsule radius">
					<view class="" @tap="selectShopTap">
						<view class="cu-tag bg-green">
							<text class="cuIcon-check text-white"></text>
						</view>
						<view class="cu-tag line-green">
							选择货品
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in goodsList"
					:key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
					:data-target="'move-box-' + index">
					<view class="cu-avatar lg" :style="[{backgroundImage:'url('+ item.image +')'}]">
					</view>
					<view class="content">
						<view class="text-grey">{{item.name}}</view>
						<view class="text-gray text-sm">
							采购单价:<text class="text-red margin-right-xs">{{item.cost_price}}</text>
							调货单价:<text class="text-red margin-right-xs">{{item.peer_price}}</text>
							销售单价:<text class="margin-right-xs">{{item.sales_price}}</text>
							库存:<text class="margin-right-xs">{{item.stock}}</text>
						</view>
						<!-- <view class="text-gray text-sm">
							sku:白色 128g 电信合约版
							采购数量:10
						</view> -->
					</view>
					<view class="action" @tap="showModal(item,index)" data-target="Modal">
						<text class="text-red">编辑</text>
					</view>
					<view class="move">
						<view class="bg-red" @tap="delectTap(index)">删除</view>
					</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="padding-xl">
						<view class="cu-bar bg-white justify-end">
							<view class="content">填写采购信息</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">产品标题</view>
							<text class="text-sm">{{checktitle}}</text>
						</view>
						
						<view class="cu-form-group margin-top">
							<view class="title">采购单价</view>
							<input placeholder="请填写采购价" type="number" v-model="costPrice" name="input"></input>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">调货单价</view>
							<input placeholder="请填写调货价" type="number" v-model="peerPrice" name="input"></input>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">销售单价</view>
							<input placeholder="请填写销售价" type="number" v-model="salesPrice" name="input"></input>
						</view>
						<!-- <view class="cu-form-group margin-top">
							<view class="title">SKU</view>
							<view>
								选择分类（同回收那个四联）
							</view>
						</view> -->
						<view class="cu-form-group margin-top">
							<view class="title">入库仓库</view>
							<view @click="rukuFuc()">
								{{warehouse_name ? warehouse_name : '请选中仓库'}}{{warehouse_name ? partition_name ? '-'+partition_name : '' :''}}
							</view>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">采购数量</view>
							<view class="caigounum"><input placeholder="请填写采购数量" type="number" :value="total"
									@input="countVal"></input></view>
							<view class="caigoucz  flex flex-direction">
								<view class="btn" @click="reduce">-</view>
								<view class="btn" @click="add">+</view>
							</view>
							<view class="sn-btn" @click="showModal2" data-target="Modal2"
								v-if="use_spec==1 && category_id !== 7">
								SN/串号
							</view>
						</view>
			
					</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="modalName2=='Modal2'?'show':''" >
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">填写SN/串号</view>
						<view class="action" @tap="hideModal2">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<!--for total  这里能不能指定高度，超过显示下拉条-->
					<view class="padding-xl">
						<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="0"
							style="height:calc(50vh - 375upx)">
							<view class="cu-form-group margin-top" v-for="(item, index) in totallist" :key="index"
								:data-id="index">
								<view class="title">SN/串号{{index+1}}</view>
								<input placeholder="请填写SN/串号" v-model="item.label" name="input"></input>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn radius-4 bg-red margin-tb-sm lg" @click="submitfuc()">确定</button>
		</view>
		<!-- 选择仓库 -->
		<u-picker :show="cangkushow" keyName="lable" ref="uPicker" :columns="columns" @confirm="confirm"
			@change="changeHandler" @cancel="closecheck(1)"></u-picker>
	</view>
</template>

<script>
	import {
		erpthirdadd,
		erpProductGetNewdata,
		erppurchaseadd,
		erpProductGetBasicData
	} from "@/api/erpapi.js"
	export default {
		components: {

		},
		computed: {

		},
		data() {
			return {
				editindex: '',
				modalName: null,
				modalName2: null,
				supplierInfo: '',
				category_id: 6,
				use_spec: 1,
				specSelected: [],
				specList: [],
				checkgoodsInfo: '',
				goods_id: '',
				product_id:'',
				spec_id:'',
				goodsList: [],
				total: 1,
				totallist: [{
					label: ''
				}],
				productList:[], //添加规格的数据
				warehouse_id: '', //主仓库
				warehouse_name: '',
				partition_id: '', //分仓库
				partition_name: '', //分仓库
				checktitle:'', //产品名称
				checkinfotext: [],
				cangkushow: false,
				columns: [],
				filterbasicInfo: [],
				filterbasicList:{},
				costPrice: '',
				peerPrice: '',
				salesPrice: '',
			};
		},
		onLoad(options) {
			console.log(this.category_id)
			this.erpProductGetBasicDataFuc();
		},
		onReady() {
			// this.goods_id = 1;
			// this.getoncegoods();
		},
		onShow() {
			let that = this;
			uni.$once('updatesupplier', function(data) {
				// console.log(data);
				that.supplierInfo = {
					...data
				};
			})
			// uni.$once('hsgoodsId', function(data) {
			// 	console.log(data);
			// 	this.hsgoods_id = data
			// })
		},
		methods: {
			getValue(list) {
				console.log(list, 'B页面传递的数据')
				this.goods_id = list.product_id;
				this.use_spec = list.use_spec;
				let checkSnID = false;
				this.goodsList.forEach((item,index)=>{
					if(item.product_id==this.goods_id && item.use_spec==this.use_spec){
						checkSnID = true;
					}
				})
				if(!checkSnID){
					this.getoncegoods();
				}
			},
			getoncegoods() {
				erpProductGetNewdata({
					product_id: this.goods_id,
					use_spec:this.use_spec 
				}).then(res => {
					this.goodsList.push(res.data);
				})
			},
			supplierTap() {
				uni.navigateTo({
					url: '/pages/erp/supplier/supplier'
				})
			},
			selectShopTap() {
				uni.navigateTo({
					url: '/pages/erp/shop/goods_list'
				})
			},
			showModal(e, index) {
				//console.log(e);
				if (e.json) {
					this.costPrice = e.json.cost_price;
					this.peerPrice = e.json.peer_price;
					this.salesPrice = e.json.sales_price;
					this.warehouse_id = e.json.warehouse_id;
					this.warehouse_name = e.json.warehouse_name;
					this.partition_id = e.json.partition_id;
					this.partition_name = e.json.partition_name;
					this.checkinfotext = e.json.attr;
					this.total = e.json.total;
					this.totallist = e.json.totallist;
				} else {
					this.costPrice = e.cost_price;
					this.peerPrice = e.peer_price;
					this.salesPrice = e.sales_price;
					this.warehouse_id = '';
					this.partition_id = '';
					this.checkinfotext = [];
					this.total = 1;
					this.warehouse_name = '';
					this.partition_name = '';
					this.totallist = [{
						label: ''
					}];
				}
				this.checktitle = e.name;
				this.product_id = e.product_id;
				this.spec_id = e.spec_id;
				this.checkgoodsInfo = e;
				this.editindex = index;
				
				this.modalName = 'Modal';
			},
			// 商品json
			createGoodsJson() {
				if(!this.warehouse_id){
					return this.$u.toast('请选择仓库！');
				}
				let totalSn = this.totallist.map((item, index) => {
						return item.label;
					});
				if(this.total !=totalSn.length){
					return this.$u.toast('请输入完SN！');
				}
				let info = {
					product_id: this.checkgoodsInfo.pro_id,
					spec_id:this.checkgoodsInfo.spec_id,
					cost_price: this.costPrice,
					peer_price: this.peerPrice,
					sales_price: this.salesPrice,
					warehouse_id: this.warehouse_id,
					warehouse_name: this.warehouse_name,
					partition_id: this.partition_id,
					partition_name: this.partition_name,
					nums: this.total,
					sns: totalSn,
					totallist: this.totallist,
					total: this.total
				}
				// console.log(info);
				this.goodsList[this.editindex].json = info;
				this.modalName = null
			},
			hideModal(e) {
				this.createGoodsJson();
			},
			showModal2(e) {
				this.modalName2 = e.currentTarget.dataset.target
				// this.totallist = [];
				if (this.total > this.totallist.length) {
					for (let i = this.totallist.length; i < this.total; i++) {
						this.totallist.push({
							label: ''
						})
					}
				} else {
					for (let i = this.total; i < this.totallist.length; i++) {
						this.totallist.splice(i, 1);
					}
				}

				console.log(this.totallist);
				// console.log(this.modalName2);
			},
			hideModal2(e) {
				this.modalName2 = null
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
			//选择规格
			selectSpec(pindex, index, pid) {
				this.specList[pindex].child[index].selected = !this.specList[pindex].child[index].selected;
				this.specList[pindex].child.map((item1, index1) => {
					if (index1 != index) {
						item1.selected = false;
					}
				})
				this.checkinfotext = [];
				this.specList.map((item11, index11) => {
					item11.child.map((item12, index12) => {
						if (item12.selected) {
							this.checkinfotext.push(item12.name);
						}
					})
				})
			},
			submit(ref) {
				console.log(this.customFormData);
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					erpthirdadd({
						...this.customFormData
					}).then(res => {
						uni.showToast({
							title: '添加成功！',
							icon: "none"
						})
						uni.navigateBack({})
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
			reduce() {
				if (this.total <= 1) {
					return;
				}
				this.total = Number(this.total) - 1;
				//联动sn输入框减少
			},
			add() {
				if (this.use_spec == 1 && this.category_id !== 7) {
					if (this.total >= 40) {
						return;
					}
				}
				this.total = Number(this.total) + 1;
				//联动sn输入框增加
			},
			countVal(e) {
				this.total = Number(e.detail.value);
				if (this.total == 0) {
					this.total = 1;
				}
				if (this.use_spec == 1 && this.category_id !== 7) {
					if (this.total >= 40) {
						this.total = 40;
					}
				}

			},
			// 获取筛选项
			// 获取筛选项
			erpProductGetBasicDataFuc() {
				
				let that = this;
				erpProductGetBasicData({}).then(res => {
					let data = res.data;
					that.filterbasicInfo = data;
					that.filterbasicList = data.house;
					let houseData = data.house;
					console.log('接口读取->', that.filterbasicInfo);
					//that.copycanku();
					this.columns[0] = houseData.map((iii, ddd) => {
						// let info = {
						// 	value: iii.value,
						// 	lable: iii.text
						// }
						return iii.text
					});
					if (houseData[0].children.length == 0) {
						this.columns[1] = [无分仓]
					} else {
						this.columns[1] = houseData[0].children.map((e) => {
							// let info = {
							// 	value: iii.value,
							// 	lable: iii.text
							// }
							return e.text
						});
					}
					const picker = this.$refs.uPicker
					picker.setColumns(this.columns)
				})
			},
			/// 多级联动  ---- start
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
			closecheck(){
				this.cangkushow = false;
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				let cindex = e.indexs;
				this.warehouse_id = this.filterbasicList[cindex[0]].value;
				this.warehouse_name = this.filterbasicList[cindex[0]].text;
				this.partition_id = this.filterbasicList[cindex[0]].children[cindex[1]].value;
				this.partition_name = this.filterbasicList[cindex[0]].children[cindex[1]].text;
				console.log(this.goodsList);
				this.cangkushow = false;
			},
			//入仓
			rukuFuc() {
				let that = this;
				that.cangkushow = true;
			},
			submitfuc() {
				if(!this.supplierInfo.id){
					return this.$u.toast('请选择供应商！');
				}
				let checkJson = false;
				let caigouattr_info = this.goodsList.map((item, index) => {
					if(!item.json){
						checkJson = true;
					}
					return item.json;
				})
				if(checkJson){
					return this.$u.toast('请填写对应产品的仓库及SN！');
				}
				let nums11 = 0;
				let money11 = 0;
				this.goodsList.map((item, index) => {
					nums11 = nums11 + item.json.nums;
					money11 = money11 + (item.json.nums * Number(item.json.cost_price));
				})
				let productList = [];
				for(let i=0;i<caigouattr_info.length;i++){
					productList[i] = [];
					let prodata = {
						product_id:caigouattr_info[i]['product_id'],
						spec_id:caigouattr_info[i]['spec_id'],
					};
					productList[i] = prodata;
				}
				let params = {
					supplier_id: this.supplierInfo.id,
					nums: nums11,
					caigouattr_info: JSON.stringify(caigouattr_info),
					money: money11,
					type:1
				}
				 //console.log(params);
				 //return;
				erppurchaseadd(params).then(res => {
					uni.showToast({
						title: '添加成功！',
						icon: "none"
					});
					setTimeout(() => {
						location.reload()
					}, 1000);
				})
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group {
		background-color: unset;
		margin-bottom: 0rpx;
		padding: 20rpx;
	}
	.cu-list.menu-avatar>.cu-item:after{
		border-bottom:0;
	}
	.cu-list.menu-avatar>.cu-item .content{
		width: calc(100% - 50px - 60px - 10px);
	}
	.cu-list.menu-avatar>.cu-item .content>uni-view:first-child{
		font-size: 12px;
		color:#000;
	}
	.select-btn-list-boox {
		text-align: left;

		.select-item {
			padding: 18.18rpx 0;
			border-bottom: 2rpx solid #f3f3f3;
			.select-btn {
				position: relative;
				margin-top: 14.54rpx;
				width: 100%;

				.cu-btn {
					font-size: 23.63rpx;
					margin: 5rpx 16.36rpx 5rpx 0;
				}

				.cu-btn.light {
					border: 2rpx solid;
				}

				.cu-btn[disabled] {
					color: #aaaaaa;
				}
			}
		}
	}

	.selected {
		color: #e54d42;
		background-color: #fadbd9;
	}

	.caigounum {
		width: 160rpx;
	}

	.caigoucz {
		.btn:first-child {
			margin-bottom: 10rpx;
		}

		.btn {
			width: 50rpx;
			height: 40rpx;
			font-size: 40rpx;
			line-height: 30rpx;
			border: 1px solid #e54d42;
			color: #e54d42;
		}
	}

	.sn-btn {
		margin-left: 10rpx;
		width: 140rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 30rpx;
		border: 1px solid #e54d42;
		color: #e54d42;
	}

	.cu-modal {
		z-index: 1;
	}
</style>
