<template>
<div>
  <el-select class="mgb10" v-model="data.type" placeholder="请选择">
    <el-option
      v-for="item in configList"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
  <el-input class="mgt10 mgb10"
    type="textarea"
    :autosize="{ minRows: 8, maxRows: 8}"
    placeholder="请输入要进行信息抽取的内容"
    v-model="data.value">
  </el-input>
  <div class="submit-box">
    <el-button
    @click="submitTxt()"
    type="primary">提交文本</el-button>
  </div>
  <el-table v-if="submit && Object.keys(infoGet).length > 0" class="mgt10 mgb10"
    :data="infoGet.children">
    <el-table-column
      prop="name"
      label="关键信息">
    </el-table-column>
    <el-table-column
      prop="value"
      label="值">
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'info-get',
    data () {
      return {
        data: {
          type: '',
          value: ''
        },
        submit: false
      }
    },
    watch: {
    },
    computed: mapState(['configList', 'infoGet']),
    created(){
    },
    methods: {
      ...mapActions([
        'infoGetAction'
  		]),
      submitTxt () {
        this.submit = true
        this.infoGetAction()
      }
    }
}
</script>

<style lang="less">
.submit-box {
  text-align: right;
  margin-bottom: 50px;
}
</style>