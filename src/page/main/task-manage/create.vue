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
          <el-select v-model="task.value" class="input" :disabled="task.type === '信息抽取'? false: true" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="clearfix mgt15">
      <span class="detail-left-label">输入数据:</span>
      <div class="detail-right-content-box">
        <el-select v-model="task.input" class="input" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="task.value" class="input" :disabled="task.type === '信息抽取'? false: true" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="task.value" class="input" :disabled="task.type === '信息抽取'? false: true" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="clearfix mgt15">
      <span class="detail-left-label">输出目标:</span>
      <div class="detail-right-content-box">
        <el-select v-model="task.output" class="input" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="task.value" class="input" :disabled="task.type === '信息抽取'? false: true" placeholder="请选择" size="small">
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
export default {
  name: 'task-manage-create',
  data() {
    return {
      task: {
        name: '',
        type: '',
        value: '',
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
        value: '信息抽取',
        label: '信息抽取'
      }, {
        value: '中文分词',
        label: '中文分词'
      }, {
        value: '词性标注',
        label: '词性标注'
      }, {
        value: '实体识别',
        label: '实体识别'
      }, {
        value: '机构名标准化',
        label: '机构名标准化'
      }, {
        value: '机构名识别',
        label: '机构名识别'
      }, {
        value: '未选中项目',
        label: '未选中项目'
      }]
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    createTask(){

    },
    saveTask() {
      this.$notify({
        message: '保存成功，页面即将自动关闭',
        type: 'success',
        duration: 2000,
        offset: 200
      });
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