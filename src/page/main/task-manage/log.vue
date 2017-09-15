<template>
  <div class="right-content">
    <div class="title-show-box">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/main/task-manage' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务日志</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-position="right" label-width="100px">
      <el-form-item label="任务名称：">
        <span>{{taskLog.name}}</span>
      </el-form-item>
      <el-form-item label="日志：">
        <el-input type="textarea" v-model="taskLog.content" :readonly="true" :autosize="{ minRows: 20}"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'log',
  data() {
    return {
      log: this.getTaskLog(this.$route.params.id)
    };
  },
  watch: {

  },
  computed: mapState(['taskLog']),

  created() {
  },
  methods: {
    ...mapActions([
      'getTaskLog'
    ])
  }
}
</script>

<style lang="less" scoped>
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
  }
}
</style>