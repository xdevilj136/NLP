<template>
  <div class="right-content">
    <div class="title-show-box">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/main/task-manage' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix mgt15">
      <span class="detail-left-label">任务名称:</span>
      <div class="detail-right-content-box">
        <el-input v-model="task.name" class="input" placeholder="请输入任务名称" size="small"></el-input>
      </div>
    </div>
    <div class="clearfix mgt15">
      <span class="detail-left-label">任务类型:</span>
      <div class="detail-right-content-box">
        <div>
          <el-select v-model="task.type" class="input" placeholder="请选择" size="small">
            <el-option v-for="item in taskTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="task.extractConfigId" class="input" :disabled="task.type === 3? false: true" placeholder="请选择" size="small">
            <el-option v-for="item in ruleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="clearfix mgt15">
      <span class="detail-left-label">数据名称:</span>
      <div class="detail-right-content-box">
        <el-select v-model="task.dataSourceIndex" class="input" placeholder="请选择" size="small">
          <el-option v-for="(item,index) in DataSourceOptions" :key="index" :label="item.name" :value="index">
          </el-option>
        </el-select>
      </div>
    </div>
    <div v-if="targetColumnShow" class="clearfix mgt15">
      <span class="detail-left-label">目标列:</span>
      <div class="detail-right-content-box">
        <el-select v-model="task.targetColumn" class="input" placeholder="请选择" size="small">
          <el-option v-for="item in columnOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="clearfix mgt15">
      <el-button v-if="$route.name=='task-manage-create'" @click="createTask" type="primary" size="small">创建</el-button>
      <el-button v-if="$route.name=='task-manage-edit'" @click="saveTask" type="primary" size="small">保存</el-button>
      <el-button @click="goBack" size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
  name: 'task-manage-create',
  data() {
    return {
      task: {
        name: '',
        type: '',
        extractConfigId: '',
        dataSourceIndex: '',
        targetColumn: ''
      },
      //目标列
      columnOptions: [],
      taskTypeOptions: [
      {
        value: 0,
        label: '中文分词'
      }, {
        value: 1,
        label: '词性标注'
      }, {
        value: 2,
        label: '实体识别'
      }, {
        value: 3,
        label: '信息抽取'
      }, {
        value: 5,
        label: '机构名标准化'
      },{
        value: 6,
        label: '机构名识别'
      },{
        value: 9,
        label: '招行授信报告解析'
      }],
      //可选数据源（数据名称）
      DataSourceOptions: [],
      ruleList: []
    }
  },
  computed: {
    ...mapState([
      'createTaskResponse',
      'updateTaskResponse',
      'configList',
      'singleTask',
      'dataSource'
    ]),
    targetColumnShow: function() {
      let selectedDataSource = this.DataSourceOptions[this.task.dataSourceIndex]
      if (selectedDataSource && selectedDataSource.config) {
        if (JSON.parse(selectedDataSource.config).inputType !== 'txt') {
          let cols=JSON.parse(selectedDataSource.overview).cols
          this.columnOptions=[]
          for (var index = 0; index < cols; index++) {
            this.columnOptions.push({
              label:index+1,
              value:index+1
              })
          }
          return true
        }
      }
      return false
    }
  },
  watch: {
    createTaskResponse: function(response) {
      utils.notifyResponse(response, () => this.$router.go(-1))
    },
    updateTaskResponse: function(response) {
      utils.notifyResponse(response, () => this.$router.go(-1))
    },
    configList: function(configList) {
      if (configList.result && configList.result.list) {
        this.ruleList = this.configList.result.list
      }
    },
    singleTask: function(singleTask) {
      if (singleTask.result) {
        this.task = Object.assign(this.task, this.singleTask.result);
        this.DataSourceOptions.forEach(function(element, index) {
          if (element.id == this.task.inputSourceId) {
            this.task.dataSourceIndex = index
          }
        }, this);
        if (this.task.inputConfig) {
          this.task.targetColumn = JSON.parse(this.task.inputConfig).column
        }
      }
    },
    dataSource: function(data) {
      if (data.result && data.result.list) {
        this.DataSourceOptions = data.result.list
        if (this.$route.name == 'task-manage-edit') {
          this.queryTaskById(this.$route.params.id)
        }
      }
    }
  },
  created() {
    this.getDataSource()
    this.getInfoConfig()
  },
  methods: {
    ...mapActions([
      'createTaskRequest',
      'updateTaskRequest',
      'getInfoConfig',
      'queryTaskById',
      'getDataSource'
    ]),
    goBack() {
      this.$router.go(-1)
    },
    submitValidate() {
      let valid = true;
      if (this.task.name === '' || this.task.type === '' || this.task.dataSourceIndex === '') {
        valid = false;
      }
      if (this.task.type == 3 && this.task.extractConfigId === '') {
        valid = false;
      }
      if (this.targetColumnShow && this.task.targetColumn == '') {
        valid = false
      }
      return valid;
    },
    generateNewTask() {
      let newTask = {};
      newTask.name = this.task.name.trim();
      newTask.type = this.task.type;
      if (newTask.type == 3) {
        newTask.extractConfigId = this.task.extractConfigId;
      }
      newTask.inputSourceId = this.DataSourceOptions[this.task.dataSourceIndex].id;
      if (this.targetColumnShow) {
        newTask.inputConfig = JSON.stringify({
          column: this.task.targetColumn
        })
      }
      newTask.service = 0;
      return newTask
    },
    createTask() {
      if (this.submitValidate()) {
        let newTask = this.generateNewTask()
        this.createTaskRequest(newTask);
      } else {
        this.$alert('请输入或选择数据', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
    },
    saveTask() {
      if (this.submitValidate()) {
        let newTask = this.generateNewTask()
        newTask.id = Number(this.$route.params.id);
        this.updateTaskRequest(newTask);
      } else {
        this.$alert('请输入或选择数据', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
    }
  }
}
</script>

<style lang="less">
.right-content {
  .breadcrumb {
    font-size: 16px;
    line-height: inherit;
  }
  .detail-left-label {
    height: 36px;
    line-height: 36px;
    float: left;
    width: 100px;
  }
  .detail-right-content-box {
    float: left;
    width: calc(~"100% - 100px");
    .input {
      width: 250px;
    }
    .radio:not(:first-child) {
      margin-right: 20px;
      margin-top: 15px;
      margin-left: 0;
      width: 100px;
    }
  }
}
</style>