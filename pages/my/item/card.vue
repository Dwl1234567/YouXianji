<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">分销海报</block>
			<block slot="right">
				<view :disabled="canvasImages != '' ? false : true" @click="previewHandle">预览</view>
				<view :disabled="canvasImages != '' ? false : true" @click="handleDownImg">下载</view>
			</block>
		</bar-title>
		<view class="">
			<image class="shareimg" v-if="canvasImages" :src="canvasImages" mode="widthFix" @error="changeerror">
			</image>
			<shareImages ref="canvas" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"
				:shareTitle="shareTitle" :goodsTitle="goodsTitle" :shareImage="shareImage" :qrSize="qrSize"
				:qrUrl="qrUrl" @success="shareSuccess">
			</shareImages>
			<view class="button">
				<!--<button :disabled="canvasImages == '' ? false : true" type="primary" @click="createsShareImage">生成海报</button>-->
				<!--<button :disabled="canvasImages != '' ? false : true" @click="previewHandle">预览海报</button>-->
				<!-- <button :disabled="canvasImages != '' ? false : true" @click="handleDownImg">下载海报</button> -->
				<!-- #ifdef MP-WEIXIN -->
				<button type="warn" :disabled="canvasImages != '' ? false : true" open-type="share">分享给朋友</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import shareImages from '@/components/hj-placard/shareImages.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			shareImages
		},
		data() {
			return {
				canvasImages: '',
				canvasWidth: 375, // 宽度
				canvasHeight: 667, // 高度
				shareTitle: '', // 分享标题
				goodsTitle: '', // 商品宣传标题
				shareImage: '/static/item/bg.jpg', // 背景图片
				qrSize: 100, // 二维码大小
				qrUrl: "https://www.shousifang.cn/register.html?code=", // 生成二维码的链接
				invatecode: ''
			}
		},
		onLoad() {
			// let localshareImage = uni.getStorageSync('sharebgimg');
			// if(localshareImage){
			// 	this.shareImage = localshareImage;
			// }
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			//海报生成运行方法
			let canvasImages = uni.getStorageSync('canvasImages');
			// uni.clearStorage('canvasImages');
			// console.log('121212');
			// console.log(canvasImages);
			if (!canvasImages) {
				this.createsShareImage();
			} else {
				this.canvasImages = canvasImages;
			}

		},
		methods: {
			// 图片错误
			changeerror: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
				
				this.$nextTick(()=>{
					this.createsShareImage();
				})
			},
			// 生成分享图片
			createsShareImage() {
				// console.log(this.$refs.canvas)
				this.$refs.canvas.canvasCreate();
			},
			// 预览图片
			previewHandle() {
				uni.previewImage({
					urls: [this.canvasImages],
				});
			},
			// 下载图片
			handleDownImg() {
				const that = this;
				// uni.downloadFile({
				// 	url: that.canvasImages, //仅为示例，并非真实的资源
				// 	success: (res) => {
				// 		console.log(res);
				// 		if (res.statusCode === 200) {
				// 			console.log('下载成功');
				// 			this.$u.toast('下载成功!');
				// 		}else{
				// 			this.$u.toast('下载失败!');
				// 		}
				// 	}
				// });
				uni.saveImageToPhotosAlbum({
					filePath: that.canvasImages,
					success: function() {
						console.log('save success');

						that.$u.toast('保存成功!');
					}
				});
			},
			// 回调图片地址
			shareSuccess(e) {
				// console.log('地址:'+e)
				this.canvasImages = e;
				if (e) {
					uni.setStorageSync('canvasImages', e);
				}
				// base64ToPath(e)
				// 	.then(path => {
				// 		this.canvasImages = path
				// 	})
				// 	.catch(error => {
				// 		this.$u.toast('转换失败!');
				// 	})

			},
		},

	}
</script>

<style lang="scss">
	.action view {
		margin-left: 10rpx;
		padding: 0 10rpx;
		border: 1px solid #e1e1e1;
	}

	.shareimg {
		width: 100%;
		height: 100%;
	}
</style>
