<template>
  <div>
    <el-select class="mgb10" v-model="data.typeIndex" @change="typeChange" placeholder="请选择">
      <el-option v-for="(item,index) in ruleList" :key="index" :label="item.name" :value="index">
      </el-option>
    </el-select>
    <el-input class="mgt10 mgb10" type="textarea" :autosize="{ minRows: 8, maxRows: 8}" :maxlength="2000" placeholder="请输入要进行信息抽取的内容" v-model="data.value">
    </el-input>
    <p v-if="data.value.length>=2000" style="color:red;">超出最大长度限制2000</p>
    <div class="submit-box">
      <el-button :disabled="replaceTxtDisabled" @click="replaceTxt" type="normal">更换文本</el-button>
      <el-button @click="submitTxt" type="primary">提交文本</el-button>
    </div>
    <el-table v-if="submit && extractSuccess" border style="width: 100%" class="mgt10 mgb10" :data="extractResult">
      <el-table-column min-width="100" prop="name" label="名称">
      </el-table-column>
      <el-table-column min-width="500" prop="value" label="值">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import {
  zsbankCreditSamples,
  extractBiddingSamples,
  extractJudgementSamples
} from "src/config/samples";

export default {
  name: "data-extract",
  data() {
    return {
      ruleList: [],
      data: {
        typeIndex: "",
        value: ""
      },
      submit: false,
      extractSuccess: false,
      replaceTxtDisabled:true,
      sampleIndex: 0,
      //解析后抽取信息结果
      extractResult: [],
    };
  },
  watch: {
    configList: function(configList) {
      if (configList.result && configList.result.list) {
        this.ruleList = this.configList.result.list
        if(this.ruleList.length>0){
          this.data.typeIndex=0
        }
      }
    },
    extractedData: function(extractedData) {
      if ("result" in extractedData && "error" in extractedData) {
        if (extractedData.error) {
          this.extractSuccess = false;
          this.$alert(extractedData.errorMessage, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        } else {
          if (extractedData.result.DataExtract) {
            this.extractSuccess = true;
            let parsedData = JSON.parse(extractedData.result.DataExtract);
            let list = [];
            for (let key in parsedData) {
              if (parsedData.hasOwnProperty(key)) {
                let element = parsedData[key];
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
            }
            this.extractResult = list;
          }
          this.$notify({
            message: "抽取信息成功",
            type: "success",
            duration: 1000,
            offset: 200
          });
        }
      }
    }
  },
  computed: mapState(["configList", "extractedData"]),
  created() {
    this.getInfoConfig();
  },
  methods: {
    ...mapActions(["dataExtract", "getInfoConfig"]),
    typeChange(indexValue) {
      this.sampleIndex = 0;
      let selectedType = this.ruleList[indexValue].name;
      if (selectedType.indexOf("招中标") !== -1) {
        this.replaceTxtDisabled=false
        this.data.value =
          "樟树市2012年度小型农田水利工程建设项目施工（11标段）招标项目于2012年11月5日10时00分在樟树市公共资源交易中心公开开标，经评标专家委员会评审，确定了中标候选人，现公示如下：樟树市2012年度小型农田水利工程建设项目施工（11标段）中标候选人第一排序人：江西省资溪县水电建筑安装工程公司投标报价：145.641798万元项目负责人：刘存计第二排序人：南城县昌水水电建筑有限责任公司投标报价：146.089924万元项目负责人：王一方第三排序人：萍乡市水利水电建设有限责任公司投标报价：146.239298万元项目负责人：余建良根据《江西省水利工程建设项目招标投标管理暂行办法》（赣水建管字[2010]236号文）第四十三条规定，本次公示中标候选人公示期为5天，公示发布日期为：2012年11月6日。对上述结果如有异议，请按照《工程建设项目招标投标活动投诉处理办法》的规定和程序，向如下单位投诉：行政监督投诉电话：0795-7351116招标人：樟树市小型农田水利工程建设项目部招标代理机构：江西省安澜工程咨询有限公司";
      } else if (selectedType.indexOf("裁判文书") !== -1) {
        this.replaceTxtDisabled=false
        this.data.value =
          "樟树市2012年度小型农田水利工程建设项目施工（11标段）招标项目于2012年11月5日10时00分在樟树市公共资源交易中心公开开标，经评标专家委员会评审，确定了中标候选人，现公示如下：樟树市2012年度小型农田水利工程建设项目施工（11标段）中标候选人第一排序人：江西省资溪县水电建筑安装工程公司投标报价：145.641798万元项目负责人：刘存计第二排序人：南城县昌水水电建筑有限责任公司投标报价：146.089924万元项目负责人：王一方第三排序人：萍乡市水利水电建设有限责任公司投标报价：146.239298万元项目负责人：余建良根据《江西省水利工程建设项目招标投标管理暂行办法》（赣水建管字[2010]236号文）第四十三条规定，本次公示中标候选人公示期为5天，公示发布日期为：2012年11月6日。对上述结果如有异议，请按照《工程建设项目招标投标活动投诉处理办法》的规定和程序，向如下单位投诉：行政监督投诉电话：0795-7351116招标人：樟树市小型农田水利工程建设项目部招标代理机构：江西省安澜工程咨询有限公司";
      } else if (selectedType.indexOf("授信") !== -1) {
        this.replaceTxtDisabled=false
        this.data.value =
          "同意给予华谊兄弟南京强拓科技有限公司综合授信人民币3.3亿元，授信期限1年，可用于流动资金贷款、内保外贷、并购贷款业务。如用于流贷和内保外贷业务为信用方式，最高占用不超过1.5亿元；如用于并购贷款，最高占用不超过3.3亿元，专项用于收购哈尔滨赢鑫懿贸易有限公司50.88%股权，" +
          "贷款期限不超过55个月，贷款到期日不晚于2018年10月31日，具体放款及还款计划可按分行审批意见执行，由嘉兴嘉顺电声音响有限公司提供连带责任担保，并追加实际控制人马贤明、凌娟的连带责任保证担保。要求：" +
          "1、并购贷款须严格按照我行有关并购贷款管理规定办理。并购贷款总额不超过并购总交易价格的50%，如申请人以配套募集资金支付的现金和股权对价合计超过并购价格的50%，我行应相应调减贷款金额，确保我行及企业支付的对价总额不超过67161.60万元。我行贷款与公司现金及股权对价同比例支付。" +
          "2、我行并购贷款发放前支行应落实企业资金或股权到位情况，发放后严格监控资金流向，防止企业挪用。流动资金贷款应确保贷款用途合规。" +
          "3、流动资金贷款只能用于企业主营业务，需有切实的交易背景证明资料，不得用于向个人支付款项。内保外贷业务专项用于其香港或美国子公司在境外融资用于投资拍摄影片《狂怒》（暂定名），额度生效前取得总行国际部核准，经办行（部）需严格审查业务背景（尤其是境外子公司），确保真实、合法、合规。" +
          "4、加强贷后检查，关注申请人其他并购事项的进展，如发放了并购贷款需密切跟进并购完成后并购双方的业务整合及经营、盈利情况。" +
          "5、关注企业投资影片的拍摄进展及票房情况，并关注企业投资旅游地产及对主业资金的影响；关注企业各项融资、负债总量及现金流状况。" +
          "6、根据将到期短债业务的兑付情况，控制放款节奏，现有业务余额纳入管理。";
      } else {
        this.replaceTxtDisabled=true
        this.data.value = "";
      }
    },
    replaceTxt() {
      if (this.ruleList[this.data.typeIndex]) {
        let selectedType = this.ruleList[this.data.typeIndex].name;
        if (selectedType.indexOf("招中标") !== -1) {
          this.data.value = extractBiddingSamples[this.sampleIndex];
          this.sampleIndex++;
          if (this.sampleIndex >= extractBiddingSamples.length) {
            this.sampleIndex = 0;
          }
        } else if (selectedType.indexOf("裁判文书") !== -1) {
          this.data.value = extractJudgementSamples[this.sampleIndex];
          this.sampleIndex++;
          if (this.sampleIndex >= extractJudgementSamples.length) {
            this.sampleIndex = 0;
          }
        } else if (selectedType.indexOf("授信") !== -1) {
          this.data.value = zsbankCreditSamples[this.sampleIndex];
          this.sampleIndex++;
          if (this.sampleIndex >= zsbankCreditSamples.length) {
            this.sampleIndex = 0;
          }
        }
      }
    },
    submitTxt() {
      if (this.data.value.trim() == "") {
        this.$alert("输入内容不能为空", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.data.typeIndex === "") {
        this.$alert("请选择规则", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.submit = true;
      let requestData = {
        data: this.data.value,
        config: this.ruleList[this.data.typeIndex].content
      };
      this.dataExtract(requestData);
    }
  }
};
</script>

<style lang="less">
.submit-box {
  text-align: right;
  margin-bottom: 50px;
}

.message {
  top: 160px;
}
</style>