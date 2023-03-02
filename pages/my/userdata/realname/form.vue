<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">实名认证</block>
		</bar-title>
		
		<!--选项卡-->
		<view class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabdata" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</view>
		<!--图片认证-->
		<view class="discern-box" v-if="TabCur == 0">
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action sub-title">
					<text class="text-xl text-bold text-blue text-shadow">请拍摄并上传您的身份证照片</text>
					<text class="text-ABC text-blue">Driving license</text>
				</view>
			</view>
			
			<view class="uploadBox">
				<view style="width: 47%;">
					<view class="uploadItem">
						<view v-if="!imgUrl[0]" class="imgBox imgEx1">
							<view class="leftTop"></view>
							<view class="leftTop2"></view>
							<view class="leftbottom"></view>
							<view class="leftbottom2"></view>
							<view class="rightTop"></view>
							<view class="rightTop2"></view>
							<view class="rightbottom"></view>
							<view class="rightbottom2"></view>
						</view>
						<image v-else class="imgUrl" :src="imgUrl[0]"></image>
					</view>
					<view @click="uploadImg1(0)" class="leftBtn text-white text-lg text-center">拍摄正面</view>
				</view>
		
				<view style="width: 47%;">
					<view class="uploadItem">
						<view v-if="!imgUrl[1]" class="imgBox imgEx2">
							<view class="leftTop"></view>
							<view class="leftTop2"></view>
							<view class="leftbottom"></view>
							<view class="leftbottom2"></view>
							<view class="rightTop"></view>
							<view class="rightTop2"></view>
							<view class="rightbottom"></view>
							<view class="rightbottom2"></view>
						</view>
						<image v-else class="imgUrl" :src="imgUrl[1]"></image>
					</view>
					<view @click="uploadImg1(1)" class="leftBtn text-white text-lg text-center">拍摄反面</view>
				</view>
			</view>
		
			<!-- <view class="cu-bar bg-white margin-top">
				<view class="action sub-title">
					<text class="text-xl text-bold text-blue text-shadow">识别内容核对</text>
					<text class="text-ABC text-blue">distinguish</text>
				</view>
			</view>
		
			<view class="distinguishBox">
				<view>
					<text class="text-bold disLabel">姓名：</text>
					<text>刘德华</text>
				</view>
				<view>
					<text class="text-bold disLabel">民族：</text>
					<text>汉</text>
				</view>
				<view>
					<text class="text-bold disLabel">居住地：</text>
					<text>陕西省西安市</text>
				</view>
				<view>
					<text class="text-bold disLabel">身份证号：</text>
					<text>610104196511090809</text>
				</view>
			</view> -->
		
			<view class="cu-bar bg-white margin-top">
				<view class="action sub-title">
					<text class="text-xl text-bold text-blue text-shadow">拍摄要求须知</text>
					<text class="text-ABC text-blue">requirement</text>
				</view>
			</view>
		
			<view class="requirement">
				<view>
					<text class="text-gray">请上传大陆公民持有的本人有效身份证；</text>
				</view>
				<view>
					<text class="text-gray">拍摄时确保身份证</text>
					<text class="text-red">边框完整，</text>
					<text class="text-red">字体清晰，</text>
					<text class="text-red">亮度均匀；</text>
				</view>
		
				<view class="errorBox">
					<view class="item1">
						<image class="iconImg" src="/static/discern/ok.png" mode="widthFix"></image>
					</view>
					<view class="item2">
						<image class="iconImg" src="/static/discern/no.png" mode="widthFix"></image>
					</view>
					<view class="item3">
						<image class="iconImg" src="/static/discern/no.png" mode="widthFix"></image>
					</view>
					<view class="item4">
						<image class="iconImg" src="/static/discern/no.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		
			<!--按钮-->
			<view class="bg-white zaiui-btn-view zaiui-foot-padding-bottom">
				<view class="flex flex-direction">
					<button class="cu-btn bg-red" @click="putcheckUserIdcard">开始验证</button>
				</view>
			</view>
		
		</view>
		
		<!--文字认证-->
		<view class="discern-box" v-if="TabCur == 1">
			<!--标题-->
			<view class="text-black text-xl zaiui-title-view">为提升交易可靠性，请进行实名认证</view>
			<!--内容-->
			<view class="text-gray zaiui-content-view">
				实名认证是由优闲集合作的第三方提供的一项个人身份认证服务，通过与公安网数据校验，确保个人身份真实性。实名认证后，可提升您在二手交易中的信任值。
			</view>
			
			<!--表单-->
			<view class="cu-form-view margin-top-lg">
				<input v-model="username" placeholder="请输入真实姓名"/>
			</view>
			<view class="cu-form-view">
				<input v-model="idcard" placeholder="请输入18位身份证号"/>
			</view>
			
			<!--按钮-->
			<view class="bg-white zaiui-btn-view zaiui-foot-padding-bottom">
				<view class="flex flex-direction">
					<button class="cu-btn bg-red" @click="putcheckUserIdcard">开始验证</button>
				</view>
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
	import barTitle from '@/components/common/bar-title';
	import {
		checkUserIdcard
	} from "@/api/common.js";
	import { pathToBase64, base64ToPath } from '../../../libs/image-tools/index.js';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				checkimgshow: false,
				upimgtype:'',
				pImgDeleteStatus: false,
				TabCur: 0,
				tabdata:[
					'图片认证',
					'文字认证'
				],
				phoneImgArr: [
				
				],
				imgUrl: [],
				postimgUrl:[],
				username:'',
				idcard:''
			}
		},
		onLoad() {
			
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			//选项卡切换
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log(this.TabCur);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//头像上传
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
			// 提交实名认证
			putcheckUserIdcard(){
				let that = this;
				let params = {}
				if(that.TabCur == 0){
					let fronturl = that.postimgUrl[0];
					let negativeurl = that.postimgUrl[1];
					// console.log(fronturl.replace(/\+/g,"%2B"));
					params = {
						"type":2,
						"front":fronturl.replace(/\+/g,"%2B"),
						"negative":negativeurl.replace(/\+/g,"%2B"),
					}
				}else{
					params = {
						"type":1,
						"username":that.username,
						"idcard":that.idcard,
					}
				}
				 
				checkUserIdcard(params).then(res => {
					that.$u.toast("提交成功!");
					uni.setStorageSync('realstatus', '1');
					uni.navigateBack({
						delta:1
					})
				})
				.catch(err => {
					// console.log(err);
					that.$u.toast(err);
				})
			},
			// 使用拍照功能
			opencamare(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从拍照选择
					success: function(res) {
						uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0],
							encoding: 'base64',
							success: r => { 
								that.$set(that.postimgUrl, that.upimgtype, 'data:image/jpeg;base64,' + r.data);
								that.$set(that.imgUrl, that.upimgtype, 'data:image/jpeg;base64,' + r.data);
								
							}
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
						// console.log(res);
						uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0],
							encoding: 'base64',
							success: r => { 
								that.$set(that.postimgUrl, that.upimgtype, 'data:image/jpeg;base64,' + r.data);
								that.$set(that.imgUrl, that.upimgtype, 'data:image/jpeg;base64,' + r.data);
								
							}
						})
						
					},
					complete:function(){
						that.checkimgshow = false;
					}
				});
			}
		}
	}
