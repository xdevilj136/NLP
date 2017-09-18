import ajax from '../config/ajax'

export default {
	configData() {
		var data = [{
			id:1,
			label: '招中标',
			value: 'a',
			name: '招中标',
			creator: 'cjf',
			time: '2013-09-08'
		}, {
			id:2,
			label: '拜访记录',
			value: 'b',
			name: '拜访记录',
			creator: 'cjf',
			time: '2013-09-08'
		}, {
			id:3,
			label: '授信批文解析',
			value: 'c',
			name: '授信批文解析',
			creator: 'cjf',
			time: '2013-09-08'
		}, {
			id:4,
			label: '调查报告解析',
			value: 'd',
			name: '调查报告解析',
			creator: 'cjf',
			time: '2013-09-08'
		}];
		return data
	},
	// loginCheck
	loginCheck (data) {
		ajaxData()
		return true
	},
	// loginOut
	loginOut (data) {
		return false
	},
	// 信息抽取list
	infoExtraGet (config) {
		let data = [{
			name: '杜甫悲传',
			match_rule: '南村群童欺我老无力，公然抱我入竹去',
			trigger_rule: '唇焦口燥呼不得，归来倚杖自叹息',
			once: 'true'
		}]
		if (config === 'a') {
			data = []
		} else if (config === 'b') {
			data = {
				id:1,
				ruleDiscription:{
					ruleName:'拜访记录',
					isPublic:'yes'
				},
				ruleProperty:[{
				name: '杜甫悲传',
				match_rule: '南村群童欺我老无力，公然抱我入竹去',
				trigger_rule: '唇焦口燥呼不得，归来倚杖自叹息',
				once: 'true'
			}, {
				name: '杜甫悲传',
				match_rule: '南村群童欺我老无力，公然抱我入竹去',
				trigger_rule: '唇焦口燥呼不得，归来倚杖自叹息',
				once: 'true'
			}]
		};
		}
		return data
	},
	infoExtraDetailGet (id) {
		let data = {
			name: '杜甫悲传',
			match_rule: '南村群童欺我老无力，公然抱我入竹去',
			trigger_rule: '唇焦口燥呼不得，归来倚杖自叹息',
			once: 'true'
		}
		return data
	},
	infoGet() {
		let data = { "招中标": { "招标机构": ["海致网络技术有限公司"], "代理机构": ["海致网络技术（北京）有限公司"], "中标机构": ["大连樱华健康科技有限公司"], "中标金额": ["人民币580.2万元"] } };
		let newDate = {
			name: '',
			children: []
		}
		for (let i in data) {
			newDate['name'] = i;
			for (let j in data[i]) {
				newDate['children'].push({
					name: j,
					value: data[i][j]
				})
			}
		}
		return newDate;
	},
	analysisGet(json) {
		let data = {
			"seg_list": ["李彦宏", "是", "马云", "最大", "威胁", "嘛", "？"],
			"pos_list": { "words": ["李彦宏", "是", "马云", "最大", "威胁", "嘛", "？"], "tags": ["NH", "V", "NH", "NZ", "V", "E", "WP"] },
			"ner_list": { "words": ["李彦宏", "是", "马云", "最", "大", "威胁", "嘛", "？"], "tags": ["PERSON", "O", "PERSON", "O", "O", "O", "O", "O"] }
		}
		let lastData = {}
		for (let i = 0; i < json.type.length; i++) {
			for (let j in data) {
				if (json.type[i] === j) {
					lastData[j] = data[j]
					if (data[j].tags) {
						lastData[j]['newTags'] = unique(data[j].tags)
					}
				}
			}
		}
		return lastData
	},
	//获取任务管理筛选数据
	taskManageData() {
		var data = [{
			id: 1,
			name: '新闻实体识别',
			type: '实体识别',
			time: '2017-08-09',
			status: '未开始'
		}, {
			id: 2,
			name: '存量裁判文书解析',
			type: '裁判文书',
			time: '2017-08-29',
			status: '正在执行'
		}, {
			id: 3,
			name: '客户拜访记录',
			type: '拜访记录',
			time: '2017-08-29',
			status: '已结束'
		}, {
			id: 4,
			name: '调查报告解析',
			type: '调查报告解析',
			time: '2017-08-29',
			status: '非正常结束'
		}, {
			id: 5,
			name: '授信审批解析',
			type: '授信审批解析',
			time: '2017-08-29',
			status: '等待开始'
		}, {
			id: 6,
			name: '授信审批解析',
			type: '授信审批解析',
			time: '2017-08-29',
			status: '等待开始'
		}];
		return data;
	},
	//获取任务管理详情数据
	taskManageDetail(id) {
		var data = {
			id: 1,
			name: '新闻实体识别',
			type: '实体识别',
			consumedTime: '2017-08-09',
			status: '未开始',
			totalRecordNumber: 10000,
			outputLocation: 'location/zz'
		};
		return data;
	},
	//获取任务日志
	taskLog(id) {
		var data = {
			id: 1,
			name: '客户拜访记录',
			content: '日志文本文本日志文本文本日志文本文本日志文本文本日志文本文本日志文本文本日志' +
			'文本文本日志文本文本日志文本文本日志文本文本日志文本文本日志文本文本日志文本文本'
		};
		return data;
	},
	//获取权限管理数据
	authorityManage() {
		var data = [{
			username: '张三',
			authority: '管理员',
			status: '已激活'
		}, {
			username: '李四',
			authority: '普通用户',
			status: '未激活'
		}, {
			username: '王五',
			authority: '管理员',
			status: '已激活'
		}, {
			username: '赵六',
			authority: '普通用户',
			status: '未激活'
		}];
		return data;
	},
	//获取数据源
	dataSource() {
		var data = [
			{
				name: 'oracle审批意见表',
				type: '192.1.1.1',
				information: '50051'
			},
			{
				name: 'sql审批意见表',
				type: '192.1.1.1',
				information: '50051'
			}
		]
		return data;
	},
	//创建规则
	createRuleResponse(rule){
		ajaxData('POST','/api/extractConfig/create',rule);
		return true;
	}

}
// 去重操作
function unique(data) {
	let lastData = []
	for (let i = 0; i < data.length; i++) {
		if (lastData.indexOf(data[i]) === -1) {
			lastData.push(data[i])
		}
	}
	return lastData
}
// 所有请求在此处拦截
function ajaxData(method='GET', url = '', data = {}, params = {}) {
	let start = async function () {
		// let data = await ajax('POST','/api/functions/grammarParse', {
		// 	"functions":["WordSegment","PosTag","NamedIdentityRecognize"],
		// 	"data" :"以前，一直以为在SpringMVC环境中，@RequestBody接收的是一个Json对象，一直在调试代码都没有成功，后来发现，其实 @RequestBody接收的是一个Json对象的字符串，而不是一个Json对象。然而在ajax请求往往传的都是Json对象，后来发现用 JSON.stringify(data)的方式就能将对象变成字符串。同时ajax请求的时候也要指定dataType: "
		// })
		let data = await ajax(method,url,data)
		console.log(data)
	}
	start()
}