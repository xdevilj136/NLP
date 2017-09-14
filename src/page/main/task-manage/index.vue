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
          <el-select v-model="searchForm.time" placeholder="请选择" size="small">
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
      <span class="lightFont">共搜索到{{taskManageData.length?taskManageData.length:0}}条数据</span>
      <div class="fr">
        <el-button @click="refreshTable" size="small">刷新</el-button>
        <el-button type="primary" @click="createTask" size="small">新增任务</el-button>
      </div>
    </div>
    <el-table :data="taskManageData" border class="task-manage-task" :default-sort="{prop: 'time', order: 'descending'}">
      <el-table-column prop="name" label="任务名称" min-width="230px">
        <template scope="scope">
          <a style="color:#20a0ff;" href="javascript:void(0);" @click="showTaskDetail(scope.row.id)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" min-width="150px"></el-table-column>
      <el-table-column prop="time" label="建立日期" :sortable="true"min-width="150px"></el-table-column>
      <el-table-column prop="status" label="状态" :sortable="true" min-width="150px"></el-table-column>
      <el-table-column label="操作" min-width="230px">
        <template scope="scope">
          <div class="toolbar">
            <el-button v-if="canStart(scope.row.status)" :disabled="startDisabled(scope.row.status)" type="text" @click="startTask">开始</el-button>
            <el-button v-if="canStop(scope.row.status)" type="text" @click="stopTask">终止</el-button>
            <el-button type="text" :disabled="editDisabled(scope.row.status)" @click="editTask">编辑</el-button>
            <el-button type="text" @click="deleteTask(scope.row)">删除</el-button>
            <el-button type="text" :disabled="showLogDisabled(scope.row.status)" @click="showTaskLog(scope.row)">查看日志</el-button>
          </div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
            <span>删除后，该任务将无法正常执行。</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click.native.prevent="deleteDialogConfirm(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'task-manage',
  data() {
    return {
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
        value: 'identity',
        label: '实体识别'
      },
      {
        value: 'judge',
        label: '裁判文书'
      },
      {
        value: 'visitRecord',
        label: '拜访记录'
      },
      {
        value: 'report',
        label: '调查报告解析'
      }],
      taskStatusOptions: [{
        value: 'all',
        label: '所有任务'
      }, {
        value: 'begin',
        label: '未开始'
      }, {
        value: 'running',
        label: '正在执行'
      }, {
        value: 'end',
        label: '已结束'
      }],
      searchForm: {
        taskType: '',
        taskStatus: '',
        time: ''
      },
      dialogTitle: '',
      dialogVisible: false
    }
  },
  watch: {

  },
  computed: mapState(['taskManageData']),

  created() {
  },
  methods: {
    ...mapActions([
      'getTaskManageData'
    ]),
    //判断每行任务状态
    hasCompleted(status) {
      return status=='已结束';
    },
    errorCompleted(status){
      return status == '非正常结束';
    },
    notStart(status) {
      return status == '未开始';
    },
    readyToStart(status){
      return status == '等待开始';
    },
    isRunning(status) {
      return status == '正在执行';
    },
    //根据任务状态置灰对应操作
    canStart(status){
      return this.notStart(status)||this.hasCompleted(status)||this.errorCompleted(status);
    },
    canStop(status){
      return this.readyToStart(status)||this.isRunning(status);
    },
    startDisabled(status){
      return this.hasCompleted(status)||this.errorCompleted(status);
    },
    editDisabled(status){
      return this.isRunning(status)||this.readyToStart(status)||this.hasCompleted(status);
    },
    showLogDisabled(status){
      return this.notStart(status)||this.readyToStart(status);
    },
    showTaskDetail(id) {
      this.$router.push('/main/task-manage/detail/' + id)
    },
    refreshTable() {

    },
    startTask() {

    },
    stopTask() {

    },
    editTask() {
    },
    deleteTask(row) {
      this.dialogVisible = true;
      this.dialogTitle = "确认删除 " + row.name + " ?"
    },
    showTaskLog(row) {
      this.$router.push('/main/task-manage/log/' + row.id)
    },
    deleteDialogConfirm(row) {
      console.log(row);
      this.dialogVisible = false;
    },
    createTask() {
      this.$router.push('/main/task-manage/create')
    },
    handleCurrentChange(page) {
      console.log(page)
    },
    searchSubmit() {
      this.getTaskManageData();
    }
  }
}
</script>

<style lang="less">
.lightFont {
  color: gray;
}

.right-content {
  padding: 40px;
  .searchBar {
    & .el-select {
      width: 150px;
    }
  }
  .task-manage-task {
    width: 100%;
    margin-top: 16px;
  }
  .title-show-box {
    border-bottom: 1px solid #E8E8E8;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .block {
    text-align: right;
    margin-top: 30px
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