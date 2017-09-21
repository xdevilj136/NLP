<template>
  <div>
    <el-button @click="editRule" class="fr" style="margin-bottom:10px;" type="primary" size="small">编辑</el-button>
    <div class="background-title">
      <span>规则说明</span>
    </div>
    <div class="desc">
      <span>规则名称：</span>
      <span style="margin-right:200px;">{{ruleDiscription.ruleName}}</span>
      <span>设为私密：</span>
      <span>{{ruleDiscription.isPublic?'否':'是'}}</span>
    </div>
    <div class="background-title">
      <span>规则属性</span>
    </div>
    <infoExtraCard v-for="(item, index)  in attributeList" :data="item" :key="index"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import infoExtraCard from 'components/infoExtraCard'
export default {
  name: 'info-extra-detail',
  data() {
    return {
      ruleId:'',
      ruleDiscription: {
        ruleName: '',
        isPublic: true
      },
      attributeList:[]
    }
  },
  components: {
    infoExtraCard
  },
  computed: mapState(['configRule']),
  watch: {
    configRule: function(configRule) {
      if (configRule.result) {
        this.ruleId=configRule.result.id;
        this.ruleDiscription.ruleName = configRule.result.name ? configRule.result.name : '';
        this.ruleDiscription.isPublic = configRule.result.privilege ? true : false;
        if (configRule.result.content) {
          this.attributeList = JSON.parse(configRule.result.content);
        }
      }
    }
  },
  created() {
    this.queryRuleById(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'queryRuleById'
    ]),
    editRule() {
      this.$router.push('/main/info-extra/' + this.ruleDiscription.ruleName + '/edit/' + this.ruleId);
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