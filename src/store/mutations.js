const ADD_ITEMNUM = 'ADD_ITEMNUM'
const TEST_ACTION = 'TEST_ACTION'
const INFO_CONFIG = 'INFO_CONFIG'
export default {
	//点击进入下一题
	[ADD_ITEMNUM](state, num) {
		state.itemNum += num;
	},

	[TEST_ACTION](state, text) {
		state.test = text
	},
	// 获取信息抽取配置
	[INFO_CONFIG](state, data) {
		state.infoConfig = data
	}
}