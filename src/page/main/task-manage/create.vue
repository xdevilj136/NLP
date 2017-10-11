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
        <el-select v-model="task.inputSourceId" class="input" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="clearfix mgt15">
      <span class="detail-left-label">目标列:</span>
      <div class="detail-right-content-box">
        <el-select v-model="task.outputSourceId" class="input" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
        input: '',
        output: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      taskTypeOptions: [{
        value: 3,
        label: '信息抽取'
      }, {
        value: 0,
        label: '中文分词'
      }, {
        value: 1,
        label: '词性标注'
      }, {
        value: 2,
        label: '实体识别'
      }, {
        value: 5,
        label: '机构名标准化'
      }, {
        value: '机构名识别',
        label: '机构名识别'
      }, {
        value: '未选中项目',
        label: '未选中项目'
      }],
      ruleList:[]
    }
  },
    computed: mapState([
    'createTaskResponse',
    'updateTaskResponse',
    'configList',
    'singleTask'
  ]),
  watch: {
    createTaskResponse: function(response) {
      utils.notifyResponse(response,()=>this.$router.go(-1))
    },
    updateTaskResponse: function(response) {
      utils.notifyResponse(response,()=>this.$router.go(-1))
    },
    configList: function(configList) {
      if (configList.result&&configList.result.list) {
        this.ruleList = this.configList.result.list
      }
    },
    singleTask:function(singleTask){
      if (singleTask.result) {
        this.task = Object.assign({}, this.singleTask.result);
      }
    }
  },
  created() {
    this.getInfoConfig();
    if (this.$route.name == 'task-manage-edit') {
      this.queryTaskById(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions([
      'createTaskRequest',
      'updateTaskRequest',
      'getInfoConfig',
      'queryTaskById'
      ]),
    goBack() {
      this.$router.go(-1)
    },
    submitValidate(){
      let valid=true;
      if(this.task.name===''||this.task.type===''||this.task.inputSourceId===''||this.task.inputSourceId===''){
        valid=false;
      }
      if(this.task.type&&this.task.extractConfigId===''){
        valid=false;
      }
      return valid;
    },
    createTask(){
      if (this.submitValidate()) {
        var newTask={};
        newTask.name=this.task.name.trim();
        newTask.type=this.task.type;
        if(newTask.type==3){
          newTask.extractConfigId=this.task.extractConfigId;
        }
        newTask.inputSourceId=1;
        newTask.inputConfig="{\"column\":2}";
        newTask.service=0;

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
        var newTask={};
        newTask.name=this.task.name.trim();
        newTask.type=this.task.type;
        if(newTask.type==3){
          newTask.extractConfigId=1;
        }
        newTask.inputSourceId=1;
        newTask.inputConfig="{\"column\":2}";
        newTask.service=0;
        newTask.id=Number(this.$route.params.id);

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
    width: 80px;
  }
  .detail-right-content-box {
    float: left;
    width: calc(~"100% - 80px");
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