<template>
	<view>
		
		<view class="cu-list menu sm-border margin-sm bg-white radius-4">
			<view class="cu-item arrow" @tap="personalTap">
				<view class="content">个人资料</view>
			</view>
			<view class="cu-item arrow" @tap="realNameTap">
				<view class="content">实名认证</view>
			</view>
			<view class="cu-item" @click="handleClearCache">
				<view class="content">缓存清理</view>
				<view class="action">
					<text style="margin-right:20rpx">{{fileSizeString}}</text>
					<text class="iconfont icon-empty text-gray"/>
				</view>
			</view>
			<view class="cu-item arrow" @tap="aboutTap">
				<view class="content">关于平台</view>
			</view>
		</view>
		
		<!--按钮-->
		<view class="zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="flex padding-lg flex-direction">
				<button class="cu-btn bg-deepblue radius-4" @click="showlogout = true">退出登录</button>
			</view>
		</view>
		<u-modal :show="showlogout" @cancel="showlogout = false" @confirm="confirmFuc" title="确定退出登录？" :showCancelButton="true"></u-modal>
	</view>
	
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				skin: true,
				showlogout : false,
				fileSizeString: ''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.formatSize();
			// #endif
			
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			aboutTap() {
				uni.navigateTo({
					url: "/pages/about/about"
				});
			},
			realNameTap() {
				uni.navigateTo({
					url: "/pages/my/userdata/realname/index"
				});
			},
			personalTap() {
				uni.navigateTo({
					url: "/pages/my/userdata/index"
				});
			},
			confirmFuc(){
				uni.clearStorage();
				uni.navigateTo({
					url:"../../common/login/login"
				})
			},
			// 清理缓存
			clearFuc(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗?',
					confirmText: '立即清除',
					success(res) {
						if (res.confirm) {
							uni.showToast({
								title: '清除成功'
							})
						}
					}
				})
			},
			// 获取缓存
			formatSize() {
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},
			// 清除缓存
			handleClearCache() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '您确定要清除缓存吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.clearCache()
						
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 清理缓存
			clearCache() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.formatSize();
					});
				}
			},
		}
	}
</script>

<style lang="scss">
</style>
