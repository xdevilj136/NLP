<template>
  <div>
    <el-checkbox-group class="mgb10" v-model="text.type">
      <el-checkbox v-for="type in typeOption" :label="type.value" :key="type.value">{{type.name}}</el-checkbox>
    </el-checkbox-group>
    <el-input class="mgt10 mgb10" type="textarea" :maxlength="2000" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入要进行篇章分析的内容" v-model="text.value">
    </el-input>
    <p v-if="text.value.length>=2000" style="color:red;">超出最大长度限制2000</p>
    <div class="submit-box">
      <el-button @click="submitTxt()" type="primary">提交文本</el-button>
    </div>
    <div class="analysis-box" v-if="submit && keywordArray1.length > 0">
      <p class="analysis-title">关键词及权重</p>
      <el-table v-if="keywordArray1.length > 0" :data="keywordArray1" border style="width: 50%;float: left" class="data-table mgt40">
        <el-table-column min-width="100" prop="keyword" label="关键词">
        </el-table-column>
        <el-table-column min-width="100" prop="weight" label="权重">
        </el-table-column>
      </el-table>
      <el-table v-if="keywordArray2.length > 0" :data="keywordArray2" border style="width: 50%;float: left" class="data-table mgt40">
        <el-table-column min-width="100" prop="keyword" label="关键词">
        </el-table-column>
        <el-table-column min-width="100" prop="weight" label="权重">
        </el-table-column>
      </el-table>
    </div>
    <div class="analysis-box" v-if="submit && abstractor!=='' ">
      <p class="analysis-title">摘要</p>
      <el-input readonly class="result-container mgt10 mgb10" type="textarea" :maxlength="2000" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入要进行篇章分析的内容" v-model="text.value">
      </el-input>
    </div>
    <div class="analysis-box" v-if="submit && sentiValue!=='' ">
      <p class="analysis-title">情感值</p>
      <chart :options="chartOption"></chart>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import { Loading } from 'element-ui'
import utils from 'src/config/utils'

Vue.component('chart', ECharts)

export default {
  name: 'article-analysis',
  data() {
    return {
      loadingInstance: '',
      typeOption: [
        {
          name: '关键词抽取',
          value: 'KeyWord'
        },
        {
          name: '文章摘要',
          value: 'Abstractor'
        },
        {
          name: '情感分析',
          value: 'SentiValue'
        }
      ],
      text: {
        type: ['KeyWord', 'Abstractor', 'SentiValue'],
        value: `同意给予天津市宝华国际贸易有限公司授信额度人民币2亿元（可用额度1.5亿元），期限2年，由北京科尔森电子有限公司提供连带责任保证，追加自然人沈俊逸、刘桂芳连带责任保证担保。
下属企业南京中阳农业发展有限公司可用余额不超过6000万元；大连舒健商贸有限公司可用余额不超过RMB4000万元。两公司使用时，均由北京博瑞科技发展有限公司授权并提供连带责任保证担保。
以上额度可用于短期融资用途（含进口开证，开证的付款期限加押汇期限不超过120天）。
风险提示与说明：
1.集团并无合并报表，整体情况不清；2014年，以上3个授信企业约16亿元的平均存货，无任何跌价损失，罕见；这么多年从无分红，更少见。
2.主要资产全部对其他银行同业抵押（含存货）；流动比率低；5.4亿元货币资金中，保证金占到3.5亿元；内部存在大量关联交易。
3.涉及风险担保圈的情况不清；担保方与申请人是互保关系，申请人为其担保余额7亿元以上（接近申请人净资产的50%）。`
      },
      submit: false,
      keywordArray1: [],
      keywordArray2: [],
      abstractor: '',
      sentiValue: '',
      chartData: [],
      chartOption: {
        legend: {
          orient: 'vertical',
          align: 'left',
          x: 'right',
          y: 'middle',
          textStyle: { color: '#666', fontSize: '12px' }
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['20%', '50%'],
            color: ['#47ACFF', '#F46E6E'],
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  components: {
    ECharts
  },
  computed: mapState(['articleAnalysisData']),
  watch: {
    articleAnalysisData: function(articleAnalysisData) {
      this.loadingInstance.close()
      if ('error' in articleAnalysisData) {
        if (articleAnalysisData.error) {
          this.extractSuccess = false
          this.$alert(articleAnalysisData.errorMessage, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return
        }
      } else {
        if ('KeyWord' in articleAnalysisData) {
          let keywordObj = JSON.parse(articleAnalysisData.KeyWord).KeyWord
          let resultArray = []
          keywordObj.Words.forEach((element, index) => {
            resultArray.push({
              keyword: element,
              weight: keywordObj.Weights[index]
            })
          })
          let midIndex = Math.round(resultArray.length / 2)
          this.keywordArray1 = resultArray.slice(0, midIndex)
          this.keywordArray2 = resultArray.slice(midIndex, resultArray.length)
        }
        else{
          this.keywordArray1 = []
          this.keywordArray2 = []
        }
        if ('Abstractor' in articleAnalysisData) {
          this.abstractor = articleAnalysisData.Abstractor
        }
        else{
          this.abstractor = ''
        }
        if ('SentiValue' in articleAnalysisData) {
          //正面情感指数
          let convertValue = (
            1 /
            (1 + Math.exp(-articleAnalysisData.SentiValue))
          ).toFixed(3)
          this.sentiValue = convertValue

          this.$set(this.chartOption, 'series', [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['20%', '50%'],
              color: ['#47ACFF', '#F46E6E'],
              hoverAnimation: false,
              legendHoverLink: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                }
              },
              data: [
                {
                  value: this.sentiValue,
                  name: '正面指数: ' + this.sentiValue
                },
                {
                  value: 1 - this.sentiValue,
                  name: '负面指数: ' + (1 - this.sentiValue)
                }
              ]
            }
          ])
        }
        else{
          this.sentiValue = ''
        }
      }
    }
  },
  created() {
    // this.submitTxt()
  },
  methods: {
    ...mapActions(['articleAnalysisGet']),
    submitTxt() {
      this.submit = true
      let textContent = this.text.value.replace(/\s/g, '')
      if (textContent == '') {
        this.$alert('输入内容不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      if (this.text.type.length == 0) {
        this.$alert('请选择分析选项', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
      this.articleAnalysisGet({
        functions: this.text.type,
        data: textContent
      })
    }
  }
}
</script>

<style lang="less">

.submit-box {
  text-align: right;
}
.analysis-box {
  overflow: hidden;
  margin-top: 36px;
  .echarts {
  width: 300px;
  height: 150px;
}
  .result-container {
    .el-textarea__inner {
      background-color: #f7f7f7;
      color: #666;
      font-size: 12px;
      border: none;
    }
  }
}
</style>