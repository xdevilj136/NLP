<template>
<div class="left-nav-box">
    <el-tree :data="data.list" 
    node-key="value"
    :props="data.defaultProps" 
    :current-node-key="data.defaultNode"
    :default-expanded-keys="data.defaultExpanded"
    @node-click="handleNodeClick"></el-tree>
</div>
</template>
<script scoped>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'leftNav',
    data () {
      return {
        data: {
          list: [{
            label: '任务管理',
            value: 'task-manage'
          },{
            label: '数据源配置',
            value: 'data-config'
          },{
            label: '信息抽取配置',
            value: '信息抽取配置',
            children: []
          },{
            label: '功能展示',
            value: 'function-display',
            children: [{
                label: '信息抽取',
                value: 'function-display/info-get'
            }, {
                label: '词法分析',
                value: 'function-display/analysis'
            }, {
                label: '机构名识别',
                value: 'function-display/machanism-ident'
            }]
          },{
            label: '用户与权限管理',
            value: 'test'
          }],
          defaultProps: {
            children: 'children',
            label: 'label',
            value: 'value'
          },
          defaultExpanded: [],
          defaultNode: ''
        }
      }
    },
    computed: mapState(['infoConfig']),
    created(){
      this.init()
    },
    methods: {
      ...mapActions([
  			'changeTest', 'getInfoConfig'
  		]),
      init () {
        this.getInfoConfig()
        this.data.list[2].children = this.infoConfig
        this.chooseSection()
      },
      handleNodeClick(data) {
        this.changeTest(data)
        this.$router.push('/main/' + data.value)
      },
      chooseSection () {
        // 左边导航栏做了url对应处理，有时间可以想想优化
        let path = this.$route.path.split('/')
        for (let i = 0; i < this.data.list.length; i++) {
          if (this.data.list[i].value === path[2]) {
            this.data.defaultNode = path[2]
            if (this.data.list[i].children) {
              for (let j = 0; j < this.data.list[i].children.length; j++) {
                if (this.data.list[i].children[j].value === (path[2] + '/' +path[3])) {
                  this.data.defaultNode = path[2] + '/' +path[3]
                  this.data.defaultExpanded.push(path[2])
                }
              }
            }
          }
        }
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