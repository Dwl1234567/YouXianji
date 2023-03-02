//工具函数库，强哥编写。

let _tool = {
	//获取字符串的真实长度（字节长度）
	strLeng(str) {
		if(str) {
			let len = str.length, truelen = 0;
			for(let x = 0; x < len; x++) {
				if(str.charCodeAt(x) > 128){
					truelen += 2;
				}else{
					truelen += 1;
				}
			}
			return truelen;
		} else {
			return 0;
		}
	},
	//计算页数
	getPageNum(total,row) {
		let num = Number(total) / Number(row);
		//是否为整数
		if(num%1 !== 0) {
			let b = num.toString();	//转字符串
			let a = parseInt(b.substring(0,b.indexOf('.')));	//取小数点前
			let s = b.replace(/\d+\.(\d*)/, '$1');	//取小数点后
			if(s > 0) {
				num = a + 1;
			}
		}
		return num;
	},
	//设置手机通知栏字体颜色
	setBarColor(black = false) {
		if(black) {
			uni.setNavigationBarColor({
			    frontColor: '#000000',
			    backgroundColor: '#FAFAFA'
			});
		} else {
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#FAFAFA'
			});
		}
	},
	//判断时间，设置深色模式
	mpb_mode(type){
		let hours = new Date().getHours();
		let appMode = [];
		if (hours > 18 && hours <= 24) {
		  if(type=='tips'){
		  	appMode['tips'] = '晚上好';
			appMode['style'] = 'night';//晚上
		  }
		}
		if (hours < 6) {
		  if(type=='tips'){
		  	appMode['tips'] = '夜深了';
			appMode['style'] = 'late-night';//深夜模式
		  }
		}
		if (hours >= 6 && hours <= 18) {
		  if(type=='tips'){
		  	appMode['tips'] = '白天';
			appMode['style'] = 'daytime';//日间
		  }
		}
		console.log(appMode['tips']);
		return appMode;
	},
	mpb_log(v) {
		//console.warn("HBX版本号：" + v);
	}
};

export default _tool;