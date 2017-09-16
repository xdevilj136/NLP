<template>
  <div>
    <el-button @click="editRule(data.id)" class="fr" style="margin-bottom:10px;" type="primary" size="small">编辑</el-button>
    <div class="background-title">
      <span>规则说明</span>
    </div>
    <div class="desc">
      <span>规则名称：</span>
      <span style="margin-right:200px;">{{data.ruleDiscription.ruleName}}</span>
      <span>设为私密：</span>
      <span>{{data.ruleDiscription.isPublic=='yes'?'否':'是'}}</span>
    </div>
    <div class="background-title">
      <span>规则属性</span>
    </div>
    <infoExtraCard v-for="(item, index) in data.ruleProperty" :data="item" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import infoExtraCard from 'components/infoExtraCard'
export default {
  name: 'info-extra-detail',
  data() {
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
    '$route'(newVal, oldVal) {
      this.infoExtraGet(this.$route.params.config)
      this.data = this.infoExtra
    }
  },
  created() {
    this.infoExtraGet(this.$route.params.config)
    this.data = this.infoExtra
  },
  methods: {
    ...mapActions([
      'infoExtraGet'
    ]),
    addConfig() {
      this.$router.push('add')
    },
    editRule(id) {
      this.$router.push('/main/info-extra/edit/' + id);
    }
  }
}
</script>

<style lang="less">
.background-title {
  clear: both;
  background-color: #eef1f6;
  padding: 10px;
  color: #666;
}

.desc {
  margin: 20px;
  color: #666;
}
</style>