<template>
<div>
  <div class="content-ident-box">
    <p class="content-title">机构名标准化</p>
    <el-input class="content-input" v-model="data.name" placeholder="请输入机构名"></el-input>
    <el-button class="content-submit" @click="submitTxt('one')" type="primary">提交</el-button>
  </div>
  <div class="content-ident-box">
    <p class="content-title">全称</p>
    <el-input class="content-input" :disabled="true"
    v-model="data.nameInit" placeholder="请输入机构名"></el-input>
  </div>
  <div class="content-ident-box">
    <p class="content-title">机构名分析</p>
    <el-input class="content-input" v-model="data.nameAll" placeholder="请输入机构名"></el-input>
    <el-button class="content-submit" @click="submitTxt('two')" type="primary">提交</el-button>
  </div>
  <analysisResult v-if="analysiData['ner_list']" type="ner_list"
  headTitle="分析结果" :data="analysiData['ner_list']" />
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import analysisResult from 'components/analysisResult';
export default {
	name: 'machanism-ident',
    data () {
      return {
        data: {
          name: '',
          nameAll: '',
          nameInit: ''
        }
      }
    },
    watch: {
    },
    components: {
   		analysisResult
  	},
    computed: mapState(['analysiData']),
    created(){
    },
    methods: {
      ...mapActions([
        'analysisGet'
  		]),
      submitTxt (type) {
        if (type === 'one') {
          this.data.nameInit = this.data.name
        } else {
          this.analysisGet({type: ['ner_list']})
        }
      }
    }
}
</script>

<style lang="less">
.content-ident-box {
  margin-top: 15px;
  .content-title {
    padding: 10px 0;
    color: #333;
  }
  .content-input {
    width: 400px;
    margin-right: 20px
  }
}
</style>