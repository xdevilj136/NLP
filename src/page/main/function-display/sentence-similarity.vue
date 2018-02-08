<template>
  <div>
    <div class="content-ident-box">
      <el-form ref="form" label-width="80px">
        <el-form-item label="语句一：">
          <el-input class="content-input" v-model="data.sentence1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="语句二：">
          <el-input class="content-input" v-model="data.sentence2" placeholder="请输入"></el-input>
        </el-form-item>
        <el-button class="content-submit" size="small" @click="submitTxt()" type="primary">查询</el-button>
      </el-form>
    </div>
    <div  v-if="similarity" class="result-container mgt40">
      <el-form ref="form" label-width="80px">
        <el-form-item label="相识度：">
          <span class="result-label">{{similarity}}</span>
        </el-form-item>
      </el-form>      
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
  name: 'sentence-similarity',
  data() {
    return {
      data: {
        sentence1: '',
        sentence2: '',
      },
      similarity:''
    }
  },
  watch: {
    sentenceSimilarityResult: function(sentenceSimilarityResult) {
      if ("result" in sentenceSimilarityResult && "error" in sentenceSimilarityResult) {
        if (sentenceSimilarityResult.error) {
          this.extractSuccess = false;
          this.$alert(sentenceSimilarityResult.errorMessage, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        else{
          this.similarity = sentenceSimilarityResult.result.SentenceSimilarity
        }
    }
  }
  },
  components: {},
  computed: mapState(['sentenceSimilarityResult']),
  created() {},
  methods: {
    ...mapActions(['sentenceSimilarity']),
    submitTxt(type) {
        this.data.sentence1 = this.data.sentence1.replace(/\s/g, '')
        this.data.sentence2 = this.data.sentence2.replace(/\s/g, '')

        if (this.data.sentence1 == '' || this.data.sentence2 == '') {
          this.$alert('输入内容不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return
        }

        this.sentenceSimilarity({
          sentence1: this.data.sentence1,
          sentence2: this.data.sentence2,
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
    width: 320px;
    margin-right: 20px;
  }

  .content-submit{
    margin-left: 80px;
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