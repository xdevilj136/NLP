<template>
<div class="left-nav-box">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</div>
</template>
<script scoped>
import { mapActions } from 'vuex'
export default {
	name: 'leftNav',
    data () {
      return {
        data: [{
          label: '任务管理',
          value: 'task-manage'
        },{
          label: '数据源配置',
          value: 'data-config'
        },{
          label: '目标流配置',
          value: 'test'
        },{
          label: 'NLP服务配置',
          value: 'NLP服务配置'
        },{
          label: '信息抽取配置',
          value: '信息抽取配置',
          children: [{
              label: '招中标',
              value: '招中标'
          }, {
              label: '拜访记录',
              value: '拜访记录'
          }, {
              label: '授信批文解析',
              value: '授信批文解析'
          }, {
              label: '调查报告解析',
              value: '调查报告解析'
          }]
        },{
          label: '功能展示',
          value: '功能展示',
          children: [{
              label: '信息抽取',
              value: '信息抽取'
          }, {
              label: '词法分析',
              value: '词法分析'
          }, {
              label: '机构名识别',
              value: '机构名识别'
          }]
        },{
          label: '用户与权限管理',
          value: 'test'
        }],
        defaultProps: {
          children: 'children',
          label: 'label',
          value: 'value'
        }
      }
    },
    created(){
      console.log(this.$router)
      console.log(this.$route)
    },
    methods: {
      ...mapActions([
  			'changeTest', 'changeTest',
  		]),
      testVue () {
        console.log('begin vuex')
      },
      handleNodeClick(data) {
        this.changeTest(data)
        this.$router.push('/main/' + data.value)
      }
    }
}
</script>

<style lang="less">
.left-nav-box {
    float: left;
    top: 64px;
    height: 100%;
    width: 200px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: auto;
    color: #666;
    .el-tree {
      border: none;
      padding-top: 32px;
      .el-tree-node {
        &:hover, &.is-current {
          background: #E9F5FF;
          color: #249CFF;
          &.is-expanded {
            background: white;
            color: #666
          }
        }
      }
    }
}
</style>