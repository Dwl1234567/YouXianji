<template>
	<view class="content">
		<view class="cu-form-group margin-top">
			<view class="title">标题</view>
			<input placeholder="请输入产品标题" v-model="goodstitle" name="input"></input>
		</view>

		<view class="cu-form-group margin-top">
			<view class="title">SN</view>
			<input placeholder="请输入产品序列号" v-model="goodssn" name="input"></input>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class='action'>
				<text class='cuIcon-title text-blue'></text>添加照片
			</view>
		</view>
		<view class="padding flex justify-between align-center">
			<view class='cu-avatar xl radius' @tap="uploadImg(0)"
				:style="{'background-image': !phoneImgArr[0] ?  addpicicon : 'url('+phoneImgArr[0]+')' }">
				正面
				<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[0] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[0] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(0)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(1)"
				:style="{'background-image': !phoneImgArr[1] ?  addpicicon : 'url('+phoneImgArr[1]+')' }">
				背面<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[1] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[1] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(1)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(2)"
				:style="{'background-image': !phoneImgArr[2] ?  addpicicon : 'url('+phoneImgArr[2]+')' }">
				顶面
				<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[2] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[2] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(2)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(3)"
				:style="{'background-image': !phoneImgArr[3] ?  addpicicon : 'url('+phoneImgArr[3]+')' }">
				底面
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[3] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[3] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(3)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex justify-between align-center">
			<view class='cu-avatar xl radius' @tap="uploadImg(4)"
				:style="{'background-image': !phoneImgArr[4] ?  addpicicon : 'url('+phoneImgArr[4]+')' }">
				左侧
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[4] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[4] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(4)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(5)"
				:style="{'background-image': !phoneImgArr[5] ?  addpicicon : 'url('+phoneImgArr[5]+')' }">
				右侧
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[5] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[5] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(5)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(6)"
				:style="{'background-image': !phoneImgArr[6] ?  addpicicon : 'url('+phoneImgArr[6]+')' }">
				其他
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[6] ? '#00d800':'#dd514c'}">
					<view :class="phoneImgArr[6] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(6)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' @tap="uploadImg(7)"
				:style="{'background-image': !phoneImgArr[7] ?  addpicicon : 'url('+phoneImgArr[7]+')' }">
				细节
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[7] ? '#00d800':'#dd514c'}">
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
		<view class="cu-form-group margin-top">
			<view class="title">回收价</view>
			<input placeholder="请输入回收价" v-model="ActualreceiptsAll" name="input"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">调拨价</view>
			<input placeholder="请输入调拨价" v-model="diaobojianum" name="input"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">销售价</view>
			<input placeholder="请输入销售价" v-model="xiaoshoujianum" name="input"></input>
		</view>

		<!--点点单-->
		<view class="cu-form-group margin-top">
			<view class="title">成色</view>
			<view>
				<u-radio-group style="display: flex;" v-model="colorvalue" placement="row" @change="groupChange">
					<u-radio :customStyle="{marginRight: '5px'}" :size="12" :labelSize="13" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.value" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>
		</view>



		<view class="cu-form-group margin-top" @click="skushow = true">
			<view class="title">选择SKU</view>
			<view>
				{{category_name?category_name:'请选择SKU'}}
				{{brand_name?'-'+brand_name:''}}
				{{series_name?'-'+series_name:''}}
				{{machine_name?'-'+machine_name:''}}
			</view>
		</view>
		<view class="cu-form-group margin-top" @click="cangkushow = true">
			<view class="title">选择仓库</view>
			<view>
				{{warehouse_name ? warehouse_name : '请选中仓库'}}{{warehouse_name ? partition_name ? '-'+partition_name : '' :''}}
			</view>
		</view>

		<view class="cu-bar bg-white margin-top">
			<view class='action'>
				<text class='cuIcon-title text-blue'></text>已选属性
			</view>
		</view>
		<view class=" bg-white margin">
			<view class="h-table margin-bottom-sm" v-for="(item,index) in goodsvalue" :key="index">
				<view class="name">{{item.title}}</view>
				<view class="h-tr h-tr-2 h-thead">
					<view class="h-td">属性</view>
					<view class="h-td">备注</view>
				</view>
				<view class="h-tr h-tr-2" v-for="(item1,index1) in item.list" :key="index1">
					<view class="h-td">
						<view class="text-bold">
							{{item1.name}}
						</view>
						<view class="">
							{{item1.value}}
						</view>
					</view>
					<view class="h-td">
						<input class=" text-sm" placeholder="请输入备注信息" v-model="remark" name="input"></input>
						</view>
				</view>
			</view>
		</view>
		<!--
		<view class="padding flex justify-between align-center">
			<view class="check-list-box">
				<view class="item" v-for="(item,index) in goodsvalue" :key='index'>{{item}}</view>
			</view>
		</view>
		-->

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
		<u-picker :show="cangkushow" keyName="lable" ref="uPicker" :columns="ckcolumns" @confirm="confirm"
			@change="changeHandler" @cancel="closecheck(1)"></u-picker>
		<u-picker :show="skushow" :defaultIndex="defaultIndex" keyName="lable" ref="skuPicker" :columns="columns"
			@confirm="skuconfirm" @change="skuchangeHandler" @cancel="closecheck(2)"></u-picker>
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
	import barTitle from '@/components/common/basics/bar-title';
	//import SelectData from '@/components/RecyclingList/SelectData.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			//SelectData
		},
		data() {
			return {
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
				ckcolumns: [],
				ckcolumnData: [],
				columns: [],
				columnData1: [],
				columnData2: [],
				columnData3: [],
				goodsvalue: '',
				allmoney: 0,
				switchA: true,
				cangkushow: false,
				skushow: false,
				filterbasicInfo: '', //筛选数据
				warehouse_id: '', //主仓库
				warehouse_name: '',
				partition_id: '', //分仓库
				partition_name: '', //分仓库
				defaultIndex: [0, 0, 0, 0],
				category_id: '',
				category_name: '',
				brand_id: '',
				brand_name: '',
				series_id: '',
				series_name: '',
				machine_id: '',
				machine_name: '',
				// sales_price:'',//销售价
				// peer_price:'',//调拨价
				// cost_price:'',//成本价
				editid:'',
				imgParams:[]//图片
			}
		},
		onLoad(options) {
			this.editid = options.id;
			this.erppurchaseclickattrviewFuc(options.id)
			this.erpProductGetBasicDataFuc();
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
			// 提交
			erpclickattreditFuc(){
				if(!this.goodssn){
					return this.$u.toast('请输入SN!');
				}
				if(!this.diaobojianum){
					return this.$u.toast('请输入调拨价!');
				}
				if(!this.xiaoshoujianum){
					return this.$u.toast('请输入销售价!');
				}
				if(!this.category_id){
					return this.$u.toast('请选择SKU!');
				}
				if(!this.warehouse_id){
					return this.$u.toast('请选择仓库!');
				}
				let paramsData={
					id:this.editid,
					name:this.goodstitle,
					sn:this.goodssn,
					paytype:this.ActualreceiptsJson,
					cost_price:this.ActualreceiptsAll,
					sales_price:this.xiaoshoujianum,
					peer_price:this.diaobojianum,
					images:this.imgParams.join(','),
					colour:this.colorvalue,
					warehouse_id:this.warehouse_id,
					partition_id:this.partition_id,
					category_id:this.category_id,
					brand_id:this.brand_id,
					series_id:this.series_id,
					machine_id:this.machine_id,
					is_ok:this.switchA?1:0
				}
				console.log(paramsData);
				// return;
				erpclickattredit(paramsData).then(res=>{
					this.$u.toast('提交成功！')
					// uni.redirectTo({
					// 	url:'/pages/tabbarerp/push?huishouid='+res.data
					// })
					// uni.$emit('hsgoodsId',res.data)
					let selectInfo = {
						hsgoods_id: res.data
					}
					// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
					let pages = getCurrentPages()
					// 2. 上一页面实例
					// 注意是length长度，所以要想得到上一页面的实例需要 -2
					// 若要返回上上页面的实例就 -3，以此类推
					let prevPage = pages[pages.length - 2]
					// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
					prevPage.$vm.getValue(selectInfo)
					// 4. 返回上一页面
					uni.navigateBack({
						delta: 1
					})
				})
			},
			// 获取筛选项
			erpProductGetBasicDataFuc() {
				let filterbasicInfo = uni.getStorageSync('filterbasicInfo');
				if (filterbasicInfo) {
					filterbasicInfo = JSON.parse(filterbasicInfo);
					this.filterbasicInfo = filterbasicInfo;
					console.log('本地缓存->', this.filterbasicInfo);
					this.copycanku();
					this.copysku();
					return;
				}
				let that = this;
				erpProductGetBasicData({}).then(res => {
					let data = res.data;
					uni.setStorageSync('filterbasicInfo', JSON.stringify(res.data));
					this.filterbasicInfo = res.data;
					console.log('接口读取->', this.filterbasicInfo);
					this.copycanku();
					this.copysku();
				})
			},
			// 给sku赋值
			copysku() {
				let data = this.filterbasicInfo.category;
				this.columns[0] = data.map((iii, ddd) => {
					let info = {
						value: iii.id,
						lable: iii.name
					}
					return info
				});
				if (data[0].children.length == 0) {
					this.columns[1] = [{
						value: 0,
						lable: '无'
					}];
				} else {
					this.columns[1] = data[0].children.map((iii, ddd) => {
						let info = {
							value: iii.id,
							lable: iii.name
						}
						return info
					});
					if (data[0].children[0].children.length == 0) {
						this.columns[2] = [{
							value: 0,
							lable: '无'
						}];
					} else {
						this.columns[2] = data[0].children[0].children.map((iii, ddd) => {
							let info = {
								value: iii.id,
								lable: iii.name
							}
							return info
						});
						if (data[0].children[0].children[0].children.length == 0) {
							this.columns[3] = [{
								value: 0,
								lable: '无'
							}];
						} else {
							this.columns[3] = data[0].children[0].children[0].children.map((iii, ddd) => {
								let info = {
									value: iii.id,
									lable: iii.name
								}
								return info
							});
						}
					}
				}

				this.columnData1 = data[0].children.map((iiii, dddd) => {
					let child = {
						value: iiii.id,
						lable: iiii.name
					}
					return child;
				});
				this.columnData2 = data[0].children[0].children.map((iiii, dddd) => {
					let child = {
						value: iiii.id,
						lable: iiii.name
					}
					return child;
				});
				this.columnData3 = data[0].children[0].children[0].children.map((iiii, dddd) => {
					let child = {
						value: iiii.id,
						lable: iiii.name
					}
					return child;
				});


				// console.log('sku', this.columns);
				// console.log('sku1', this.columnData1);
				return;
			},
			// 给仓库赋值
			copycanku() {
				let data = this.filterbasicInfo.house;
				this.ckcolumns[0] = data.map((iii, ddd) => {
					let info = {
						value: iii.id,
						lable: iii.name
					}
					return info
				});
				if (data[0].partition_list.length == 0) {
					this.ckcolumns[1] = [{
						value: 0,
						lable: '无分仓'
					}, ]
				} else {
					this.ckcolumns[1] = data[0].partition_list.map((iii, ddd) => {
						let info = {
							value: iii.id,
							lable: iii.name
						}
						return info
					});
				}


				this.ckcolumnData = data.map((iiii, dddd) => {
					let child = [];
					if (iiii.partition_list.length == 0) {
						child = [{
							value: 0,
							lable: '无分仓'
						}, ]
					} else {
						child = iiii.partition_list.map((cii, cdd) => {
							return {
								value: cii.id,
								lable: cii.name
							}
						})
					}

					return child;
				});
				// console.log('11', this.ckcolumnData);
				// return;
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
					picker.setColumnValues(1, this.ckcolumnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				let cindex = e.indexs;
				this.warehouse_id = this.ckcolumns[0][cindex[0]].value;
				this.warehouse_name = this.ckcolumns[0][cindex[0]].lable;
				this.partition_id = this.ckcolumnData[cindex[0]][cindex[1]].value;
				this.partition_name = this.ckcolumnData[cindex[0]][cindex[1]].lable;
				// console.log('主',this.ckcolumns);
				// console.log('主',this.warehouse_id);
				// console.log('分',this.ckcolumnData);
				// console.log('分',this.partition_id);
				this.cangkushow = false;
			},
			skuchangeHandler(e) {
				let data = this.filterbasicInfo.category;
				// console.log('eee',e);
				// return;
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.skuPicker
				} = e
				let indexs = e.indexs;
				// console.log('indexs', indexs);
				// console.log('columnIndex', columnIndex);
				if (columnIndex == 0) {
					indexs[1] = 0;
					indexs[2] = 0;
					indexs[3] = 0;
				}

				if (data[indexs[0]].children.length == 0) {
					this.columnData1 = [{
						value: 0,
						lable: '无'
					}]
					this.columnData2 = [{
						value: 0,
						lable: '无'
					}]
					this.columnData3 = [{
						value: 0,
						lable: '无'
					}]
				} else {
					this.columnData1 = data[indexs[0]].children.map((iiii, dddd) => {
						let child = {
							value: iiii.id,
							lable: iiii.name
						}
						return child;
					});
					if (data[indexs[0]].children[indexs[1]].children.length == 0) {
						this.columnData2 = [{
							value: 0,
							lable: '无'
						}]
						this.columnData3 = [{
							value: 0,
							lable: '无'
						}]
					} else {
						this.columnData2 = data[indexs[0]].children[indexs[1]].children.map((iiii, dddd) => {
							let child = [];
							if (iiii.children.length == 0) {
								child = [{
									value: 0,
									lable: '无'
								}]
							} else {
								child = {
									value: iiii.id,
									lable: iiii.name
								}
							}
							return child;
						});
						if (data[indexs[0]].children[indexs[1]].children[indexs[2]].children.length == 0) {
							this.columnData3 = [{
								value: 0,
								lable: '无'
							}]
						} else {
							// console.log('111', data[indexs[0]].children[indexs[1]].children[indexs[2]].children);
							this.columnData3 = data[indexs[0]].children[indexs[1]].children[indexs[2]].children.map((iiii,
								dddd) => {
								let child = '';
								child = {
									value: iiii.id,
									lable: iiii.name
								}
								return child;
							});
						}
					}
				}
				// console.log('sku1', this.columnData2);
				// console.log('sku2', this.columnData3);
				// return;
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData1)
					picker.setColumnValues(2, this.columnData2)
					picker.setColumnValues(3, this.columnData3)
					// this.defaultIndex = [indexs[0], indexs[1], 0, 0];
				} else if (columnIndex === 1) {
					picker.setColumnValues(2, this.columnData2)
					picker.setColumnValues(3, this.columnData3)
					// this.defaultIndex = [indexs[0], indexs[1], 0, 0];
				} else if (columnIndex === 2) {
					picker.setColumnValues(3, this.columnData3)
					// this.defaultIndex = [0,0,0,0];
				}
			},
			// 回调参数为包含columnIndex、value、values
			skuconfirm(e) {
				// console.log('confirm', e)
				let cindex = e.indexs;
				console.log('confirm', cindex)
				console.log('confirm', this.columnData1)
				console.log('confirm', this.columnData1[cindex[1]].lable)
				this.category_id = this.columns[0][cindex[0]].value;
				this.category_name = this.columns[0][cindex[0]].lable;
				this.brand_id = this.columnData1[cindex[1]].value;
				this.brand_name = this.columnData1[cindex[1]].lable;
				this.series_id = this.columnData2[cindex[2]].value;
				this.series_name = this.columnData2[cindex[2]].lable;
				this.machine_id = this.columnData3[cindex[3]].value;
				this.machine_name = this.columnData3[cindex[3]].lable;
				this.skushow = false
			},
			closecheck(type) {
				// 1仓库 2sku
				if (type == 2) {
					this.skushow = false
				} else {
					this.cangkushow = false
				}
			},
			// 多级联动 ---end
			groupChange(n) {
				console.log('groupChange', n);
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
					this.goodsvalue = res.data.value
					//this.goodsvalue = JSON.parse(res.data.value);
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
			// 提交图片
			uploadImg(type) {
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
		}
	}
</script>

<style lang="scss">
	.cu-avatar {
		background-color: #ccc;
	}

	.translate45 {
		transform: rotate(45deg);
		transition-duration: 1s;
	}

	.check-list-box {
		overflow: hidden;

		.item {
			position: relative;
			display: inline-block;
			background-color: #d7f0db !important;
			color: #39b54a !important;
			width: auto;
			text-align: center;
			font-size: 26rpx;
			padding: 10rpx 10rpx;
			margin-top: 10rpx;
			margin-right: 10rpx;
		}
	}

	.hight-view {
		height: 290rpx;
	}

	.orderview-footer-fixed {
		position: fixed;
		z-index: 99;
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
</style>
