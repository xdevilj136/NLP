import service from './service'

export default {
	addNum({ commit, state }, id) {
		//点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
		commit('REMBER_ANSWER', id);
		if (state.itemNum < state.itemDetail.length) {
			commit('ADD_ITEMNUM', 1);
		}
	},
	changeTest({commit, state}, text) {
		commit('TEST_ACTION', text)
	},
	getInfoConfig({commit, state}, data) {
		data = service.configData()
		commit('INFO_CONFIG', data)
	}
}

