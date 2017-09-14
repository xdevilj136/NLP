<template>
<div>
    <div class="no-config" v-if="data.length == 0">
        <img src="../../../images/natural-language/nullimg.png" />
        <p class="title">您还没添加任何规则</p>
        <p>添加规则后才可以配置任务</p>
        <el-button type="primary" @click="addConfig()">立即添加</el-button>
    </div>
    <div v-if="data.length > 0">
    <div class="submit-box">
      <el-button
      @click="addConfig()"
      type="primary">添加</el-button>
    </div>
      <p class="desc">共搜到{{data.length}}条数据</p>
    </div>
    <infoExtraCard v-for="(item, index) in data" :data="item" />
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import infoExtraCard from 'components/infoExtraCard'
export default {
	name: 'function-display',
    data () {
      return {
          data: [],
          title: ''
      }
    },
    components: {
   		infoExtraCard
  	},
    computed: mapState(['analysiData']),
    watch: {
      '$route' (newVal, oldVal) {
        if (this.$route.params.id === '招中标') {
          this.data = [{
            name: '杜甫悲传',
            match_rule: '南村群童欺我老无力，公然抱我入竹去',
            trigger_rule: '唇焦口燥呼不得，归来倚杖自叹息',
            once: 'true'
          }]
        } else {
          this.data = []
        }
      }
    },
    created(){
      if (this.$route.params.id === '招中标') {
        this.data = [{
          name: '杜甫悲传',
          match_rule: '南村群童欺我老无力，公然抱我入竹去',
          trigger_rule: '唇焦口燥呼不得，归来倚杖自叹息',
          once: 'true'
        }]
      }
    },
    methods: {
        addConfig () {
          this.$router.push('add')
        }
    }
}
</script>

<style lang="less">
.no-config {
    width: 100%;
    text-align: center;
    padding-top: 70px;
    p {
        padding-bottom: 10px;
    }
    .title {
        font-size: 18px;
    }
}
.submit-box {
  text-align: right
}
.desc {
  color: #999;
  font-size: 12px;
  padding: 10px;
}
</style>