<template>
  <div >
    <el-input class="mgt10 mgb10" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" :maxlength="2000" placeholder="请输入要进行信息抽取的内容" v-model="data.value">
    </el-input>
    <p v-if="data.value.length>=2000" style="color:red;">超出最大长度限制2000</p>
    <div class="submit-box">
      <el-button @click="replaceTxt" type="normal">更换文本</el-button>
      <el-button @click="submitTxt" type="primary">解析文本</el-button>
    </div>
    <div class="extract-result" v-if="submit && extractSuccess">
      <p>关联关系</p>
      <el-table  border style="width: 100%" class="mgt10 mgb10" :data="relationResult">
        <el-table-column min-width="100" prop="name" label="名称">
        </el-table-column>
        <el-table-column min-width="500" prop="value" label="值">
        </el-table-column>
      </el-table>
      <div class="mgt40">
      <div class="top-bar">
      <p>关注点</p>
      <el-button v-if="!merged" @click="mergeResult" type="primary" size="small">合并结果</el-button>
      <el-button v-if="merged" @click="revertMerge" type="normal" size="small">取消合并</el-button>
      </div>
      <el-table  border style="width: 100%" class="mgt10 mgb10" :data="attentionResult">
        <el-table-column min-width="100" prop="name" label="名称">
        </el-table-column>
        <el-table-column min-width="500" prop="value" label="值">
        </el-table-column>
      </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import {zsbankCreditSamples} from "src/config/samples";
export default {
  name: "data-extract",
  data() {
    return {
      ruleList: [],
      data: {
        value:
          "同意给予华谊兄弟南京强拓科技有限公司综合授信人民币3.3亿元，授信期限1年，可用于流动资金贷款、内保外贷、并购贷款业务。如用于流贷和内保外贷业务为信用方式，最高占用不超过1.5亿元；如用于并购贷款，最高占用不超过3.3亿元，专项用于收购哈尔滨赢鑫懿贸易有限公司50.88%股权，" +
          "贷款期限不超过55个月，贷款到期日不晚于2018年10月31日，具体放款及还款计划可按分行审批意见执行，由嘉兴嘉顺电声音响有限公司提供连带责任担保，并追加实际控制人马贤明、凌娟的连带责任保证担保。要求：" +
          "1、并购贷款须严格按照我行有关并购贷款管理规定办理。并购贷款总额不超过并购总交易价格的50%，如申请人以配套募集资金支付的现金和股权对价合计超过并购价格的50%，我行应相应调减贷款金额，确保我行及企业支付的对价总额不超过67161.60万元。我行贷款与公司现金及股权对价同比例支付。" +
          "2、我行并购贷款发放前支行应落实企业资金或股权到位情况，发放后严格监控资金流向，防止企业挪用。流动资金贷款应确保贷款用途合规。" +
          "3、流动资金贷款只能用于企业主营业务，需有切实的交易背景证明资料，不得用于向个人支付款项。内保外贷业务专项用于其香港或美国子公司在境外融资用于投资拍摄影片《狂怒》（暂定名），额度生效前取得总行国际部核准，经办行（部）需严格审查业务背景（尤其是境外子公司），确保真实、合法、合规。" +
          "4、加强贷后检查，关注申请人其他并购事项的进展，如发放了并购贷款需密切跟进并购完成后并购双方的业务整合及经营、盈利情况。" +
          "5、关注企业投资影片的拍摄进展及票房情况，并关注企业投资旅游地产及对主业资金的影响；关注企业各项融资、负债总量及现金流状况。" +
          "6、根据将到期短债业务的兑付情况，控制放款节奏，现有业务余额纳入管理。"
      },
      //解析后抽取信息结果
      relationResult: [],
      attentionResult: [],
      attentionResultSave:[],
      submit: false,
      extractSuccess: false,
      merged:false,
      sampleIndex:0
    };
  },
  watch: {
    zsbankCreditResult: function(zsbankCreditResult) {
      if ("result" in zsbankCreditResult && "error" in zsbankCreditResult) {
        if (zsbankCreditResult.error) {
          this.extractSuccess = false;
          this.$alert(zsbankCreditResult.errorMessage, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        } else {
          if (zsbankCreditResult.result.ZhaohangCredit) {
            this.extractSuccess = true;
            let parsedData = JSON.parse(
              zsbankCreditResult.result.ZhaohangCredit
            );
            for (let key in parsedData.Credit) {
              if (parsedData.Credit.hasOwnProperty(key)) {
                let keyEle = parsedData.Credit[key];
                let list = [];
                for (var index = 0; index < keyEle.length; index++) {
                  var element = keyEle[index];
                  for (var element_key in element) {
                    if (element.hasOwnProperty(element_key)) {
                      element[element_key].forEach(function(each) {
                        list.push({
                          name: element_key,
                          value: each
                        });
                      }, this);
                    }
                  }
                }
                if (key == "Relation") {
                  this.relationResult = list;
                } else if (key == "Attention") {
                  this.attentionResult = list;
                }
              }
            }
          }
        }
      }
    }
  },
  computed: mapState(["zsbankCreditResult"]),
  mounted() {
    document.querySelector('.right-content-box').style.overflowY = 'hidden'
  },
  updated(){
    if(document.querySelector('.extract-result')){
      let resultDivHeight=parseInt(document.documentElement.clientHeight)-423
      document.querySelector('.extract-result').style.height = resultDivHeight+'px'
    }
  },
  beforeRouteLeave (to, from, next) {
    document.querySelector('.right-content-box').style.overflowY = 'auto';
    next()
  },
  methods: {
    ...mapActions(["zsbankAnalysis"]),
    replaceTxt() {
      this.data.value=zsbankCreditSamples[this.sampleIndex]
      this.sampleIndex++
      if(this.sampleIndex>=zsbankCreditSamples.length){
        this.sampleIndex=0
      }
    },
    submitTxt() {
      this.merged=false
      if (this.data.value.trim() == "") {
        this.$alert("输入内容不能为空", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.submit = true;
      let requestData = {
        functions: ["ZhaohangCredit"],
        data: this.data.value
      };
      this.zsbankAnalysis(requestData);
    },
    mergeResult() {
      this.merged=true
      this.attentionResultSave=Object.assign([], this.attentionResult)
      let attentionResultCopy = Object.assign([], this.attentionResult)
      let mergeResult = [];
      let topElement = {};
      while (attentionResultCopy.length > 0) {
        let topElement = attentionResultCopy.shift();
        if (topElement && topElement.name) {
          mergeResult.push(topElement);
          let group=attentionResultCopy.filter(function(element) {
            return (element.name == topElement.name)
          })
          mergeResult=mergeResult.concat(group)
          attentionResultCopy=attentionResultCopy.filter(function(value){
            return (value.name !== topElement.name)
          })
        }
        else break
      }
      this.attentionResult=mergeResult
    },
    revertMerge(){
      this.merged=false
      this.attentionResult=Object.assign([], this.attentionResultSave)
    }
  }
};
</script>

<style lang="less">

.extract-result {
  overflow-y: scroll;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  padding: 10px;
  height: 500px;
}
.top-bar {
  display: inline-block;
  button {
    margin-left: 20px;
    display: inline-block;
  }
  p {
    display: inline-block;
  }
}
.submit-box {
  text-align: right;
  margin-bottom: 30px;
}
.mgt40 {
  margin-top: 40px;
}
.message {
  top: 160px;
}
</style>