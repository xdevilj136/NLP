const TEST_ACTION = 'TEST_ACTION'
const INFO_CONFIG = 'INFO_CONFIG'
const TASK_MANAGE = 'TASK_MANAGE'
const TASK_LOG = 'TASK_LOG'
const TASK_MANAGE_DETAIL = 'TASK_MANAGE_DETAIL'
const AUTHORITY_MANAGE = 'AUTHORITY_MANAGE'
const INFO_GET = 'INFO_GET'
const ANALYSIS_GET = 'ANALYSIS_GET'
const DATA_SOURCE = 'DATA_SOURCE'

export default {
	[TEST_ACTION](state, text) {
		state.test = text
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
	[ANALYSIS_GET](state, data) {
		state.analysiData = data
	}
}