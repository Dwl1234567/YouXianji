/*
 * 应用表单校验相关配置
 * 依赖：graceChecker.js 进行校验
 *
 * 使用：引入该js到页面，let res = graceChecker.check({phoneNo:"",code:""},formRule.loginRule)
 */

export default {
	transferFrom:[
		{
			name: 'integral',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		{
			name: 'uid',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: 'uid不能为空'
		},
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},
	],
	changeName:[
		{
			name: 'nickname',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '昵称不能为空'
		}
	],
	validationModifyTradeLoginPassword:[
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},
		{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '登录密码不能为空'
		},
		{
			name: 'confirmPassword',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '确认密码不能为空'
		}
	],
	replaceEmail:[
		{
			name: 'mail',
			checkType: 'email',
			checkRule: '',
			errorMsg: '邮箱格式不正确'
		},
		{
			name: 'mail',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '邮箱不能为空'
		},{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		}
	],
	validaRetrieveUserInfoUp:[
		{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},
		{
			name: 'password',
			checkType: 'string',
			checkRule: '6,99',
			errorMsg: '请输入6位以上密码'
		},
		{
			name: 'confirmPassword',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},
		{
			name: 'confirmPassword',
			checkType: 'string',
			checkRule: '6,99',
			errorMsg: '请输入6位以上密码'
		},
	],
	validaRetrieveUserInfoPhoneno:[
		{
			name: 'accountNumber',
			checkType: 'phoneno',
			checkRule: '',
			errorMsg: '手机格式不正确'
		},
		{
			name: 'accountNumber',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '手机不能为空'
		},{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},{
			name: 'password',
			checkType: 'string',
			checkRule: '6,20',
			errorMsg: '请输入6到20位密码'
		}
	],
	withdrawFrom:[
		{
			name: 'address',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '提现地址不能为空'
		},
		{
			name: 'amount',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},
	],
	changePayPassword:[
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},
		{
			name: 'password',
			checkType: 'string',
			checkRule: '6',
			errorMsg: '请输入6位密码'
		},
		{
			name: 'password',
			checkType: 'reg',
			checkRule: /^\d+$/,
			errorMsg: '请输入六位纯数字密码'
		},
		{
			name: 'confirmPassword',
			checkType: 'string',
			checkRule: '6',
			errorMsg: '请输入6位确认密码'
		},
		{
			name: 'confirmPassword',
			checkType: 'reg',
			checkRule: /^\d+$/,
			errorMsg: '请输入六位纯数字确认密码'
		},
	],
	validaRetrieveUserInfoEmail:[
		{
			name: 'accountNumber',
			checkType: 'email',
			checkRule: '',
			errorMsg: '邮箱格式不正确'
		},
		{
			name: 'accountNumber',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '邮箱不能为空'
		},{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},{
			name: 'password',
			checkType: 'string',
			checkRule: '6,20',
			errorMsg: '请输入6到20位密码'
		}
	],
	userloginSMS:[
		{
			name: 'phone',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '手机号不能为空'
		},
		{
			name: 'phone',
			checkType: 'phoneno',
			checkRule: '',
			errorMsg: '手机号格式不正确'
		},
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		}
	],
	replacePhone:[
		{
			name: 'phone',
			checkType: 'phoneno',
			checkRule: '',
			errorMsg: '手机号格式不正确'
		},
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		}
	],
	validationEmail:[
		{
			name: 'email',
			checkType: 'email',
			checkRule: '',
			errorMsg: '邮箱格式不正确'
		}
	],
	userRegisterEmail:[
		{
			name: 'accountNumber',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '邮箱不能为空'
		},
		{
			name: 'accountNumber',
			checkType: 'email',
			checkRule: '',
			errorMsg: '邮箱格式不正确'
		},{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},
		{
			name: 'password',
			checkType: 'string',
			checkRule: '6,99',
			errorMsg: '请输入6位以上密码'
		},
		{
			name: 'confirmPassword',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '	确认密码不能为空'
		},
		{
			name: 'invitationCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '	邀请码不能为空'
		}
	],
	userRegister:[
		{
			name: 'accountNumber',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '手机号不能为空'
		},
		{
			name: 'accountNumber',
			checkType: 'phoneno',
			checkRule: '',
			errorMsg: '手机号格式不正确'
		},{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},
		{
			name: 'password',
			checkType: 'string',
			checkRule: '6,99',
			errorMsg: '请输入6位以上密码'
		}
	],
	userlogin:[
		{
			name: 'accountNumber',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '用户名不能为空'
		},
		{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		}
	],
	userloginQuick:[
			{
				name: 'phone',
				checkType: 'notnull',
				checkRule: '',
				errorMsg: '手机不能为空'
			},
			{
				name: 'phone',
				checkType: 'phoneno',
				checkRule: '',
				errorMsg: '手机格式不正确'
			},
			{
				name: 'code',
				checkType: 'notnull',
				checkRule: '',
				errorMsg: '验证码不能为空'
			}
	],
	myMiningMachineTransfer: [
		{
			name: 'uid',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: 'uid不能为空'
		},
		{
			name: 'uid',
			checkType: 'reg',
			checkRule: /^[0-9]*$/,
			errorMsg: 'uid请输入整数'
		},
		{
			name: 'num',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		{
			name: 'num',
			checkType: 'reg',
			checkRule: /^[0-9]*$/,
			errorMsg: '数量请输入整数'
		},
	],
	RulePhone:[
		{
			name: 'phone',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '账号不能为空'
		},
		{
			name: 'phone',
			checkType: 'phoneno',
			checkRule: '',
			errorMsg: '手机格式不正确'
		}
	],
	RuleCalculator:[
		{
			name: 'num',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		{
			name: 'filPriceCny',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '币价不能为空'
		},
		{
			name: 'productDay',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '产币时长不能为空'
		},
		{
			name: 'managementFee',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '管理费不能为空'
		},
		{
			name: 'guessDayIncome',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '预计每日产出不能为空'
		}


	],
	RuleCalculatorMiner:[
		{
			name: 'num',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		{
			name: 'packagingSpeed',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '封装速度不能为空'
		},
		{
			name: 'price',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '投入成本不能为空'
		},
	],
	RuleCalculatorMiner2: [
		{
			name: 'num',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		{
			name: 'packagingSpeed',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '封装速度不能为空'
		},
		// {
		// 	name: 'price',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '产币时长不能为空'
		// },
	],
	FILToReflects:[
		{
			name: 'coinNum',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '提现FIL不能为空'
		},
		{
			name: 'code',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证码不能为空'
		},
		{
			name: 'code',
			checkType: 'string',
			checkRule: '4,10',
			errorMsg: '请输入4位验证码'
		},
		{
			name: 'tradePassword',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '交易密码不能为空'
		},
		{
			name: 'tradePassword',
			checkType: 'string',
			checkRule: '6,30',
			errorMsg: '请输入6位以上交易密码'
		},
	],
	IdCardRule: [
		{
			name: 'name',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '数量不能为空'
		},
		// {
		// 	name: 'cardnum',
		// 	checkType: 'reg',
		// 	checkRule: '/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/',
		// 	errorMsg: '请输入正确的身份证号码'
		// },
		{
			name: 'cardnum',
			checkType: 'string',
			checkRule: '15,18',
			errorMsg: '请输入正确的身份证号码'
		}
	]
};
