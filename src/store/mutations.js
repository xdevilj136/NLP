const TEST_ACTION = 'TEST_ACTION'
const INFO_CONFIG = 'INFO_CONFIG'
const TASK_MANAGE='TASK_MANAGE'
const INFO_GET = 'INFO_GET'
const ANALYSIS_GET = 'ANALYSIS_GET'
export default {
	[TEST_ACTION](state, text) {
		state.test = text
	},
	// 获取信息抽取配置
	[INFO_CONFIG](state, data) {
		state.infoConfig = data
	},
	//获取任务管理数据
	[TASK_MANAGE](state, data) {
		state.taskManageData = data
		state.configList = data
	},
	// function-display info-get
	[INFO_GET](state, data) {
		state.infoGet = data
	},
	[ANALYSIS_GET](state, data) {
		state.analysiData = data
	}
}