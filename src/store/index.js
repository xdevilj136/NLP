import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	test: '测试vuex数据流程',
	infoConfig: [],
	isLogin: true,
	taskManageData:[],
	taskManageDetail:{},
	taskLog:{},
	authorityManage:[],
	dataSource:[],
	configList: [], // 配置list
	infoGet: {}, // 信息抽取
	analysiData: {}, // 词法分析数据
	infoExtra: [], // 信息抽取配置数据list
	infoExtraDetail: {} //信息抽取配置数据config
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})