<template>
	<view>
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">修改头像</block>
		</bar-title> -->
		<view class="padding text-center">
			<view @tap="preAvatar" class="cu-avatar xxl radius-2 margin-left" :style="[{ backgroundImage:'url(' + avatar + ')' }]"></view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-deepblue radius-4 margin-tb-sm lg" @tap="chooseAvatar">选择头像</button>
		</view>
		
		
	</view>
</template>

<script>
	import {
		userset
	} from "@/api/user.js";
	import {
		UPLOAD_IMG_URL
	} from "@/config/app.js"
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				avatar: '',
			}
		},
		onLoad(option) {
			if(option.avatar){
				this.avatar = decodeURIComponent(option.avatar);
			}else{
				this.avatar = '/static/img/avatar/1.jpg';
			}
		},
		methods: {
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				/*
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '@/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
				*/
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths);
				        uni.uploadFile({
				            url: UPLOAD_IMG_URL,
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				            	'file': 'touxiang'
				            },
				            success: (res) => {
				            	console.log(JSON.parse(res.data));
				            	let data = JSON.parse(res.data);
				            	let params = {
									"key":"avatar",
									"value":data.data.imgurl,
				            	}
								//临时更新用户头像
								this.avatar = data.data.imgurl;
								//传参修改用户头像信息
				            	userset(params).then(res=>{
									
				            	})
				            }
				         });
				     }
				 });
			},
			
			// 预览图片
			preAvatar() {
				wx.previewImage({
					current: '', // 当前显示图片的 http 链接
					urls: [this.avatar] // 需要预览的图片 http 链接列表
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
