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
        <span class="detail-right-label">{{detail.name}}</span>
      </el-form-item>
      <el-form-item label="类型：">
        <span class="detail-right-label">{{detail.type | taskTypeFilter}}</span>
      </el-form-item>
      <el-form-item label="完成状态：">
        <span class="detail-right-label">{{detail.status | taskStatusFilter}}</span>
      </el-form-item>
      <el-form-item label="用时：">
        <span class="detail-right-label">{{detail.duration | taskDurationFilter}}</span>
      </el-form-item>
      <el-form-item label="总记录数：">
        <span class="detail-right-label">{{detail.outputCount}}</span>
      </el-form-item>
      <el-form-item >
        <el-button :disabled="!indexMethods.hasCompleted(detail.status)" type="text" class="common_a" @click="download">下载输出文件</el-button>
      </el-form-item>
          <div class="toolbar">
      <el-button v-if="indexMethods.canStart(detail.status)" :disabled="indexMethods.startDisabled(detail.status)" type="text" @click="startTask(detail.id)">开始</el-button>
      <el-button v-if="indexMethods.canStop(detail.status)" type="text" @click="stopTask(detail.id)">终止</el-button>
      <el-button type="text" :disabled="indexMethods.editDisabled(detail.status)" @click="editTask(detail.id)">编辑</el-button>
      <el-button type="text" @click="deleteTask(detail.name,detail.id)">删除</el-button>
      <el-button type="text" :disabled="indexMethods.showLogDisabled(detail.status)" @click="showTaskLog(detail.id)">查看日志</el-button>
    </div>
    
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import index from './index';
import utils from 'src/config/utils'

export default {
  name: 'task-manage-detail',
  data() {
    return {
      detail: {
        name: '',
        type: '',
        status: '',
        duration: '',
        outputCount: '',
        outputPath: ''
      },
      indexMethods: index.methods,
      toDeleteTaskId: ''
    };
  },
  watch: {
    singleTask: function(singleTask) {
      if (singleTask.result) {
        this.detail = Object.assign({}, singleTask.result)
      }
    },
    deleteTaskResponse: function(response) {
      utils.notifyResponse(response, () => { this.$router.go(-1) })
    },
    stopTaskResponse: function(response) {
      utils.notifyResponse(response, () => { this.$router.go(-1) })
    },
    startTaskResponse: function(response) {
      utils.notifyResponse(response, () => { this.$router.go(-1) })
    }

  },
  computed: mapState([
    'singleTask',
    'stopTaskResponse',
    'startTaskResponse',
    'deleteTaskResponse'
  ]),

  created() {
    this.queryTaskById(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      'queryTaskById',
      'deleteTaskRequest',
      'startTaskRequest',
      'stopTaskRequest'
    ]),
    //操作菜单
    startTask(id) {
      this.startTaskRequest(id);
    },
    stopTask(id) {
      this.stopTaskRequest(id);
    },
    editTask(id) {
      this.$router.push('/main/task-manage/edit/' + id)
    },
    deleteTask(name, id) {
      this.toDeleteTaskId = id;
      this.$confirm('删除后，该任务将无法正常执行。', '确认删除 ' + name + ' ?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDialogConfirm()
      }).catch(() => {

      });
    },
    showTaskLog(id) {
      this.$router.push('/main/task-manage/log/' + id)
    },
    deleteDialogConfirm() {
      this.deleteTaskRequest(this.toDeleteTaskId);
    },
    //下载文件
    download(){
      window.open('api/task/output?id='+this.$route.params.id)
    }
  },
  filters: {
    taskTypeFilter: function(value) {
      let result = ''
      switch (value) {
        case 0:
          result = "中文分词"
          break;
        case 1:
          result = "词性标注"
          break;
        case 2:
          result = "实体识别"
          break;
        case 3:
          result = "信息抽取"
          break;
        case 5:
          result = "机构名标准化"
          break;
        case 6:
          result = "机构名识别"
          break;
        case 9:
          result = "招行授信报告解析"
          break;

        default:
          break;
      }
      return result
    },
    taskStatusFilter: function(value) {
      let result = '';
      switch (value) {
        case 0:
          result = "未开始"
          break;
        case 1:
          result = "正在执行"
          break;
        case 2:
          result = "等待开始"
          break;
        case 2:
          result = "停止中"
          break;
        case 4:
          result = "已经结束"
          break;
        case 5:
          result = "非正常结束"
          break;
        default:
          break;
      }
      return result;
    },
    taskDurationFilter: function(value_ms) {
      if (typeof value_ms == 'number') {
        let days = parseInt(value_ms / (1000 * 60 * 60 * 24))
        let hours = parseInt((value_ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = parseInt((value_ms % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = parseInt((value_ms % (1000 * 60)) / 1000)
        let daysStr = (days == 0) ? '' : days + '天'
        let hoursStr = (hours == 0) ? '' : hours + '小时'
        let minutesStr = (minutes == 0) ? '' : minutes + '分'
        let secondsStr = (seconds == 0) ? '' : seconds + '秒'
        return (daysStr + hoursStr + minutesStr + secondsStr) || 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common_a{
  &:hover{
    text-decoration: underline;
  }
}
.right-content {
  .breadcrumb {
    font-size: 16px;
    line-height: inherit;
  }
  .detail-form {
    position: relative;
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
      top: 5px;
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