const TEST_ACTION = 'TEST_ACTION'
const INFO_CONFIG = 'INFO_CONFIG'
const INFO_GET = 'INFO_GET'
const ANALYSIS_GET = 'ANALYSIS_GET'
export default {
	[TEST_ACTION](state, text) {
		state.test = text
	},
	// 获取信息抽取配置
	[INFO_CONFIG](state, data) {
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