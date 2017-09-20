import ajax from '../config/ajax'

export default {
	//获取信息抽取配置规则列表
	configData(params) {

		let responseData = ajax('GET', '/api/extractConfig/queryAll',params).then((data) => {
			return data.result;
		});
		return responseData;
	},
	// loginCheck
	loginCheck(data) {
		ajax()
		return true
	},
	// loginOut
	loginOut(data) {
		return false
	},
	// 信息抽取list
	infoExtraGet(config) {
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
				id: 1,
				ruleDiscription: {
					ruleName: '拜访记录',
					isPublic: 'yes'
				},
				ruleProperty: [{
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
	//根据id查询单个配置规则
	queryRuleById(id) {
		let responseData = ajax('GET', '/api/extractConfig/queryById', { id: id }).then((data) => {
			return data.result;
		});
		return responseData;
	},
	//删除配置规则
	deleteConfigRule(id){
		let responseData = ajax('GET', '/api/extractConfig/delete',{id:id}).then((data) => {
			return data;
		});
		return responseData;
	},
	infoExtraDetailGet(id) {
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
	//词法分析
	analysisGet(json) {
		let responseData = ajax('POST', '/api/functions/grammarParse', json).then((data) => {
			let result = data.result;
			for (let key in result) {
				let item = JSON.parse(result[key]);
				let matchList = item.SegList || item.PosList || item.NerList;
				if (matchList) {
					if (matchList.Tags) {
						matchList['newTags'] = unique(matchList.Tags)
					}
				}
				result[key] = item;
			}
			return data;
		});
		return responseData;
	},
	//机构名标准化
	processCompanyStd(json) {
		let responseData = ajax('POST', '/api/functions/companyStd', json).then((data) => {
			if(data.result&&data.result.CompanyStd){
				data.result.CompanyStd = JSON.parse(data.result.CompanyStd);
			}
			return data;
		});
		return responseData;
	},
	//机构名识别
	processCompanySegment(json) {
		let responseData = ajax('POST', '/api/functions/companySegment', json).then((data) => {
			if(data.result&&data.result.CompanySegment){
				let companySegment = JSON.parse(data.result.CompanySegment);
				let companySeg=companySegment.CompanySeg;
				if(companySeg.Tags){
					companySeg['newTags'] = unique(companySeg.Tags)
				}
				data.result.CompanySegment=companySegment;
			}
			return data;
		});
		return responseData;
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
	createRuleRequest(rule) {
		let responseData = ajax('POST', '/api/extractConfig/create', rule).then((data) => {
			return data;
		});
		return responseData;
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
	return lastData;
}
