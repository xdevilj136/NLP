const INFO_CONFIG = 'INFO_CONFIG'
const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST'
const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST'
const STOP_TASK_REQUEST = 'STOP_TASK_REQUEST'
const START_TASK_REQUEST = 'START_TASK_REQUEST'
const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
const TASK_MANAGE = 'TASK_MANAGE'
const SINGLE_TASK = 'SINGLE_TASK'
const TASK_LOG = 'TASK_LOG'
const TASK_RESULT = 'TASK_RESULT'
const AUTHORITY_MANAGE = 'AUTHORITY_MANAGE'
const DATA_EXTRACT = 'DATA_EXTRACT'
const ZSBANK_CREDIT = 'ZSBANK_CREDIT'
const ANALYSIS_GET = 'ANALYSIS_GET'
const LOGIN_CHECK = 'LOGIN_CHECK'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const DATA_SOURCE = 'DATA_SOURCE'
const SINGLE_DATA_SOURCE = 'SINGLE_DATA_SOURCE'
const CREATE_RULE_REQUEST = 'CREATE_RULE_REQUEST'
const UPDATE_RULE_REQUEST = 'UPDATE_RULE_REQUEST'
const PROCESS_COMPANY_SEGMENT = 'PROCESS_COMPANY_SEGMENT'
const PROCESS_COMPANY_STD = 'PROCESS_COMPANY_STD'
const DELETE_CONFIG_RULE = 'DELETE_CONFIG_RULE'
const CONFIG_RULE = 'CONFIG_RULE'
const CREATE_DATA_SOURCE = 'CREATE_DATA_SOURCE'
const UPDATE_DATA_SOURCE = 'UPDATE_DATA_SOURCE'
const DELETE_DATA_SOURCE = 'DELETE_DATA_SOURCE'
const PREVIEW_DATA_SOURCE = 'PREVIEW_DATA_SOURCE'

export default {
  //login
  [LOGIN_CHECK](state, data) {
    state.isCheck = data
  },
  //login
  [LOGIN](state, data) {
    state.isLogin = data
  },
  //logout
  [LOGOUT](state, data) {
    state.isLogout = data
  },
  //修改密码
  [CHANGE_PASSWORD](state, data) {
    state.changePasswordResponse = data
  },
  // 获取信息抽取配置
  [INFO_CONFIG](state, data) {
    state.configList = data
  },
  // 获取单个信息抽取配置规则
  [CONFIG_RULE](state, data) {
    state.configRule = data
  },
  //创建规则
  [CREATE_RULE_REQUEST](state, data) {
    state.createRuleResponse = data;
  },
  //创建规则
  [UPDATE_RULE_REQUEST](state, data) {
    state.updateRuleResponse = data;
  },
  // 删除信息抽取配置规则
  [DELETE_CONFIG_RULE](state, data) {
    state.deleteRuleResponse = data
  },
  //新建任务
  [CREATE_TASK_REQUEST](state, data) {
    state.createTaskResponse = data;
  },
  //修改任务
  [UPDATE_TASK_REQUEST](state, data) {
    state.updateTaskResponse = data;
  },
  //停止任务
  [STOP_TASK_REQUEST](state, data) {
    state.stopTaskResponse = data;
  },
  //开始任务
  [START_TASK_REQUEST](state, data) {
    state.startTaskResponse = data;
  },
  //删除任务
  [DELETE_TASK_REQUEST](state, data) {
    state.deleteTaskResponse = data;
  },
  //获取单个任务管理数据
  [SINGLE_TASK](state, data) {
    state.singleTask = data
  },
  //获取任务管理数据
  [TASK_MANAGE](state, data) {
    state.taskManageData = data
  },
  //获取任务日志
  [TASK_LOG](state, data) {
    state.taskLog = data
  },
  //获取任务输出结果
  [TASK_RESULT](state,data){
    state.taskResult = data
  },
  //获取权限管理数据
  [AUTHORITY_MANAGE](state, data) {
    state.authorityManage = data
  },

  // 信息抽取处理
  [DATA_EXTRACT](state, data) {
    state.extractedData = data
  },
  //招行授信解析
  [ZSBANK_CREDIT](state, data) {
    state.zsbankCreditResult = data
  },
  //词法分析
  [ANALYSIS_GET](state, data) {
    state.analysisData = data
  },
  //机构名标准化
  [PROCESS_COMPANY_STD](state, data) {
    state.companyStd = data
  },
  //机构名分析
  [PROCESS_COMPANY_SEGMENT](state, data) {
    state.companySegment = data
  },
  //创建数据源
  [CREATE_DATA_SOURCE](state, data) {
    state.createDataSourceResponse = data
  },
  //修改数据源配置
  [UPDATE_DATA_SOURCE](state, data) {
    state.updateDataSourceResponse = data
  },
  //删除数据源配置
  [DELETE_DATA_SOURCE](state, data) {
    state.deleteDataSourceResponse = data
  },
  //获取数据源
  [DATA_SOURCE](state, data) {
    state.dataSource = data
  },
  //查询单个数据源配置
  [SINGLE_DATA_SOURCE](state, data) {
    state.singleDataSource = data
  },
  //预览数据源
  [PREVIEW_DATA_SOURCE](state, data) {
    state.previewDataSourceResponse = data
  },


}
