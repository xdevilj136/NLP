<template>
<div>
  <el-select class="mgb10" v-model="data.type" placeholder="请选择">
    <el-option
      v-for="item in infoConfig"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
  <el-input class="mgt10 mgb10"
    type="textarea"
    :autosize="{ minRows: 8, maxRows: 8}"
    placeholder="请输入内容"
    v-model="data.value">
  </el-input>
  <el-button class="mgt10 fr" type="primary">提交文本</el-button>
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
        }
      }
    },
    watch: {
    },
    computed: mapState(['infoConfig']),
    created(){
    },
    methods: {
    }
}
</script>

<style lang="less">
.right-content {
  padding: 40px;
  .task-manage-task {
    margin-top: 16px;
  }
  .block {
    text-align: right;
    margin-top: 30px
  }
}
</style>