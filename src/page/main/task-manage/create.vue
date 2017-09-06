<template>
<div class="right-content">
  <div class="clearfix">
    <span class="detail-left-label">任务名称:</span>
    <div class="detail-right-content-box">
      <el-input v-model="task.name" class="input"
      placeholder="请输入任务名称"></el-input>
    </div>
  </div>
  <div class="clearfix mgt15">
    <span class="detail-left-label">任务类型:</span>
    <div class="detail-right-content-box">
      <div>
        <el-radio class="radio" v-model="task.type" label="信息抽取">信息抽取</el-radio>
        <el-select v-model="task.value" class="input"
        :disabled="task.type === '信息抽取'? false: true"
        placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-radio class="radio" v-model="task.type" label="中文分词">中文分词</el-radio>
      <el-radio class="radio" v-model="task.type" label="词性标注">词性标注</el-radio>
      <el-radio class="radio" v-model="task.type" label="实体识别">实体识别</el-radio>
      <el-radio class="radio" v-model="task.type" label="机构名标准化">机构名标准化</el-radio>
      <el-radio class="radio" v-model="task.type" label="机构名识别">机构名识别</el-radio>
      <el-radio class="radio" v-model="task.type" label="未选中项0">未选中项0</el-radio>
      <el-radio class="radio" v-model="task.type" label="未选中项1">未选中项1</el-radio>
      <el-radio class="radio" v-model="task.type" label="未选中项2">未选中项2</el-radio>
      <el-radio class="radio" v-model="task.type" label="未选中项3">未选中项3</el-radio>
    </div>
  </div>
  <div class="clearfix mgt15">
    <span class="detail-left-label">输入数据:</span>
    <div class="detail-right-content-box">
      <el-select v-model="task.input" class="input"
      placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
  <div class="clearfix mgt15">
    <span class="detail-left-label">输出目标:</span>
    <div class="detail-right-content-box">
      <el-select v-model="task.output" class="input"
      placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
  <div class="clearfix mgt15">
    <el-button @click="save" type="primary">保存</el-button>
    <el-button @click="goBack">取消</el-button>
  </div>
</div>
</template>
<script>
export default {
	name: 'task-manage-create',
    data () {
      return {
        task: {
          name: '',
          type: '信息抽取',
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
          }]
      }
    },
    watch: {
      'task.type' (newData, oldData) {
        this.task.value = ''
      }
    },
    created(){
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      save () {
        let self = this
        this.$notify({
          title: '成功',
          message: self.task,
          type: 'success',
          duration: 1000
        });
      }
    }
}
</script>

<style lang="less">
.right-content {
  padding: 40px;
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