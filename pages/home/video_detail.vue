<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">短视频</block>
		</bar-title> -->
		<view class="content">
			<video-render :isCover="videoOptions.image" :isSrc="videoOptions.videofile" />
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import videoRender from '@/components/common/basics/video-render';
	export default {
		components:{
			barTitle,
			videoRender
		},
		data() {
			return {
				videoOptions: {
					image:'',
					videofile:''
				},
			}
		},
		onLoad(options) {
			// this.videoData = _home_data.videoData();
			// 进入页面刷新
			this.videoOptions.image = options.image;
			this.videoOptions.videofile = options.videofile;
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			BackPage() {
				console.log('点击了返回');
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */

	@import "@/uni_modules/mpb-ui/shop/sort_vue.scss";
</style>
