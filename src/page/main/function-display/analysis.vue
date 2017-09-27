<template>
  <div>
    <el-checkbox-group class="mgb10" v-model="text.type">
      <el-checkbox v-for="type in typeOption" :label="type.value" :key="type.value">{{type.name}}</el-checkbox>
    </el-checkbox-group>
    <el-input class="mgt10 mgb10" type="textarea" :maxlength="1000" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入要进行词法分析的内容" v-model="text.value">
    </el-input>
    <p v-if="text.value.length>=1000" style="color:red;">超出最大长度限制1000</p>
    <div class="submit-box">
      <el-button @click="submitTxt()" type="primary">提交文本</el-button>
    </div>
    <div class="analysis-box" v-if="submit && processedData.WordSegment">
      <p class="analysis-title">分词</p>
      <div class="analysis-content">
        <div class="analysis-content-all">
          <span v-for="(word, index) in processedData.WordSegment.SegList" :key="index" :style="{background: '#D8D8D8'}">
            {{word}}
          </span>
        </div>
      </div>
    </div>
    <analysisResult v-if="submit && processedData.NamedIdentityRecognize" type="ner_list" headTitle="实体识别" :data="processedData.NamedIdentityRecognize.NerList" />
    <analysisResult v-if="submit && processedData.PosTag" type="pos_list" headTitle="词性标注" :data="processedData.PosTag.PosList" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import analysisResult from 'components/analysisResult';
import utils from 'src/config/utils'

export default {
  name: 'analysis',
  data() {
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
      text: {
        type: [],
        value: ''
      },
      submit: false,
      processedData: {
        WordSegment: '',
        NamedIdentityRecognize: '',
        PosTag: ''
      }
    }
  },
  components: {
    analysisResult
  },
  computed: mapState(['analysisData']),
  watch: {
    analysisData: function(analysisData) {
      if (analysisData.result) {
        //去重处理
        let result = analysisData.result;
        for (let key in result) {
          let item = JSON.parse(result[key]);
          let matchList = item.SegList || item.PosList || item.NerList;
          if (matchList) {
            if (matchList.Tags) {
              matchList['newTags'] = utils.unique(matchList.Tags)
            }
          }
          result[key] = item;
        }
        //解析赋值
        let filterResult = analysisData.result;
        if (filterResult) {
          this.processedData.WordSegment = filterResult.WordSegment ? filterResult.WordSegment : '';
          this.processedData.NamedIdentityRecognize = filterResult.NamedIdentityRecognize ? filterResult.NamedIdentityRecognize : '';
          this.processedData.PosTag = filterResult.PosTag ? filterResult.PosTag : '';
        }
      }
      else {
        this.$notify({
          message: analysisData.errorMessage,
          type: 'warnning',
          duration: 1000,
          offset: 200
        });
      }
    }


  },
  created() {
  },
  methods: {
    ...mapActions([
      'analysisGet'
    ]),
    submitTxt() {
      this.submit = true;
      let textContent = this.text.value.replace(/\s/g, '');
      if (textContent == '') {
        this.$alert('输入内容不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
      if (this.text.type.length == 0) {
        this.$alert('请选择分析选项', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
      this.analysisGet({
        functions: this.text.type,
        data: textContent
      });
    }
  }
}
</script>

<style lang="less">
.submit-box {
  text-align: right
}
</style>