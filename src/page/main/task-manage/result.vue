<template>
  <div class="right-content">
    <div class="title-show-box">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/main/task-manage' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/task-manage/detail'+'/'+$route.params.id }">任务详情</el-breadcrumb-item>
        <el-breadcrumb-item>任务输出</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" label-position="right" label-width="100px">
      <el-form-item label="任务名称：">
        <span class="detail-right-label">{{taskResultData.name}}</span>
      </el-form-item>
      <el-form-item label="类型：">
        <span class="detail-right-label">{{taskResultData.type | taskTypeFilter}}</span>
      </el-form-item>
      <el-form-item label="总记录数：">
        <span class="detail-right-label">{{taskResultData.outputCount}}</span>
      </el-form-item>
    </el-form>

    <el-table v-for="(item, index) in taskResultList" :key="index" :data="taskResultData.type==9?taskResultList[index].resovledCreditResult:[taskResultList[index]]" :span-method="inputSpanMethod" class="data-table" border>
      <!-- 中文分词 -->
      <template v-if="taskResultData.type==0">
        <el-table-column prop="input" label="输入内容" min-width="130px"></el-table-column>
        <el-table-column prop="output" label="输出内容" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-content-all">
                <span v-for="(word, index) in JSON.parse(scope.row.output).SegList" :key="index" :style="{background: '#D8D8D8'}">
                  {{word}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
      <!-- 词性标注 -->
      <template v-if="taskResultData.type==1">
        <el-table-column prop="input" label="输入内容" min-width="130px"></el-table-column>
        <el-table-column prop="output" label="输出内容" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-content-less">
                <span v-for="(word, index) in JSON.parse(scope.row.output).PosList.Words" :key="index" :style="{ background: matchWordColor(index,JSON.parse(scope.row.output).PosList.Tags)}">
                  {{word}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="newTags" label="词性类别图示" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-description">
                <span v-for="(tag, index) in scope.row.newTags" :key="index" :style="{ background: matchTagColor(tag)}">
                  {{matchTagName(tag)}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
      <!-- 实体识别 -->
      <template v-if="taskResultData.type==2">
        <el-table-column prop="input" label="输入内容" min-width="130px"></el-table-column>
        <el-table-column prop="NerTag" label="输出内容" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-content-less">
                <span v-for="(word, index) in JSON.parse(scope.row.output).NerList.Words" :key="index" :style="{ background: matchWordColor(index,JSON.parse(scope.row.output).NerList.Tags)}">
                  {{word}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="newTags" label="实体识别图示" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-description">
                <span v-for="(tag, index) in scope.row.newTags" :key="index" :style="{ background: matchTagColor(tag)}">
                  {{matchTagName(tag)}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
      <!-- 机构名标准化 -->
      <template v-if="taskResultData.type==5">
        <el-table-column prop="input" label="输入内容" min-width="130px"></el-table-column>
        <el-table-column prop="output" label="输出内容" min-width="130px">
          <template scope="scope">
            <!-- {{JSON.parse(scope.row.output).CompanyStd[scope.row.input].StdName}} -->
            {{parseStdName(scope.row.output)}}
          </template>
        </el-table-column>
      </template>
      <!-- 机构名分析 -->
      <template v-if="taskResultData.type==6">
        <el-table-column prop="input" label="输入内容" min-width="130px"></el-table-column>
        <el-table-column prop="output" label="输出内容" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-content-less">
                <span v-for="(word, index) in JSON.parse(scope.row.output).CompanySeg.Words" :key="index" :style="{ background: matchWordColor(index,JSON.parse(scope.row.output).CompanySeg.Tags)}">
                  {{word}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="newTags" label="分析结果图示" min-width="130px">
          <template scope="scope">
            <div class="analysis-content">
              <div class="analysis-description">
                <span v-for="(tag, index) in scope.row.newTags" :key="index" :style="{ background: matchTagColor(tag)}">
                  {{matchTagName(tag)}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
      <!-- 授信报告解析 -->
      <template v-if="taskResultData.type==9">
        <el-table-column label="输入内容" min-width="250px">
          <template scope="scope">
            {{taskResultList[index].input}}
          </template>
        </el-table-column>
        <el-table-column min-width="180px" prop="relationName" label="输出名称（关联关系）"></el-table-column>
        <el-table-column min-width="200px" prop="relationValue" label="输出值"></el-table-column>
        <el-table-column min-width="170px" prop="attentionName" label="输出名称（关注点）"></el-table-column>
        <el-table-column min-width="200px" prop="attentionValue" label="输出值"></el-table-column>
      </template>
    </el-table>
    <div class="block">
      <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page="currentPage" :page-sizes="[5, 10,50, 100]" :page-size="pageSize" :total="totalCount" layout=" prev, pager, next, sizes, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Loading } from 'element-ui'
import utils from 'src/config/utils'

//{词性标注，机构名分析，实体识别}配置列表
import { pos_list, seg_list, ner_list } from 'src/config/colorConfig'

export default {
  name: 'task-manage-result',
  data() {
    return {
      loadingInstance: '',
      segList: seg_list,
      nerList: ner_list,
      posList: pos_list,
      taskResultData: {},
      taskResultList: [],
      currentPage: 1,
      pageSize: 5,
      totalCount: 0
    }
  },
  watch: {
    taskResult: function(data) {
      this.loadingInstance.close()

      if ('result' in data) {
        if (data.error) {
          this.$notify({
            message: data.errorMessage,
            type: 'warnning',
            duration: 1000,
            offset: 200
          })
          this.$router.go(-1)
        } else {
          this.taskResultData = Object.assign({}, data.result)
          switch (this.taskResultData.type) {
            case 1:
              this.tagType = 'pos_list'
              break
            case 2:
              this.tagType = 'ner_list'
              break
            case 6:
              this.tagType = 'seg_list'
              break
            default:
              this.tagType = ''
              break
          }
          this.totalCount = this.taskResultData.outputCount
          this.taskResultList = this.taskResultData.view.list
          if (this.tagType) {
            this.clearDuplicate()
            this.updateTagColorConfig()
          }
          //任务类型为授信报告解析
          if (this.taskResultData.type == 9) {
            this.resolveCreditResult()
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['taskResult'])
  },

  created() {
    this.init()
  },
  methods: {
    ...mapActions(['getTaskResult']),
    refreshTable() {
      let params = {}
      params.p = this.currentPage - 1
      params.ps = this.pageSize
      params.id = this.$route.params.id
      this.getTaskResult(params)
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.refreshTable()
    },
    currentPageChange(currentPage) {
      this.currentPage = currentPage
      this.refreshTable()
    },
    init() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
      this.refreshTable()
    },
    clearDuplicate() {
      //Tags去重处理
      let list = this.taskResultData.view.list
      for (let i = 0; i < list.length; i++) {
        let item = JSON.parse(list[i].output)
        let matchList = item.PosList || item.NerList || item.CompanySeg
        if (matchList) {
          if (matchList.Tags) {
            list[i]['newTags'] = utils.unique(matchList.Tags)
          }
        }
      }
    },
    updateTagColorConfig() {
      //添加没有匹配的自定义实体tag
      for (let i = 0; i < this.taskResultData.view.list.length; i++) {
        if (
          this.tagType == 'pos_list' &&
          this.taskResultData.view.list[i].newTags
        ) {
          this.posList = Object.assign(
            {},
            this.addNomatchTag(
              this.taskResultData.view.list[i].newTags,
              this.posList
            )
          )
        }
        if (
          this.tagType == 'ner_list' &&
          this.taskResultData.view.list[i].newTags
        ) {
          this.nerList = Object.assign(
            {},
            this.addNomatchTag(
              this.taskResultData.view.list[i].newTags,
              this.nerList
            )
          )
        }
        if (
          this.tagType == 'seg_list' &&
          this.taskResultData.view.list[i].newTags
        ) {
          this.nerList = Object.assign(
            {},
            this.addNomatchTag(
              this.taskResultData.view.list[i].newTags,
              this.segList
            )
          )
        }
      }
    },
    addNomatchTag(tags, configList) {
      //匹配未定义标签
      let noMatchTags = tags.filter(function(value) {
        return !configList[value]
      })
      for (
        var index = 0, colorNum = 0;
        index < noMatchTags.length;
        index++, colorNum++
      ) {
        var element = noMatchTags[index]
        //超出备选颜色个数，重复顺序取值
        if (colorNum == configList.other.color.length) {
          colorNum = 0
        }
        let newTag = {
          [element]: {
            color: configList.other.color[colorNum],
            name: element
          }
        }
        configList = Object.assign({}, configList, newTag)
      }
      return configList
    },
    matchWordColor(index, Tags) {
      let matchColor = ''
      if (this.tagType == 'ner_list') {
        matchColor = this.nerList[Tags[index]].color
      } else if (this.tagType == 'pos_list') {
        matchColor = this.posList[Tags[index]].color
      } else if (this.tagType == 'seg_list') {
        matchColor = this.segList[Tags[index]].color
      }
      return matchColor
    },
    matchTagColor(tag) {
      let matchColor = ''
      if (this.tagType == 'ner_list') {
        matchColor = this.nerList[tag].color
      } else if (this.tagType == 'pos_list') {
        matchColor = this.posList[tag].color
      } else if (this.tagType == 'seg_list') {
        matchColor = this.segList[tag].color
      }
      return matchColor
    },
    matchTagName(tag) {
      let matchName = ''
      if (this.tagType == 'ner_list') {
        matchName = this.nerList[tag].name
      } else if (this.tagType == 'pos_list') {
        matchName = this.posList[tag].name
      } else if (this.tagType == 'seg_list') {
        matchName = this.segList[tag].name
      }
      return matchName
    },
    //从嵌套结构中解析机构名标准化结果
    parseStdName(output) {
      let CompanyStd = JSON.parse(output).CompanyStd
      let stdName = ''
      for (const key in CompanyStd) {
        if (CompanyStd.hasOwnProperty(key)) {
          const element = CompanyStd[key]
          stdName = element.StdName
        }
      }
      return stdName
    },
    //处理授信解析结果
    resolveCreditResult() {
      let list = this.taskResultData.view.list
      for (let i = 0; i < list.length; i++) {
        let creditResult = JSON.parse(list[i].output)
        let resovledCreditResult = this.parseCreditResult(creditResult)
        list[i].resovledCreditResult = resovledCreditResult
      }
    },
    //拆分、组合授信结果中的关联关系和关注点
    parseCreditResult(creditResult) {
      let relationResult = []
      let attentionResult = []
      for (let key in creditResult.Credit) {
        if (creditResult.Credit.hasOwnProperty(key)) {
          let keyEle = creditResult.Credit[key]
          let list = []
          for (var index = 0; index < keyEle.length; index++) {
            var element = keyEle[index]
            for (var element_key in element) {
              if (element.hasOwnProperty(element_key)) {
                element[element_key].forEach(function(each) {
                  list.push({
                    name: element_key,
                    value: each
                  })
                }, this)
              }
            }
          }
          if (key == 'Relation') {
            relationResult = list
          } else if (key == 'Attention') {
            attentionResult = list
          }
        }
      }
      let resovledCreditResult = []
      let maxlength =
        relationResult.length < attentionResult.length
          ? attentionResult.length
          : relationResult.length
      for (let i = 0; i < maxlength; i++) {
        resovledCreditResult.push({
          relationName: relationResult[i] ? relationResult[i].name : '-',
          relationValue: relationResult[i] ? relationResult[i].value : '-',
          attentionName: attentionResult[i] ? attentionResult[i].name : '-',
          attentionValue: attentionResult[i] ? attentionResult[i].value : '-',
          total: maxlength
        })
      }
      return resovledCreditResult
    },
    //合并表格单元格
    inputSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.taskResultData.type == 9) {
        if (columnIndex == 0) {
          if (rowIndex == 0) {
            return {
              rowspan: row.total,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  },
  filters: {
    taskTypeFilter: function(value) {
      let result = ''
      switch (value) {
        case 0:
          result = '中文分词'
          break
        case 1:
          result = '词性标注'
          break
        case 2:
          result = '实体识别'
          break
        case 3:
          result = '信息抽取'
          break
        case 5:
          result = '机构名标准化'
          break
        case 6:
          result = '机构名分析'
          break
        case 9:
          result = '授信报告解析'
          break

        default:
          break
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.right-content {
  .breadcrumb {
    font-size: 16px;
    line-height: inherit;
  }
  .block {
    text-align: right;
    margin-top: 30px;
  }
  .detail-left-label {
    height: 36px;
    line-height: 36px;
    float: left;
    width: 80px;
  }
  .detail-right-label {
    width: auto;
    color: grey;
  }
  .detail-right-content-box {
    float: left;
    width: calc(~'100% - 80px');
    .input {
      width: 250px;
    }
  }
  .analysis-content {
    padding: 10px 0;
    max-height: 250px;
    min-height: 50px;
    overflow: auto;
    .analysis-content-all span {
      font-size: 12px;
      padding: 6px 10px;
      margin: 0 3px 3px 0;
      float: left;
    }
    .analysis-content-less {
      float: left;
      span {
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        padding: 6px 10px;
        margin: 0 3px 3px 0;
        float: left;
      }
    }
    .analysis-description {
      position: sticky;
      top: 0;
      right: 0;
      overflow-y: auto;
      .analysis-des-title {
        font-size: 12px;
        padding: 6px 0;
      }
      span {
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        padding: 6px 10px;
        margin: 0 6px 6px 0;
        float: left;
      }
    }
  }
}
</style>