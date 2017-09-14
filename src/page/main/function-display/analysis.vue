<template>
<div>
  <el-checkbox-group class="mgb10"
    v-model="data.type">
    <el-checkbox v-for="type in typeOption" :label="type.value" :key="type.value">{{type.name}}</el-checkbox>
  </el-checkbox-group>
  <el-input class="mgt10 mgb10"
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 5}"
    placeholder="请输入要进行词法分析的内容"
    v-model="data.value">
  </el-input>
  <div class="submit-box">
    <el-button
    @click="submitTxt()"
    type="primary">提交文本</el-button>
  </div>
  <div class="analysi-box" v-if="submit && analysiData['seg_list']">
    <p class="analysi-title">分词</p>
    <div class="analysi-content">
      <div class="analysi-content-all">
        <span v-for="(word, index) in analysiData['seg_list']" :key="index"
        :style="{background: '#D8D8D8'}">
        {{word}}
        </span>
      </div>
    </div>
  </div>
  <analysisResult v-if="submit && analysiData['pos_list']" type="pos_list"
  headTitle="词性标注" :data="analysiData['pos_list']" />
  <analysisResult v-if="submit && analysiData['ner_list']" type="ner_list"
  headTitle="实体识别" :data="analysiData['ner_list']" />
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import analysisResult from 'components/analysisResult';
export default {
	name: 'analysis',
    data () {
      return {
        typeOption: [{
          name: '分词',
          value: 'seg_list'
        }, {
          name: '词性标注',
          value: 'ner_list'
        }, {
          name: '实体识别',
          value: 'pos_list'
        }],
        data: {
          type: [],
          value: ''
        },
        submit: false
      }
    },
    components: {
   		analysisResult
  	},
    computed: mapState(['analysiData']),
    watch: {
    },
    created(){
    },
    methods: {
      ...mapActions([
        'analysisGet'
  		]),
      submitTxt () {
        this.submit = true
        this.analysisGet(this.data)
      }
    }
}
</script>

<style lang="less">
.submit-box {
  text-align: right
}
</style>