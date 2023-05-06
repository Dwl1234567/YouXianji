<template>
	<view style="padding-bottom: 160rpx; padding-left: 20rpx; padding-right: 20rpx;">
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">提交订单</block>
		</bar-title> -->
		<view class="cu-list grid col-3 no-border padding-lr-sm">
			<view class="cu-item radius-2" :class="index==TabCur?'text-color-yellow cur':''" v-for="(item,index) in cuIconList" :key="index"
				@tap="tabSelect" :data-id="index">
				<text class='text-bold' :class="index==TabCur?'text-white':'text-' + item.color">{{item.name}}</text>
			</view>
		</view>
		<view class="">
			<!--顺丰上门-->
			<view class="cu-form-group" v-if="TabCur==0 || TabCur==2">
				<view class="title">取件地址</view>
				<view class="picker" v-if="takeAddress.length == 0" @click="$u.route('/pages/my/address/addressManage?type=add')">
					还未设置收货地址，点击去设置~
				</view>
				<picker v-else @change="AddressChange" :value="index.address" range-key="detailAddress" :range="takeAddress">
					<view class="picker">
						{{index.address>-1?takeAddress[index.address].detailAddress:'请选择取件地址'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" v-if="TabCur==0 || TabCur==2">
				<view class="title">取件时间</view>
				<picker mode="multiSelector" :value="timeIndex" range-key="value" @columnchange="Timecolumnchange"
					@change="TimeChange" :range="takeTime">
					<view class="picker">
						{{timeIndex[0] > -1 ? takeTime[0][timeIndex[0]].value+takeTime[1][timeIndex[1]].value:'请选择上门取件时间'}}
					</view>
				</picker>
			</view>
			<!--自寄-->
			<view class="cu-form-group" v-if="TabCur==1">
				<view class="title">姓名</view>
				<input placeholder="请输入联系人姓名" v-model="jjname" name="input"></input>
			</view>
			<view class="cu-form-group" v-if="TabCur==1">
				<view class="title">手机号</view>
				<input placeholder="请输入联系人手机号" v-model="jjphone" name="input"></input>
			</view>
			<view class="cu-form-group" v-if="TabCur==1">
				<view class="title">顺丰单号</view>
				<input placeholder="请输入顺丰单号,如还无快递单可先提交" v-model="jjdanhao" name="input"></input>
			</view>
			<view class="bg-white padding" v-if="TabCur==1">
				<view>收货信息：{{storeAddress}}</view>
				<view class="padding-sm flex flex-wrap justify-center">
					<view class="cu-btn bg-red round sm" @click="copyfuc">点击复制</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">收款账户</view>
				<view class="picker" v-if="paylist.length == 0" @click="$u.route('/pages/mycenter/pay/add-pay')">
					还未设置收款账户，点击去设置~
				</view>
				<picker v-else @change="PickerChange" range-key="accountNo" :value="index.pay" :range="paylist">
					<view class="picker">
						{{index.pay>-1?paylist[index.pay].accountNo :'请选择打款账户'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" style="border:2rpx solid #EEEEEE">
				<textarea class="textarea" maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"
					placeholder="如需备注填这里"></textarea>
			</view>
			<!--商品信息-->
			<view class="bg-white orderview-card-box">
				<view class="cu-form-group">
					<view class="title">订单机型</view>
				</view>
				<view class="orderview-card-view orderview-shop-view">
					<!-- <view class="shop-info-view">
						<view class="cu-avatar round sm" :style="[{backgroundImage:'url('+ goodsInfo.image +')'}]" />
						<view class="text-black text-bold text-lg title-view">{{orderInfo.orderNum}}</view>
					</view> -->
					<view class="goods-list-view">
						<view class="cu-avatar radius" v-if="goodsInfo.image"
							:style="[{backgroundImage:'url('+ goodsInfo.image +')'}]" />
						<view class="goods-info-view">
							<view class="text-black text-cut name">{{goodsInfo.name}} </view>
							<view class="tag-view">
								<block v-for="(item_s,index_s) in cartInfo" :key="index_s">
									<text v-if="index_s < 5" class="cu-tag sm line-red radius"
										:class="index_s == 0?'tag_1':''">{{item_s.child_name}}</text>
								</block>
								<!-- <view class="more" @tap="tagsTap">
									更多>>
								</view> -->
								<view class="text-price text-red">
									<text class="text-xxl text-bold">{{goodsInfo.money}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 
					<view class="orderview-foot-view">
						<view class="sys-price">
							<view class="left-view">
								<image class="af5-img" src="/static/img/af5.png" mode="widthFix" />
								<text class="text-black">系统报价</text>
							</view>
							<view class="text-black text-right">￥ {{goodsInfo.money}}</view>
						</view>
						<view class="sec-price">
							<view class="left-view">
								<image class="af5-img" src="/static/img/af5.png" mode="widthFix" />
								<text class="text-black">二次报价</text>
							</view>
							<text class="text-black text-right">￥ {{goodsInfo.money}}</text>
						</view>
					</view>
					-->
				</view>
			</view>
			<!--商品金额-->
			<!-- <view class="bg-white orderview-card-box">
				<view class="orderview-card-view orderview-price-view">
					<view class="text-black title-view">
						<view class="title">二次报价</view>
						<view class="text-right">
							<text class="text-price">{{goodsInfo.money}}</text>
						</view>
					</view>

					<view class="text-black text-bold title-right-view">
						<text class="margin-right-xs">最终回收价格：</text>
						<text class="text-price text-red">{{goodsInfo.money}}</text>
					</view>

				</view>
			</view> -->
			<view class="cu-bar bg-white">
				<view class='action'>
					<!-- <text class='cuIcon-title text-red'></text> -->
					<text class="title">序列号/IMEI</text>
					<text class="margin-left-xs text-sm">
						<input placeholder="请输入设备序列号/IMEI" name="input" v-model="deviceNo"></input>
					</text>
				</view>
			</view>
			
			
			<view class="cu-bar bg-white">
				<view class='action'>
					<!-- <text class='cuIcon-title text-red'></text> -->
					<text class="title">机器图片</text>
					<text class="margin-left-xs text-sm">(添加照片，可提高回收效率哟)</text>
				</view>
			</view>
			<view class="pic padding flex justify-between align-center">
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[0] ?  addpicicon : 'url('+ http + phoneImgArr[0]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,0)">
						<text class="text">正面</text>
					</view>
					<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[0] ? '#111f3a':'#dd514c'}"  @tap="uploadImg(0)">
						<view :class="phoneImgArr[0] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
					<!-- <u-upload :action="action" :file-list="fileList" ></u-upload> -->
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[1] ?  addpicicon : 'url('+ http +phoneImgArr[1]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,1)">
						<text class="text">
							背面
						</text>
					</view>
					<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[1] ? '#111f3a':'#dd514c'}"  @tap="uploadImg(1)">
						<view :class="phoneImgArr[1] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[2] ?  addpicicon : 'url('+ http +phoneImgArr[2]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,2)">
						<text class="text">
							顶面
						</text>
					</view>
					<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[2] ? '#111f3a':'#dd514c'}" @tap="uploadImg(2)" >
						<view :class="phoneImgArr[2] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[3] ?  addpicicon : 'url('+ http +phoneImgArr[3]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,3)">
						<text class="text">
							底面
						</text>
					</view>
					<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[3] ? '#111f3a':'#dd514c'}" @tap="uploadImg(3)">
						<view :class="phoneImgArr[3] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="pic padding flex justify-between align-center">
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[4] ?  addpicicon : 'url('+ http +phoneImgArr[4]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,4)">
						<text class="text">
							左侧
						</text>
					</view>
					<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[4] ? '#111f3a':'#dd514c'}" @tap="uploadImg(4)">
						<view :class="phoneImgArr[4] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[5] ?  addpicicon : 'url('+ http +phoneImgArr[5]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,5)">
						<text class="text">
							右侧
						</text>
					</view>
					<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[5] ? '#111f3a':'#dd514c'}" @tap="uploadImg(5)">
						<view :class="phoneImgArr[5] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[6] ?  addpicicon : 'url('+ http +phoneImgArr[6]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,6)">
						<text class="text">
							摄像头
						</text>
					</view>
					<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[6] ? '#111f3a':'#dd514c'}" @tap="uploadImg(6)">
						<view :class="phoneImgArr[6] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[7] ?  addpicicon : 'url('+ http +phoneImgArr[7]+')' }">
					<view class="img"  @tap="viewImg(phoneImgArr,7)">
						<text class="text">
							其他
						</text>
					</view>
					<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[7] ? '#111f3a':'#dd514c'}" @tap="uploadImg(7)">
						<view :class="phoneImgArr[7] ? 'translate45':''">
							<u-icon name="plus" color="#ffffff" size="10"></u-icon>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="bg-white orderview-footer-fixed" @tap="addTap">
			<view class="flex flex-direction">
				<button class="cu-btn text-color-yellow margin-tb-sm lg radius-4">提交订单</button>
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
		addNowDay,
		gethoursInfo
	} from "@/utils/pub.js"
	import {
		HTTP_REQUEST_IMAGEURL
	} from '@/config/app';
	import {
		getUserAddress,
		getBankList,
		insertBasicOrder,
		addBasicOrder,
		getGlobalInfo
	} from "@/api/common.js";
	import {
		userAccountList,
		selectUserAddressList
	} from "@/api/commons.js";
	import {
		createRecycleOrder,
		selectStoreAddress
	} from "@/api/retrieve.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				action: 'http://192.168.2.36:8080/common/upload',
				fileList: [],
				priceId: 0,
				storeAddress: '',
				forecastMoney: '',
				deviceNo: '',
				http: '',
				index: {
					address: -1,
					time: -1,
					pay: -1,
					tags: -1,
				},
				timeIndex: [0, 0],
				phoneImgArr: [],
				addpicicon:"none",
				pImgDeleteStatus: false,
				TabCur: 0,
				modalName: null,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '顺丰上门'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '自行邮寄'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 3,
					name: '同城上门'
				}],
				takeTime: [
					[],
					[]
				],
				takeAddress: [],
				paylist: [],
				orderInfo: {},
				detailId: '',
				goodsId: '',
				goodsInfo: '',
				cartInfo: [],
				platformInfo:'',
				checkimgshow:false,
				imgParams:[],
				uploadImgtype:'',
				Pricepramitems: [],
				Priceprams: [],
				textareaAValue:'' ,//用户备注
				jjname:'',//寄件名
				jjphone:'',//寄件手机
				jjdanhao:''//寄件单号
			}
		},
		onLoad(option) {
			this.Priceprams = uni.getStorageSync('Priceprams')
			this.Pricepramitems = uni.getStorageSync('Pricepramitems')
			this.http = HTTP_REQUEST_IMAGEURL
			this.initPickupTime();
			this.getGlobalInfoFuc();
			this.selectStoreAddress()
			this.priceId = option.priceId;
			this.detailId = option.detailId;
			this.goodsId = option.goodsId;
			this.modelName = option.modelName;
			this.forecastMoney = option.forecastMoney
			this.addBasicOrderFuc();
		},
		onShow() {
			this.getUserAddressFuc();
			this.getBankListFuc();
		},
		methods: {
			// 获取门店收获地址
			selectStoreAddress() {
				selectStoreAddress(uni.getStorageSync('storeId')).then(res =>{
					if (res.code == 200) {
						this.storeAddress = res.data;
					}
				})
			},
			// 获取全局信息
			getGlobalInfoFuc(){
				let that = this;
				let params = {
					'name':''
				}
				getGlobalInfo(params).then(res=>{
					if(res.code == 1){
						that.platformInfo = res.data.platform_receipt.recipient + res.data.platform_receipt.recipient_phone + res.data.platform_receipt.recipient_address;
					}
				})
			},
			// 复制
			copyfuc(){
				let that = this;
				uni.setClipboardData({
				    data: that.storeAddress,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			// 获取系统报价提交订单基础信息
			addBasicOrderFuc() {
				let that = this;
				let params = {
					"goods_id": that.goodsId,
					"detail_id": that.detailId
				}
				addBasicOrder(params).then(res => {
					if (res.code == 1) {
						that.goodsInfo = res.data.good_info;
						that.cartInfo = res.data.key_value;
					}
				})
			},
			// 初始化取货时间
			initPickupTime() {
				let that = this;
				let myDate = new Date();
				const thours = myDate.getHours();
				// const thours = 10;
				for (let i = 0; i < 3; i++) {
					if (i == 0) {
						that.takeTime[0].push({
							value: addNowDay(0, 0) + "(今天)",
							keyy:addNowDay(0, 0)
						});
					} else if (i == 1) {
						that.takeTime[0].push({
							value: addNowDay(0, 1) + "(明天)",
							keyy:addNowDay(0, 1)
						});
					} else if (i == 2) {
						that.takeTime[0].push({
							value: addNowDay(0, 2) + "(后天)",
							keyy:addNowDay(0, 2)
						});
					}
				}
				that.takeTime[1] = gethoursInfo(0);
				console.log(that.takeTime);
			},
			TimeChange(e) {
				let that = this;
				this.timeIndex = e.detail.value
			},
			// 两列变化
			Timecolumnchange(e) {
				let that = this;
				let myDate = new Date();
				let index = e.detail.value
				let hourlist = [];
				if (index == 0) {
					hourlist = gethoursInfo(0);
					that.takeTime[1] = hourlist.filter((item,index)=>{
						return item
					})
				} else {
					hourlist = gethoursInfo(1);
					that.takeTime[1] = hourlist.filter((item,index)=>{
						return item
					})
				}
				this.$forceUpdate()
			},
			// 使用拍照功能
			opencamare(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function(res) {
						let Imgdata = JSON.stringify(res.tempFilePaths);
						upload(res.tempFilePaths).then(res => {
							that.$set(that.phoneImgArr, that.uploadImgtype, res.data.imgurl);
							that.imgParams.push(res.data.imgurl);
						})
					},
					complete:function(){
						that.checkimgshow = false;
					}
				});
			},
			// 使用相册功能
			openpictrue(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let Imgdata = JSON.stringify(res.tempFilePaths);
						upload(res.tempFilePaths).then(res => {
							that.$set(that.phoneImgArr, that.uploadImgtype, res.data.imgurl);
							that.imgParams.push(res.data.imgurl);
						})
					},
					complete:function(){
						that.checkimgshow = false;
					}
				});
			},
			//查看图片
			viewImg(url,index){
				//需要分割url并去除空数组
				if(url){
					const urll = url.map(item => {
						return this.$httpImage + item
					})
					if(url[index]){
						uni.previewImage({
							current: index,
							urls: urll
						})
					}
				}else{
				}
			},
			uploadImg(type) {
				console.log(this.phoneImgArr[type], '123123123');
				if (!this.phoneImgArr[type]) {
					let that = this;
					that.uploadImgtype = type;
					uni.navigateTo({
						url:'/pages/idphoto/idphoto'
					})
				} else {
					this.deleteImg(type)
				}
				
			},
			//设置图片
			setImage(e) {
				let that = this;
				//显示在页面
				let Imgdata = [];
				Imgdata.push(e.path);
				upload(Imgdata).then(res => {
					that.$set(that.phoneImgArr, that.uploadImgtype, res.fileName);
					that.imgParams.push(res.fileName);
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
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			PickerChange(e) {
				this.index.pay = e.detail.value
			},
			AddressChange(e) {
				this.index.address = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			addTap() {
				let that = this;
				if (that.TabCur == 0) {
					if (that.index.address == -1) {
						return that.$u.toast('请添加一个地址！')
					}
					that.creatinsertBasicOrder();
				} else if (that.TabCur == 1) {
					that.creatinsertBasicOrder();
				} else if (that.TabCur == 2) {
					that.creatinsertBasicOrder();
				}
			},
			// 获取用户收货地址
			getUserAddressFuc() {
				let that = this;
				selectUserAddressList().then(res => {
					if (res.code == 200) {
						that.takeAddress = res.data;
						console.log(res.data)
						if (that.takeAddress.length > 0) {
							that.$set(that.index, 'address', 0);
							console.log(this.index);
						}
					}
				})
			},
			// 获取银行列表
			getBankListFuc(){
				let that = this;
				userAccountList().then(res=>{
					if (res.code == 200) {
						that.paylist = res.rows;
						if (that.paylist.length > 0) {
							that.$set(that.index, 'pay', 0);
						}
						that.paylist.forEach((item, index) => {
							item['bankinfo'] = item.bank_name + '-' + item.bank_card;
						})
						
					}
				})
			},
			refreshList(data, type) {
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.takeAddress.unshift(data);
			
				console.log(data, type);
			},
			// 创建订单
			creatinsertBasicOrder() {
				let that = this;
				let puttakeTime = '';
				let deviceLabel = uni.getStorageSync('goodsdesc')
				let storeId = uni.getStorageSync('storeId')
				if((that.TabCur == 0 || that.TabCur == 2) && that.timeIndex[0] == -1 && that.timeIndex[1] == -1){
					return that.$u.toast('请选择上门取件时间');
				}else if((that.TabCur == 0 || that.TabCur == 2) && that.takeTime[1][0].value == '请预约明天的时间吧～'){
					return that.$u.toast('请选择明天的时间吧~');
				}else{
					puttakeTime = that.takeTime[0][that.timeIndex[0]].keyy+' '+that.takeTime[1][0].value.split('~')[0] + ':00';
				}
				if((that.TabCur == 0 || that.TabCur == 2) && that.index.address == -1){
					return that.$u.toast('请选择一个地址！');
				}
				if (that.TabCur == 2) {
					puttakeTime = that.takeTime[0][that.timeIndex[0]].keyy+' '+that.takeTime[1][0].value.split('~')[0] + ':00' + '~' + that.takeTime[1][0].value.split('~')[1] + ':00';
				}
				if(that.TabCur == 1){
					if(!that.jjname){
						return that.$u.toast('请填写姓名！');
					}
					if(!that.jjphone){
						return that.$u.toast('请填写手机号！');
					}
					if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(that.jjphone)) {
						return that.$u.toast('请输入正确的手机号码');
					}
					if(!that.jjdanhao){
						return that.$u.toast('请填写顺丰单号！');
					}
				}
				//顺丰参数
				if(that.TabCur == 0){
					var express_name = '顺丰快递';
				}
				//自寄参数
				if(that.TabCur == 1){
					var express_name = '';
				}
				//同城上门参数
				if(that.TabCur == 2){
					var express_name = '同城上门';
				}
				let params = {
					'basicPriceId': Number(that.priceId),
					'deviceLabel': deviceLabel,
					'modelName': that.modelName,
					'qualityInfo':JSON.stringify(that.Priceprams),
					'qualityInfoList': JSON.stringify(that.Pricepramitems),
					'orderPostType': that.TabCur,
					'consigneeAddress': that.TabCur !== 2 ? that.storeAddress : '',
					'pickUpAddress': that.takeAddress[that.index.address].addressId,
					'pickUpTime': puttakeTime,
					'postLinkName': that.jjname,
					'postLinkPhone': that.jjphone,
					'postOrderNo': that.jjdanhao,
					'remark': that.textareaAValue,
					'userAccount': that.paylist[that.index.pay].accountId,
					'modelId': Number(that.goodsId),
					'deviceNo': that.deviceNo,
					'frontPhoto': that.phoneImgArr[0],
					"backPhoto": that.phoneImgArr[1],
					"topPhoto": that.phoneImgArr[2],
					"bottomPhoto": that.phoneImgArr[3],
					"leftPhoto": that.phoneImgArr[4],
				  "rightPhoto": that.phoneImgArr[5],
					"cameraPhoto": that.phoneImgArr[6],
					"otherPhoto": that.phoneImgArr[7],
					'storeId': storeId,
					'firstPrice': that.forecastMoney
				}
				createRecycleOrder(params).then(res => {
					if(res.code == 200){
						that.$u.toast('提交订单成功');
						uni.navigateTo({
							url: "/pages/order/recycle/list"
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-list.grid>.cu-item uni-text {
		color: unset;
	}

	.orderview-card-box {
		padding: 27.27rpx 0rpx 0;
	}

	.orderview-card-view {
		position: relative;
		border-radius: 9.09rpx;
		padding: 10rpx;
		box-shadow: 0 0 14.54rpx #f1f1f1;
	}

	.translate45 {
		transform: rotate(45deg);
		transition-duration: 1s;
	}

	.orderview-shop-view {
		position: relative;

		.shop-info-view {
			position: relative;
			margin-bottom: 27.27rpx;
			line-height: 47.27rpx;
			height: 47.27rpx;

			.cu-avatar {
				position: absolute;
			}

			.title-view {
				position: relative;
				padding-left: 63.63rpx;
			}
		}

		.goods-list-view {
			position: relative;
			margin: 10rpx 0;

			.cu-avatar {
				position: absolute;
				height: 160rpx;
				width: 160rpx;
			}

			.goods-info-view {
				position: relative;
				padding-left: 170rpx;
				height: 160rpx;

				.name {
					position: relative;
					//height: 38.18rpx;
					width: 100%;
				}

				.tag-view {
					position: relative;
					margin-bottom: 9.09rpx;
					margin-top: 7.27rpx;
					height: 33.87rpx;
					width: 100%;

					.cu-tag {
						position: relative;
						margin-bottom: 10rpx;
						top: -3.63rpx;
					}
				}

				.more {
					font-size: 24rpx;
					color: #007AFF
				}

				.text-price {
					position: relative;
					height: 36.36rpx;
					width: 100%;
				}
			}
		}

		.orderview-foot-view {
			position: relative;
			background: #FFFCFC;
			margin: 0 -18.18rpx -18.18rpx -18.18rpx;
			border-radius: 0 0 9.09rpx 9.09rpx;
			padding: 18.18rpx;

			.sys-price,
			.sec-price {
				position: relative;
				height: 50rpx;
			}

			.left-view {
				position: absolute;
				padding-right: 181.81rpx;

				.af5-img {
					position: relative;
					margin-right: 9.09rpx;
					width: 36.36rpx;
					top: 3.63rpx;
				}
			}

			.text-right {
				position: absolute;
				right: 18.18rpx;
			}
		}
	}

	.orderview-price-view {
		position: relative;

		.title-view {
			position: relative;
			margin-bottom: 18.18rpx;

			.title {
				position: relative;
				padding-right: 181.81rpx;
				
			}

			.text-right {
				position: absolute;
				top: 3.63rpx;
				right: 0;
			}
		}

		.title-right-view {
			position: relative;
			margin-top: 27.27rpx;
			text-align: right;
		}

		.solid-line {
			margin: 27.27rpx 0;
		}
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
