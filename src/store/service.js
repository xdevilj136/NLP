import ajax from '../config/ajax'

export default {
	// loginCheck
	loginCheck(data) {
		ajax('GET', '/api/userInfo', {}, 'LOGIN_CHECK');
	},
	// login
	logIn(data) {
		ajax('POST', '/api/login', data, 'LOGIN');
	},
	// loginOut
	logOut(data) {
		ajax('GET', '/api/logout',  {},'LOGOUT');
	},
	changePassword(data){
		ajax('POST', '/api/user/changePwd',  data,'CHANGE_PASSWORD');
	},
	/*
		信心抽取配置
	*/
	//获取信息抽取配置规则列表
	configData(params) {
		ajax('GET', '/api/extractConfig/query', params, 'INFO_CONFIG');
	},
	//根据id查询单个配置规则
	queryRuleById(id) {
		ajax('GET', '/api/extractConfig/queryById', { id: id }, 'CONFIG_RULE');
	},
	//创建抽取信息配置规则
	createRuleRequest(rule) {
		ajax('POST', '/api/extractConfig/create', rule, 'CREATE_RULE_REQUEST');
	},
	//修改抽取信息配置规则
	updateRuleRequest(rule) {
		ajax('POST', '/api/extractConfig/edit', rule, 'UPDATE_RULE_REQUEST');
	},
	//删除配置规则
	deleteConfigRule(id) {
		ajax('GET', '/api/extractConfig/delete', { id: id }, 'DELETE_CONFIG_RULE');
	},
	/*
		功能展示
	*/
	//信息抽取处理
	dataExtract(data) {
		ajax('POST', '/api/functions/dataExtract', data, 'DATA_EXTRACT');
	},
	//招行授信解析
	zsbankAnalysis(data){
		ajax('POST', '/api/functions/zhaohangCredit', data, 'ZSBANK_CREDIT');
	},
	//词法分析
	analysisGet(json) {
		ajax('POST', '/api/functions/grammarParse', json, 'ANALYSIS_GET');
	},
	//篇章分析
	articleAnalysisGet(json) {
		ajax('POST', '/api/functions/articleAnalysis', json, 'ARTICLE_ANALYSIS_GET');
	},
	//语义相识度分析
	sentenceSimilarity(json) {
		ajax('POST', '/api/functions/sentenceSimilarity', json, 'SENTENCE_SIMILARITY');
	},
	//行业分类分析
	industryCategory(json) {
		ajax('POST', '/api/functions/industryCategory', json, 'INDUSTRY_CATEGORY');
	},
	//机构名标准化
	processCompanyStd(json) {
		ajax('POST', '/api/functions/companyStd', json, 'PROCESS_COMPANY_STD');
	},
	//机构名分析
	processCompanySegment(json) {
		ajax('POST', '/api/functions/companySegment', json, 'PROCESS_COMPANY_SEGMENT');
	},
	/*
		任务管理
	*/
	//新建任务
	createTaskRequest(task) {
		ajax('POST', '/api/task/create', task, 'CREATE_TASK_REQUEST');

	},
	//修改任务
	updateTaskRequest(task) {
		ajax('POST', '/api/task/edit', task, 'UPDATE_TASK_REQUEST');
	},
	//开始任务
	startTaskRequest(id) {
		ajax('GET', '/api/task/start', { id: id }, 'START_TASK_REQUEST');
	},	
	//停止任务
	stopTaskRequest(id) {
		ajax('GET', '/api/task/stop', { id: id }, 'STOP_TASK_REQUEST');
	},
	//删除任务
	deleteTaskRequest(id) {
		ajax('GET', '/api/task/delete', { id: id }, 'DELETE_TASK_REQUEST');
	},
	//根据id获取单个任务信息
	queryTaskById(id) {
		ajax('GET', '/api/task/queryById', { id: id }, 'SINGLE_TASK');
	},
	//获取任务管理筛选数据
	taskManageData(params) {
		ajax('GET', '/api/task/query', params, 'TASK_MANAGE');

	},
	//获取任务日志
	taskLog(id) {
		ajax('GET', '/api/task/log', {id:id}, 'TASK_LOG');
	},
	//获取任务输出结果
	getTaskResult(params){
		ajax('GET', '/api/task/viewOutput', params, 'TASK_RESULT');
	},
	/*
	
	*/
	//获取权限管理数据
	authorityManage(params) {

		ajax('GET', '/api/user/viewUserList', params, 'AUTHORITY_MANAGE');
	},
	/**
	 *	数据源配置
	 */
	//获取数据源列表
	dataSource(params) {
		ajax('GET', '/api/inputSource/query', params, 'DATA_SOURCE');
		
	},
	//查询单个数据源配置
	queryDataSourceById(id){
		ajax('GET', '/api/inputSource/queryById', {id:id}, 'SINGLE_DATA_SOURCE');
	},
	//创建数据源
	createDataSourceWithUpload(data){
		ajax('POST', '/api/inputSource/createWithUpload', data, 'CREATE_DATA_SOURCE');
	},
	updateDataSource(data){
		ajax('POST', '/api/inputSource/edit', data, 'UPDATE_DATA_SOURCE');
	},
	deleteDataSource(id){
		ajax('GET', '/api/inputSource/delete', {id:id}, 'DELETE_DATA_SOURCE');
	},
	//预览数据源
	previewDataSource(data){
		ajax('POST', '/api/inputSource/overview', data, 'PREVIEW_DATA_SOURCE');
	}
};
// 去重操作
function unique(data) {
	let lastData = []
	for (let i = 0; i < data.length; i++) {
		if (lastData.indexOf(data[i]) === -1) {
			lastData.push(data[i])
		}
	}
	return lastData;
}
