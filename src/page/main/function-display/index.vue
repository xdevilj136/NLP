<template>
<div class="a100 right-content">
    <div class="title-show-box">
      <span>功能展示 / </span>
      <span class="hightLight">{{title ? title : ''}}</span>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
export default {
	name: 'function-display',
    data () {
      return {
          titleList: {
              'machanism-ident': '机构名识别',
              'analysis': '词法分析',
              'info-get': '信息抽取'
          },
          title: ''
      }
    },
    watch: {
      '$route' (newVal, oldVal) {
          console.log(newVal)
          let location = newVal.path.split('/')
          this.title = this.titleList[location[location.length - 1]]
      }
    },
    created(){
        console.log(this.location)
        let location = this.$route.path.split('/')
        this.title = this.titleList[location[location.length - 1]]
    },
    methods: {
    }
}
</script>

<style lang="less">
.right-content {
  padding: 40px;
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