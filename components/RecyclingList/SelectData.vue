<template>
	<view class="RecyclingList-box" :style="[{padding:boxpadding}]">
		<view class="recy-item">
			<!-- tag 标题 -->
			<view class="title">
				<text class="margin-right-xs text-bold">{{title}}</text>
				<text class="cuIcon-question" v-if="tips=='1'" />
				<!-- <view v-if="checkitem.images != '' || checkitem.remark != ''" class="tipsbox" @tap.stop="clickTips(checkitem)">
					<image v-if="checkitem.images != '' && checkitem.remark != ''" class="righticon" :src="'https://mpb.waidu.cn'+checkitem.images.split(',')[0]"
						mode="aspectFill"></image>
					<image v-else class="tipsticon" src="../../static/tips-icon.png"
						mode="aspectFill"></image>
				</view> -->
			</view>
			<!-- check-list -->
			<view class="check-list-box">
				<u-scroll-list :indicator="false">
					<view class="item" v-for="(checkitem,checkindex) in Tchecklist" :key="checkindex"
						@click="itemclick(checkindex)" :class="checkitem.checked ? 'active':''">
						{{checkitem.value}}
					</view>
				</u-scroll-list>
			</view>
		</view>
		<u-popup :show="show" mode="center" borderRadius="20" bgColor="transparent">
			<view v-if="checkinfo.name" class="alert-box">
				<view class="title">
					{{checkinfo.name}}
				</view>
				<view class="swiper-box" v-if="checkinfo.imglist">
					<u-swiper height="42vh" interval="3000" imgMode="scaleToFill" @click="clickswiper" :list="checkinfo.imglist" :indicator="true" :autoplay="true" indicatorStyle="right: 20px" @change="e => currentNum = e.current">
						<view slot="indicator" class="indicator-num">
							<text class="indicator-num__text">{{ currentNum + 1 }}/{{ checkinfo.imglist.length }}</text>
						</view>
					</u-swiper>
				</view>
				<view class="content">
					{{checkinfo.remark}}
				</view>
				<view class="button">
					<u-button text="知道了" size="large" :customStyle="{color:'#4cd964',borderRadius:'0 0 30rpx 30rpx'}"
						@click="show=false"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/**
	 title			{String}	标题
	 checklist		{array}		多选
	 */
	export default {
		name: "SelectData",
		props: {
			title: {
				type: String,
				default: ''
			},
			tips: {
				type: String,
				default: '0' //0:不显示
			},
			checklist: {
				type: Array,
				default () {
					return [];
				}
			},
			boxpadding: {
				type: String,
				default: 'none'
			},
			rigthicontype: {
				type: String,
				default: '2' //0:不显示1：图片2：提示图标
			}
		},
		data() {
			return {
				show:false,
				checkinfo:'',
				Tchecklist: this.checklist
			};
		},
		mounted() {
			this.Tchecklist = this.Tchecklist.filter((item, index) => {
				// if(index == 0){
				// 	item.checked = true
				// }else{
				// 	item.checked = false
				// }
				return item;
			})
		},
		watch: {

		},
		computed: {

		},
		methods: {
			clickTips() { //完成
				// this.$emit('clickTips', false);
			},
			itemclick(name) {
				this.Tchecklist = this.Tchecklist.filter((item, index) => {
					item.checked = index === name ? true : false
					return item
				})
				if(this.title == "容量"){
					this.Tchecklist[name].status = 1; 
					this.$emit('itemclick',this.Tchecklist[name]);
				}else{
					this.Tchecklist[name].status = 0;
					this.$emit('itemclick',this.Tchecklist[name]);
				}
			}
		}
	}
</script>

<style lang="scss">
	.RecyclingList-box {}

	.recy-item {
		width: 100%;
		position: relative;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;

		.title {
			width: 20%;
			text-align: left;
			font-size: 24rpx;
			color: #555555;
			position: absolute;
			left: 0;
		}

		.check-list-box {
			white-space: nowrap;
			overflow: hidden;
			padding-left: 20%;

			.active {
				color: #4F4F50 !important;
				background-image: linear-gradient(90deg, #F3C81A 0%, #FFB629 100%);
			}

			.item {
				position: relative;
				display: inline-block;
				background-color: #eeeeee;
				color: #333333;
				width: auto;
				text-align: center;
				font-size: 26rpx;
				padding: 10rpx 20rpx;
				margin-right: 10rpx;

				.tipsbox {
					position: absolute;
					right: 0;
					top: 0;
					width: 88rpx;
					height: 88rpx;
				}

				.righticon {
					width: 80rpx;
					height: 80rpx;
					margin-top: 4rpx;
					margin-right: 4rpx;
					border-radius: 10rpx;
				}

				.tipsticon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
