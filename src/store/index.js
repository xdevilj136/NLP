import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	infoConfig: [],
	isLogin: '',
	createTaskResponse:{},
	updateTaskResponse:{},
	stopTaskResponse:{},
	startTaskResponse:{},
	deleteTaskResponse:{},
	taskManageData:[],
	singleTask:{},
	taskLog:{},
	authorityManage:[],
	dataSource:[],
	configList: [], // 配置list
	configRule:{},
	deleteRuleResponse:{},
	updateRuleResponse:{},
	extractedData: {}, // 抽取到的数据
	companyStd:{},//机构名标准化
	companySegment:{},//机构名识别
	analysisData: {}, // 词法分析数据
	createRuleResponse:{}//创建规则响应
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})