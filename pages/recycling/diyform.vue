<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">机型选择</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择机型'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">机型名称</view>
			<input placeholder="如iPhone XR 国行 128G版" v-model="formInfo.phoneName" name="input"></input>
		</view>
		<!--选项-->
		<view class="bg-white nav-tab-view">
			<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="tab_scroll">
				<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
					<view class="cu-item" :class="tabindex == tab_cur?'select':''" @tap="tabSelect"
						:data-id="tabindex">
						<view :class="tabindex == tab_cur?'text-black':''">{{tabitem}}</view>
						<view class="tab-dot bg-red" />
					</view>
				</block>
			</scroll-view>
		</view>
		<!--选项列表-->
		<block v-for="(item,index) in nav_list" :key="index">
			<view class="process-box margin-top" v-show="tab_cur == index">
				<scroll-view v-for="(recyitem,recyindex) in retrieveList[index]" :key="recyindex" scroll-y="true"
					class="scroll-Y">
					<SelectData :title="recyitem.name" :checklist="recyitem.child" @itemclick="moneyFuc">
					</SelectData>
		
				</scroll-view>
			</view>
		</block>
		<!--
		<view class="cu-form-group">
			<view class="title">机器状态</view>
			<radio-group class="radio-group" @change="RadioChange">
				<view class="flex">
					<view class="flex-sub">
						<radio class="round" value="1" :class="radio=='1'?'checked':''"
							:checked="radio=='1'?true:false" />
						几乎完美无划痕
					</view>
					<view class="flex-sub">
						<radio class="round" value="2" :class="radio=='2'?'checked':''"
							:checked="radio=='2'?true:false" />
						划痕/磨损
					</view>
				</view>
				<view class="flex">
					<view class="flex-sub">
						<radio class="round" value="3" :class="radio=='3'?'checked':''"
							:checked="radio=='3'?true:false" />
						磕碰/掉漆/氧化
					</view>
					<view class="flex-sub">
						<radio class="round" value="4" :class="radio=='4'?'checked':''"
							:checked="radio=='4'?true:false" />
						变形/破损
					</view>
				</view>
			</radio-group>
		</view>
		-->
		<view class="cu-form-group">
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"
				placeholder="请输入备注信息"></textarea>
		</view>
		<view class="cu-form-group">
			<view>
				<text class="cuIcon-question margin-right-sm"></text>
				<text>请与客服协商价格</text>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='cuIcon-title text-red'></text>
				<text class="title">序列号/IMEI</text>
				<text class="margin-left-xs text-sm">
					<input placeholder="请输入设备序列号/IMEI" v-model="formInfo.goodsSn" name="input"></input>
				</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class='action'>
				<text class='cuIcon-title text-blue'></text>添加照片
			</view>
		</view>
		<view class="pic padding flex justify-between align-center">
		<!-- <view class="padding flex justify-between align-center"> -->
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[0] ?  addpicicon : 'url('+phoneImgArr[0]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,0)">
					<text class="text">正面</text>
				</view>
				<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[0] ? '#111f3a':'#dd514c'}"  @tap="uploadImg(0)">
					<view :class="phoneImgArr[0] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(0)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[1] ?  addpicicon : 'url('+phoneImgArr[1]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,1)">
					<text class="text">
						背面
					</text>
				</view>
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[1] ? '#111f3a':'#dd514c'}"  @tap="uploadImg(1)">
					<view :class="phoneImgArr[1] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(1)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[2] ?  addpicicon : 'url('+phoneImgArr[2]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,2)">
					<text class="text">
						顶面
					</text>
				</view>
				<view class="cu-tag badge" :style="{backgroundColor: !phoneImgArr[2] ? '#111f3a':'#dd514c'}" @tap="uploadImg(2)" >
					<view :class="phoneImgArr[2] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(2)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[3] ?  addpicicon : 'url('+phoneImgArr[3]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,3)">
					<text class="text">
						底面
					</text>
				</view>
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[3] ? '#111f3a':'#dd514c'}" @tap="uploadImg(3)">
					<view :class="phoneImgArr[3] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(3)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="pic padding flex justify-between align-center" style="padding-bottom:100px ;">
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[4] ?  addpicicon : 'url('+phoneImgArr[4]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,4)">
					<text class="text">
						左侧
					</text>
				</view>
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[4] ? '#111f3a':'#dd514c'}" @tap="uploadImg(4)">
					<view :class="phoneImgArr[4] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(4)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[5] ?  addpicicon : 'url('+phoneImgArr[5]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,5)">
					<text class="text">
						右侧
					</text>
				</view>
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[5] ? '#111f3a':'#dd514c'}" @tap="uploadImg(5)">
					<view :class="phoneImgArr[5] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(5)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[6] ?  addpicicon : 'url('+phoneImgArr[6]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,6)">
					<text class="text">
						摄像头
					</text>
				</view>
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[6] ? '#111f3a':'#dd514c'}" @tap="uploadImg(6)">
					<view :class="phoneImgArr[6] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(6)"></u-icon>
					</view>
				</view>
			</view>
			<view class='cu-avatar xl radius' :style="{'background-image': !phoneImgArr[7] ?  addpicicon : 'url('+phoneImgArr[7]+')' }">
				<view class="img"  @tap="viewImg(phoneImgArr,7)">
					<text class="text">
						其他
					</text>
				</view>
				<view class='cu-tag badge' :style="{backgroundColor: !phoneImgArr[7] ? '#111f3a':'#dd514c'}" @tap="uploadImg(7)">
					<view :class="phoneImgArr[7] ? 'translate45':''">
						<u-icon name="plus" color="#ffffff" size="10" @click="deleteImg(7)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white orderview-footer-fixed">
			<view class="flex flex-direction" @tap="insertCustomOrderFuc">
				<button class="cu-btn bg-red margin-tb-sm lg">提交订单</button>
			</view>
		</view>
		<!--模态框-->
		<u-modal :show="tipshow" :title="tiptitle" :content='tipcontent' :closeOnClickOverlay="true" @confirm="confirm"
			@close="close" :confirmText="tipbtn">
		</u-modal>
		<!-- 相机相册选择 -->
		<u-popup :show="checkimgshow" :round="8" mode="bottom" :closeOnClickOverlay="true" @close="close">
			<view>
				<u-button type="default" :customStyle="{height:'120rpx'}" @click="opencamare" text="拍照"></u-button>
				<view style="height:2rpx;background-color: #EEEEEE;width: 100%;"></view>
				<u-button type="default" :customStyle="{height:'120rpx'}" @click="openpictrue" text="从手机相册选择">
				</u-button>
			</view>
			<view style="background-color: #EEEEEE;height: 10rpx;width: 100%;"></view>
			<view>
				<u-button type="default" @click="checkimgshow = false" :customStyle="{height:'120rpx'}" text="取消">
				</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		upload
	} from "@/api/upload.js";
	import {
		getUserAddress,
		insertCustomOrder,
		getOtherMachine,getOtherShuxing
	} from "@/api/common.js";
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	export default {
		components: {
			SelectData,
		},
		data() {
			return {
				checkimgshow: false,
				modalName: null,
				radio: '1',
				tipshow: false,
				tiptitle: '',
				tipcontent: '',
				tipbtn: '',
				formInfo: {
					'radio': '1',
					'phoneName':'',
					'goodsSn':'',
					'remarks':''
				},
				phoneImgArr: [],
				pImgDeleteStatus: false,
				addpicicon:"none",
				upimgtype: '',
				tab_scroll: 0,
				tab_cur: 0,
				nav_list: [
					'物品信息',
					'成色情况',
					'功能情况',
					'维修情况'
				],
				retrieveList: [],
				index: -1,
				picker: [],
				basicList : [],
				addParams: {},
				otherspecID:0,
			}
		},
		onLoad(option) {
			this.getOtherShuxingData();
			this.getOtherBasicData();
		},
		methods: {
			getOtherBasicData(){
				let that = this;
				getOtherMachine({}).then(res => {
					if (res.code == 1) {
						that.basicList = res.data;
						that.basicList.forEach((item, index) => {
							that.picker.push(item.name);
						})
					}
				})
			},
			getOtherShuxingData(){
				let that = this;
				getOtherShuxing({}).then(res => {
					if (res.code == 1) {
						that.retrieveList = res.data;
						setTimeout(() => {
							this.gainSelectedAttr();
						}, 500)
					}
				})
			},
			//获取选中的值
			gainSelectedAttr(){
				let that = this;
				that.retrieveList.forEach((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.child.forEach((iiitem, indexxx) => {
							if (iiitem.checked) {
								that.addParams[iitem.key] = indexxx;
							}
						})
					})
				})
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				// console.log(this.tab_cur);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			moneyFuc(e) { //属性值选中
				console.log(e);
				setTimeout(() => {
					this.gainSelectedAttr();
				}, 500)
			},
			PickerChange(e) {
				this.index = e.detail.value;
				let that = this;
				let params = {};
				params.type = this.basicList[this.index]['id'];
				that.otherspecID = this.basicList[this.index]['id'];
				getOtherShuxing(params).then(res => {
					if (res.code == 1) {
						that.retrieveList = res.data;
						setTimeout(() => {
							this.gainSelectedAttr();
						}, 500)
					}
				})
			},
			textareaAInput(e) {
				// this.textareaAValue = e.detail.value
				this.formInfo.remarks = e.detail.value
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.formInfo.radio = e.detail.value;
				console.log('this.formInfo',this.formInfo);
			},
			addTap() {
				//api提交
				let status = 1;
				if (status == 1) {
					//提交成功
					this.tipshow = true;
					this.tiptitle = '订单提交成功';
					this.tipcontent = '客服正在评估您的机器价格，将尽快给您一个专业合理报价哦！'
					this.tipbtn = '我已知晓';

					this.status = 1;
				} else {
					//提交失败
					this.tipshow = true;
					this.tiptitle = '提交失败';
					this.tipcontent = '服务器繁忙，点击关闭后重新提交'
					this.tipbtn = '重新提交';

					this.status = 0;
				}
			},
			confirm() {
				setTimeout(() => {
					this.tipshow = false;
				}, 10);
				if (this.status == 1) {
					console.log('跳转到详情？订单列表');
				} else {
					console.log('关闭不跳转');
				}
			},
			close() {
				this.tipshow = false;
				this.checkimgshow = false;
			},
			//查看图片
			viewImg(url,index){
				//需要分割url并去除空数组
				if(url){
					if(url[index]){
						uni.previewImage({
							current: index,
							urls: url
						})
					}
					//this.$u.toast(url); 
				}else{
					//this.$u.toast("无图"); 
				}
			},
			uploadImg(type) {
				let that = this;
				that.uploadImgtype = type;
				uni.navigateTo({
					url:'/pages/idphoto/idphoto?type=' + type
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
				// type  上传图片类型
				let that = this;
				that.checkimgshow = true;
				that.upimgtype = type;
				console.log(!that.phoneImgArr[type]);
				if (that.pImgDeleteStatus) {
					that.pImgDeleteStatus = false;
					return false;
				}
				if (that.phoneImgArr[type]) {
					return false;
				}

			},
			deleteImg(type) {
				let that = this;
				that.pImgDeleteStatus = true;
				if (!that.phoneImgArr[type]) {
					return false;
				}
				that.$set(that.phoneImgArr, type, '');
			},
			// 提交订单
			insertCustomOrderFuc() {
				let that = this;
				let imgInfo = '';
				that.phoneImgArr.forEach((item) => {
					imgInfo = imgInfo + item + ','
				})
				if(that.otherspecID<1){
					that.$u.toast('请选择机型');
					return false;
				}
				if(that.formInfo.phoneName == ''){
					that.$u.toast('未填写机型名称');
					return false;
				}
				// if(that.formInfo.goodsSn == ''){
				// 	that.$u.toast('未填写序列号/IMEI');
				// 	return false;
				// }
				if(imgInfo == ''){
					that.$u.toast('未添加相片');
					return false;
				}
				// console.log(that.formInfo);
				// let params = {
				// 	'type': '1',
				// 	'spec_id':that.otherspecID,
				// 	'level': that.formInfo.radio,
				// 	'goods_name': that.formInfo.phoneName,
				// 	'user_note': that.formInfo.remarks,
				// 	'img_params': imgInfo,
				// 	'sn':that.formInfo.goodsSn,
				// }
				that.addParams.spec_id = that.otherspecID;
				that.addParams.type = 1;
				that.addParams.goods_name = that.formInfo.phoneName;
				that.addParams.user_note = that.formInfo.remarks;
				that.addParams.img_params = imgInfo;
				that.addParams.sn = that.formInfo.goodsSn;
				console.log('that.addParams',that.addParams);
				
				insertCustomOrder(that.addParams).then(res => {
					that.$u.toast('提交订单成功');
					uni.navigateTo({
						url: '/pages/order/recycle/list?type=0'
					})
				})
				.catch(err => {

				})
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
							// that.phoneImgArr[type] = 'https://mpb.waidu.cn'+res.data.imgurl;
							that.$set(that.phoneImgArr, that.upimgtype, res.data.imgurl);
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
							// that.phoneImgArr[type] = 'https://mpb.waidu.cn'+res.data.imgurl;
							that.$set(that.phoneImgArr, that.upimgtype, res.data.imgurl);
						})
					},
					complete: function() {
						that.checkimgshow = false;
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.radio-group {
		flex: 1;
		padding: 10rpx 0;

		.flex-sub {
			width: 50%;
			margin: 5rpx 0;

			.round {
				margin-right: 10rpx;
				margin-left: 10rpx;
			}
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
	.process-box {
		width: 100%;
		padding: 0 20rpx;
	
		.big-box {
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
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
