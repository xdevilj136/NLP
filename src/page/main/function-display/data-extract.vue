<template>
  <div>
    <el-select class="mgb10" v-model="data.typeIndex" placeholder="请选择">
      <el-option v-for="(item,index) in ruleList" :key="index" :label="item.name" :value="index">
      </el-option>
    </el-select>
    <el-input class="mgt10 mgb10" type="textarea" :autosize="{ minRows: 8, maxRows: 8}" :maxlength="1000" placeholder="请输入要进行信息抽取的内容" v-model="data.value">
    </el-input>
    <p v-if="data.value.length>=1000" style="color:red;">超出最大长度限制1000</p>
    <div class="submit-box">
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
import { mapActions, mapState } from 'vuex'
export default {
  name: 'data-extract',
  data() {
    return {
      ruleList: [],
      data: {
        typeIndex: '',
        value: ''
      },
      //解析后抽取信息结果
      extractResult: [],
      submit: false,
      extractSuccess: false
    }
  },
  watch: {

    configList: function(configList) {
      if (configList.result && configList.result.list) {
        this.ruleList = this.configList.result.list
      }
    },
    extractedData: function(extractedData) {
      if ('result' in extractedData && 'error' in extractedData) {
        if (extractedData.error) {
          this.extractSuccess = false;
          this.$alert(extractedData.errorMessage, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return;
        }
        else {
          if (extractedData.result.DataExtract) {
            this.extractSuccess = true;
            let parsedData = JSON.parse(extractedData.result.DataExtract);
            for (let key in parsedData) {
              if (parsedData.hasOwnProperty(key)) {
                let element = parsedData[key]
                let list = []
                for (var element_key in element) {
                  if (element.hasOwnProperty(element_key)) {
                    console.log(element[element_key])

                    element[element_key].forEach(function(each) {
                      list.push({
                        name: element_key,
                        value: each
                      });
                    }, this);

                  }
                }
                this.extractResult = list
              }
            }
          }
          this.$notify({
            message: '抽取信息成功',
            type: 'success',
            duration: 1000,
            offset: 200
          });
        }
      }
    }
  },
  computed: mapState(['configList', 'extractedData']),
  created() {
    this.getInfoConfig();
  },
  methods: {
    ...mapActions([
      'dataExtract',
      'getInfoConfig'
    ]),
    submitTxt() {
      console.log(this.data)
      if (this.data.value.trim() == '') {
        this.$alert('输入内容不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
      if (this.data.typeIndex === '') {
        this.$alert('请选择规则', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
      this.submit = true
      let requestData = {
        data: this.data.value,
        config: this.ruleList[this.data.typeIndex].content
      };
      this.dataExtract(requestData)
    }
  }
}
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