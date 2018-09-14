<template>
  <div>
    <div class="content-ident-box">
      <el-form ref="form" label-width="100px">
        <el-form-item label="企业名称：">
          <el-input class="content-input " v-model="data.companyName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="经营范围：">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" class="content-input-area" v-model="data.industryScope" placeholder="请输入"></el-input>
        </el-form-item>
        <el-button class="content-submit" size="small" @click="submitTxt()" type="primary">查询</el-button>
      </el-form>
    </div>
    <div  v-if="category" class="result-container mgt40">
      <el-form ref="form" label-width="100px">
        <el-form-item label="行业类别：">
          <span class="result-label">{{category}}</span>
        </el-form-item>
      </el-form>      
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
  name: 'industry-category',
  data() {
    return {
      data: {
        companyName: '',
        industryScope: '',
      },
      category:''
    }
  },
  watch: {
    industryCategoryResult: function(industryCategoryResult) {
      if ("result" in industryCategoryResult && "error" in industryCategoryResult) {
        if (industryCategoryResult.error) {
          this.extractSuccess = false;
          this.$alert(industryCategoryResult.errorMessage, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        else{
          this.category = industryCategoryResult.result.IndustryCategory
        }
    }
  }
  },
  components: {},
  computed: mapState(['industryCategoryResult']),
  created() {},
  methods: {
    ...mapActions(['industryCategory']),
    submitTxt(type) {
        this.data.companyName = this.data.companyName.replace(/\s/g, '')
        this.data.industryScope = this.data.industryScope.replace(/\s/g, '')

        if (this.data.companyName == '' || this.data.industryScope == '') {
          this.$alert('输入内容不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return
        }

        this.industryCategory({
          companyName: this.data.companyName,
          industryScope: this.data.industryScope,
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .mgt40 {
    margin-top: 40px;
  }
.content-ident-box {
  margin-top: 15px;
  .content-title {
    padding: 10px 0;
    color: #333;
  }
  .content-input {
    width: 200px;
    margin-right: 20px;
  }
  .content-input-area {
    width: 460px;
    margin-right: 20px;
  }
  .content-submit{
    margin-left: 100px;
  }

}
  .result-label{
    display: inline-block;
    background: #f7f7f7;
    font-size: 12px;
    color:#666;
    padding: 0 10px;
    border-radius: 4px;
  }
</style>