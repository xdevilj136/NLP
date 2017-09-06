const ADD_ITEMNUM = 'ADD_ITEMNUM'
const TEST_ACTION = 'TEST_ACTION'
export default {
	//点击进入下一题
	[ADD_ITEMNUM](state, num) {
		state.itemNum += num;
	},

	[TEST_ACTION](state, text) {
		state.test = text
	}
}