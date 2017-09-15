<template>
<div class="right-content">
    <div class="title-show-box clearfix">
        <span v-if="!config">{{title.one}}</span>
        <router-link v-if="config" class="gobackHead"
        :to="{ name: 'info-extra-detail', params: { config: $route.params.config }}">{{title.one}}</router-link>
        <span>  / </span>
        <span class="hightLight">{{title.two}}</span>
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
          title: {
              one: '信息抽取配置',
              two: ''
          },
          config: '',
          action: {
              'info-extra-detail': false,
              'info-extra-edit': '修改配置',
              'info-extra-add': '添加配置'
          }
      }
    },
    computed: mapState(['configList']),
    watch: {
        '$route' (newVal, oldVal) {
            this.config = this.action[this.$route.name]
            for (let i = 0; i < this.configList.length; i++) {
                if (this.configList[i].value === this.$route.params.config && this.config) {
                    this.title.one = this.configList[i].label
                    this.title.two = this.action[this.$route.name]
                } else if (this.configList[i].value === this.$route.params.config && !this.config) {
                    this.title.two = this.configList[i].label
                    this.title.one = '信息抽取配置'
                }
            }
        }
    },
    created(){
        this.config = this.action[this.$route.name]
        for (let i = 0; i < this.configList.length; i++) {
            if (this.configList[i].value === this.$route.params.config && this.config) {
                this.title.one = this.configList[i].label
                this.title.two = this.action[this.$route.name]
            } else if (this.configList[i].value === this.$route.params.config && !this.config) {
                this.title.two = this.configList[i].label
                this.title.one = '信息抽取配置'
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
      padding: 10px 0 10px 10px;
      border-bottom: 1px solid #E8E8E8;
      font-size: 16px;
      color: #999;
      margin-bottom: 10px;
      .gobackHead {
          color: #999;
          &:hover {
              color: #20a0ff
          }
      }
      .hightLight {
          color: #333
      }
  }
}
</style>