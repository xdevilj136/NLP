<template>
<div>
  <div class="config-content-box clearfix">
    <span class="config-content-title">规则名称：</span>
    <el-input class="config-content-input1" 
    v-model="data.name" placeholder="请输入内容"></el-input>
  </div>
  <div class="config-content-box clearfix">
    <span class="config-content-title">匹配规则：</span>
    <el-input class="config-content-input" 
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 5}"
      placeholder="请输入内容"
      v-model="data.match_rule">
    </el-input>
  </div>
  <div class="config-content-box clearfix">
    <span class="config-content-title">触发规则：</span>
    <el-input
      type="textarea" class="config-content-input"
      :autosize="{ minRows: 5, maxRows: 5}"
      placeholder="请输入内容"
      v-model="data.trigger_rule">
    </el-input>
    <p class="config-content-desc">匹配规则与触发规则必填一项</p>
  </div>
  <div class="config-content-box clearfix">
    <span>只匹配一次：</span>
    <el-radio class="radio" v-model="data.once" label="true">是</el-radio>
    <el-radio class="radio" v-model="data.once" label="false">否</el-radio>
  </div>
  <div class="action-box">
    <el-button type="primary">创建</el-button>
    <el-button>取消</el-button>
  </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'function-display',
    data () {
      return {
        data: {
          name: '',
          match_rule: '',
          trigger_rule: '',
          once: 'true'
        },
        title: ''
      }
    },
    computed: mapState(['analysiData']),
    watch: {
      '$route' (newVal, oldVal) {
      }
    },
    created(){
    },
    methods: {
    }
}
</script>

<style lang="less">
.config-content-box {
  margin: 15px 0;
  .config-content-title {
    height: 36px;
    line-height: 36px;
    color: #666;
    font-size: 14px;
    width: 100px;
    float: left;
  }
  .config-content-input1 {
    float: left;
    width: 200px;
  }
  .config-content-input {
    float: left;
    width: 400px;
  }
  .config-content-desc {
    clear: both;
    padding: 10px 100px;
    color: #999
  }
}
.action-box {
  margin: 50px 0 0 90px
}
</style>