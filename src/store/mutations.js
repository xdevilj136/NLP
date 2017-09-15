const TEST_ACTION = 'TEST_ACTION'
const INFO_CONFIG = 'INFO_CONFIG'
const TASK_MANAGE = 'TASK_MANAGE'
const TASK_LOG = 'TASK_LOG'
const TASK_MANAGE_DETAIL = 'TASK_MANAGE_DETAIL'
const INFO_GET = 'INFO_GET'
const ANALYSIS_GET = 'ANALYSIS_GET'
const INFO_EXTRA = 'INFO_EXTRA'
const INFO_EXTRA_DETAIL = 'INFO_EXTRA_DETAIL'
const LOGIN_CHECK = 'LOGIN_CHECK'

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
	// function-display info-get
	[INFO_GET](state, data) {
		state.infoGet = data
	},
	[ANALYSIS_GET](state, data) {
		state.analysiData = data
	},
	// 抽取信息配置模块
	[INFO_EXTRA](state, data) {
		state.infoExtra = data
	},
	[INFO_EXTRA_DETAIL] (state, data) {
		state.infoExtraDetail = data
	}
}