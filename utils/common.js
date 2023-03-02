/**
 * 调用第三方地图服务
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} address 地址
 * @param {*} poiName 点位名称
 * @param {*} appName 调用app名称
 */
export function toMapAPP(latitude, longitude, address, poiName='', appName='') {
	let url = "";
	if (plus.os.name == "Android") { //判断是安卓端
		plus.nativeUI.actionSheet({ //选择菜单
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{
				title: "高德地图"
			}, {
				title: "百度地图"
			}, {
				title: "腾讯地图"
			}]
		}, function(e) {
			switch (e.index) {
				//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
				case 1:
					url = `androidamap://viewMap?sourceApplication=appname&poiname=${poiName}&lat=${latitude}&lon=${longitude}&dev=0`;
					break;
				case 2:
					url = `baidumap://map/marker?location=${latitude},${longitude}&title=${poiName}&content=${address}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
					break;
				case 3:
					//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
					url = `qqmap://map/marker?marker=coord:${latitude},${longitude};title:${poiName};addr:${address}&referer=xxx`;
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url);
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装该地图APP");
				});
			}
		})
	} else {
		// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置
		// 在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加
		//（如urlschemewhitelist:["iosamap","baidumap"]）  
		plus.nativeUI.actionSheet({
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{
				title: "高德地图"
			}, {
				title: "百度地图"
			}, {
				title: "腾讯地图"
			}, {
				title: "Apple地图"
			}]
		}, function(e) {
			switch (e.index) {
				case 1:
					url = `iosamap://viewMap?sourceApplication=${appName}&poiname=${poiName}&lat=${latitude}&lon=${longitude}&dev=0`;
					break;
				case 2:
					url = `baidumap://map/marker?location=${latitude},${longitude}&title=${poiName}&content=${address}&coord_type=gcj02&src=ios.baidu.openAPIdemo`;
					break;
				case 3:
					url = `qqmap://map/marker?marker=coord:${latitude},${longitude};title:${poiName};addr:${address}&referer=xxx`;
					break;
				case 4:
					// https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
					url = `http://maps.apple.com/?q=${poiName}&sll=${latitude},${longitude}&z=10&t=s`;
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url);
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装该地图APP");
				});
			}
		})
	}
}
