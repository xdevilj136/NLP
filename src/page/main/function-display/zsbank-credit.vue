<template>
  <div>
    <el-input class="mgt10 mgb10" type="textarea" :autosize="{ minRows: 8, maxRows: 8}" :maxlength="1000" placeholder="请输入要进行信息抽取的内容" v-model="data.value">
    </el-input>
    <p v-if="data.value.length>=1000" style="color:red;">超出最大长度限制1000</p>
    <div class="submit-box">
      <el-button @click="submitTxt" type="primary">提交文本</el-button>
    </div>
    <div v-if="submit && extractSuccess">
    <p>关联关系</p>
    <el-table  border style="width: 100%" class="mgt10 mgb10" :data="relationResult">
      <el-table-column min-width="100" prop="name" label="名称">
      </el-table-column>
      <el-table-column min-width="500" prop="value" label="值">
      </el-table-column>
    </el-table>
    </div>
    <div v-if="submit && extractSuccess" class="mgt40">
    <p>关注点</p>
    <el-table  border style="width: 100%" class="mgt10 mgb10" :data="attentionResult">
      <el-table-column min-width="100" prop="name" label="名称">
      </el-table-column>
      <el-table-column min-width="500" prop="value" label="值">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'data-extract',
  data() {
    return {
      ruleList: [],
      data: {
        value: ''
      },
      //解析后抽取信息结果
      relationResult: [],
      attentionResult:[],
      submit: false,
      extractSuccess: false
    }
  },
  watch: {

    zsbankCreditResult: function(zsbankCreditResult) {
      if ('result' in zsbankCreditResult && 'error' in zsbankCreditResult) {
        if (zsbankCreditResult.error) {
          this.extractSuccess = false;
          this.$alert(zsbankCreditResult.errorMessage, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return;
        }
        else {
          if (zsbankCreditResult.result.ZhaohangCredit) {
            this.extractSuccess = true;
            let parsedData = JSON.parse(zsbankCreditResult.result.ZhaohangCredit);
            for (let key in parsedData.ZhaohangCredit) {
              if (parsedData.ZhaohangCredit.hasOwnProperty(key)) {
                let element = parsedData.ZhaohangCredit[key]
                let list = []
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
                  if(key=='Relation'){
                
                this.relationResult = list
              }
              else if(key=='Attention'){
                  this.attentionResult=list
              }
            }
            }
          }
          this.$notify({
            message: '解析成功',
            type: 'success',
            duration: 1000,
            offset: 200
          });
        }
      }
    }
  },
  computed: mapState(['zsbankCreditResult']),
  created() {
  },
  methods: {
    ...mapActions([
      'zsbankAnalysis'
    ]),
    submitTxt() {
      if (this.data.value.trim() == '') {
        this.$alert('输入内容不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
      this.submit = true
      let requestData = {
        functions:["ZhaohangCredit"],
        data: this.data.value
      };
      this.zsbankAnalysis(requestData)
    }
  }
}
</script>

<style lang="less">
.submit-box {
  text-align: right;
  margin-bottom: 50px;
}
.mgt40{
    margin-top: 40px;
}
.message {
  top: 160px;
}
</style>