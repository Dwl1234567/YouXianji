<script>
	import _tool from '@/utils/tools.js';
	import Vue from 'vue';
	import appConfig from './app.config.js'
	export default {
		globalData: {},
		onLaunch: function() {
			this.globalData = appConfig
			_tool.mpb_log("2.6.15.20200421");
			console.log('App Launch');
			uni.getSystemInfo({
			    success: function (e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
						
					
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif 
					//console.log(Vue.prototype.CustomBar);
			    }
			});
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<!--  App.vue  -->
<style lang="scss">
	
	/* #ifndef APP-PLUS-NVUE */
	page {
		//background: #FFFFFF; 
	}
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/uni_modules/colorui/main.css";
	@import "@/uni_modules/colorui/icon.css";
	//自定义
	@import "@/uni_modules/mpb-ui/style.scss";
	
	@font-face {
	  font-family: 'unishop';  
	  font-weight: normal;
	  font-style: normal;
	  src: url('https://at.alicdn.com/t/font_1729059_llr8d2acjac.ttf') format('truetype');
	}
	
	.yticon {
		font-family: "unishop" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-verification:before {
	  content: "\e625";
	}
	
	.icon-mycomment:before {
	  content: "\e626";
	}
	
	.icon-luckyticket:before {
	  content: "\e627";
	}
	
	.icon-rules:before {
	  content: "\e631";
	}
	
	.icon-selectandcheck:before {
	  content: "\e633";
	}
	
	.icon-checktouploadorange:before {
	  content: "\e634";
	}
	
	.icon-myselect:before {
	  content: "\e635";
	}
	
	.icon-reward:before {
	  content: "\e638";
	}
	
	.icon-tubiao-64:before {
	  content: "\e661";
	}
	
	.icon-recyclepricecheck:before {
	  content: "\e663";
	}
	
	.icon-salinglist:before {
	  content: "\e664";
	}
	
	.icon-checksheet:before {
	  content: "\e665";
	}
	
	.icon-storage:before {
	  content: "\e666";
	}
	
	.icon-addchekinglist:before {
	  content: "\e667";
	}
	
	.icon-selectlist:before {
	  content: "\e668";
	}
	
	.icon-recyclelisting:before {
	  content: "\e669";
	}
	
	.icon-addrecycling:before {
	  content: "\e66a";
	}
	
	.icon-huishoufanglist:before {
	  content: "\e66b";
	}
	
	.icon-gongyingshanglist:before {
	  content: "\e66c";
	}
	
	.icon-addgongyingshang:before {
	  content: "\e66d";
	}
	
	.icon-addhuishoushang:before {
	  content: "\e66e";
	}
	
	.icon-cashorange:before {
	  content: "\e66f";
	}
	
	.icon-listorange:before {
	  content: "\e670";
	}
	
	.icon-announce:before {
	  content: "\e671";
	}
	
	.icon-product:before {
	  content: "\e672";
	}
	
	.icon-statistic:before {
	  content: "\e673";
	}
	
	.icon-goship:before {
	  content: "\e674";
	}
	
	.icon-distribution:before {
	  content: "\e624";
	}
	
	.icon-recyclelist:before {
	  content: "\e660";
	}
	
	.icon-xiangyou:before {
	  content: "\e65e";
	}
	
	.icon-xiangxia:before {
	  content: "\e65f";
	}
	
	.icon-zhuanyezhijian:before {
	  content: "\e65a";
	}
	
	.icon-zihangjijian:before {
	  content: "\e65b";
	}
	
	.icon-shunfengshangmen:before {
	  content: "\e65c";
	}
	
	.icon-dianji:before {
	  content: "\e65d";
	}
	
	.icon-gujiaxiadan:before {
	  content: "\e657";
	}
	
	.icon-jiancedakuan:before {
	  content: "\e658";
	}
	
	.icon-kuaidifahuo:before {
	  content: "\e659";
	}
	
	.icon-xuanzejixing:before {
	  content: "\e656";
	}
	
	.icon-daodian:before {
	  content: "\e655";
	}
	
	.icon-xianshangxiadan:before {
	  content: "\e652";
	}
	
	.icon-querenshoukuan:before {
	  content: "\e653";
	}
	
	.icon-yinsiqingchu:before {
	  content: "\e654";
	}
	
	.icon-temai:before {
	  content: "\e64d";
	}
	
	.icon-fenxiao:before {
	  content: "\e64e";
	}
	
	.icon-rexiao:before {
	  content: "\e64f";
	}
	
	.icon-shangxin:before {
	  content: "\e650";
	}
	
	.icon-a-temai2:before {
	  content: "\e651";
	}
	
	.icon-guanfangkefu:before {
	  content: "\e64c";
	}
	
	.icon-daishouhuo:before {
	  content: "\e64a";
	}
	
	.icon-lingjuanzhongxin:before {
	  content: "\e64b";
	}
	
	.icon-shimingrenzheng:before {
	  content: "\e642";
	}
	
	.icon-shezhi:before {
	  content: "\e643";
	}
	
	.icon-daifahuo:before {
	  content: "\e644";
	}
	
	.icon-wodepinglun:before {
	  content: "\e645";
	}
	
	.icon-shouhuodizhi:before {
	  content: "\e646";
	}
	
	.icon-fenxiaozhuanqian:before {
	  content: "\e647";
	}
	
	.icon-pingtaiguize:before {
	  content: "\e648";
	}
	
	.icon-daipingjia:before {
	  content: "\e649";
	}
	
	.icon-dianjiwode:before {
	  content: "\e63d";
	}
	
	.icon-dianjishouye:before {
	  content: "\e63e";
	}
	
	.icon-dianjimendian:before {
	  content: "\e63f";
	}
	
	.icon-dianjigouwuche:before {
	  content: "\e640";
	}
	
	.icon-daifukuan:before {
	  content: "\e641";
	}
	
	.icon-weidianjigouwuche:before {
	  content: "\e63a";
	}
	
	.icon-weidianjimendian:before {
	  content: "\e63b";
	}
	
	.icon-weidianjishouye:before {
	  content: "\e63c";
	}
	
	.icon-weidianjiwode:before {
	  content: "\e639";
	}
	
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}
	
	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;
	
		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;
	
			&.loaded {
				opacity: 1;
			}
		}
	}
	
	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
	
	.common-hover {
		background: #f5f5f5;
	}
	
	/*边框*/
	.b-b:after,
	.b-t:after {
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}
	
	.b-b:after {
		bottom: 0;
	}
	
	.b-t:after {
		top: 0;
	}
	
	/* button样式改写 */
	uni-button,
	button {
		// height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;
	
		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}
	
	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}
	
	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}
	
	.placeholder {
		color: #999999;
	}
	
	/* #endif */
</style>
