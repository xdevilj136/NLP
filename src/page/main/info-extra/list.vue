<template>
  <div>
    <div class="info-extra-list-head-box">
      <el-form :inline="true" :model="searchForm" class="searchBar">
        <el-form-item label="创建人">
          <!-- <el-select v-model="searchForm.name" placeholder="请选择" size="small" filterable>
                <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
          <el-input v-model="searchForm.name" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="建立日期：">
          <el-select v-model="searchForm.timeRange" placeholder="请选择" size="small">
            <el-option v-for="item in timeRangeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="search-btn" @click="searchSubmit" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="overflow:hidden;">
      <span class="lightFont">共搜索到{{ruleList.length?ruleList.length:0}}条数据</span>
      <div class="fr">
        <el-button type="primary" @click="gotoNext('/main/info-extra/add')" size="small">新增配置</el-button>
      </div>
    </div>
    <el-table :data="ruleList" class="data-table" :default-sort="{prop: 'ctime', order: 'descending'}" border>
      <el-table-column prop="name" label="规则名称">
        <template scope="scope">
          <router-link :to="'/main/info-extra/' + scope.row.name + '/detail/'+scope.row.id">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="创建人">
      </el-table-column>
      <el-table-column prop="ctime" label="创建日期" :sortable="true">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <div class="toolbar">
            <el-button type="text" :disabled="!scope.row.editable" @click="editRule(scope.row)">编辑</el-button>
            <el-button type="text" :disabled="!scope.row.editable" @click="deleteRule(scope.row)">删除</el-button>
          </div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
            <span>删除后，该规则将无法使用。</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteDialogConfirm">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'info-extra-detail',
  data() {
    return {
      nameOptions: [{
        value: 'JAY',
        label: 'JAY'
      }, {
        value: 'TOM',
        label: 'TOM'
      }, {
        value: 'JERRY',
        label: 'JERRY'
      }, {
        value: 'USER',
        label: 'USER'
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
      ruleList: [],
      //查询条件
      searchForm: {
        name: '',
        timeRange: ''
      },
      //最近一次查询条件
      lastSearch:{
        name: '',
        timeRange: ''
      },
      dialogTitle: '',
      dialogVisible: false,
      //删除规则id
      toDeleteRuleId: ''
    }
  },
  created(){
    this.refreshRuleTable(this.lastSearch);
  },
  computed: mapState(['configList', 'deleteRuleResponse']),
  watch: {
    configList: function(configList) {
      if (configList.result&&configList.result.list) {
        this.ruleList = this.configList.result.list
      }
    },
    deleteRuleResponse: function(response) {
      if ('result' in response && 'error' in response) {
        if (response.error) {
          this.$notify({
            message: response.errorMessage,
            type: 'warnning',
            duration: 2000,
            offset: 200
          });
        }
        else {
          this.$notify({
            message: response.result,
            type: 'success',
            duration: 2000,
            offset: 200
          });
          this.refreshRuleTable(this.lastSearch);
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getInfoConfig', 'deleteConfigRule'
    ]),

    //计算时间 （最近时间范围）-》建立时间
    computeCreateTime(timeRange) {
      let timeRange_ms = '';
      switch (timeRange) {
        case 'oneMonth':
          timeRange_ms = 30 * 24 * 60 * 60 * 1000;
          break;
        case 'threeMonth':
          timeRange_ms = 3 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'halfYear':
          timeRange_ms = 6 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'oneYear':
          timeRange_ms = 12 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'beyondOneYear':
          timeRange_ms = 12 * 30 * 24 * 60 * 60 * 1000;
          break;
      };
      return (timeRange_ms ? new Date(Date.now() - timeRange_ms).toLocaleDateString() : '').replace(/\//g, '-');
    },
    searchSubmit() {
      this.lastSearch.name=this.searchForm.name;
      this.lastSearch.timeRange=this.searchForm.timeRange;
      this.refreshRuleTable(this.searchForm);
    },
    refreshRuleTable(requirement){
      let creator = requirement.name.trim();
      //计算建立时间
      let createTime = this.computeCreateTime(requirement.timeRange);
      //查询参数
      let params = {};
      if (creator) params.fu = creator;
      if (createTime) params.bt = createTime
      this.getInfoConfig(params);
    },  
    gotoNext(path) {
      this.$router.push(path)
    },
    editRule(row) {
      this.$router.push('/main/info-extra/' + row.name + '/edit/' + row.id);
    },
    deleteRule(row) {
      this.dialogTitle = '确认删除 ' + row.name + ' 规则？';
      this.dialogVisible = true;
      this.toDeleteRuleId = row.id;
    },
    deleteDialogConfirm() {
      this.dialogVisible = false;
      this.deleteConfigRule(this.toDeleteRuleId);
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