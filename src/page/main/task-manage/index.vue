<template>
  <div class="right-content">
    <div class="title-show-box">
      <span>任务管理</span>
    </div>
    <div>
      <el-form :inline="true" :model="searchForm">
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
      <el-button class="fr" type="primary" @click="createTask" size="small">新增任务</el-button>
    </div>
    <el-table :data="taskManageData" border class="task-manage-task" 
    :default-sort = "{prop: 'time', order: 'descending'}">
      <el-table-column prop="name" label="任务名称" >
              <template scope="scope">
        <a style="color:#20a0ff;" href="javascript:void(0);" @click="showTaskDetail">{{scope.row.name}}</a>
      </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" ></el-table-column>
      <el-table-column prop="time" label="建立日期" :sortable="true"></el-table-column>
      <el-table-column prop="status" label="状态" :sortable="true"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <div v-if="hasCompleted(scope.row.status)">
            <el-button @click="handleClick" type="text" size="small">查看日志</el-button>
            <el-dropdown style="margin-left:10px;" @command="moreMenuCommand" trigger="click" menu-align="start">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="copy">复制</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else-if="notStart(scope.row.status)">
            <el-button @click="handleClick" type="text" size="small">开始</el-button>
            <el-button @click="handleClick" type="text" size="small">刷新</el-button>
            <el-dropdown style="margin-left:10px;" @command="moreMenuCommand" trigger="click" menu-align="start">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="copy">复制</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else-if="hasStarted(scope.row.status)">
            <el-button @click="handleClick" type="text" size="small">终止</el-button>
            <el-button @click="handleClick" type="text" size="small">刷新</el-button>
            <el-dropdown style="margin-left:10px;" @command="moreMenuCommand" trigger="click" menu-align="start">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="copy">复制</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
      }
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
    hasCompleted(status) {
      return status.indexOf('结束') !== -1;
    },
    notStart(status) {
      return status == '未开始';
    },
    hasStarted(status) {
      return status == '正在执行' || status == '等待开始';
    },
    //表格‘更多’菜单指令
    moreMenuCommand(command) {
      this.$message('click on item ' + command);
    },
    showTaskDetail(){
      this.$router.push('/main/task-manage/detail')
    },
    handleClick(data) {
      console.log(data)
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
  .task-manage-task {
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
}
</style>