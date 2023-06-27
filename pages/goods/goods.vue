<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-22222" :datas="datas">
			<!-- <block slot="content">商品详情</block> -->
			<!-- 分享 操作
			<block slot="right">
				<text class="cuIcon-forward" />
				<text class="cuIcon-more" />
			</block>
			-->
		</bar-title>

		<!-- <view class="goods-tab-box" :class="show?'show':'hide'" :style="'opacity:' + tabBarOpacity">
			<scroll-view scroll-x class="nav text-center">
				<view class="cu-item" :class="0==TabCur?'text-deepblue text-bold cur':''" @tap="tabSelect" data-id="0">
					商品
				</view>
				<view class="cu-item" :class="1==TabCur?'text-deepblue text-bold cur':''" @tap="tabSelect" data-id="1">
					评价
				</view>
				<view class="cu-item" :class="2==TabCur?'text-deepblue text-bold cur':''" @tap="tabSelect" data-id="2">
					参数
				</view>
				<view class="cu-item" :class="3==TabCur?'text-deepblue text-bold cur':''" @tap="tabSelect" data-id="3">
					详情
				</view>
			</scroll-view>
		</view> -->
		<!--提示-->
		<!--<view class="bg-grey text-sm text-center padding-tb-xs text-white">真机实拍部分为真机样张，您购买的机型大致符合图中成色效果</view>-->

		<!--<scroll-view class="VerticalMain" scroll-y  scroll-with-animation :scroll-top="scrollTop">-->

		<view class="xiangqingH">
			<view class="canshuH">
				<view class="pinglunH">
					<!--商品-->
					<view class="baobeiH">
						<!--轮播图-->
						<view class="banner-swiper-box">
							<swiper class="screen-swiper" circular autoplay @change="bannerSwiper">
								<swiper-item v-for="(item,index) in product.images_text" :key="index">
									<image class="img" :src="$httpImage + item" mode="aspectFill" />
								</swiper-item>
							</swiper>
							<!--页码-->
							<text class="cu-tag bg-grey round sm page" v-if="product.images_text">
								{{bannerCur + 1}}/{{product.images_text.length}}
							</text>
						</view>

						<!--标题-->
						<view class="bg-white view-box title-view-box radius-2 margin-sm">
							<!--分销按钮-->
							<view class="btn-group flex flex-wrap align-center" v-if="userInfo.distributionAble">
								<view class="cu-btns bg-FFEBEB radius-3 text-red" @click="renderScript.emitData">一键保存图片</view>
								<!-- <view class="cu-btn bg-deepblue radius-4" @click="settingQrImgBase64">一键保存图片</view> -->
								<view class="cu-btns bg-F0F0F0 radius-3 margin-left-sm text-101010" @click="copydesc">
									一键复制文案
								</view>
							</view>
							<!--商品价格-->
							<view class="margin-top-sm">
								<text class="text-price text-xxl text-red text-sl" style="font-family: DINCondensed-Bold">
									{{product.sellPrice}}
								</text>
								<!-- <view class="text-xs cost-price-num text-red flex text-929294">
									<view class="text-through">原价￥{{product.market_price}}</view>
									<view class="margin-left-sm">剩余{{product.stock}}件</view>
								</view> -->

								<!-- <view class="text-right time-right ">
									<view class="text-through">原价￥{{product.market_price}}</view>
									<view class="text-xs">剩余{{product.stock}}件</view>
								</view> -->
							</view>
							<view class="title-view">
								<!-- <text class="cu-tag bg-red radius sm">{{product.colourname}}</text> -->
								<text class="text-bold text-black" style=" white-space: pre-wrap;"
									v-if="product.modelName">{{product.modelName}}{{product.basePriceLabel}}</text>
								<text class="text-bold text-black" style=" white-space: pre-wrap;">{{product.title}}</text>
							</view>
							<view class="text-lg margin-bottom-sm">
								<text class="sm text-gray">{{product.tags}}</text>
							</view>
						</view>

						<view class="bg-white margin-sm radius-2">
							<!--新机属性选择-->
							<view class="view-box select-view-box">
								<view class="flex flex-wrap text-df" @tap="selectTap">
									<view class="basis-1">
										<text class="text-gray">已选</text>
									</view>
									<view class="basis-8 text-500">
										<text class="text-df">{{product.title}}</text>
									</view>
									<view class="basis-1">
										<view class="text-gray text-right">
											<text class="cuIcon-right icon" />
										</view>
									</view>
								</view>
							</view>
							<view class="border-view" />

							<!--发货-->
							<view class="view-box select-view-box">
								<view class="flex flex-wrap text-df">
									<view class="basis-1">
										<text class="text-gray">发货</text>
									</view>
									<view class="basis-9 text-500">
										<text class="text-df">16:00前下单，当日发货，顺丰包邮</text>
									</view>
								</view>
							</view>
							<view class="border-view" />
							<view class="view-box service-view-box">
								<!--<view class="view-box service-view-box" @tap="serviceTap">-->
								<view class="flex flex-wrap text-df">
									<view class="basis-1">
										<text class="text-gray">保障</text>
									</view>
									<view class="basis-7 text-500">
										<view>
											<!-- v-for="(item,index) in product.server" -->
											<text class="tag-view">
												<text class="text-red" />
												<!-- <text>{{item}}</text> -->
												<text>7天包退，15天包换</text>
											</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!--包含商品 end-->
					<!--评论列表-->
					<view id="pinglunBlock" class="bg-white margin-sm padding  radius-2" :style="{paddingTop: '0'}">
						<!-- <view class="" v-for="(items,index) in 10" :key="index">评论123</view> -->
						<view class="cu-bar bg-white">
							<text class="text-bold">商品评价({{rateList.count}})</text>
						</view>
						<block v-for="(items,index) in rateList.shoppingOrderEvaluates" :key="index">
							<view class="view-box" style="padding: 0rpx;">
								<view class="flex-wrap text-sm" style="margin-top: 32rpx;">
									<view class="basis-1 margin-right-sm" style="display: flex;align-items: center;">
										<view class="cu-avatar sm round" :style="'backgroundImage: url(' + $httpImage + items.avatar + ')'"
											style="width: 53rpx; height: 53rpx;" />
										<view class=""
											style="font-size: 27rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #4F4F50;">
											{{items.nickName}}
										</view>
									</view>
									<view>
										已购：{{items.modelName}}
									</view>
									<view class="basis-9" style="margin-top: 26rpx;">

										<view class="margin-top-xs"
											style="word-break: break-all;width: 80vw;font-size: 25rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #4F4F50;">
											{{items.context}}
										</view>
										<!-- <view class="text-gray margin-top-sm">{{items.spec}}</view> -->
									</view>
									<view v-if="items.photo" style="margin-top: 24rpx;display: flex;">
										<image v-for="(item, index) in items.photo" :src="$httpImage + item"
											style="width: 153rpx; height: 153rpx;margin-right: 11rpx;"></image>
									</view>

								</view>
							</view>
						</block>
						<!--
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="text-black text-lg"
									v-if="product.evaluate_data">评价（{{product.evaluate_data.count}}）</text>
							</view>
							<view class="action">
								<view class="text-sm">
									<text class="margin-right-xs">好评率</text>
									<text class="text-black text-lg"
										v-if="product.evaluate_data">{{product.evaluate_data.avg}}%</text>
									<text class="cuIcon-right icon margin-left-xs" />
								</view>
							</view>
						</view>
						<view class="border-view" />
						<block v-for="(items,index) in evalueteList" :key="index">
							<view class="view-box">
								<view class="flex flex-wrap text-sm">
									<view class="basis-1">
										<view class="cu-avatar sm round" :style='backgroundImage:' url('+items.avatar+')'' />
									</view>
									<view class="basis-9 text-sm">
										<view>{{items.username}}</view>
										<view class="margin-top-xs">{{items.comment}}</view>
										<view class="text-gray margin-top-sm">iPhone X 64G深空灰色</view>
									</view>
								</view>
							</view>
							<view class="border-view" />
						</block>
						-->
					</view>
					<!--验机报告-->
					<view class="">
						<view class="block_2 flex-col">
							<view class="group_1 flex-row">
								<!-- <view class="group_2 flex-col"></view> -->
								<text class="text_71">验机评估报告</text>
							</view>
							<view class="group_3 flex-row">
								<view class="box_1 flex-col">
									<text class="text_4">隐私清除&nbsp;|&nbsp;专业验机&nbsp;|&nbsp;整机清洁</text>
								</view>
								<view class="box_2 flex-col"></view>
							</view>
							<view class="group_5 flex-col">
								<!-- <view class="text-wrapper_1 flex-row justify-between">
									<text class="text_5">{{modelName}}</text>
									<text class="text_6">质检时间:2023-04-12</text>
								</view>
								<view class="image-text_1 flex-row justify-between">
									<view class="single-avatar_1 flex-col"></view>
									<view class="text-group_1 flex-col">
										<text class="text_7">刘康维</text>
										<text class="text_8">官方认证&nbsp;|&nbsp;验机工程师&nbsp;|&nbsp;已检测4567件</text>
									</view>
								</view> -->
								<!-- <text class="text_9">本机价格影响因素</text>
								<view class="box_3 flex-row justify-between">
									<view id="echarts" class="echarts" @click="echarts.onClick" :prop="optionData"
										:change:prop="echarts.updateEcharts"></view>
								</view> -->
								<!-- <text class="paragraph_4">
									本机价格影响因素
									<br />
									(12张）
								</text> -->
								<!-- <view class="box_7 flex-row justify-between">
									<view class="list_1 flex-row">
										<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
											<view class="scroll-view-item_H demo-text-1" v-for="(item, index) in urls"
												@tap="viewImgs(urls, index)">
												<image :src="item" mode="aspectFit" style="width: 122rpx; height: 122rpx"></image>
											</view>
										</scroll-view>
									</view>
									<image class="image_5" referrerpolicy="no-referrer"
										src="/static/lanhu_zhijianbaogaoduibitu/326f64c9428b49b7be6a6dde77919c89_mergeImage.png" />
								</view> -->
								<!-- <text class="text_27">本机质检报告</text>
								<view class="box_8 flex-row">
									<view class="text-group_2 flex-col">
										<text class="text_28">用户</text>
										<text class="text_29">物品信息</text>
									</view>
									<view class="text-group_3 flex-col">
										<text class="text_30">平台质检</text>
									</view>
								</view> -->
								<view
									style="padding: 0 24rpx;font-size: 32rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;">
									{{product.modelName}}
								</view>
								<view style="display: flex;padding: 0 24rpx;margin-top: 30rpx;">
									<view style="width: 40%;">
										<view class="titles">
											机器SKU
										</view>
										<view class="texts">
											{{product.basePriceLabel}}G
										</view>
									</view>
									<view>
										<view class="titles">
											物品信息
										</view>
										<view class="texts">
											{{product.deviceLabel}}
										</view>
									</view>
								</view>

								<view class="box_14 flex-row justify-between">
									<text class="text_53">物品信息</text>
									<image class="icon_2" referrerpolicy="no-referrer"
										src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
								</view>
								<view class="box_9 flex-col">
									<view class="section_3 flex-row justify-between" v-for="(item, index) in Pricepramitems"
										v-if="item.indexs === 1" :key="index">
										<view class="text-group_4 flex-col">
											<text class="text_33">{{qualityInfoList[index].key}}</text>
											<text class="text_34">{{qualityInfoList[index].value}}</text>
											<text
												class="text_36">{{qualityInfoList[index].remark ? qualityInfoList[index].remark : '——'}}</text>
										</view>
										<!-- <view class="box_10 flex-col">
											<view
												v-if="checkInformation(qualityInfoList[index].valueId, Pricepramitems[index].valueId, index)">
												<view class="cu-avatar xl radius"
													:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }">
													<view class="img" @tap="viewImg(phoneImgArr,index)">
														<text class="text"></text>
													</view>
													<view class="cu-tag badge"
														:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
														@tap="uploadImg(index)">
														<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
															<u-icon name="plus" color="#ffffff" size="10"></u-icon>
														</view>
													</view>
												</view>
											</view>
										</view> -->
									</view>
								</view>
								<view class="box_14 flex-row justify-between">
									<text class="text_53">成色情况</text>
									<image class="icon_2" referrerpolicy="no-referrer"
										src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
								</view>
								<view class="box_9 flex-col">
									<view class="section_3 flex-row justify-between" v-for="(item, index) in qualityInfoList"
										v-if="item.indexs == 2">
										<view class="text-group_4 flex-col">
											<text class="text_33">{{qualityInfoList[index].key}}</text>
											<text class="text_34">{{qualityInfoList[index].value}}</text>
											<text
												class="text_36">{{qualityInfoList[index].remark ? qualityInfoList[index].remark : '——'}}</text>
										</view>
										<!-- <view class="box_10 flex-col">
											<view v-if="checkFineness(qualityInfoList[index].valueId, Pricepramitems[index].valueId, index)">
												<view class="cu-avatar xl radius"
													:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }">
													<view class="img" @tap="viewImg(phoneImgArr,index)">
														<text class="text"></text>
													</view>
													<view class="cu-tag badge"
														:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
														@tap="uploadImg(index)">
														<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
															<u-icon name="plus" color="#ffffff" size="10"></u-icon>
														</view>
													</view>
												</view>
											</view>
										</view> -->
									</view>
								</view>
								<view class="box_14 flex-row justify-between">
									<text class="text_53">功能情况</text>
									<image class="icon_2" referrerpolicy="no-referrer"
										src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
								</view>
								<view class="box_9 flex-col">
									<view class="section_3 flex-row justify-between" v-for="(item, index) in qualityInfoList"
										v-if="item.indexs == 3">
										<view class="text-group_4 flex-col">
											<text class="text_33">{{qualityInfoList[index].key}}</text>
											<text class="text_34">{{qualityInfoList[index].value}}</text>
											<text
												class="text_36">{{qualityInfoList[index].remark ? qualityInfoList[index].remark : '——'}}</text>
										</view>
										<!-- <view class="box_10 flex-col">
											<view v-if="checkFunctional(qualityInfoList[index].valueId, Pricepramitems[index].valueId)">
												<view class="cu-avatar xl radius"
													:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }">
													<view class="img" @tap="viewImg(phoneImgArr,index)">
														<text class="text"></text>
													</view>
													<view class="cu-tag badge"
														:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
														@tap="uploadImg(index)">
														<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
															<u-icon name="plus" color="#ffffff" size="10"></u-icon>
														</view>
													</view>
												</view>
											</view>
										</view> -->
									</view>
								</view>
								<view class="box_14 flex-row justify-between">
									<text class="text_53">维修情况</text>
									<image class="icon_2" referrerpolicy="no-referrer"
										src="/static/lanhu_zhijianbaogaoduibitu/SketchPng585368739d0f7ed317660bd81924b5501e5a0f8bf21d96d231b54cb938daa4c7.png" />
								</view>
								<view class="box_9 flex-col">
									<view class="section_3 flex-row justify-between" v-for="(item, index) in Pricepramitems"
										v-if="item.indexs == 4">
										<view class="text-group_4 flex-col">
											<text class="text_33">{{qualityInfoList[index].key}}</text>
											<text class="text_34">{{qualityInfoList[index].value}}</text>
											<text
												class="text_36">{{qualityInfoList[index].remark ? qualityInfoList[index].remark : '——'}}</text>
										</view>
										<!-- <view class="box_10 flex-col">
											<view v-if="checkFunctional(qualityInfoList[index].valueId, Pricepramitems[index].valueId)">
												<view class="cu-avatar xl radius"
													:style="{'background-image': phoneImgArr[index].photo == '' ?  addpicicon : 'url('+ $httpImage +phoneImgArr[index].photo+')' }">
													<view class="img" @tap="viewImg(phoneImgArr,index)">
														<text class="text"></text>
													</view>
													<view class="cu-tag badge"
														:style="{backgroundColor: phoneImgArr[index].photo == '' ? '#111f3a':'#dd514c'}"
														@tap="uploadImg(index)">
														<view :class="phoneImgArr[index].photo == '' ? 'translate45':''">
															<u-icon name="plus" color="#ffffff" size="10"></u-icon>
														</view>
													</view>
												</view>
											</view>
										</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!--包含评论end-->
				<view id="" class=" bg-white margin-sm padding  radius-2">
					<view class="margin-bottom-xs text-bold text-lg margin-bottom-sm">我们的服务</view>
					<view class="text-lightgrey">
						<view class="margin-bottom-xs text-bold text-df margin-top-xs text-101010">官方验机</view>
						<view class="text-sm margin-bottom">平台验机并提供评估报告。</view>
						<view class="margin-bottom-xs text-bold text-df margin-top-xs text-101010">
							此商品支持
							<text v-for="(items,index) in product.server" :key="index">{{items}}</text>
						</view>
						<view class="text-sm margin-bottom">质检并未发现机器存在异常，满足质检条件。</view>
						<view class="margin-bottom-xs text-bold text-df margin-top-xs text-101010">关于附件</view>
						<view class="text-sm">
							附件名称显示为橘色表示包含该配件，显示灰色表示不包 含该配件，附件不在质保范围内。
						</view>
					</view>
				</view>
				<!--参数-->
				<view id="canshuBlock" class="bg-white margin-sm padding  radius-2">
					<view class="margin-tb-xs text-bold text-xl">温馨提示</view>
					<image src="/static/img/shili.jpg"></image>
					<view class="margin-bottom-xs text-bold text-lg margin-top-xs">防拆标签</view>
					<view class="text-sm">
						商品均带有防拆标签，签收后请您保障在7天内标签完好无损，撕毀 则视为放弃7天无理由退货服务。
					</view>
				</view>
			</view>
			<!--包含参数end-->
			<!--详情-->
			<!-- <view id="xiangqingBlock" class="goods-details-box margin-sm bg-white radius-2 padding "> -->
			<!-- <rich-text :nodes="product.desc|formatRichText"></rich-text> -->
			<!-- <image src="/static/delect_images/home/goods/goods-1.png" mode="widthFix" />
				<image src="/static/delect_images/home/goods/goods-2.png" mode="widthFix" /> -->
			<!-- </view> -->

			<!--占位底部距离-->
			<view class="cu-tabbar-height"></view>
		</view>
		<!--包含详情 end-->

		<!--底部操作-->
		<view class="footer-fixed">
			<view class="cu-bar bg-white tabbar border shop">
				<button class="action" @tap="kefuTap">
					<view class="cuIcon-service" />
					<view>客服</view>
				</button>
				<view class="action" @tap="myCartTap">
					<view class="cuIcon-cart">
						<view class="cu-tag badge" v-if="product.cart_num">{{product.cart_num}}</view>
					</view>
					<text>购物车</text>
				</view>
				<view class="btn-group">
					<button class="cu-btn radius shadow-blur addGouwu" @tap="selectTap('add')">加入购物车</button>
					<button class="cu-btn radius shadow-blur addgo" @tap="selectTap('sell')">立即购买</button>
				</view>
			</view>
		</view>
		<!--弹出框-->
		<!-- <view class="cu-modal bottom-modal bottom-modal-box" :class="imageModal?'show':''"> -->

		<!-- </view> -->
		<view class="background-q" :class="imageModal?'show':''">
			<view id="qrcodes">
				<canvas id="img1" canvas-id="img1" style="width: 324px; height: 324px" />
				<view class="text">{{product.title}}</view>
				<view class="price">￥{{product.sales_price}}</view>
				<view class="head">
					<canvas id="img2" canvas-id="img2" style="width: 40px; height: 40px" />
					<!-- <img :src="this.userInfo.avatar" alt="" crossorigin="anonymous" /> -->
				</view>
				<view class="name">优闲集 + {{this.userInfo.nickname}}</view>
				<canvas id="qrcode" canvas-id="qrcode" :style="{'width': '68px', 'height': '68px'}" />
			</view>
		</view>
		<!--弹出框-->
		<view class="cu-modal bottom-modal bottom-modal-box" :class="bottomModal?'show':''" @click="bottomDisplay">
			<view class="cu-dialog bg-white" ref="btn" id="btn">
				<!--标题-->
				<!-- <view class="text-black text-center margin-tb text-lg title-bar">
					<text>{{modalTitle}}</text>
					<text class="cuIcon-close close-icon" @tap="hideModal"></text>
				</view> -->

				<!--内容区域-->
				<view class="modal-content">
					<!--服务区域-->
					<view class="view-box service" v-if="modalType=='service'">
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">已验机</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">转转&富士康联合制定验机标准，对设备进行专业质检</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">7天无理由</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">自收到商品7天内，不喜欢可以申请退货，并自付邮费寄回</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">180天质保</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">自订单确认收货起180天,提供免费质保</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">顺丰包邮</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">16:00前下单，今日发货，顺丰包邮</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">半年电池免费换新</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">
								自订单确认收货起半年，如果电池电量低于60%，可申请免费更换原厂品质电池
							</view>
						</view>
					</view>

					<!--质检报告-->
					<view class="view-box baogao" v-if="modalType=='baogao'">
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">已验机</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">转转&富士康联合制定验机标准，对设备进行专业质检</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">7天无理由</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">自收到商品7天内，不喜欢可以申请退货，并自付邮费寄回</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">180天质保</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">自订单确认收货起180天,提供免费质保</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">顺丰包邮</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">16:00前下单，今日发货，顺丰包邮</view>
						</view>
						<view class="text-view">
							<text class="cuIcon-title text-red" />
							<text class="text-cut text-black">半年电池免费换新</text>
						</view>
						<view class="text-sm text-list-view">
							<view class="margin-left text-cut text-gray">
								自订单确认收货起半年，如果电池电量低于60%，可申请免费更换原厂品质电池
							</view>
						</view>
					</view>
					<!--促销区域-->
					<view class="view-box promotion" v-if="modalType=='promotion'">
						<view class="text-view">
							<text class="cu-tag line-orange radius sm">赠品</text>
							<text class="margin-left-xs text-cut text-black">品胜充电器套装</text>
						</view>

						<view class="text-sm text-list-view">
							<view class="text-cut">充电头+数据线</view>
							<text class="text-right-view">价值￥99</text>
						</view>

						<view class="text-view">
							<text class="cu-tag line-orange radius sm">分期</text>
							<text class="margin-left-xs text-cut text-black">￥318元/月花呗/京东/微信组合支付</text>
						</view>
					</view>

					<!--选择规格-->
					<view class="view-box select" v-if="modalType=='select'">
						<!--商品信息-->
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar radius lg"
									style="background-image: url(/static/delect_images/home/goods/1.png)" />
								<view class="content">
									<view class="text-price-view">
										<text class="text-price text-FF3A31 margin-right-xs text-sl" style="font-family: DINCondensed-Bold">
											{{product.sales_price}}
										</text>
										<text class="text-sm text-gray text-through">￥{{product.market_price}}</text>
										<text class="cu-tag bg-gradual-red radius sm">
											<text class="cuIcon-hotfill" />
											<text>秒杀中</text>
										</text>
									</view>
									<view class="text-black text-sm flex">
										<view class="text-cut">已选: {{specSelectedName}}</view>
									</view>
								</view>
							</view>
						</view>

						<!--规格数据-->
						<view class="select-btn-list-boox">
							<view class="select-item" v-for="(item,index) in specList" :key="index">
								<view class="text-black text-500">{{item.name}}</view>
								<view class="select-btn">
									<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id"
										:key="childIndex" class="cu-btn light" :class="{selected: childItem.selected}"
										@click="selectSpec(childIndex, childItem.pid)">
										{{childItem.name}}
									</text>
									<!-- <button class="cu-btn light bg-red">深空灰色</button> -->
								</view>
							</view>
						</view>
					</view>

					<!--公共按钮-->
					<view class="footer-fixed">
						<view class="flex flex-direction">
							<button class="cu-btn text-color-yellows lg radius-4" @click="confirmFuc">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		bindDistributionRelation,
		bindDistributionBrowse,
		shoppingCart,
		secondGoodsFootprint,
		secondGoodsFavorite,
		secondGoods,
		selectByModelId,
		immediatelyPayment
	} from '@/api/malls.js';
	import qrcode from './qrcode';
	import {
		ProductDetail,
		FlashProductDetail,
		ProductEvaluate,
		CartAdd,
		OrderCreate
	} from '@/api/mall.js';
	import {
		setuservisit
	} from '@/api/user.js';
	import html2canvas from 'html2canvas';
	import barTitle from '@/components/common/basics/bar-title';
	import shareImages from '@/components/hj-placard/shareImages.vue';
	import _goods_data from '@/static/data/goods.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			shareImages,
		},
		computed: {
			specSelectedName() {
				return this.specSelected.join(' ');
			},
			specProduct() {
				if (this.product.use_spec == 1) {
					let market_price = this.product.market_price;
					let sales_price = this.product.sales_price;
					let stock = this.product.stock;
					let image = this.product.image;
					let specSelectedName = this.specSelected.join(' ');
					let specTableList = this.specTableList;
					for (var item of this.specTableList) {
						if (item.value.join(' ') == specSelectedName) {
							market_price = item.market_price;
							sales_price = item.sales_price;
							stock = item.stock;
							image = item.image;
						}
					}
					return {
						market_price,
						sales_price,
						stock,
						image,
					};
				} else {
					return this.product;
				}
			},
		},
		data() {
			return {
				modelId: 0,
				rateList: [],
				goodsId: 0,
				imageData: '',
				qrUrl: '', // 生成二维码的链接
				userInfo: {},
				datas: '',
				scrollConf: {
					showTop: 10,
					opacityTop: 200,
					offsetAd: 130,
					offsetIos: 135,
					nodeList: [{
							id: 'shangpinBlock',
							top: 0,
						},
						{
							id: 'pinglunBlock',
							top: 0,
						},
						{
							id: 'canshuBlock',
							top: 0,
						},
						{
							id: 'xiangqingBlock',
							top: 0,
						},
					],
				},
				tabBarOpacity: 0,
				imageModal: false,
				TabCur: 0,
				show: false,
				scrollTop: 0,
				jumpTop: 0,
				bannerCur: 0,
				bannerList: [],
				bottomModal: false,
				modalTitle: '',
				modalType: 'promotion',
				selectType: '',
				goodsList: [],
				specSelected: [],
				product: '',
				goodsid: '',
				flashId: '',
				pageIndex: 1,
				pageLimit: 10,
				evalueteList: [],
				qualityInfoList: [],
				Pricepramitems: [],
				isNew: false,
			};
		},
		onLoad(options) {
			this.goodsId = options.id;
			this.secondGoodsFootprint(options.id);
			this.secondGoods();
			this.secondGoodsFavorite();
			this.isNew = options.isNew;
			// 获取当前页面信息
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			// 获取当前user信息
			let userInfo = uni.getStorageSync('userinfo');
			this.userInfo = userInfo;
			// 设置二维码信息
			const aa = {
				way: 1,
				url: `/` + currentPage.route + `?id=` + options.id + `&nameId=` + userInfo.userId
			}
			this.qrUrl = JSON.stringify(aa)
			// this.bindingProduct()
			// 首页扫码进入后 未登陆状态跳转登陆页面
			if (options.nameId) {
				uni.setStorageSync('url', `/` + currentPage.route + `?id=` + options.id + `&nameId=` + options.nameId);
				uni.setStorageSync('nameId', options.nameId);
				this.$api.checkLogin();
				if (userInfo.userId) {
					this.bindingProduct(options.nameId);
					this.datas = '1';
				}
			}

			this.goodsid = options.id;
			let flash_id = options.flash ? options.flash : 0;
			if (flash_id != 0) {
				this.flashId = flash_id;
			}
			// this.getDetail(this.goodsid, flash_id);
			// 添加用户足迹
			let loginInfo = JSON.parse(uni.getStorageSync('app_config_data') || '{}'); // 解决缓存值为空导致JSON.parse解析语法报错
			if (loginInfo.hasLogin) {
				setuservisit({
					type: 1,
					goods_id: options.id,
				}).then((res) => {});
			}
		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html) {
				//控制小程序中图片大小
				if (html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(
						/\<img/gi,
						'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'
					);
					return newContent;
				}
			},
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			});
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query
				.selectAll('#pinglunBlock, #canshuBlock, #xiangqingBlock')
				.boundingClientRect((data) => {
					let that = this;
					data.forEach(function(item) {
						if (item.id == 'pinglunBlock') {
							that.scrollConf.nodeList[1].top = item.top;
						}
						if (item.id == 'canshuBlock') {
							that.scrollConf.nodeList[2].top = item.top;
						}
						if (item.id == 'xiangqingBlock') {
							that.scrollConf.nodeList[3].top = item.top;
						}
					});
				})
				.exec();
		},
		created() {
			//加载虚拟数据
		},
		onPageScroll(e) {
			if (e.scrollTop > this.scrollConf.showTop) {
				this.show = true;
				this.tabBarOpacity = e.scrollTop / this.scrollConf.opacityTop;
			} else {
				this.show = false;
			}
		},
		methods: {
			selectByModelId() {
				const storeId = uni.getStorageSync('userinfo').storeId
				const modelId = this.modelId
				selectByModelId({
					storeId,
					modelId
				}).then(res => {
					if (res.code === 200) {
						res.data.shoppingOrderEvaluates.map(item => {
							if (item.photo) {
								item.photo = item.photo.split(',')
							}
						})
						console.log(res.data)
						this.rateList = res.data
					}
				})
			},
			// 添加收藏
			secondGoodsFavorite() {
				secondGoodsFavorite({
					secondGoodsId: this.goodsId,
				}).then((res) => {
					if (res.code === 200) {
						console.log('收藏添加成功');
					}
				});
			},
			// 获取详情
			secondGoods() {
				secondGoods(this.goodsId).then((res) => {
					let images_text = []
					if (res.code === 200) {
						if (res.data.frontPhoto) {
							images_text.push(res.data.frontPhoto)
						}
						if (res.data.backPhoto) {
							images_text.push(res.data.backPhoto)
						}
						if (res.data.topPhoto) {
							images_text.push(res.data.topPhoto)
						}
						if (res.data.bottomPhoto) {
							images_text.push(res.data.bottomPhoto)
						}
						if (res.data.leftPhoto) {
							images_text.push(res.data.leftPhoto)
						}
						if (res.data.rightPhoto) {
							images_text.push(res.data.rightPhoto)
						}
						if (res.data.cameraPhoto) {
							images_text.push(res.data.cameraPhoto)
						}
						if (res.data.otherPhoto) {
							images_text.push(res.data.otherPhoto)
						}
						this.modelId = res.data.modelId
						this.qualityInfoList = JSON.parse(res.data.qualityInfoList)
						this.Pricepramitems = JSON.parse(res.data.oldQualityInfoList)
						console.log(this.Pricepramitems)
						this.product = res.data;
						this.product.images_text = images_text;
						this.onCanvas();
						this.selectByModelId()
					}
				});
			},
			secondGoodsFootprint(id) {
				secondGoodsFootprint({
					secondGoodsId: Number(id),
				}).then((res) => {
					if (res.code === 200) {
						console.log('足迹添加成功');
					}
				});
			},
			bottomDisplay(e) {
				const query = uni.createSelectorQuery().in(this);
				query
					.selectAll('#btn')
					.boundingClientRect((data) => {
						if (e.target.y < data[0].top) {
							this.bottomModal = false;
						}
					})
					.exec();
				// console.log(this.$refs.btn.$el.getBoundingClientRect(), ' 123123123')
				// const height = this.$refs.btn.$el.getBoundingClientRect().top
				// if (e.target.y < height) {
				// 	this.bottomModal = false;
				// }
			},
			bindingProduct(item) {
				bindDistributionBrowse({
					sharePeople: Number(item),
					goodsId: this.goodsId
				}).
				then(res => {})
			},
			async onCanvas() {
				qrcode
					.make({
						canvasId: 'qrcode',
						componentInstance: this,
						text: this.qrUrl,
						size: 58,
						margin: 0,
						backgroundColor: '#ffffff',
						foregroundColor: '#000000',
						fileType: 'jpg',
						errorCorrectLevel: qrcode.errorCorrectLevel.H,
					})
					.then((res) => {});
				// const userInfo = Vue.prototype.$store.state.userInfo;
				const ctx = uni.createCanvasContext('img1', this);
				const ctx2 = uni.createCanvasContext('img2', this);
				ctx.fillRect(0, 0, 324, 324);
				ctx2.fillRect(0, 0, 40, 40);
				const image = this.$httpImage + this.product.images_text[0]
				ctx.drawImage(image, 0, 0, 324, 324);
				// ctx2.drawImage(this.userInfo.avatar, 0, 0, 40, 40);
				let pic = await this.setTime(ctx);
				let pic2 = await this.setTime(ctx2);
				this.$emit('success', pic);
			},
			setTime(ctx) {
				return new Promise((resole, err) => {
					setTimeout(() => {
						ctx.draw(false, async () => {
							let pic = await this.getNewPic();
							resole(pic);
						});
					}, 600);
				});
			},
			// 获取新的图片地址
			getNewPic() {
				return new Promise((resolve, errs) => {
					setTimeout(() => {
						uni.canvasToTempFilePath({
								canvasId: 'img1',
								quality: 1,
								complete: (res) => {
									// 在H5平台下，tempFilePath 为 base64
									// 关闭showLoading
									uni.hideLoading();
									//  储存海报地址  也是分享的地址
									resolve(res.tempFilePath);
								},
							},
							this
						);
					}, 200);
				});
			},
			// 获取新的图片地址
			getNewPic2() {
				return new Promise((resolve, errs) => {
					setTimeout(() => {
						uni.canvasToTempFilePath({
								canvasId: 'img2',
								quality: 1,
								complete: (res) => {
									// 在H5平台下，tempFilePath 为 base64
									// 关闭showLoading
									uni.hideLoading();
									//  储存海报地址  也是分享的地址
									resolve(res.tempFilePath);
								},
							},
							this
						);
					}, 200);
				});
			},
			async receiveRenderData(val) {
				let is_login = await this.$api.checkLogin();
				if (is_login) {
					let imgurl = this.product.images_text;
					this.showImageModal();
					uni.showLoading({
						title: '下载中',
					});
					setTimeout(() => {
						this.imageModal = false;
					}, 2000);
					let that = this;
					let base64 = val;
					const bitmap = new plus.nativeObj.Bitmap('test');
					bitmap.loadBase64Data(
						base64,
						function() {
							const url = '_doc/' + new Date().getTime() + '.png'; // url为时间戳命名方式
							bitmap.save(
								url, {
									overwrite: true, // 是否覆盖
									// quality: 'quality'  // 图片清晰度
								},
								(i) => {
									uni.saveImageToPhotosAlbum({
										filePath: i.target,
										success: function() {
											// uni.hideLoading()
											// uni.showToast({
											// 	title: '图片保存成功',
											// 	icon: 'none'
											// })
											for (let i = 0; i < imgurl.length; i++) {
												uni.downloadFile({
													url: imgurl[i], // 图片地址
													methods: 'GET',
													success: (res) => {
														var tempFilePath = res.tempFilePath; // 这里拿到后端返回的图片路径
														uni.saveImageToPhotosAlbum({
															// 然后调用这个方法
															filePath: tempFilePath,
															success: (res) => {
																if (i + 1 == imgurl.length) {
																	uni.hideLoading();
																	uni.showToast({
																		title: '分享图片已保存至相册',
																		icon: 'none',
																	});
																	// this.hideImageModal();
																	this.imageModal = false;
																}
															},
															fail: (err) => {
																that.$u.toast(err);
															},
															complete: () => {
																// uni.hideLoading();
																// that.$u.toast('执行完毕');
															},
														});
													},
													fail: () => {
														uni.hideLoading();
													},
												});
											}
											bitmap.clear();
										},
									});
								},
								(e) => {
									uni.hideLoading();
									uni.showToast({
										title: '图片保存失败',
										icon: 'none',
									});
									bitmap.clear();
								}
							);
						},
						(e) => {
							uni.hideLoading();
							uni.showToast({
								title: '图片保存失败',
								icon: 'none',
							});
							bitmap.clear();
						}
					);
				}
			},
			//获取容器高度
			getElementScollTop(id) {
				if (id == 0) {
					var css = '.nav';
				}
				if (id == 1) {
					var css = '.baobeiH';
				}
				if (id == 2) {
					var css = '.pinglunH';
				}
				if (id == 3) {
					var css = '.canshuH';
				}
				const query = uni.createSelectorQuery().in(this);
				query
					.select(css)
					.boundingClientRect((data) => {
						this.jumpTop = data.height - 95;
					})
					.exec();
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				// this.getElementScollTop(this.TabCur)
				let adjustedTop = this.scrollConf.nodeList[this.TabCur].top;
				// #ifdef APP-PLUS
				if (plus.os.name == 'Android') {
					adjustedTop = this.scrollConf.nodeList[this.TabCur].top - this.scrollConf.offsetAd;
				} else {
					adjustedTop = this.scrollConf.nodeList[this.TabCur].top - this.scrollConf.offsetIos;
				}
				// #endif
				uni.pageScrollTo({
					scrollTop: adjustedTop, //滚动的距离
					duration: 300, //过渡时间
				});
			},
			copydesc() {
				uni.setClipboardData({
					data: this.product.teamdesc,
					success: () =>
						uni.showToast({
							title: '文字已复制',
						}),
				});
			},
			loadData() {
				let that = this;
				this.getProductEvaluate();
			},
			// 获取商品详情
			getDetail(id, flash_id) {
				let that = this;
				let params = {};
				if (flash_id == 0) {
					params = {
						id: that.goodsid,
					};
					ProductDetail(params)
						.then((res) => {
							let product = res.data;
							if (!product) {
								setTimeout(function() {
									uni.navigateBack();
								}, 3000);
								return;
							}
							this.product = product;
							this.onCanvas();
							// if (product.flash) {
							// 	this.countdown = product.flash.countdown;
							// 	this.progress = product.flash;
							// }
							// this.favorite = this.product.favorite;
							if (this.product.use_spec) {
								let specList = this.product.spec_list;
								let specTableList = this.product.spec_table_list;

								let e = 1;
								let ee = 1;
								let specChildList = [];
								for (let i in specList) {
									specList[i].id = e++;
									for (let ii in specList[i].child) {
										specChildList.push({
											id: ee++,
											pid: specList[i].id,
											name: specList[i].child[ii],
										});
									}
								}
								this.specList = specList;
								this.specChildList = specChildList;
								this.specTableList = specTableList;

								//规格 默认选中第一条
								this.specSelected = [];
								this.specList.forEach((item) => {
									for (let cItem of this.specChildList) {
										if (cItem.pid === item.id) {
											this.$set(cItem, 'selected', true);
											this.specSelected.push(cItem.name);
											break; //forEach不能使用break
										}
									}
								});
							}
						})
						.finally((com) => {
							uni.stopPullDownRefresh();
						});
				} else {
					params = {
						flash_id: that.flashId,
					};
					FlashProductDetail(params)
						.then((res) => {})
						.finally((com) => {
							uni.stopPullDownRefresh();
						});
				}
			},
			// 获取评价
			getProductEvaluate() {
				let that = this;
				let params = {
					product_id: this.goodsid,
					page: this.pageIndex,
					pagesize: this.pageLimit,
				};
				ProductEvaluate(params).then((res) => {
					that.evalueteList = res.data;
				});
			},
			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				list.forEach((item) => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				});
				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach((item) => {
					if (item.selected === true) {
						this.specSelected.push(item.name);
					}
				});
			},
			bannerSwiper(e) {
				this.bannerCur = e.detail.current;
			},
			serviceTap() {
				this.modalTitle = '服务';
				this.modalType = 'service';
				this.showModal();
			},
			baogaoTap() {
				this.modalTitle = '质检报告';
				this.modalType = 'baogao';
				this.showModal();
			},
			promotionTap() {
				this.modalTitle = '促销优惠';
				this.modalType = 'promotion';
				this.showModal();
			},
			async selectTap(type) {
				if (type == 'add') {
					let params = {
						handGoodsId: Number(this.goodsId),
					};
					shoppingCart(params).then((res) => {
						if (res.code === 200) {
							uni.showToast({
								icon: 'none',
								title: '加入购物车成功',
							});
						}
					});
				} else {
					immediatelyPayment({
						goodsId: this.goodsId
					}).then(res => {
						if (res.code === 200) {
							uni.setStorageSync('cartList', [{
								goodsInfo: {
									basePriceLabel: this.product.basePriceLabel,
									deviceLabel: this.product.deviceLabel,
									goodsId: this.goodsId,
									modelId: this.product.modelId,
									modelName: this.product.deviceLabel,
									sellPrice: this.product.sellPrice,
									title: this.product.title,
									backPhoto: this.product.backPhoto,
								},
								disabled: true,
								value: 1
							}])
							uni.navigateTo({
								url: '/pages/tabbar/settlement?id=' + res.data,
							});
						}
					})
				}
			},
			confirmFuc() {
				let that = this;
				let type = that.selectType;
				if (type == 'add') {
					CartAdd(params)
						.then((res) => {
							if (res.code == 1) {
								that.product.cart_num++;
							}
						})
						.finally((com) => {
							that.hideModal();
						});
				} else if (type == 'sell') {
					let spec = '';
					if (that.product.use_spec == 1) {
						spec = that.specSelected.join(',');
					}
					uni.navigateTo({
						url: 'settlement?id=' + that.goodsid + '&spec=' + spec,
					});
				}
			},
			showModal() {
				this.bottomModal = true;
			},
			showImageModal() {
				this.imageModal = true;
			},
			hideImageModal() {
				this.imageModal = false;
			},
			hideModal(e) {
				this.bottomModal = false;
				this.modalTitle = '';
				this.modalType = '';
			},
			kefuTap() {
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			},
			myCartTap() {
				uni.navigateTo({
					url: '/pages/goods/cart',
				});
			},
			// 下载图片到相册
			settingQrImgBase64() {
				let that = this;
				let imgurl = this.product.images_text;
				// this.showImageModal();
				const dateEditor = uni.createSelectorQuery().in(this).select('#qrcode');
				dateEditor
					.boundingClientRect((rect) => {})
					.exec();
				html2canvas(document.getElementById('qrcode')).then((canvas) => {
					this.imageData = canvas.toDataURL('image/png', 1);
					uni.showLoading({
						title: '下载中...',
						mask: true,
					});
					uni.saveImageToPhotosAlbum({
						filePath: this.imageData,
						success: function() {},
					});
				});
			},
		},
	};
