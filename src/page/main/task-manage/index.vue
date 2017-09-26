<template>
  <div class="right-content">
    <div class="title-show-box">
      <span>任务管理</span>
    </div>
    <div>
      <el-form :inline="true" :model="searchForm" class="searchBar">
        <el-form-item label="任务类型：">
          <el-select v-model="searchForm.taskType" placeholder="请选择" size="small">
            <el-option v-for="item in taskTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建立日期：">
          <el-select v-model="searchForm.timeRange" placeholder="请选择" size="small">
            <el-option v-for="item in timeRangeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态：">
          <el-select v-model="searchForm.taskStatus" placeholder="请选择" size="small">
            <el-option v-for="item in taskStatusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="overflow:hidden;">
      <span class="lightFont">共搜索到{{taskList.length?taskList.length:0}}条数据</span>
      <div class="fr">
        <el-button @click="refreshTask" size="small">刷新</el-button>
        <el-button type="primary" @click="createTask" size="small">新增任务</el-button>
      </div>
    </div>
    <el-table :data="taskList" border class="data-table" :default-sort="{prop: 'time', order: 'descending'}">
      <el-table-column prop="name" label="任务名称" min-width="230px">
        <template scope="scope">
          <router-link :to="'/main/task-manage/detail/' + scope.row.id">{{ scope.row.name }}</router-link>

        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" :formatter="taskTypeFormatter" min-width="150px"></el-table-column>
      <el-table-column prop="ctime" label="建立日期" :sortable="true" min-width="150px"></el-table-column>
      <el-table-column prop="status" label="状态" :sortable="true" :formatter="taskStatusFormatter" min-width="150px"></el-table-column>
      <el-table-column label="操作" min-width="230px">
        <template scope="scope">
          <div class="toolbar">
            <el-button v-if="canStart(scope.row.status)" :disabled="startDisabled(scope.row.status)" type="text" @click="startTask">开始</el-button>
            <el-button v-if="canStop(scope.row.status)" type="text" @click="stopTask(scope.row)">终止</el-button>
            <el-button type="text" :disabled="editDisabled(scope.row.status)" @click="editTask(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="deleteTask(scope.row)">删除</el-button>
            <el-button type="text" :disabled="showLogDisabled(scope.row.status)" @click="showTaskLog(scope.row.id)">查看日志</el-button>
          </div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
            <span>删除后，该任务将无法正常执行。</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click.native.prevent="deleteDialogConfirm">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page="currentPage" :page-sizes="[5, 10,50, 100]" :page-size="10" :total="taskList.length" layout=" prev, pager, next, sizes, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
  name: 'task-manage',
  data() {
    return {
      //查询条件
      timeRangeOptions: [{
        value: 'oneMonth',
        label: '近一个月'
      },
      {
        value: 'threeMonth',
        label: '近三个月'
      },
      {
        value: 'halfYear',
        label: '近半年'
      },
      {
        value: 'oneYear',
        label: '近一年'
      },
      {
        value: 'beyondOneYear',
        label: '一年以上'
      }],                 
      taskTypeOptions: [{
        value: 0,
        label: '中文分词'
      },
      {
        value: 1,
        label: '词性标注'
      },
      {
        value: 2,
        label: '实体识别'
      },
      {
        value: 3,
        label: '信息抽取'
      },
      {
        value: 5,
        label: '企业名称标准化'
      }],
      taskStatusOptions: [{
        value: '',
        label: '所有任务'
      }, {
        value: 0,
        label: '未开始'
      }, {
        value: 1,
        label: '正在执行'
      }, {
        value: 2,
        label: '等待开始'
      }, {
        value: 4,
        label: '已经结束'
      }, {
        value: 5,
        label: '非正常结束'
      }],
      taskList:[

      ],
      //查询条件表单
      searchForm: {
        taskType: '',
        taskStatus: '',
        timeRange: ''
      },
      //最近查询条件记录
      latestSearch: {
        taskType: '',
        taskStatus: '',
        timeRange: ''
      },
      //对话框
      dialogTitle: '',
      dialogVisible: false,
      //翻页组件
      currentPage: 1,
      //待删除任务id
      toDeleteTaskId:''
    }
  },

  computed: mapState([
    'taskManageData',
    'stopTaskResponse',
    'deleteTaskResponse'
    ]),
  watch: {
    deleteTaskResponse: function(response) {
      utils.notifyResponse(response,()=>{this.refreshTask()})
    },
    stopTaskResponse: function(response) {
      utils.notifyResponse(response,()=>{this.refreshTask()})
    },
    taskManageData:function(data){
      if (data.result&&data.result.list) {
        this.taskList = data.result.list
      }
    }
  },
  created() {
        this.refreshTask();
  },
  methods: {
    ...mapActions([
      'getTaskManageData',
      'stopTaskRequest',
      'deleteTaskRequest'
    ]),
    //任务类型格式化
    taskTypeFormatter(row, column, cellValue){
      let result='';
      switch (cellValue) {
        case 0:
          result="中文分词"
          break;
        case 1:
          result="词性标注"
          break;
        case 2:
          result="实体识别"
          break;
        case 3:
          result="信息抽取"
          break;
        case 5:
          result="企业名称标准化"
          break;                          
        default:
          break;
      }
      return result;
    },
    //任务状态格式化
    taskStatusFormatter(row, column, cellValue){
      let result='';
      switch (cellValue) {
        case 0:
          result="未开始"
          break;
        case 1:
          result="正在执行"
          break;
        case 2:
          result="等待开始"
          break;
        case 4:
          result="已经结束"
          break;   
        case 5:
          result="非正常结束"
          break;                                  
        default:
          break;
      }
      return result;
    },
    //判断每行任务状态
    hasCompleted(status) {
      //已结束
      return status == 4;
    },
    errorCompleted(status) {
      //非正常结束
      return status == 5;
    },
    notStart(status) {
      //未开始
      return status == 0;
    },
    readyToStart(status) {
      //等待开始
      return status == 2;
    },
    isRunning(status) {
      //正在执行
      return status == 1;
    },
    //根据任务状态置灰对应操作
    canStart(status) {
      return this.notStart(status) || this.hasCompleted(status) || this.errorCompleted(status);
    },
    canStop(status) {
      return this.readyToStart(status) || this.isRunning(status);
    },
    startDisabled(status) {
      return this.hasCompleted(status) || this.errorCompleted(status);
    },
    editDisabled(status) {
      return this.isRunning(status) || this.readyToStart(status) || this.hasCompleted(status);
    },
    showLogDisabled(status) {
      return this.notStart(status) || this.readyToStart(status);
    },
      //计算时间 （最近时间范围）-》建立时间
    computeCreateTime(timeRange) {
      let timeRange_ms = '';
      switch (timeRange) {
        case 'oneMonth':
          timeRange_ms = 30 * 24 * 60 * 60 * 1000;
          break;
        case 'threeMonth':
          timeRange_ms = 3 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'halfYear':
          timeRange_ms = 6 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'oneYear':
          timeRange_ms = 12 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'beyondOneYear':
          timeRange_ms = 12 * 30 * 24 * 60 * 60 * 1000;
          break;
      };
      return (timeRange_ms ? (new Date(Date.now() - timeRange_ms).toLocaleDateString()) : '').replace(/\//g, '-');
    },
    //跳转详情
    showTaskDetail(id) {
      this.$router.push('/main/task-manage/detail/' + id)
    },
    //查询确认
    searchSubmit() {
      this.latestSearch = this.clone(this.searchForm);
      this.refreshTaskTable(this.searchForm);
    },
    refreshTaskTable(requirement){
      let taskType = requirement.taskType;
      let taskStatus = requirement.taskStatus;
      //计算建立时间
      let createTime = this.computeCreateTime(requirement.timeRange);
      //查询参数
      let params = {};
      if (taskType!=='') params.t = taskType;
      if (taskStatus!=='') params.s = taskStatus;
      if(createTime!=='') params.bt=createTime
      this.getTaskManageData(params);
    },  
    //根据上一次查询条件刷新任务列表
    refreshTask(){
      console.log(this.latestSearch)
      this.refreshTaskTable(this.latestSearch);
    },
    //新增任务
    createTask() {
      this.$router.push('/main/task-manage/create')
    },
    //操作菜单
    startTask() {

    },
    stopTask(row) {
      this.stopTaskRequest(row.id);
    },
    editTask(id) {
      this.$router.push('/main/task-manage/edit/'+id)
    },
    deleteTask(row) {
      this.dialogVisible = true;
      this.dialogTitle = "确认删除 " + row.name + " ?"
      this.toDeleteTaskId = row.id;
    },
    showTaskLog(id) {
      this.$router.push('/main/task-manage/log/' + id)
    },
    //对话框确认
    deleteDialogConfirm() {
      this.dialogVisible = false;
      this.deleteTaskRequest(this.toDeleteTaskId);
    },
    //翻页组件操作
    currentPageChange(currentPage) {
      console.log(currentPage)
    },
    pageSizeChange(pageSize) {
      console.log(pageSize)
    },
    clone(origin) {
      return Object.assign({}, origin);
    }

  }
}
</script>

<style lang="less">
.lightFont {
  color: gray;
}

.right-content {
  .searchBar {
    & .el-select {
      width: 150px;
    }
  }


  .block {
    text-align: right;
    margin-top: 30px;
  }
  .el-pagination {
    button,
    input {
      border: 1px solid #d1dbe5;
      border-radius: 5px;
    }
    .el-input {
      input {
        border-radius: 5px;
      }
    }
    .btn-next {
      margin: 0 10px;
    }
    .el-pager {
      li {
        margin-left: 10px;
        border: 1px solid #d1dbe5;
        border-radius: 5px;
      }
    }
  }
  .toolbar {
    button {
      margin: 0;
      &:after {
        content: " |";
        display: inline;
      }
      &:last-child:after {
        display: none;
      }
    }
  }
}
</style>