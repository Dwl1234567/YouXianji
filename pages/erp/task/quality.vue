<template>
	<view>
		<bar-title bgColor="bg-white">
			<block slot="content">供应商列表</block>
			<block slot="right">
				<button class="cu-btn sm" @tap="snTap" v-if="roles.sorting_leader || roles.store_admin">
					<!-- <text class="cuIcon-add" /> -->
					{{admin ? '完成' : '管理'}}
				</button>
			</block>
		</bar-title>
		<filterDropdown
			ref="filterDropdown"
			:menuTop="filtertopnum"
			:filterData="shopownerFilterData"
			:defaultSelected="defaultSelected"
			:updateMenuName="true"
			@confirm="confirm"
			dataFormat="Object"
		></filterDropdown>
		<!--为上面的临时筛选条进行的临时兼容处理-->
		<view style="padding: 0px 20rpx">
			<!-- :class="admin ? 'transform' : 'transformRight'" -->
			<view v-for="(item, index) in dataList" style="display: flex; align-items: center; margin-bottom: 10px">
				<view :class="admin ? '' : 'transform'" style="margin-right: 28rpx">
					<view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view>
				</view>
				<view class="group_3 flex-col">
					<view class="text-wrapper_1 flex-row justify-between">
						<text class="text_6">单号:{{item.sortNo}}</text>
						<text class="text_7">时间:2{{item.createTimeStr}}</text>
					</view>
					<view class="section_1 flex-row">
						<view class=""></view>
						<image
							:src="$httpImage + item.modelPhoto"
							mode="aspectFit"
							class="cu-avatar lg radius box_5 flex-col"
						></image>
						<view class="text-wrapper_2 flex-col">
							<text class="text_8">{{item.modelName}}</text>
							<text class="text_9">{{item.label}}</text>
							<text class="text_10">序列号:{{item.deviceNo}}</text>
							<text class="text_11">回收价:{{item.recyclePrice}}元</text>
						</view>
						<view class="tag_1 flex-col" v-if="item.sortStatus == 0">
							<text class="text_12">待送拣</text>
						</view>
						<view class="tag_33 flex-col" v-if="item.sortStatus == 1 && roles.sorting_leader">
							<text class="text_33">待分配</text>
						</view>
						<view class="tag_33 flex-col" v-if="(item.sortStatus == 2 || item.sortStatus == 1) && roles.store_admin">
							<text class="text_33">已送检</text>
						</view>
						<view class="tag_33 flex-col" v-if="item.sortStatus == 2 && (roles.sorting_people || roles.sorting_leader)">
							<text class="text_33">待分拣</text>
						</view>
						<view class="tag_33 flex-col" v-if="item.sortStatus == 2 && roles.sorting_leader && !roles.sorting_people">
							<text class="text_33">已分配</text>
						</view>

						<view class="tag_1 flex-col" v-if="item.sortStatus == 3 && roles.store_admin">
							<text class="text_12">待取回</text>
						</view>
						<view class="tag_1 flex-col" v-if="item.sortStatus == 3 && (roles.sorting_people || roles.sorting_leader)">
							<text class="text_12">已寄出</text>
						</view>
						<view class="tag_1 flex-col" v-if="item.sortStatus == 4 && roles.store_admin">
							<text class="text_12">已取回</text>
						</view>
						<view class="tag_1 flex-col" v-if="item.sortStatus == 4 && (roles.sorting_people || roles.sorting_leader)">
							<text class="text_12">已送达</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 5 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">待抛售</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 6 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">抛售中</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 7 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">已抛售</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 8 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">待维修</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 9 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">维修中</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 10 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">维修完成</text>
						</view>
						<view
							class="tag_1 flex-col"
							v-if="item.sortStatus == 11 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)"
						>
							<text class="text_12">维修失败</text>
						</view>
					</view>
					<text class="text_13">回收人：{{item.recyclePeopleName}}</text>
					<view class="button">
						<view
							class="receipt"
							v-if="item.sortStatus == 2 && roles.sorting_people && item.updateStatus == 1"
							@tap="goBack(item)"
						>
							返回门店
						</view>
						<view
							class="receipt"
							v-if="item.sortStatus == 2 && roles.sorting_people && item.updateStatus == 0"
							@tap="goDiandian(item)"
						>
							待修改
						</view>
						<view class="checkLogistics" v-if="item.sortStatus == 1">查看物流</view>
						<view
							class="receipt"
							@tap="receiveInspectDevices(item.sortId)"
							v-if="item.status === '0' && item.sortStatus == 1 && roles.sorting_leader"
						>
							确认收货
						</view>
						<view
							class="receipt"
							@tap="getstoreAdminConfirm(item.sortId)"
							v-if="roles.store_admin && item.sortStatus == 3"
						>
							确认收货
						</view>
						<view class="checkLogistics" v-if="(roles.sorting_people || roles.sorting_leader) && item.sortStatus == 3">
							物流信息
						</view>
						<view
							class="checkLogistics"
							v-if="(roles.sorting_people || roles.sorting_leader || roles.store_admin) && item.sortStatus == 4"
						>
							物流信息
						</view>
						<view class="receipt" v-if="roles.store_admin && item.sortStatus == 4">已收货</view>
						<view class="receipt" v-if="item.status === '1' && item.sortStatus == 1">已收货</view>
						<view
							class="checkLogistics"
							@tap="falseshowSell(item)"
							v-if="roles.store_admin && item.sortStatus == 5 && item.undersellApprove.status == 0"
						>
							拒绝
						</view>
						<view
							class="receipt"
							@tap="goshowSell(item)"
							v-if="roles.store_admin && item.sortStatus == 5 && item.undersellApprove.status == 0"
						>
							接受
						</view>
						<view class="receipt" v-if="roles.store_admin && item.sortStatus == 6">已接受</view>
						<view
							class="checkLogistics"
							@tap="showImg2(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && (item.sortStatus == 6 || item.sortStatus == 7) && !item.undersellApprove.collectionVoucher"
						>
							上传收款凭证
						</view>
						<view
							class="receipt"
							@tap="showImg1(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && (item.sortStatus == 6 || item.sortStatus == 7) && !item.undersellApprove.undersellVoucher"
						>
							上传抛售凭证
						</view>
						<view
							class="receipt"
							@tap="seeImg1(item)"
							v-if="(roles.sorting_people || roles.sorting_leader || roles.store_admin) && (item.sortStatus == 6 || item.sortStatus == 7) && item.undersellApprove.undersellVoucher"
						>
							查看抛售凭证
						</view>
						<view
							class="receipt"
							@tap="seeImg2(item)"
							v-if="(roles.sorting_people || roles.sorting_leader || roles.store_admin) && (item.sortStatus == 6 || item.sortStatus == 7) && item.undersellApprove.collectionVoucher"
						>
							查看收款凭证
						</view>
						<view
							class="checkLogistics"
							v-if="roles.store_admin && item.sortStatus == 5 && item.undersellApprove.status == 2"
						>
							已拒绝
						</view>
						<view
							class="checkLogistics"
							@tap="goBack(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && item.sortStatus == 5 && item.undersellApprove.status == 2"
						>
							返回门店
						</view>
						<view
							class="checkLogistics"
							@tap="falseshowMain(item)"
							v-if="roles.store_admin && item.sortStatus == 8 && item.maintainApprove.status == 0"
						>
							拒绝
						</view>
						<view
							class="receipt"
							@tap="goshowMain(item)"
							v-if="roles.store_admin && item.sortStatus == 8 && item.maintainApprove.status == 0"
						>
							接受
						</view>
						<view class="receipt" v-if="roles.store_admin && item.sortStatus == 9">已接受</view>
						<view
							class="receipt"
							@tap="empMaintainFail(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && (item.sortStatus == 9) && !item.maintainApprove.maintainVoucher"
						>
							维修失败
						</view>
						<view
							class="receipt"
							@tap="showMainImg1(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && (item.sortStatus == 9) && !item.maintainApprove.maintainVoucher"
						>
							上传维修凭证
						</view>
						<view
							class="checkLogistics"
							@tap="storeAdminSelectHandleType(item, '0')"
							v-if="(roles.store_admin) && (item.sortStatus == 10 || item.sortStatus == 11) && item.maintainApprove.status == 1 && item.maintainApprove.handleType == null"
						>
							抛售
						</view>
						<view
							class="receipt"
							@tap="seeImg3(item)"
							v-if="(roles.sorting_people || roles.sorting_leader || roles.store_admin) && (item.sortStatus == 10) && item.maintainApprove.maintainVoucher"
						>
							查看维修凭证
						</view>
						<view
							class="checkLogistics"
							@tap="storeAdminSelectHandleType(item, '1')"
							v-if="(roles.store_admin) && (item.sortStatus == 10 || item.sortStatus == 11) && item.maintainApprove.status == 1 && item.maintainApprove.handleType == null"
						>
							返回门店
						</view>
						<view
							class="checkLogistics"
							@tap="goDiandian(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && (item.sortStatus == 10 || item.sortStatus == 11) && item.maintainApprove.handleType == 0"
						>
							抛售
						</view>
						<view
							class="checkLogistics"
							@tap="goBack(item)"
							v-if="(roles.sorting_people || roles.sorting_leader) && (item.sortStatus == 10 || item.sortStatus == 11) && item.maintainApprove.handleType == 1"
						>
							返回门店
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomView" :class="admin ? '' : 'transform'">
			<view>
				<u-checkbox-group style="align-items: center" @change="allCheck">
					<u-checkbox v-model="checked" active-color="red" shape="circle" style="width: 38rpx; height: 38rpx">
						光影
					</u-checkbox>
					全选
				</u-checkbox-group>
			</view>
			<view class="goXiu" @tap="goXiu" v-if="roles.store_admin">送检</view>
			<view class="goXiu" @tap="task" v-if="roles.sorting_leader">任务分配</view>
		</view>
		<!--弹窗-->
		<!-- 维修弹框 -->
		<u-modal
			:show="showMain"
			@cancel="showMain = false"
			@confirm="confirmFucs"
			title="确定维修？"
			:showCancelButton="true"
		></u-modal>
		<!-- 抛售弹框 -->
		<u-modal
			:show="showSell"
			@cancel="showSell = false"
			@confirm="confirmFuc"
			title="确定抛售？"
			:showCancelButton="true"
		></u-modal>
		<!-- 上传维修凭证 -->
		<u-popup :show="yunShowImgMain" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">上传维修凭证</view>
				<view class="yunShow-img">
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						multiple
						:maxCount="3"
					></u-upload>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="empUploadMaintainVoucher">确定</view>
			</view>
		</u-popup>
		<!-- 上传抛售凭证 -->
		<u-popup :show="yunShowImg1" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">上传销售凭证</view>
				<view class="yunShow-img">
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						multiple
						:maxCount="3"
					></u-upload>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="empUploadUndersellVoucher">确定</view>
			</view>
		</u-popup>
		<!-- 上传收款凭证 -->
		<u-popup :show="yunShowImg2" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">上传收款凭证</view>
				<view class="yunShow-img">
					<u-upload
						:fileList="fileList2"
						@afterRead="afterRead"
						@delete="deletePic"
						name="2"
						multiple
						:maxCount="3"
					></u-upload>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="empUploadUndersellVoucher">确定</view>
			</view>
		</u-popup>
		<u-popup :show="backShow" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">送拣信息填写</view>
				<view class="yunShow-item">
					<view class="left">门店名称</view>
					<view class="input">
						<u--input placeholder="请输入内容" :border="'surround'" v-model="sortName"></u--input>
					</view>
				</view>
				<view class="yunShow-item">
					<view class="left">快递公司</view>
					<view class="input">
						<u--input placeholder="请输入内容" :border="'surround'" v-model="logisticsCompany"></u--input>
					</view>
				</view>
				<view class="yunShow-item">
					<view class="left">快递单号</view>
					<view class="input">
						<u--input placeholder="请输入内容" :border="'surround'" v-model="logisticsNo"></u--input>
					</view>
				</view>
				<view class="yunShow-item">
					<view class="left">收件地址</view>
					<view class="inputAddress">
						{{address}}
						<view class="copy" @tap="copy">一键复制</view>
					</view>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="addempReturnStore">确定</view>
			</view>
		</u-popup>
		<u-popup :show="yunShow" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">送拣信息填写</view>
				<view class="yunShow-item">
					<view class="left">运营中心</view>
					<view class="select">
						<uni-data-select v-model="centerId" :localdata="range" @change="change"></uni-data-select>
					</view>
				</view>
				<view class="yunShow-item">
					<view class="left">快递公司</view>
					<view class="input">
						<u--input placeholder="请输入内容" :border="'surround'" v-model="logisticsCompany"></u--input>
					</view>
				</view>
				<view class="yunShow-item">
					<view class="left">快递单号</view>
					<view class="input">
						<u--input placeholder="请输入内容" :border="'surround'" v-model="logisticsNo"></u--input>
					</view>
				</view>
				<view class="yunShow-item" v-if="address">
					<view class="left">收件地址</view>
					<view class="inputAddress">
						{{address}}
						<view class="copy" @tap="copy">一键复制</view>
					</view>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="addInspectDevices">确定</view>
			</view>
		</u-popup>
		<u-popup :show="taskShow" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">分拣信息</view>
				<view class="yunShow-item">
					<view class="left">分拣人员</view>
					<view class="select">
						<uni-data-select v-model="centerId" :localdata="range" @change="changePeople"></uni-data-select>
					</view>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="distributionSortingTask">确定</view>
			</view>
		</u-popup>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		sortingList,
		getOperatingCenter,
		addInspectDevice,
		receiveInspectDevice,
		getSortingPeoples,
		distributionSortingTask,
		empGetStoreInfo,
		empReturnStore,
		storeAdminConfirm,
		storeAdminUndersellApprove,
		empUploadUndersellVoucher,
		storeAdminMaintainApprove,
		empUploadMaintainVoucher,
		storeAdminSelectHandleType,
		empMaintainFail,
	} from '@/api/erp.js';
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	export default {
		components: {
			barTitle,
			filterDropdown,
		},
		data() {
			return {
				yunShowImgMain: false,
				fileList2: [],
				fileList1: [],
				// 抛售id
				undersellId: 0,
				showMain: false,
				showSell: false,
				storeId: 0,
				maintainId: 0,
				sortId: 0,
				sortName: '',
				sortingPeople: 0,
				address: '',
				// 运营中心id
				centerId: 0,
				// 物流公司
				logisticsCompany: '',
				// 物流单号
				logisticsNo: '',
				range: [
					{ value: 0, text: '篮球' },
					{ value: 1, text: '足球' },
					{ value: 2, text: '游泳' },
				],
				values: '',
				// 运营中心弹框
				yunShowImg2: false,
				yunShowImg1: false,
				taskShow: false,
				backShow: false,
				yunShow: false,
				checked: false,
				// 控制管理
				admin: false,
				filerData: [],
				filtertopnum: '83', //筛选条高度
				defaultSelected: [],
				// 店长可视页面
				shopownerFilterData: [
					{
						name: '是否直售',
						type: 'hierarchy',
						submenu: [
							{
								name: '全部', //全部设为默认，选中时标签栏显示为全部
								value: '0,1,2,3',
							},
							{
								name: '待送检',
								value: '0',
							},
							{
								name: '已送检',
								value: '1,2',
							},
							{
								name: '代取回',
								value: '3',
							},
							{
								name: '已取回',
								value: '4',
							},
						],
					},
					{
						name: '抛售状态',
						type: 'hierarchy',
						submenu: [
							{
								name: '全部',
								value: '5,6,7',
							},
							{
								name: '待抛售',
								value: '5',
							},
							{
								name: '抛售中',
								value: '6',
							},
							{
								name: '已抛售',
								value: '7',
							},
						],
					},
					{
						name: '维修状态', //选择
						type: 'hierarchy',
						submenu: [
							{
								name: '全部', //设为默认
								value: '8,9',
							},
							{
								name: '待维修',
								value: '8',
							},
							{
								name: '维修中',
								value: '9',
							},
						],
					},
				],
				modalName: null,
				// modalName: 'TongyongModal1',
				type: 1,
				title: '分拣处理',
				tab_scroll: 0,
				tab_cur: 0,
				nav_list: [
					{
						name: '物品信息',
						child: [],
					},
					{
						name: '成色情况',
						child: [],
					},
					{
						name: '功能情况',
						child: [],
					},
				],
				radiolist1: [
					{
						name: '待抛售',
						value: '1',
					},
					{
						name: '抛售中',
						value: '2',
					},
					{
						name: '已抛售',
						value: '3',
					},
				],
				radiovalue1: '',
				radiovalue2: '',
				radiolist2: [
					{
						name: '待送修',
						value: '1',
					},
					{
						name: '已送修',
						value: '2',
					},
					{
						name: '已取回',
						value: '3',
					},
				],
				checktitle: '',
				checkgoodsid: '',
				remark: '', //维修备注
				CostMoney: '',
				iszs: false,
				isps: true,
				iswx: false,
				switchstatus: false,
				retrieveList: [],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				dataList: [],
				thirdInfo: '',
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				newnav_list: [],
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
				roles: [],
			};
		},
		onLoad(options) {
			console.log(this.$u.config.v);
			// #ifdef APP-PLUS
			// this.filtertopnum = 183;
			let a = 0;
			uni.getSystemInfo({
				success(e) {
					// console.log(e.statusBarHeight + 83 + 101, '44444');
					a = e.statusBarHeight + 140;
				},
			});
			this.filtertopnum = a;
			// #endif
			// 进入页面刷新
			// console.log(Vue.prototype.$store.state.roles, '2222222222');
			this.roles = Vue.prototype.$store.state.roles;
			if (uni.getStorageSync('userinfo').storeId) {
				this.getOperatingCenter();
			}
			if (this.roles.sorting_leader) {
				this.getSortingPeoples();
			}
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return;
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true;
			this.getDataList();
		},
		onShow() {
			let that = this;
			uni.$once('updatethird', function (data) {
				that.thirdInfo = data;
			});
		},
		methods: {
			// 维修失败
			empMaintainFail(e) {
				let promise = {
					maintainId: e.maintainApprove.maintainId,
					sortId: e.sortId,
				};
				empMaintainFail(promise).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '提交成功',
						});
						this.getDataList();
					}
				});
			},
			// 维修完成店长返回门店
			storeAdminSelectHandleType(e, index) {
				let promise = {
					maintainId: e.maintainApprove.maintainId,
					handleType: index,
				};
				console.log(promise);
				storeAdminSelectHandleType(promise).then((res) => {
					if (res.code === 200) {
						this.getDataList();
						if (index == 1) {
							uni.showToast({
								icon: 'none',
								title: '确认返回门店',
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '确认抛售',
							});
						}
					}
				});
			},
			// 上传凭证
			empUploadMaintainVoucher() {
				const img = this.fileList1.map((item) => {
					return item.url;
				});
				let promise = {
					sortId: this.sortId,
					maintainId: this.maintainId,
					maintainVoucher: img.join(','),
				};
				console.log(promise);
				empUploadMaintainVoucher(promise).then((res) => {
					if (res.code === 200) {
						this.close();
						this.getDataList();
						uni.showToast({
							icon: 'none',
							title: '上传成功',
						});
					}
				});
			},
			// 拒绝维修申请
			falseshowMain(e) {
				let promise = {
					sortId: e.sortId,
					maintainId: e.undersellApprove.maintainId,
					status: '2',
				};
				storeAdminMaintainApprove(promise).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '已拒绝',
						});
						this.getDataList();
					}
				});
			},
			// 确定维修
			confirmFucs() {
				let promise = {
					sortId: this.sortId,
					maintainId: this.maintainId,
					status: '1',
				};
				storeAdminMaintainApprove(promise).then((res) => {
					if (res.code === 200) {
						this.showMain = false;
						this.getDataList();
					}
				});
			},
			// 同意维修
			goshowMain(e) {
				this.showMain = true;
				this.maintainId = e.maintainApprove.maintainId;
				this.sortId = e.sortId;
			},
			// 查看维修凭证
			seeImg3(e) {
				let urll = e.maintainApprove.maintainVoucher.split(',');
				let a = urll.map((item) => {
					console.log(this.$httpImage + item);
					return this.$httpImage + item;
				});
				console.log(a);
				uni.previewImage({
					current: 0,
					urls: a,
				});
			},
			// 查看收款凭证
			seeImg2(e) {
				let urll = e.undersellApprove.undersellVoucher.split(',');
				let a = urll.map((item) => {
					console.log(this.$httpImage + item);
					return this.$httpImage + item;
				});
				console.log(a);
				uni.previewImage({
					current: 0,
					urls: a,
				});
			},
			// 查看抛售凭证
			seeImg1(e) {
				let urll = e.undersellApprove.undersellVoucher.split(',');
				let a = urll.map((item) => {
					console.log(this.$httpImage + item);
					return this.$httpImage + item;
				});
				console.log(a);
				uni.previewImage({
					current: 0,
					urls: a,
				});
			},
			// 上传凭证
			empUploadUndersellVoucher() {
				const img = this.fileList1.map((item) => {
					return item.url;
				});
				const img2 = this.fileList2.map((item) => {
					return item.url;
				});
				let promise = {
					sortId: this.sortId,
					undersellId: this.undersellId,
					undersellVoucher: img.join(','),
					collectionVoucher: img2.join(','),
				};
				empUploadUndersellVoucher(promise).then((res) => {
					if (res.code === 200) {
						this.close();
						this.getDataList();
						uni.showToast({
							icon: 'none',
							title: '上传成功',
						});
					}
				});
			},
			// 点击上收维修凭证
			showMainImg1(e) {
				this.maintainId = e.maintainApprove.maintainId;
				this.sortId = e.sortId;
				this.yunShowImgMain = true;
			},
			// 点击上收款售凭证
			showImg2(e) {
				this.undersellId = e.undersellApprove.undersellId;
				this.sortId = e.sortId;
				this.yunShowImg2 = true;
			},
			// 点击上传销售凭证
			showImg1(e) {
				this.undersellId = e.undersellApprove.undersellId;
				this.sortId = e.sortId;
				this.yunShowImg1 = true;
			},
			// 拒绝抛售申请
			falseshowSell(e) {
				let promise = {
					sortId: e.sortId,
					undersellId: e.undersellApprove.undersellId,
					status: '2',
				};
				storeAdminUndersellApprove(promise).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '已拒绝',
						});
						this.getDataList();
					}
				});
			},
			// 确定抛售
			confirmFuc() {
				let promise = {
					sortId: this.sortId,
					undersellId: this.undersellId,
					status: '1',
				};
				storeAdminUndersellApprove(promise).then((res) => {
					if (res.code === 200) {
						this.showSell = false;
						this.getDataList();
					}
				});
			},
			// 同意抛售
			goshowSell(e) {
				this.showSell = true;
				this.undersellId = e.undersellApprove.undersellId;
				this.sortId = e.sortId;
			},
			// 店长确认收货
			getstoreAdminConfirm(id) {
				storeAdminConfirm(id).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '收货成功',
						});
						this.getDataList();
					}
				});
			},
			// 返回门店
			addempReturnStore() {
				let promise = {
					sortId: this.sortId,
					storeId: this.storeId,
					centerId: this.centerId,
					logisticsCompany: this.logisticsCompany,
					logisticsNo: this.logisticsNo,
				};
				empReturnStore(promise).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '操作成功',
						});
						this.close();
						this.getDataList();
					}
				});
			},
			// 获取门店地址
			getEmpGetStoreInfo(storeId) {
				empGetStoreInfo(storeId).then((res) => {
					this.sortName = res.data.storeName;
					this.address = res.data.location;
				});
			},
			// 点击返回门店
			goBack(item) {
				this.centerId = item.centerId;
				this.sortId = item.sortId;
				this.storeId = item.storeId;
				this.backShow = true;
				this.getEmpGetStoreInfo(item.storeId);
			},
			// 分拣员点点上传修改
			goDiandian(item) {
				uni.navigateTo({
					url: '/pages/erp/task/diandianUnpload?modelId=' + item.modelId + '&sortId=' + item.sortId,
				});
			},
			//分配分拣员
			distributionSortingTask() {
				let sortIdList = [];
				this.dataList.map((item) => {
					if (item.disabled) {
						sortIdList.push(item.sortId);
					}
				});
				let promise = {
					sortingPeople: this.sortingPeople,
					sortIdList,
				};
				distributionSortingTask(promise).then((res) => {
					if (res.code === 200) {
						this.taskShow = false;
						this.getDataList();
						this.admin = false;
					}
				});
			},
			// 选择分拣员
			changePeople(e) {
				this.sortingPeople = e;
			},
			// 获取分拣员列表
			getSortingPeoples() {
				getSortingPeoples().then((res) => {
					let data = res.data.map((item) => {
						item.text = item.nickName;
						item.value = item.userId;
						return item;
					});
					this.range = data;
				});
			},
			// 送检确认收获
			receiveInspectDevices(sortId) {
				receiveInspectDevice(sortId).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '收货成功',
						});
						this.getDataList();
					} else {
						uni.showToast({
							icon: 'none',
							title: '收货失败',
						});
					}
				});
			},
			// 点击任务分配
			task() {
				this.taskShow = true;
			},
			// 提交运营中心
			addInspectDevices() {
				let sortIdList = [];
				this.dataList.map((item) => {
					if (item.disabled) {
						sortIdList.push(item.sortId);
					}
				});
				let promise = {
					centerId: this.centerId,
					logisticsCompany: this.logisticsCompany,
					logisticsNo: this.logisticsNo,
					sortIdList,
				};
				addInspectDevice(promise).then((res) => {
					if (res.code === 200) {
						this.yunShow = false;
						this.getDataList();
						this.admin();
					}
				});
			},
			// 复制运营中心地址
			copy() {
				console.log(this.address);
				uni.setClipboardData({
					data: this.address,
					success: () =>
						uni.showToast({
							title: '链接已复制',
						}),
				});
			},
			// 运营中心选择change
			change(e) {
				this.centerId = e;
				this.range.map((item) => {
					if (item.value === e) {
						this.address = item.address;
					}
				});
			},
			// 获取运营中心select
			getOperatingCenter() {
				getOperatingCenter(uni.getStorageSync('userinfo').storeId).then((res) => {
					let data = res.data.map((item) => {
						item.text = item.operatingCenterName;
						item.value = item.operatingCenterId;
						return item;
					});
					this.range = data;
				});
			},
			// 关闭送检弹框
			close() {
				this.showMain = false;
				this.yunShowImg2 = false;
				this.yunShowImg1 = false;
				this.backShow = false;
				this.yunShow = false;
				this.taskShow = false;
				this.yunShowImgMain = false;
			},
			// 送检
			goXiu() {
				this.yunShow = true;
			},
			// 全选
			allCheck() {
				this.checked = !this.checked;
				if (this.checked) {
					this.dataList.map((item) => {
						return (item.disabled = true);
					});
				} else {
					this.dataList.map((item) => {
						return (item.disabled = false);
					});
				}
			},
			// 点击多选按钮
			radioChange(e) {
				this.dataList[e].disabled = !this.dataList[e].disabled;
			},
			// 点击管理
			snTap() {
				this.admin = !this.admin;
			},
			// 切换选择框
			confirm(e) {
				let data = [];
				e.value.map((item) => {
					if (item[0]) {
						item[0].split(',').map((spItem) => {
							data.push(spItem);
						});
					}
				});
				this.filerData = data;
				this.getDataList();
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			groupChange2(n) {
				console.log('groupChange', n);
			},
			hsfTap() {
				uni.navigateTo({
					url: '/pages/erp/third/list',
				});
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				const storeId = uni.getStorageSync('userinfo').storeId;
				paramsData.storeId = storeId;
				paramsData.sortingStatusList = that.filerData;
				sortingList(paramsData)
					.then((res) => {
						let data = res.rows;
						data.map((item) => {
							return (item.disabled = false);
						});
						console.log(data);
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data);
							} else {
								that.dataList = data;
							}
							that.ifBottomRefresh = false;
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more';
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					});
			},
			tongyongTap(info, e) {
				this.nav_list[0].child = info.attr.base_json;
				this.nav_list[1].child = info.attr.colour_json;
				this.nav_list[2].child = info.attr.function_json;
				this.checktitle = info.title;
				this.checkgoodsid = info.recycle_goods_id;

				this.modalName = e;
			},
			tongyongHideModal(e) {
				this.modalName = null;
			},
			tongyongAction(id) {
				console.log(id);
				let paramsData = {
					type: id,
					goods_id: this.checkgoodsid,
					zs_status: this.iszs ? '1' : '0',
					is_ps: this.isps ? '1' : '0',
					ps_status: this.radiovalue1,
					is_wx: this.iswx ? '1' : '0',
					wx_status: this.radiovalue2,
				};
				if (this.isps) {
					if (!this.radiovalue1) {
						return this.$u.toast('请选择抛售状态！');
					}
					if (!this.thirdInfo.id) {
						return this.$u.toast('请选择回收方！');
					}
				}
				if (this.iswx) {
					if (!this.radiovalue2) {
						return this.$u.toast('请选择维修状态！');
					}
					if (!this.CostMoney) {
						return this.$u.toast('请输入维修成本金额');
					}
					paramsData.third_id = this.thirdInfo.id;
					paramsData.costmoney = this.CostMoney;
					paramsData.remarks = this.remark;
				}
				let checkvalue = [];
				this.nav_list.map((item, index) => {
					item.child.map((item1, index1) => {
						item1.child.map((item2, index2) => {
							if (item2.click) {
								checkvalue.push(item2);
							}
						});
					});
				});
				paramsData.cart_info = JSON.stringify(checkvalue);
				if (id == 1) {
					paramsData.actiontype = 1;
				}
				if (id == 2) {
					paramsData.actiontype = 2;
				}
				console.log(paramsData);
				// return;
				erppurchasequalityedit(paramsData).then((res) => {
					this.$u.toast('提交成功！');
					this.$nextTick(() => {
						uni.startPullDownRefresh();
					});
				});
				this.modalName = null;
			},
			SwitchA(e) {
				this.iszs = e.detail.value;
				if (this.iszs == 1) {
					this.isps = 0;
				}
				console.log(this.iszs);
			},
			SwitchB(e) {
				this.isps = e.detail.value;
				if (this.isps == 1) {
					this.iszs = 0;
				}
			},
			SwitchC(e) {
				this.iswx = e.detail.value;
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				console.log(this.tab_cur);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
				});
			},
			itemclick(pindex, findex, mindex) {
				this.nav_list[pindex].child[findex].child.map((item, index) => {
					item.click = false;
				});
				this.nav_list[pindex].child[findex].child[mindex].click = true;
				this.newnav_list = this.nav_list;
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			// 新增图片
			async afterRead(event) {
				console.log(123);
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				console.log(this[`fileList${event.name}`]);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中',
					});
				});
				for (let i = 0; i < lists.length; i++) {
					console.log(lists[i].url);
					const result = await this.uploadFilePromise(lists[i].url);
					console.log(result);
					let item = this[`fileList${event.name}`][fileListLen];
					this[`fileList${event.name}`].splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: 'success',
							message: '',
							url: result,
						})
					);
					fileListLen++;
				}
			},
			uploadFilePromise(urls) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://192.168.2.36:8080/common/upload', // 仅为示例，非真实的接口地址
						filePath: urls,
						name: 'file',
						header: {
							Authorization: Vue.prototype.$store.state.token,
						},
						success: (res) => {
							setTimeout(() => {
								const data = JSON.parse(res.data);
								resolve(data.fileName);
							}, 1000);
						},
					});
				});
			},
		},
	};
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import '/uni_modules/colorui/main.css';
	@import '/uni_modules/colorui/icon.css';
	@import '@/uni_modules/mpb-ui/shop/app.scss';
	/* #endif */
	@import '@/static/common.css';
	page {
		background: #f0f0f0;
		padding-top: 100rpx;
		// padding: 100rpx 21rpx 0rpx 21rpx;
	}
	.button {
		display: flex;
		justify-content: flex-end;
		view {
			min-width: 143rpx;
			height: 55rpx;
			border-radius: 29rpx;
			border: 1px solid #979797;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #101010;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.receipt {
			background: linear-gradient(90deg, #ff6868 0%, #ea1515 100%);
			margin-left: 26rpx;
			color: #ffffff !important;
			border: none;
		}
	}
	.bottomView {
		position: fixed;
		bottom: 0px;
		width: 750rpx;
		height: 191rpx;
		background: #ffffff;
		padding: 29rpx 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.transform {
		// transform: translateX(100rpx);
		display: none;
	}
	.yunShow-top {
		padding: 26rpx 28rpx 28rpx 28rpx;
		.yunShow-title {
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #232323;
			text-align: center;
		}
	}
	.yunShow-item {
		display: flex;
		align-items: center;
		margin-top: 22rpx;
		.left {
			font-size: 31rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232323;
		}
		.select {
			flex: 1;
			margin-left: 11.45rpx;
		}
		.input {
			margin-left: 11.45rpx;
			border: 1px solid #e2e2e2;
			border-radius: 11rpx;
		}
		.inputAddress {
			margin-left: 11.45rpx;
			border: 1px solid #e2e2e2;
			border-radius: 11rpx;
			flex: 1;
			padding: 9rpx 11rpx;
			.copy {
				width: 141rpx;
				height: 53rpx;
				background: #ff1a1a;
				border-radius: 27rpx;
				font-size: 27rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 53rpx;
				text-align: center;
				margin-top: 17rpx;
			}
		}
	}
	.yunShow-bottom {
		display: flex;
		view {
			width: 267rpx;
			height: 99rpx;
			line-height: 99rpx;
			flex: 1;
			text-align: center;
			border: 1px solid #d8d8d8;
			font-size: 38rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232323;
		}
	}
	.goXiu {
		width: 313rpx;
		height: 82rpx;
		background: #ff1a1a;
		border-radius: 42rpx;
		text-align: center;
		line-height: 82rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}
	.transformRight {
		transform: translateX(-100rpx);
	}
	.radio {
		width: 38rpx;
		height: 38rpx;
		border-radius: 38rpx;
		border: 2rpx solid #cecece;
	}
	.radio-red {
		background-color: #ff3a31;
	}
	.tips {
		justify-content: space-between;
		display: flex;

		text {
			text-align: justify;
		}
	}

	.cu-card.article > .cu-item {
		.title {
			padding: 0 0 10rpx 0;
		}
		.content {
			uni-image {
				width: 5.4em;
				height: 5.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.process-box {
		width: 100%;
		padding: 0 20rpx;

		// height: 300rpx;
		.scroll-Y {
			height: auto;
			max-height: 700rpx;
		}
	}

	.hight-view {
		/* #ifndef APP-PLUS */
		height: 280rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 320rpx;
		/* #endif */
	}

	.recy-item {
		width: 100%;
		position: relative;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #eeeeee;

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
				color: #ffffff !important;
				background-color: #f03 !important;
			}

			.item {
				position: relative;
				display: inline-block;
				background-color: #eeeeee;
				color: #333333;
				width: auto;
				text-align: center;
				font-size: 24rpx;
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

	.cu-modal {
		z-index: 999;
	}
	.cu-form-group {
		min-height: 45px;
	}
	.group_3 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		padding: 14px 11px 22px 9px;
		width: 95vw;
	}

	.text-wrapper_1 {
		width: 348px;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.section_1 {
		position: relative;
		margin: 9px 11px 0 0;
	}

	.box_5 {
		border-radius: 6px;
		// background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/4240095d9d5a4c4b9180ad3ce22071cd_mergeImage.png);
		width: 79px;
		height: 79px;
		margin-top: 5px;
	}

	.text-wrapper_2 {
		margin: 5px 0 0 8px;
	}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 15px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 15px;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 67px 0 0;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 31px 0 0;
	}

	.text_11 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 9px 29px 0 0;
	}

	.tag_1 {
		background-color: rgba(235, 246, 255, 1);
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}
	.tag_33 {
		background-color: #e5fcf1;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}
	.text_33 {
		overflow-wrap: break-word;
		color: #00c082;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}
	.text_12 {
		overflow-wrap: break-word;
		color: rgba(17, 144, 214, 1);
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 14px;
		margin: 20px 250px 0 0;
	}
</style>
