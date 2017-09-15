<template>
<div>
    <div class="info-extra-list-head-box">
      <el-form :inline="true" :model="searchForm" class="searchBar">
        <el-form-item label="创建人">
          <el-select v-model="searchForm.name" placeholder="请选择" size="small">
            <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建立日期：">
          <el-select v-model="searchForm.time" placeholder="请选择" size="small">
            <el-option v-for="item in timeRangeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-button type="primary" class="search-btn" @click="searchSubmit" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="overflow:hidden;">
      <span class="lightFont">共搜索到{{data.length?data.length:0}}条数据</span>
      <div class="fr">
        <el-button type="primary" @click="gotoNext('/main/info-extra/add')" size="small">新增配置</el-button>
      </div>
    </div>
    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="规则名称">
        <template scope="scope">
        <span @click="gotoNext('/main/info-extra/' + scope.row.value + '/detail')">{{ scope.row.name + 'dsaf' }}</span></template>
      </el-table-column>
      <el-table-column
        prop="admin"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="time"
        label="创建日期">
      </el-table-column>
    </el-table>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'function-display',
    data () {
      return {
        nameOptions: [{
              value: 'cjf',
              label: 'dsadsfa'
          }, {
              value: 'cjf1',
              label: 'dsadsfa1'
          }, {
              value: 'cjf2',
              label: 'dsadsfa2'
          }, {
              value: 'cjf3',
              label: 'dsadsfa3'
          }],
        timeRangeOptions: [{
            value: 'oneMonth',
            label: '近一个月'
        },
        {
            value: 'threeMonth',
            label: '近三个月'
        },
        {
            value: 'halfYear',
            label: '近半年'
        },
        {
            value: 'oneYear',
            label: '近一年'
        },
        {
            value: 'beyondOneYear',
            label: '一年以上'
        }],
        data: [],
        searchForm: {
          name: '',
          time: ''
        }
      }
    },
    computed: mapState(['configList']),
    created () {
      this.data = this.configList
    },
    methods: {
      searchSubmit () {

      },
      gotoNext (path) {
        console.log(path)
        this.$router.push(path)
      }
    }
}
</script>
<style>
.search-btn {
  top: 3px;
  position: relative
}
</style>