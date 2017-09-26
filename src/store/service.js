import ajax from '../config/ajax'

export default {

	// loginCheck
	loginCheck(data) {
		ajax()
		return true
	},
	// loginOut
	loginOut(data) {
		return false
	},
	/*
		信心抽取配置
	*/
	//获取信息抽取配置规则列表
	configData(params) {
		ajax('GET', '/api/extractConfig/query', params, 'INFO_CONFIG');
	},
	//根据id查询单个配置规则
	queryRuleById(id) {
		ajax('GET', '/api/extractConfig/queryById', { id: id }, 'CONFIG_RULE');
	},
	//创建抽取信息配置规则
	createRuleRequest(rule) {
		ajax('POST', '/api/extractConfig/create', rule, 'CREATE_RULE_REQUEST');
	},
	//修改抽取信息配置规则
	updateRuleRequest(rule) {
		ajax('POST', '/api/extractConfig/edit', rule, 'UPDATE_RULE_REQUEST');
	},
	//删除配置规则
	deleteConfigRule(id) {
		ajax('GET', '/api/extractConfig/delete', { id: id }, 'DELETE_CONFIG_RULE');
	},
	/*
		功能展示
	*/
	//信息抽取处理
	dataExtract(data) {
		ajax('POST', '/api/functions/dataExtract', data, 'DATA_EXTRACT');
	},
	//词法分析
	analysisGet(json) {
		ajax('POST', '/api/functions/grammarParse', json, 'ANALYSIS_GET');
	},
	//机构名标准化
	processCompanyStd(json) {
		ajax('POST', '/api/functions/companyStd', json, 'PROCESS_COMPANY_STD');
	},
	//机构名识别
	processCompanySegment(json) {
		ajax('POST', '/api/functions/companySegment', json, 'PROCESS_COMPANY_SEGMENT');
	},
	/*
		任务管理
	*/
	//新建任务
	createTaskRequest(task) {
		ajax('POST', '/api/task/create', task, 'CREATE_TASK_REQUEST');

	},
	//修改任务
	updateTaskRequest(task) {
		ajax('POST', '/api/task/edit', task, 'DELETE_TASK_REQUEST');
	},
	//开始任务
	startTaskRequest(id) {
		ajax('GET', '/api/task/start', { id: id }, 'START_TASK_REQUEST');
	},	
	//停止任务
	stopTaskRequest(id) {
		ajax('GET', '/api/task/stop', { id: id }, 'STOP_TASK_REQUEST');
	},
	//删除任务
	deleteTaskRequest(id) {
		ajax('GET', '/api/task/delete', { id: id }, 'DELETE_TASK_REQUEST');
	},
	//根据id获取单个任务信息
	queryTaskById(id) {
		ajax('GET', '/api/task/queryById', { id: id }, 'SINGLE_TASK');
	},
	//获取任务管理筛选数据
	taskManageData(params) {
		ajax('GET', '/api/task/query', params, 'TASK_MANAGE');

	},
	//获取任务日志
	taskLog(id) {
		ajax('GET', '/api/task/log', {id:id}, 'TASK_LOG');
	},
	/*
	
	*/
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
	}
};
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
