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
	getInfoConfig({ commit, state }, params) {
		service.configData(params).then(data => {
			commit('INFO_CONFIG', data)
		})
	},
	//根据id获取对应信息抽取配置规则
	queryRuleById({ commit, state }, id) {
		service.queryRuleById(id).then(data => {
			commit('CONFIG_RULE', data)
		})
	},
	//删除信息抽取配置规则idid
	deleteConfigRule({ commit, state }, id) {
		service.deleteConfigRule(id).then(data => {
			commit('DELETE_CONFIG_RULE', data)
		})
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
	infoGetAction({ commit, state }) {
		let data = service.infoGet()
		commit('INFO_GET', data)
	},
	//提交词法分析
	analysisGet({ commit, state }, json) {
		service.analysisGet(json).then((data) => {
			commit('ANALYSIS_GET', data)
		})
	},
	//提交机构名标准化
	processCompanyStd({ commit, state }, json) {
		service.processCompanyStd(json).then((data) => {
			commit('PROCESS_COMPANY_STD', data)
		})
	},
	//提交机构名识别
	processCompanySegment({ commit, state }, json) {
		service.processCompanySegment(json).then((data) => {
			commit('PROCESS_COMPANY_SEGMENT', data)
		})
	},
	// 根据配置config，抽取信息获取list
	infoExtraGet({ commit, state }, config) {
		let data = service.infoExtraGet(config)
		commit('INFO_EXTRA', data)
	},
	infoExtraDetailGet({ commit, state }, id) {
		let data = service.infoExtraDetailGet(id)
		commit('INFO_EXTRA_DETAIL', data)
	},
	//创建规则
	createRuleRequest({ commit, state }, rule) {
		service.createRuleRequest(rule).then((data) => {
			commit('CREATE_RULE_REQUEST', data)
		})
	}
}

