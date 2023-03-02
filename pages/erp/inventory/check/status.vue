<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">{{dataInfo.title}}</block>
		</bar-title>
		<form>
			<view class="cu-form-group">
				<view class="title">序列号</view>
				<text class='text-sm text-red'>{{dataInfo.sn}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">盘点数量</view>
				<input placeholder="请输入盘点数量" name="input" @input="checkRealnum" :value="dataInfo.real_num"></input>
				<text class='text-sm text-orange'>系统数量：{{dataInfo.surface_num}}</text>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">状态</view>
				<switch @change="SwitchA" :class="switchstatus == 1?'checked':''" :checked="switchstatus == 1?true:false"></switch>
			</view>
			
			<view class="cu-bar bg-white" v-show="switchstatus == 1">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/9
				</view>
			</view>
			
			<view class="cu-form-group"  v-show="switchstatus == 1">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @click="checkimgshow = true" v-if="imgList.length<9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="upShareimg()">确定</button>
			</view>
		</form>
		<!-- 相机相册选择 -->
		<u-popup :show="checkimgshow" :round="8" mode="bottom" :closeOnClickOverlay="true" @close="closepop">
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
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
	import {
		geteditproduct,
		getcheckproductinfo
	} from "@/api/erpapi.js"
	import {
		raiseUpload
	} from "@/api/upload.js";
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				switchstatus: false,
				dataInfo:{},
				statusId:'',
				snNum:'',
				imgList: [],
				upgetimgList:[],
				checkimgshow:false,
			};
		},
		onLoad(options) {
			if(options.id){
				this.statusId = options.id;
				this.getcheckproductinfo();
			}
			if(options.sn){
				this.snNum = options.sn;
				this.getcheckproductinfo();
			}
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
				this.switchstatus = e.detail.value
			},
			checkRealnum(e){
				// console.log(e);
				this.dataInfo.real_num = e.detail.value;
			},
			// 获取产品详情
			getcheckproductinfo(){
				let paramsdata = {
					'id':this.statusId,
					'sn':this.snNum
				}
				getcheckproductinfo(paramsdata).then(res=>{
					this.dataInfo = res.data;
					this.switchstatus = res.data.switch;
					this.imgList = res.data.images;
				})
			},
			geteditproduct(id){
				let params = {
					id:this.statusId,
					real_num:this.dataInfo.real_num,
					switch:this.switchstatus ? '1' : '0',
					remark:this.dataInfo.remark,
					images:this.upgetimgList.join(',')
				}
				geteditproduct(params).then(res=>{
					uni.$u.toast('操作成功!')
					uni.navigateBack()
				})
			},
			// 使用拍照功能
			opencamare(){
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
					complete:function(){
						that.checkimgshow = false;
					}
					
				});
			},
			// 使用相册功能
			openpictrue(){
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
					complete:function(){
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
			upShareimg(){
				let that = this;
				let promisearr = [];
				that.imgList.forEach((item,index)=>{
					if(item.indexOf('shousifang') == -1){
						promisearr.push(raiseUpload(item));
					}else{
						that.upgetimgList.push(item);
					}
				})
				
				Promise.all(promisearr).then((res)=>{
					// console.log(res);
					res.forEach((iii)=>{
						that.upgetimgList.push(iii.data.imgurl);
					})
				})
				.finally(() => {
					that.geteditproduct();
				})
				
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
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
			closepop(){
				this.checkimgshow = false;
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
