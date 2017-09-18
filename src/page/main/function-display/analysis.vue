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
  <div class="analysi-box" v-if="submit && analysisData.result['WordSegment'].SegList">
    <p class="analysi-title">分词</p>
    <div class="analysi-content">
      <div class="analysi-content-all">
        <span v-for="(word, index) in analysisData.result['WordSegment'].SegList" :key="index"
        :style="{background: '#D8D8D8'}">
        {{word}}
        </span>
      </div>
    </div>
  </div>
  <analysisResult v-if="submit && analysisData.result['NamedIdentityRecognize'].NerList" type="ner_list"
  headTitle="词性标注" :data="analysisData.result['NamedIdentityRecognize'].NerList" />
  <analysisResult v-if="submit && analysisData.result['PosTag'].PosList" type="pos_list"
  headTitle="实体识别" :data="analysisData.result['PosTag'].pos_list" />
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
          value: 'WordSegment'
        }, {
          name: '词性标注',
          value: 'PosTag'
        }, {
          name: '实体识别',
          value: 'NamedIdentityRecognize'
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
    computed: mapState(['analysisData']),
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
        console.log(this.data)
        this.analysisGet({
          functions:this.data.type,
          data:this.data.value
        });
        console.log(this.analysisData)
      }
    }
}
</script>

<style lang="less">
.submit-box {
  text-align: right
}
</style>