<template>
	<view class="margin-bottom video-list-box" :class="show?'show':''">
		<view class="flex flex-wrap">
			<view class="basis-df padding-sm padding-right-xs">
				<block v-for="(item,index) in list_data" :key="index" v-if="index%2==0">
					<view class="margin-bottom-sm img-itme" @tap="listTap(item,index)">
						<!--背景图-->
						<image class="cover-img" :src="item.image" lazy-load mode="widthFix"/>
						<!-- <video-render :isCover="item.image" :isSrc="item.videofile" :isNum="(index+1)"/> -->
						<!--标题-->
						<view class="text-cut video-title" v-if="item.title">{{item.title}}</view>
						
						<!--用户信息-->
						<view class="video-user-info-box" v-if="item.title">
							<view class="user-box">
								<!--头像-->
								<image :src="item.image" mode="aspectFill" lazy-load class="cu-avatar sm round" v-if="item.image"/>
								<!--名称-->
								<view class="text-cut text-sm user-name">{{item.title}}</view>
								<!--点赞-->
								<view class="text-sm text-right video-appreciate" v-if="item.zan">
									<text class="cuIcon-appreciate"/>
									<text class="margin-left-xs">{{item.zan}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="basis-df padding-sm padding-left-xs">
				<block v-for="(item,index) in list_data" :key="index" v-if="index%2!=0">
					<view class="margin-bottom-sm img-itme" @tap="listTap(item,index)">
						<!-- <video-render :isCover="item.image" :isSrc="item.videofile" :isNum="(index+1)"/> -->
						<!--背景图-->
						<image class="cover-img" :src="item.image" lazy-load mode="widthFix"/>
						
						<!--标题-->
						<view class="text-cut video-title" v-if="item.title">{{item.title}}</view>
						
						<!--用户信息-->
						<view class="video-user-info-box" v-if="item.title">
							<view class="user-box">
								<!--头像-->
								<image :src="item.image" mode="aspectFill" lazy-load class="cu-avatar sm round" v-if="item.image"/>
								<!--名称-->
								<view class="text-cut text-sm user-name">{{item.title}}</view>
								<!--点赞-->
								<view class="text-sm text-right video-appreciate" v-if="item.zan">
									<text class="cuIcon-appreciate"/>
									<text class="margin-left-xs">{{item.zan}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import videoRender from '@/components/common/basics/video-render';
	import _tool from '@/utils/tools.js';
	export default {
		name: 'video-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		components:{
			videoRender
		},
		methods: {
			listTap(data,index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-list-box {
		position: relative;
		width: 100%;
		display: none;
		.img-itme {
			position: relative;
			width: 100%;
			.cover-img {
				width: 100%;
				border-radius: 3%;
			}
			.video-title {
			    position: absolute;
			    bottom: 72.72rpx;
			    left: 0;
			    width: 100%;
			    padding: 0 18.18rpx;
			    color: #FFFFFF;
			}
			.video-user-info-box {
			    position: absolute;
			    bottom: 18.18rpx;
			    left: 0;
			    width: 100%;
			    color: #FFFFFF;
				.user-box {
					position: relative;
					width: 100%;
					.cu-avatar {
						margin-left: 18.18rpx;
						width: 43.63rpx;
						height: 43.63rpx;
					}
					.user-name {
					    position: absolute;
					    top: 3.63rpx;
					    width: 145.45rpx;
					    left: 72.72rpx;
					}
					.video-appreciate {
						position: absolute;
						top: 3.63rpx;
						right: 18.18rpx;
					}
				}
			}
		}
	}
	.video-list-box.show {
		display: block;
	}
</style>
