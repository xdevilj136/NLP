<template>
  <div>
    <el-tabs value="companyStd">
      <el-tab-pane label="机构名标准化" name="companyStd">
        <div class="content-ident-box">
          <p class="content-title">机构名标准化</p>
          <el-input class="content-input" v-model="data.toStdName" placeholder="请输入机构名"></el-input>
          <el-button class="content-submit" @click="submitTxt('companyStd')" type="primary">提交</el-button>
        </div>
        <div class="content-ident-box">
          <el-table :data="data.fullNameArray" border style="width: 100%" class="data-table mgt40">
            <el-table-column min-width="500" prop="fullName" label="全称">
            </el-table-column>
            <el-table-column min-width="100" prop="score" label="相识度">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="机构名分析" name="companySegment">
        <div class="content-ident-box">
          <p class="content-title">机构名分析</p>
          <el-input class="content-input" v-model="data.toAnalysisName" placeholder="请输入机构名"></el-input>
          <el-button class="content-submit" @click="submitTxt('companySegment')" type="primary">提交</el-button>
        </div>
        <analysisResult v-if="processedCompanySeg.result" type="seg_list" headTitle="分析结果" :data="processedCompanySeg.result['CompanySegment'].CompanySeg" />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import analysisResult from 'components/analysisResult'
import utils from 'src/config/utils'

export default {
  name: 'machanism-ident',
  data() {
    return {
      data: {
        toStdName: '海致网络',
        toAnalysisName: '海致网络技术(北京)有限公司',
        fullNameArray:[]
      },
      processedCompanySeg: {}
    }
  },
  watch: {
    companyStd: function(companyStd) {
      if (companyStd.result && companyStd.result.CompanyStd) {
        companyStd.result.CompanyStd = JSON.parse(companyStd.result.CompanyStd)
        let stdObj = companyStd.result.CompanyStd.CompanyStd
        let fullName = stdObj[this.data.toStdName]
        let splitArr = fullName.split(/\s/);
        let resultArr = [];
        splitArr.forEach(element => {
          resultArr.push({
            fullName: element.split('/')[0],
            score: element.split('/')[1]
          })
        });
        this.data.fullNameArray = resultArr
      }
    },
    companySegment: function(data) {
      //去重处理
      if (data.result && data.result.CompanySegment) {
        let parsedSeg = JSON.parse(data.result.CompanySegment)
        let companySeg = parsedSeg.CompanySeg
        if (companySeg.Tags) {
          companySeg['newTags'] = utils.unique(companySeg.Tags)
        }
        data.result.CompanySegment = parsedSeg
      }
      this.processedCompanySeg = data
    }
  },
  components: {
    analysisResult
  },
  computed: mapState(['companyStd', 'companySegment']),
  created() {
    this.submitTxt('companyStd')
    this.submitTxt('companySegment')
  },
  methods: {
    ...mapActions(['processCompanyStd', 'processCompanySegment']),
    submitTxt(type) {
      if (type === 'companyStd') {
        this.data.toStdName = this.data.toStdName.replace(/\s/g, '')
        if (this.data.toStdName == '') {
          this.$alert('输入内容不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return
        }
        this.processCompanyStd({
          functions: ['CompanyStd'],
          data: this.data.toStdName
        })
      } else if (type === 'companySegment') {
        this.data.toAnalysisName = this.data.toAnalysisName.replace(/\s/g, '')

        if (this.data.toAnalysisName == '') {
          this.$alert('输入内容不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return
        }
        this.processCompanySegment({
          functions: ['CompanySegment'],
          data: this.data.toAnalysisName
        })
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
    margin-right: 20px;
  }
  .mgt40{
    margin-top: 40px;
  }
}
</style>