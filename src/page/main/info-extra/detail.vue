<template>
<div>
    <div class="no-config" v-if="data.length == 0">
        <img src="../../../images/natural-language/nullimg.png" />
        <p class="no-config-title">您还没添加任何规则</p>
        <p>添加规则后才可以配置任务</p>
        <el-button type="primary" @click="addConfig()">立即添加</el-button>
    </div>
    <div v-if="data.length > 0">
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
    computed: mapState(['infoExtra']),
    watch: {
      '$route' (newVal, oldVal) {
        this.infoExtraGet(this.$route.params.config)
        this.data = this.infoExtra
      }
    },
    created(){
      this.infoExtraGet(this.$route.params.config)
      this.data = this.infoExtra
    },
    methods: {
      ...mapActions([
        'infoExtraGet'
      ]),
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
    .no-config-title {
        font-size: 18px;
    }
}
.info-submit-box {
  text-align: right;
  padding-bottom: 10px;
}
.desc {
  color: #999;
  font-size: 12px;
  padding: 10px;
}
</style>