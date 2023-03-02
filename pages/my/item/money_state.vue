<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">提现状态</block>
		</bar-title>
		<view class="success">
			<view class="s_tit">
				提现申请成功<span>完成</span>
			</view>
			<view class="BH10"></view>
			<view class="chengg">
				<img :src="require('@/static/item/12.png')" />
				<view class="cg">提现申请成功</view>
				<view class="cg_q">¥ {{list.money}}</view>
			</view>
			<view class="txfs">
				<view class="txfs_l">提现方式</view>
				<view class="txfs_r"><img :src="require('@/static/item/yin'+list.card.type+'.png')" v-if="list.card.type!=0" />{{name}}（{{card_num}}）</view>
			</view>
			<view class="txzt">提现状态</view>
			<view class="uni-steps">
				<view class="uni-steps-items uni-steps-column">
					<view class="uni-steps-item uni-steps-finish">
						<view class="uni-steps-item-title-container">
							<view class="uni-steps-item-title">提现申请中，等待处理</view>
							<view class="uni-steps-item-desc">2022-07-24 10:29:16</view>
						</view>
						<view class="uni-steps-item-circle-container">
							<view class="uni-steps-item-circle" style="{backgroundColor:'#E1461D'}"></view>
						</view>
						<view class="uni-steps-item-line" style="{backgroundColor:'#E1461D'}"></view>
					</view>
					<view class="uni-steps-item uni-steps-process">
						<view class="uni-steps-item-title-container" style="color: rgb(225, 70, 29);">
							<view class="uni-steps-item-title">已完成</view>
							</view>
							<view class="uni-steps-item-circle-container"></view>
						</view>
				</view>
			</view>
			<view class="dzsj">
				<view class="dzsj_01">到账时间</view>
				<view class="dzsj_02">
					1、银行卡方式体现工作日15:00之前提现，2小时到账，15:00之后体现次日到账。<br/>
					2、节假日提现顺延。
				</view>
			</view>
			<view class="btn" @click="jump()">确认</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				id:'',
				list:'',
				name:'',
				num:'',
				card_num:'',
				buzhou:'',
				step:0,
				one:[{title:'提现申请中，等待处理',desc:'create_time'}],
				two:[
					{title:'提现申请中，等待处理',desc:'create_time'},
					{title:'已完成'},
				]
			}
		},
		onLoad(options) { 
			this.id=options.id
			this._load()
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			_load(){
				this.list={"id":4,"shop_id":9,"shop_user_id":7,"card_id":4,"card_num":"4444444","money":"1.00","money_befor":"0.00","status":1,"ip":"222.87.187.218","pay_aid":1,"pay_date":1571884377,"create_time":"2019-10-24 10:29:16","card":{"id":4,"shop_id":9,"bank_name":"建设银行","bank_num":"4444444","username":"444","type":4,"create_time":"2019-10-23 09:17:49"}}
					const card_num=this.list.card.bank_num
					this.card_num=card_num.substr(card_num.length-4)
					if(this.list.status==0){
						this.one[0].desc=this.list.create_time
						this.buzhou=this.one
					}
					if(this.list.status==1){
						this.two[0].desc=this.list.create_time
						this.buzhou=this.two
						this.step=1
					}
					if(this.list.card.type==0){
						this.name=this.list.card.bank_name;
					}
					if(this.list.card.type==1){
						this.name="人民银行";
					}
					if(this.list.card.type==2){
						this.name="农业银行";
					}
					if(this.list.card.type==3){
						this.name="工商银行";
					}
					if(this.list.card.type==4){
						this.name="建设银行";
					}
					
			},
			jump(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		
	}
</script>

<style lang="scss">
	.success{
		.s_tit{text-align: center;padding: 10px;font-size: 16px;position: relative;}
		.s_tit span{position: absolute;right: 20px;top: 10px;color: #F66444;font-size: 14px;}
		.BH10{height: 8px;background-color: #F2F2F2;}
		.chengg{padding: 15px;text-align: center;border-bottom: 1px solid #FBFBFB;}
		.chengg img{width: 65px;height: 65px;}
		.cg{padding: 5px 0 15px;}
		.cg_q{font-size: 30px;font-weight: bold;}
		.txfs{padding: 0px 10px;border-bottom: 1px solid #FBFBFB;display: flex;justify-content: space-between;height: 40px;line-height: 40px;}
		.txfs_r{color: #9D9D9D;}
		.txfs_r img{width: 20px;height: 20px;margin-right: 5px;}
		.txzt{padding: 15px 10px 5px;}
		.dzsj{padding: 0px 10px;color: #919191;line-height: 19px;}
		.dzsj_01{color: #000;font-size: 14px;padding-bottom: 5px;}
		.btn{margin:25px;background-color: #F66444;color: #fff;text-align: center;height: 40px;line-height: 40px;font-size: 16px;
		border-radius: 5px;box-shadow: 0px 0px 2px #F66444;}
	}
	
	
	.uni-steps {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative
	}

	.uni-steps-items {
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 10px;
		box-sizing: border-box;
		overflow: hidden
	}

	.uni-steps-items.uni-steps-column {
		margin: 10px 0;
		padding-left: 31px;
		flex-direction: column
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:after {
		content: ' ';
		position: absolute;
		height: 1px;
		width: 100%;
		bottom: 9px;
		left: 0;
		background-color: #ebedf0;
		transform: scaleY(.5)
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child {
		position: relative
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child:after {
		height: 0
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child .uni-steps-item-title-container {
		text-align: left
	}

	.uni-steps-items.uni-steps-column .uni-steps-item:last-child .uni-steps-item-circle-container {
		left: -17px;
		right: auto
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-title-container {
		transform: none;
		display: block;
		line-height: 36upx
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-desc {
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-circle-container {
		left: -17px;
		top: -1px;
		bottom: auto;
		padding: 8px 0;
		z-index: 1
	}

	.uni-steps-items.uni-steps-column .uni-steps-item-line {
		height: 100%;
		width: 1px;
		left: -15px;
		top: -1px;
		bottom: auto
	}

	.uni-steps-items.uni-steps-column .uni-steps-item.uni-steps-process .uni-steps-item-circle-container {
		bottom: auto;
		left: -21px
	}

	.uni-steps-item {
		flex: 1;
		position: relative;
		padding-bottom: 18px
	}

	.uni-steps-item-title-container {
		text-align: left;
		margin-left: 3px;
		display: inline-block;
		transform: translateX(-50%);
		color: #999
	}

	.uni-steps-item-title {
		font-size: 28upx
	}

	.uni-steps-item-desc {
		font-size: 24upx
	}

	.uni-steps-item:first-child .uni-steps-item-title-container {
		transform: none;
		margin-left: 0
	}

	.uni-steps-item:last-child {
		position: absolute;
		right: 0
	}

	.uni-steps-item:last-child .uni-steps-item-title-container {
		transform: none;
		text-align: right
	}

	.uni-steps-item:last-child .uni-steps-item-circle-container {
		left: auto;
		right: -8px
	}

	.uni-steps-item-circle-container {
		position: absolute;
		bottom: 8px;
		left: -8px;
		padding: 0 8px;
		background-color: #fff;
		z-index: 1
	}

	.uni-steps-item-circle {
		width: 5px;
		height: 5px;
		background-color: #999;
		border-radius: 50%
	}

	.uni-steps-item-line {
		background-color: #ebedf0;
		position: absolute;
		bottom: 10px;
		left: 0;
		width: 100%;
		height: 1px
	}

	.uni-steps-item.uni-steps-finish .uni-steps-item-title-container {
		color: #333
	}

	.uni-steps-item.uni-steps-process .uni-steps-item-circle-container {
		bottom: 3px;
		display: flex
	}
</style>
