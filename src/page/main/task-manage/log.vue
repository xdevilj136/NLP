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
        <span>{{log.name}}</span>
      </el-form-item>
      <el-form-item label="日志：">
        <el-input type="textarea" v-model="log.content" :readonly="true" :autosize="{ minRows: 20}"></el-input>
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
      log: {
        name:'',
        content:''
      }
    };
  },
  watch: {
    taskLog: function(data) {
      if ('result' in data) {
        if (data.error) {
          this.$notify({
                    message: data.errorMessage,
                    type: 'warnning',
                    duration: 2000,
                    offset: 200
                });
                this.$router.go(-1);
        }
        else {
          this.log.name = data.result.name;
          this.log.content = data.result.log;
        }
      }
    }
  },
  computed: mapState(['taskLog']),

  created() {
    this.getTaskLog(this.$route.params.id)
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