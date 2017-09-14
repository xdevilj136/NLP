<template>
<div class="right-content">
    <div class="title-show-box clearfix">
      <span>信息抽取配置 / </span>
      <span class="hightLight">{{title ? title : ''}}</span>
      <el-button class="fr" v-if="title"
      type="danger">删除</el-button>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'function-display',
    data () {
      return {
          title: ''
      }
    },
    computed: mapState(['configList']),
    watch: {
        '$route' (newVal, oldVal) {
            if (newVal.path.split('/')[newVal.path.split('/').length - 1] === 'add') {
                this.title = '添加配置'
                return
            }
            if (newVal.path.split('/')[newVal.path.split('/').length - 1] === 'edit') {
                this.title = '修改配置'
                return
            }
            if (newVal.path.split('/')[newVal.path.split('/').length - 1] !== 'detail') {
                this.title = ''
                return
            }
            for (let i = 0; i < this.configList.length; i++) {
                if(this.$route.params.id === this.configList[i].value) {
                    this.title = this.configList[i].label
                }
            }
      }
    },
    created(){
        if (this.$route.path.split('/')[this.$route.path.split('/').length - 1] === 'add') {
            this.title = '添加配置'
            return
        }
        if (this.$route.path.split('/')[this.$route.path.split('/').length - 1] === 'edit') {
            this.title = '修改配置'
            return
        }
        for (let i = 0; i < this.configList.length; i++) {
            if(this.$route.params.id === this.configList[i].value) {
                this.title = this.configList[i].label
            }
        }
    },
    methods: {
    }
}
</script>

<style lang="less">
.right-content {
  padding: 40px;
  overflow: auto;
  .title-show-box {
      padding: 10px;
      border-bottom: 1px solid #E8E8E8;
      font-size: 16px;
      color: #999;
      margin-bottom: 10px;
      .hightLight {
          color: #333
      }
  }
}
</style>