<template>
	<view class="RecyclingList-box" :style="[{padding:boxpadding}]">
		<view class="recy-item">
			<!-- tag 标题 -->
			<view class="title">
				<text>{{title}}</text>
			</view>
			<!-- check-list -->
			<view class="check-list-box">
				<view class="item" v-for="(checkitem,checkindex) in dataList" :key="checkindex"
					@tap.stop="itemclick(checkindex)" :style="{backgroundColor:checkitem.check ? '#e54d42':'#eeeeee',color:checkitem.check ? '#FFFFFF':'#999999'}">
					{{checkitem.name}}
					<view v-if="checkitem.images != '' || checkitem.remark != ''" class="tipsbox" @tap.stop="clickTips(checkitem)">
						<image v-if="checkitem.images != '' && checkitem.remark != ''" class="righticon" :src="'https://mpb.shousifang.com'+checkitem.images.split(',')[0]"
							mode="aspectFill"></image>
						<image v-else class="tipsticon" src="../../static/tips-icon.png"
							mode="aspectFill"></image>
					</view>
				</view>
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
		name: "RecyclingList",
		props: {
			title: {
				type: String,
				default: ''
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
				default: '1' //0:不显示1：图片2：提示图标
			},
			patIndex:{
				type:Number,
				default:0
			},
			isnew:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				show: false,
				currentNum:0,
				dataList:this.checklist,
				checkinfo:''
			};
		},
		mounted() {

		},
		watch: {
			checklist(newVal) {
				// console.log(newVal);
				this.dataList = newVal
			}
		},
		created() {
			// this.dataList = this.checklist;
			// console.log(this.dataList);
			// this.dataList = this.dataList.filter((item)=>{
			// 	item.check = false;
			// })
			// console.log(this.dataList,'123');
		},
		computed: {

		},
		methods: {
			clickTips(data) { //完成
				this.show = true;
				this.checkinfo = data;
				if(this.checkinfo.images != ''){
					this.checkinfo['imglist'] = [];
					this.checkinfo.images.split(',').forEach((item)=>{
						this.checkinfo['imglist'].push('https://mpb.waidu.cn'+item);
					})
					// console.log(this.checkinfo);
				}
				this.$emit('clickTips', data);
			},
			itemclick(name) {
				let that = this;
				// console.log(this.dataList[name].is_jump);
				// console.log(this.dataList[name].check);
				if(this.dataList[name].is_jump == 1){
					// this.dataList[name].check = true;
					// that.$set(this.dataList[name], 'check', true);
					this.dataList = this.dataList.filter((item,index)=>{
						item.check = index === name ? true : false
						return item
					})
					this.$emit('itemclick','tiaozou');
					uni.navigateTo({
						url:'../../pages/recycling/diyform'
					})
					return false;
				}
				// if(this.dataList[name].check && this.dataList[name].key_value.indexOf("k") == -1){
				// 	return false;
				// }
				// console.log('多选')
				if(that.isnew == 1){
					this.dataList = this.dataList.filter((item,index)=>{
						item.check = index === name ? true : false
						return item
					})
					// console.log(that.dataList);
				}else{
					this.dataList = this.dataList.filter((item,index)=>{
						// console.log(item.key_value)
						if(item.key_value.indexOf("k") != -1){
							if(index === name){
								item.check = !item.check;
							}
						}else{
							item.check = index === name ? true : false
						}
						return item
					})
				}
				// console.log(name);
				// console.log(this.dataList[name].check);
				// console.log(this.dataList[name]);
				// if(this.dataList[name].check){
				// 	this.$emit('itemclick', {'index':name,'keyvalue':this.dataList[name].key_value,'parindex':that.patIndex+1});
				// }
				this.$emit('itemclick', {'index':name,'keyvalue':this.dataList[name].key_value,'parindex':that.patIndex+1});
				
			},
			clickswiper(index){
				uni.previewImage({
				    current: this.checkinfo.imglist[index],
				    urls:this.checkinfo.imglist
				})
			}
		}
	}
</script>

<style lang="scss">
	.RecyclingList-box {
		width: 100%;
		padding: 20rpx 30rpx;
	}

	.recy-item {
		width: 100%;

		.title {
			width: 100%;
			text-align: left;
			font-size: 32rpx;
			border-left: 6rpx solid $uni-color-success;
			border-bottom: 2rpx solid #EEEEEE;
			padding-left: 20rpx;
			padding-bottom: 20rpx;
		}

		.check-list-box {
			padding: 0 10rpx;

			.active {
				background-color: $uni-color-success !important;
				color: #FFFFFF !important;
			}

			.item {
				position: relative;
				background-color: #eeeeee;
				color: #999999;
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;
				text-align: center;
				font-size: 30rpx;

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

	.alert-box {
		background-color: #FFFFFF;
		width: 80vw;
		border-radius: 30rpx;

		.content {
			text-align: center;
			padding: 20rpx;
			color: #999999;
			font-size: 30rpx;
		}

		.title {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: $uni-color-success;
			font-size: 32rpx;
			color: #FFFFFF;
			border-radius: 30rpx 30rpx 0 0;
		}
	}
	.indicator {
	        @include flex(row);
	        justify-content: center;
	
	        &__dot {
	             height: 6px;
	             width: 6px;
	             border-radius: 100px;
	             background-color: rgba(255, 255, 255, 0.35);
	             margin: 0 5px;
	             transition: background-color 0.3s;
	    
	            &--active {
	                 background-color: #ffffff;
	             }
	        }
	    }
	
	    .indicator-num {
	        padding: 2px 0;
	        background-color: rgba(0, 0, 0, 0.35);
	        border-radius: 100px;
	        width: 55px;
	        @include flex;
	        justify-content: center;
	
	        &__text {
	             color: #FFFFFF;
	             font-size: 14px;
	         }
	    }
</style>
