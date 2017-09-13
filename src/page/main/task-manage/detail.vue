<template>
  <div class="right-content">
    <div class="title-show-box">
      <span>任务详情</span>
    </div>
    <div class="clearfix">
      <span class="detail-left-label">任务名称:</span>
      <div class="detail-right-content-box">
        <span></span>
      </div>
    </div>
    <div class="clearfix mgt15">
      <el-button @click="editDetail" type="primary" size="small">编辑</el-button>
      <el-button @click="deleteDetail" size="small">删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'task-manage-detail',
  watch: {
  },
  created() {
  },
  methods: {
    deleteDetail() {
    },
    editDetail() {
    }
  }
}
</script>

<style lang="less">
.right-content {
  padding: 40px;
  .title-show-box {
    border-bottom: 1px solid #E8E8E8;
    font-size: 16px;
    margin-bottom: 10px;
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