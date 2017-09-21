<template>
<div class="left-nav-box">
    <el-tree :data="data.list" 
    node-key="value"
    :props="data.defaultProps" 
    :current-node-key="data.defaultNode"
    :render-content="renderContent"
    :default-expanded-keys="data.defaultExpanded"
    @node-click="handleNodeClick">
    </el-tree>
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
            value: 'data-source-config'
          },{
            label: '信息抽取配置',
            value: 'info-extra'
          },{
            label: '功能展示',
            value: '',
            children: [{
                label: '信息抽取',
                value: 'function-display/data-extract'
            }, {
                label: '词法分析',
                value: 'function-display/analysis'
            }, {
                label: '机构名识别',
                value: 'function-display/machanism-ident'
            }]
          },{
            label: '用户与权限管理',
            value: 'authority-manage'
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
    computed: mapState(['configList']),
    created(){
      this.init()
    },
    methods: {
      ...mapActions([
  			'changeTest', 'getInfoConfig'
  		]),
      init () {
        this.getInfoConfig()
        this.chooseSection()
      },
      handleNodeClick(data, node) {
        let self = this
        if (data.value === 'add') {
          this.$prompt('请输入新增的抽取配置', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '不能为空'
          }).then(({ value }) => {
            let array = self.data.list[2].children
            array.splice(array.length - 1 , 0, {value: value, label: value})
          }).catch(() => {

          })
        } else {
          this.changeTest(data)
          if(data.value==''){
            return;
          }
          let route = '/main/' + data.value
          this.$router.push(route)
        }
      },
      renderContent(h, { node, data, store }) {
        let content = <span>{node.label}</span>
        if (data.value === 'add') {
          content = <span class="add-btn">{node.label}</span>
        }
        return (
            content
        );
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
        .el-tree-node__children {
          max-height: 250px;
          overflow: auto
        }
        &:hover, &.is-current {
          background: #E9F5FF;
          color: #249CFF;
          &.is-expanded {
            background: white;
            color: #666
          }
        }
        .add-btn {
          font-size: 20px;
          padding-left: 30px;
        }
      }
    }
}
</style>