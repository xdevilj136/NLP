<template>
  <div class="right-content">
    <div class="title-show-box">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/main/task-manage' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form class="detail-form" label-position="right" label-width="100px">
      <el-form-item label="任务名称：">
        <span class="detail-right-label">{{taskManageDetail.name}}</span>
      </el-form-item>
      <el-form-item label="类型：">
        <span class="detail-right-label">{{taskManageDetail.type}}</span>

      </el-form-item>
      <el-form-item label="完成状态：">
        <span class="detail-right-label">{{taskManageDetail.status}}</span>

      </el-form-item>
      <el-form-item label="用时：">
        <span class="detail-right-label">{{taskManageDetail.consumedTime}}</span>

      </el-form-item>
      <el-form-item label="总记录数：">
        <span class="detail-right-label">{{taskManageDetail.totalRecordNumber}}</span>

      </el-form-item>
      <el-form-item label="输出位置：">
        <span class="detail-right-label">{{taskManageDetail.outputLocation}}</span>

      </el-form-item>

    </el-form>

    <div class="toolbar">
      <el-button v-if="indexMethods.canStart(taskManageDetail.status)" :disabled="indexMethods.startDisabled(taskManageDetail.status)" type="text" @click="indexMethods.startTask">开始</el-button>
      <el-button v-if="indexMethods.canStop(taskManageDetail.status)" type="text" @click="indexMethods.stopTask">终止</el-button>
      <el-button type="text" :disabled="indexMethods.editDisabled(taskManageDetail.status)" @click="indexMethods.editTask(taskManageDetail.id)">编辑</el-button>
      <el-button type="text" @click="deleteTask(taskManageDetail.name)">删除</el-button>
      <el-button type="text" :disabled="indexMethods.showLogDisabled(taskManageDetail.status)" @click="indexMethods.showTaskLog(taskManageDetail.id)">查看日志</el-button>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
      <span>删除后，该任务将无法正常执行。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="deleteDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import index from './index';

export default {
  name: 'task-manage-detail',
  data() {
    return {
      detail: this.getTaskManageDetail(this.$route.params.id),
      dialogVisible: false,
      dialogTitle: '',
      indexMethods: index.methods
    };
  },
  watch: {
  },
  computed: mapState(['taskManageDetail']),

  created() {
  },
  methods: {
    ...mapActions([
      'getTaskManageDetail'
    ]),
    deleteTask(name) {
      this.dialogVisible = true;
      this.dialogTitle = "确认删除 " + name + " ?"
    },
  }
}
</script>

<style lang="less" scoped>
.right-content {
  .breadcrumb {
    font-size: 16px;
    line-height: inherit;
  }
  .detail-form {
    & .el-form-item {
      margin: 0;
    }
  }
  .detail-left-label {
    height: 36px;
    line-height: 36px;
    float: left;
    width: 80px;
  }
  .detail-right-label {
    width: auto;
    color: grey;
  }
  .toolbar {
    position: absolute;
    right: 40px;
    top: 40px;
    margin-top: 32px;
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