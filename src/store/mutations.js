const TEST_ACTION = 'TEST_ACTION'
const INFO_CONFIG = 'INFO_CONFIG'
const TASK_MANAGE = 'TASK_MANAGE'
const TASK_LOG = 'TASK_LOG'
const TASK_MANAGE_DETAIL = 'TASK_MANAGE_DETAIL'
const AUTHORITY_MANAGE = 'AUTHORITY_MANAGE'
const INFO_GET = 'INFO_GET'
const ANALYSIS_GET = 'ANALYSIS_GET'
const INFO_EXTRA = 'INFO_EXTRA'
const INFO_EXTRA_DETAIL = 'INFO_EXTRA_DETAIL'
const LOGIN_CHECK = 'LOGIN_CHECK'
const DATA_SOURCE = 'DATA_SOURCE'
const CREATE_RULE_REQUEST='CREATE_RULE_REQUEST'
const PROCESS_COMPANY_SEGMENT='PROCESS_COMPANY_SEGMENT'
const PROCESS_COMPANY_STD='PROCESS_COMPANY_STD'

export default {
	[TEST_ACTION](state, text) {
		state.test = text
	},
	//login
	[LOGIN_CHECK](state, data) {
		state.isLogin = data
	},
	// 获取信息抽取配置
	[INFO_CONFIG](state, data) {
		state.configList = data
	},
	//获取任务管理数据
	[TASK_MANAGE](state, data) {
		state.taskManageData = data
	},
	//获取任务管理详情数据
	[TASK_MANAGE_DETAIL](state, data) {
		state.taskManageDetail = data
	},
	//获取任务管理详情数据
	[TASK_LOG](state, data) {
		state.taskLog = data
	},
	//获取权限管理数据
	[AUTHORITY_MANAGE](state, data) {
		state.authorityManage = data
	},
	//获取数据源
	[DATA_SOURCE](state, data) {
		state.dataSource = data
	},
	// function-display info-get
	[INFO_GET](state, data) {
		state.infoGet = data
	},
	//词法分析
	[ANALYSIS_GET](state, data) {
		state.analysisData = data
	},
	//机构名标准化
	[PROCESS_COMPANY_STD](state, data) {
		state.companyStd = data
	},
	//机构名识别
	[PROCESS_COMPANY_SEGMENT](state, data) {
		state.companySegment = data
	},
	// 抽取信息配置模块
	[INFO_EXTRA](state, data) {
		state.infoExtra = data
	},
	[INFO_EXTRA_DETAIL] (state, data) {
		state.infoExtraDetail = data
	},
	//创建规则
	[CREATE_RULE_REQUEST](state,data){
		state.createRuleResponse=data;
	}
}