</script>

<script module="renderScript" lang="renderjs">
	import html2canvas from 'html2canvas';
	import qrcode from './qrcode'
	export default {
		data() {
			return {
				qrUrl: "", // 生成二维码的链接
			}
		},
		mounted() {
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]

			this.qrUrl = currentPage.route
		},
		methods: {
			// 发送数据到逻辑层
			emitData(e, ownerVm) {

				const dom = document.getElementById('qrcodes')
				html2canvas(dom, {
					width: dom.clientWidth, //dom 原始宽度
					height: dom.clientHeight,
					scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
					scrollX: 0,
					dpi: 300,
					backgroundColor: "transparent",
					useCORS: true, //支持跨域，但好像没什么用‘
					allowTaint: true
				}).then((canvas) => {
					// 将生产的canvas转为base64图片3
					ownerVm.callMethod('receiveRenderData', canvas.toDataURL('image/png'))
				});


			}
		}
	};
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import '/uni_modules/colorui/main.css';
	@import '/uni_modules/colorui/icon.css';
	@import '@/uni_modules/mpb-ui/shop/app.scss';
	/* #endif */
	@import '@/uni_modules/mpb-ui/shop/goods.scss';
	@import './common.css';
	@import './index.rpx.css';

	page {
		background: #f0f0f0;
	}

	.titles {
		font-size: 23rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #8E8E8E;
	}

	.texts {
		margin-top: 13rpx;
		font-size: 27rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #101010;
	}

	.addGouwu {
		background: #FFBB4C !important;
		border-radius: 42rpx;
		padding: 18rpx 29rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.addgo {
		background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
		border-radius: 42rpx;
		padding: 18rpx 29rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.xiangqingH {
		position: relative;
		top: calc(0px - var(--status-bar-height) - 104rpx) !important;
	}

	.text-color-yellows {
		background-image: linear-gradient(90deg, #f3c81a 0%, #ffb629 100%) !important;
		border-radius: 22px !important;
	}

	.cu-avatar.lg {
		width: 136rpx;
		height: 136rpx;
	}

	.menu-avatar {
		height: 136rpx;
		margin-top: 19px;
	}

	.select-item {
		border: none !important;
	}

	.modal-content {
		.cu-btn {
			background: #f0f0f0;
			border-radius: 6px;
			border: none !important;
		}

		.selected {
			background: #ffebeb !important;
			border: 1px solid rgba(255, 58, 49, 1) !important;
			border-radius: 6px !important;
		}
	}

	.background-q {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		top: 0;
		z-index: 999;
		position: fixed;
		opacity: 0;
		outline: 0;
		pointer-events: none;

		&.show {
			opacity: 1;
		}
	}

	#qrcodes {
		width: 324px;
		height: 468px;
		background-color: #fff;
		position: relative;
		position: fixed;
		top: calc(50% - 206px);
		left: calc(50% - 162px);
		z-index: 99999;

		#img {
			width: 324px;
			height: 268px;
		}

		.text {
			width: 159px;
			position: absolute;
			left: 30px;
			top: 345px;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #101010;
			font-weight: 500;
		}

		.price {
			position: absolute;
			right: 19px;
			top: 345px;
			font-family: PingFangSC-Medium;
			font-size: 24px;
			color: #ff2f0f;
			font-weight: 500;
		}

		#qrcode {
			position: absolute;
			right: 20px;
			bottom: 9px;
		}

		.head {
			width: 40px;
			height: 40px;
			border-radius: 40px;
			overflow: hidden;
			position: absolute;
			left: 30px;
			bottom: 20px;

			img {
				width: 40px;
				height: 40px;
			}
		}

		.name {
			position: absolute;
			bottom: 30px;
			left: 75px;
			font-family: PingFangSC-Regular;
			font-size: 13px;
			color: #979797;
			font-weight: 400;
		}
	}

	.selected {
		color: #e54d42;
		background-color: #fadbd9;
	}

	/*
	.nav{
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 999;
		padding-top: calc(var(--status-bar-height) + 101rpx);
	}*/
	.goods-tab-box {
		position: fixed;
		width: 100%;
		padding: 2rpx 0;
		transition: all 0.25s;
		z-index: 999;
		background: #fff;

		/* #ifndef MP */
		top: calc(var(--status-bar-height) + 101rpx);
		/* #endif */

		/* #ifdef MP */
		top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */
	}

	.hide {
		display: none;
	}
</style>