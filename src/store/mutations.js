const INFO_CONFIG = 'INFO_CONFIG'
const TASK_MANAGE = 'TASK_MANAGE'
const TASK_LOG = 'TASK_LOG'
const TASK_MANAGE_DETAIL = 'TASK_MANAGE_DETAIL'
const AUTHORITY_MANAGE = 'AUTHORITY_MANAGE'
const DATA_EXTRACT = 'DATA_EXTRACT'
const ANALYSIS_GET = 'ANALYSIS_GET'
const LOGIN_CHECK = 'LOGIN_CHECK'
const DATA_SOURCE = 'DATA_SOURCE'
const CREATE_RULE_REQUEST = 'CREATE_RULE_REQUEST'
const UPDATE_RULE_REQUEST = 'UPDATE_RULE_REQUEST'
const PROCESS_COMPANY_SEGMENT = 'PROCESS_COMPANY_SEGMENT'
const PROCESS_COMPANY_STD = 'PROCESS_COMPANY_STD'
const DELETE_CONFIG_RULE = 'DELETE_CONFIG_RULE'
const CONFIG_RULE = 'CONFIG_RULE'

export default {
	//login
	[LOGIN_CHECK](state, data) {
		state.isLogin = data
	},
	// 获取信息抽取配置
	[INFO_CONFIG](state, data) {
		state.configList = data
	},
	// 获取单个信息抽取配置规则
	[CONFIG_RULE](state, data) {
		state.configRule = data
	},
	//创建规则
	[CREATE_RULE_REQUEST](state, data) {
		state.createRuleResponse = data;
	},
	//创建规则
	[UPDATE_RULE_REQUEST](state, data) {
		state.updateRuleResponse = data;
	},
	// 删除信息抽取配置规则
	[DELETE_CONFIG_RULE](state, data) {
		state.deleteRuleResponse = data
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
	// 信息抽取处理
	[DATA_EXTRACT](state, data) {
		state.extractedData = data
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
	}

}