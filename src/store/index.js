import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	test: '测试vuex数据流程',
	infoConfig: [],
	taskManageData:[],
	configList: [], // 配置list
	infoGet: {}, // 信息抽取
	analysiData: {} // 词法分析数据
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})