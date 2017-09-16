<template>
<div class="right-content">
    <div class="title-show-box clearfix">
        <span v-if="!config">{{title.one}}</span>
        <router-link v-if="config" class="gobackHead"
        :to="{ name: 'info-extra-detail', params: { config: $route.params.config }}">{{title.one}}</router-link>
        <span>  / </span>
        <span class="hightLight">{{title.two}}</span>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'info-extra',
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
        }
    },
    created(){
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