</script>


<style lang="scss">
	page { background: #FFFFFF; }
	.zaiui-title-view {
	    position: relative;
	    padding: 18.18rpx;
	}
	.zaiui-content-view {
		position: relative;
		padding: 0 18.18rpx;
	}
	.cu-form-view {
		position: relative;
		margin: 0 27.27rpx;
		padding: 18.18rpx 0;
		border-bottom: 2rpx solid rgba(0,0,0,0.1);
		input {
			
		}
	}
	.cu-form-view.margin-top-lg {
		margin-top: 40rpx;
	}
	.zaiui-btn-view {
	    position: fixed;
	    width: 100%;
		bottom: 0;
		.flex {
			padding: 18.18rpx;
		}
	}
	.nav{
		position: fixed;
		width: 100%;
		//top: calc(var(--status-bar-height) + 80rpx);
		z-index: 99;
		//padding: 10rpx 20rpx;
	}
	.discern-box{
		padding-top: calc(var(--status-bar-height) + 90rpx);
	}
	//图片认证
	.uploadBox {
		padding: 15rpx 20rpx 40rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
	
		.leftBtn {
			width: 100%;
			height: 75rpx;
			line-height: 75rpx;
			background-color: #007aec;
			border-radius: 0 0 12rpx 12rpx;
		}
	
		.uploadItem {
			width: 100%;
			height: 255rpx;
			background-color: #f1f7ff;
			border-radius: 15rpx;
			padding: 30rpx;
			position: relative;
	
			.imgUrl {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}
	
			.imgBox {
				width: 100%;
				height: 100%;
				position: relative;
			}
	
			.imgEx1 {
				background: url('/static/discern/ex1.png');
				background-size: 82%;
				background-repeat: no-repeat;
				background-position: center;
			}
	
			.imgEx2 {
				background: url('/static/discern/ex2.png');
				background-size: 82%;
				background-repeat: no-repeat;
				background-position: center;
			}
	
			.leftTop {
				height: 28rpx;
				width: 4rpx;
				background-color: #007aec;
				position: absolute;
				left: 0;
			}
	
			.leftTop2 {
				height: 4rpx;
				width: 28rpx;
				background-color: #007aec;
				position: absolute;
				top: 0;
			}
	
			.leftbottom {
				height: 28rpx;
				width: 4rpx;
				background-color: #007aec;
				position: absolute;
				bottom: 0;
			}
	
			.leftbottom2 {
				height: 4rpx;
				width: 28rpx;
				background-color: #007aec;
				position: absolute;
				bottom: 0;
			}
	
			.rightTop {
				height: 28rpx;
				width: 4rpx;
				background-color: #007aec;
				position: absolute;
				right: 0;
			}
	
			.rightTop2 {
				height: 4rpx;
				width: 28rpx;
				background-color: #007aec;
				position: absolute;
				right: 0;
				top: 0;
			}
	
			.rightbottom {
				height: 28rpx;
				width: 4rpx;
				background-color: #007aec;
				position: absolute;
				right: 0;
				bottom: 0;
			}
	
			.rightbottom2 {
				height: 4rpx;
				width: 28rpx;
				background-color: #007aec;
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}
	
	.distinguishBox {
		padding: 5rpx 30rpx 20rpx;
		background: white;
	
		view {
			margin-bottom: 20rpx;
		}
	}
	
	.disLabel {
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute-all-lines;
		min-width: 142rpx;
		display: inline-block;
		margin-right: 5rpx;
	}
	
	.requirement {
		padding: 10rpx 30rpx 26rpx;
		background: white;
	
		view {
			margin-bottom: 10rpx;
		}
	
		.errorBox {
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
	
			view {
				width: 23%;
				height: 100rpx;
			}
	
			.item1 {
				background-image: url('/static/discern/yes.png');
				background-repeat: no-repeat;
				background-size: 100%;
				position: relative;
			}
	
			.item2 {
				background-image: url('/static/discern/error1.png');
				background-repeat: no-repeat;
				background-size: 100%;
				position: relative;
			}
	
			.item3 {
				background-image: url('/static/discern/error2.png');
				background-repeat: no-repeat;
				background-size: 100%;
				position: relative;
			}
	
			.item4 {
				background-image: url('/static/discern/error3.png');
				background-repeat: no-repeat;
				background-size: 100%;
				position: relative;
			}
	
			.iconImg {
				width: 60rpx;
				position: absolute;
				bottom: -10px;
				left: 50%;
				margin-left: -30rpx;
			}
		}
	}
	
</style>
