<template>
	<view>
		<block v-for="(item,index) in list_data" :key="index" v-if="getMinToMax(index)">
			<view class="bg-white margin-top padding radius trends">
				<!--用户信息-->
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round" :style="[{backgroundImage:'url('+ item.avatar +')'}]" @tap="listTap('userTap',item,index)"/>
						<view class="content" @tap="listTap('userTap',item,index)">
							<view class="text-black">
								<view class="text-cut">{{item.nickname ? item.nickname : item.username}}</view>
							</view>
							<view class="text-sm flex">
								<text>{{item.add_time}}</text>
							</view>
						</view>
						
						<view class="cu-capsule radius">
							<view class='cu-tag text-df bg-red'>
								<text class='cuIcon-medal'></text>
							</view>
							<view class="cu-tag line-red">
								{{item.hb_medal}}枚
							</view>
						</view>
						<!--
						<view class="action">
							<button class="cu-btn sm line-red" @tap="listTap('viewBtnTap',item,index)" v-if="viewBtn">
								<text class="cuIcon-goods"/>
								<text class="margin-left-xs">看TA</text>
							</button>
						</view>
						-->
					</view>
				</view>
				
				
				
				<!-- #ifndef APP-PLUS -->
				<!-- <view class="video-box" v-if="item.video">
					<video class="video-view" :src="item.video" @error="videoErrorCallback"/>
				</view> -->
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
				<!-- <view class="video-box" v-if="item.video">
					<video-render :isCover="item.cover" :isSrc="item.video" :isNum="(index+1)"/>
				</view> -->
				<!-- #endif -->
				
				<view class="img-grid-col" v-if="item.note_images != null">
					<!--单图-->
					<view class="one-img" v-if="item.note_images.length == 1" @tap="imgTap(item.note_images[0],item.note_images,0)">
						<view class="img-grid" :style="[{backgroundImage:'url('+ item.note_images[0] +')'}]"/>
					</view>
					
					<!--两图-->
					<view class="grid col-2" v-if="item.note_images.length == 2">
						<block v-for="(items,indexs) in item.note_images" :key="indexs">
							<view class="img-grid-view" @tap="imgTap(items,items,indexs)">
								<view class="img-grid" :style="[{backgroundImage:'url('+ items +')'}]"/>
							</view>
						</block>
					</view>
					
					<!--多图-->
					<view class="grid col-3" v-if="item.note_images.length > 2">
						<block v-for="(items,indexs) in item.note_images" :key="indexs" v-if="indexs < 9">
							<view class="img-grid-view" @tap="imgTap(items,items,indexs)">
								<view class="img-grid" :style="[{backgroundImage:'url('+ items +')'}]"/>
							</view>
						</block>
					</view>
				</view>
				
				<!--文字内容-->
				<!-- @tap="listTap('contentTap',item,index)"-->
				<view class="margin-tb text-black text-content">
					
					<text class="text">{{item.user_note}}</text>
					<!-- <text class="text-blue read-more" v-if="item.text_btn"> 
						<text @tap="open">全文</text>
						<text class="cuIcon-unfold"/>
					</text> -->
				</view>
				<!--话题-->
				<!--
				<view class="cu-tag light bg-red round margin-top" v-if="item.talk" @tap="listTap('talkTap',item,index)">
					<text class="cuIcon-creativefill"></text>
					<text class="margin-left-xs">{{item.talk}}</text>
				</view>
				-->
				
				<!--操作-->
				<view class="flex p-xs footer-tool">
					<!--
					<view class="flex-sub" @tap="listTap('forwardTap',item,index)">
						<text class="cuIcon-forward icon"></text>
						<text class="margin-left-xs">深以为然</text>
						<text class="margin-left-xs">{{item.comment}}</text>
					</view>
					-->
					<view class="flex-twice">
						<view class="box text-left" :class="item.good_num_btn?'text-red lines-red':''" @tap="listTap('haopingTap',item,index)">
							<!--<text class="cuIcon-comment icon"/>-->
							<text class="text cuIcon-comment icon">深以为然</text>
							<text class="margin-left-xs">{{item.good_num}}</text>
						</view>
						<view class="box text-center" :class="item.medium_num_btn?'text-red lines-red':''" @tap="listTap('zhongpingTap',item,index)">
							<!--<text class="cuIcon-comment icon"/>-->
							<text class="text cuIcon-comment icon bg-red">有点东西</text>
							<text class="margin-left-xs text-red">{{item.medium_num}}</text>
						</view>
						<view class="box text-right" :class="item.ordinary_num_btn?'text-red lines-red':''" @tap="listTap('chapingTap',item,index)">
							<!--<text class="cuIcon-appreciate icon"/>-->
							<text class="text cuIcon-appreciate icon">东西不多</text>
							<text class="margin-left-xs">{{item.ordinary_num}}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	//import videoRender from '@/components/common/basics/video-render';
	export default {
		name: 'trends-list',
		components: {
			//uReadMore
			//videoRender
		},
		data() {
			return {
			}
		},
		props: {
			list_data: {
				type: Array,
				default: () => {
					return[]
				}
			},
			isMin: {
				type: Number,
				default: 0
			},
			isMax: {
				type: Number,
				default: 0
			},
			viewBtn: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			listTap(tap,data,index) {
				this.$emit(tap, {
					data,
					index
				});
			},
			imgTap(img,arr,index) {
				this.$emit('imgTap', {
					img,
					arr,
					index
				});
			},
			getMinToMax(index) {
				let isMin = this.isMin, isMax = this.isMax;
				if(isMin == 0 && isMax == 0 ) {
					return true;
				} else if (isMin > 0 && isMax == 0) {
					if(index >= isMin) {
						return true;
					} else {
						return false;
					}
				} else if (isMin == 0 && isMax > 0) {
					if(index < isMax) {
						return true;
					} else {
						return false;
					}
				} else if (isMin > 0 && isMax > 0) {
					if(index >= isMin && index < isMax) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			videoErrorCallback(e) {
				uni.showToast({
				    title: e.target.errMsg,
				    duration: 2000,
					icon: 'none'
				});
			},
			open() {
				console.log('加载并展开全文');
			},
			close() {
				console.log('收起全文');
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.trends {
		border-radius: 18.18rpx;
		.cu-list {
			.cu-item {
				padding-right: 0;
				height: 99.99rpx;
				.cu-avatar {
					left: 0;
					width: 81.81rpx;
					height: 81.81rpx;
				}
				.content {
					left: 99.99rpx;
					line-height: 1.5em;
				}
				.action {
					width: 154.54rpx;
					text-align: right;
					.cu-btn {
						&:after {
							border-radius: 18.18rpx;
						}
						.cuIcon-add {
							font-size: 27.27rpx;
						}
					}
				}
				&:after {
				    width: 0;
				    height: 0;
					border-bottom: 0;
				}
			}
		}
		.text-content {
			line-height: 1.6;
			display:flex;
			flex-wrap: wrap;
			justify-content: left;/*这种情况是水平居中*/
			align-items:flex-end;
			.text{}
			.read-more{
				//上移
				//position: relative;
				//top:-40rpx;
				background: #FFFFFF;
				.cuIcon-unfold {
					position: relative;
					top: 1rpx;
				}
			}
			
		}
		.video-box {
			position: relative;
			width: 100%;
			.video-view {
				width: 100%;
				height: 363.63rpx;
				z-index: 0;
			}
		}
		.img-grid-col {
			position: relative;
			width: 100%;
			.one-img {
				position: relative;
				.img-grid {
					width: 100%;
					height: 363.63rpx;
					border-radius: 9.09rpx;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
				}
			}
			.col-2 {
				.img-grid-view {
					padding: 5.45rpx;
					.img-grid {
					    position: relative;
					    width: 309.09rpx;
						height: 218.18rpx;
					    background-size: cover;
					    background-position: center;
					    border-radius: 9.09rpx;
					}
				}
			}
			.col-3 {
				.img-grid-view {
					padding: 5.45rpx;
					.img-grid {
					    position: relative;
					    width: 204.79rpx;
					    height: 204.79rpx;
					    background-size: cover;
					    background-position: center;
					    border-radius: 9.09rpx;
					}
				}
			}
		}
		.footer-tool {
			margin: 40rpx 0 18.18rpx;
			.flex-twice{
				display: -webkit-flex;
				display:flex;
				-webkit-flex-wrap:nowrap;
				flex-wrap:nowrap;
				.box{
					width:33.333%;
					font-size: 22.36rpx;
					.text {
						border:1rpx solid;
						padding:10rpx 10rpx;
					}
				}
			}
		}
	}
</style>
