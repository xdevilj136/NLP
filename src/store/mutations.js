const INFO_CONFIG = 'INFO_CONFIG'
const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST'
const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST'
const STOP_TASK_REQUEST = 'STOP_TASK_REQUEST'
const START_TASK_REQUEST = 'START_TASK_REQUEST'
const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
const TASK_MANAGE = 'TASK_MANAGE'
const SINGLE_TASK = 'SINGLE_TASK'
const TASK_LOG = 'TASK_LOG'
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
	//新建任务
	[CREATE_TASK_REQUEST](state, data) {
		state.createTaskResponse = data;
	},
	//修改任务
	[UPDATE_TASK_REQUEST](state, data) {
		state.updateTaskResponse = data;
	},
	//停止任务
	[STOP_TASK_REQUEST](state, data) {
		state.stopTaskResponse = data;
	},
	//开始任务
	[START_TASK_REQUEST](state, data) {
		state.startTaskResponse = data;
	},
	//删除任务
	[DELETE_TASK_REQUEST](state, data) {
		state.deleteTaskResponse = data;
	},
	//获取单个任务管理数据
	[SINGLE_TASK](state, data) {
		state.singleTask = data
	},
	//获取任务管理数据
	[TASK_MANAGE](state, data) {
		state.taskManageData = data
	},
	//获取任务日志
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