import service from './service'

export default {
	changeTest({commit, state}, text) {
		commit('TEST_ACTION', text)
	},
	getInfoConfig({commit, state}) {
		let data = service.configData()
		commit('INFO_CONFIG', data)
	},
	infoGetAction({commit, state}) {
		let data = service.infoGet()
		commit('INFO_GET', data)
	},
	analysisGet({commit, state}, json) {
		let data = service.analysisGet(json)
		commit('ANALYSIS_GET', data)
	}
}

