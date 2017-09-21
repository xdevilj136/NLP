import service from './service'

export default {
	changeTest({ commit, state }, text) {
		commit('TEST_ACTION', text)
	},
	// login
	loginCheck({ commit, state }, data) {
		let check = service.loginCheck(data)
		commit('LOGIN_CHECK', check)
	},
	loginOut({ commit, state }, data) {
		let check = service.loginOut(data)
		commit('LOGIN_CHECK', check)
	},
	//获取信息抽取配置规则列表
	getInfoConfig({ }, params) {
		service.configData(params);
	},
	//根据id获取对应信息抽取配置规则
	queryRuleById({ }, id) {
		service.queryRuleById(id);
	},
	//创建信息抽取配置规则
	createRuleRequest({ }, rule) {
		service.createRuleRequest(rule)
	},
	//修改对应信息抽取配置规则
	updateRuleRequest({ }, rule) {
		service.updateRuleRequest(rule);
	},
	//删除信息抽取配置规则
	deleteConfigRule({ }, id) {
		service.deleteConfigRule(id);
	},
	//获取任务管理筛选数据
	getTaskManageData({ commit, state }, data) {
		data = service.taskManageData()
		commit('TASK_MANAGE', data)
	},
	//获取任务管理详情数据
	getTaskManageDetail({ commit, state }, id) {
		let data = service.taskManageDetail(id)
		commit('TASK_MANAGE_DETAIL', data)
	},
	//获取任务日志
	getTaskLog({ commit, state }, id) {
		let data = service.taskLog(id)
		commit('TASK_LOG', data)
	},
	//获取权限管理数据
	getAuthorityManage({ commit, state }) {
		let data = service.authorityManage()
		commit('AUTHORITY_MANAGE', data)
	},
	//获取数据源
	getDataSource({ commit, state }) {
		let data = service.dataSource()
		commit('DATA_SOURCE', data)
	},

/*
	功能展示接口
*/
	//信息抽取处理
	dataExtract({},data) {
		service.dataExtract(data);
	},
	//提交词法分析
	analysisGet({}, json) {
		service.analysisGet(json);
	},
	//提交机构名标准化
	processCompanyStd({}, json) {
		service.processCompanyStd(json);
	},
	//提交机构名识别
	processCompanySegment({}, json) {
		service.processCompanySegment(json);
	}

}

