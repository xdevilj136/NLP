<template>
  <div>
    <div class="info-extra-list-head-box">
      <el-form :inline="true" :model="searchForm" class="searchBar">
        <el-form-item style="display:none;" label="创建人">
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
        </template>
      </el-table-column>
    </el-table>
        <div class="block">
      <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page="currentPage" :page-sizes="[5, 10,50, 100]" :page-size="pageSize" :total="totalCount" layout=" prev, pager, next, sizes, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
  name: 'info-extra-list',
  data() {
    return {
      //翻页组件
      currentPage: 1,
      pageSize: 10,
      totalCount: 10,
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
        timeRange: '',
        currentPage: '',
        pageSize: '',
      },
      //最近一次查询条件
      latestSearch:{
        name: '',
        timeRange: '',
        currentPage: '',
        pageSize: ''
      },
      //删除规则id
      toDeleteRuleId: ''
    }
  },
  created(){
    this.refreshRuleTable(this.latestSearch);
  },
  computed: mapState(['configList', 'deleteRuleResponse']),
  watch: {
    configList: function(configList) {
      if (configList.result&&configList.result.list) {
        this.ruleList = this.configList.result.list
      }
    },
    deleteRuleResponse: function(response) {
      utils.notifyResponse(response,()=>{this.refreshRuleTable(this.latestSearch);})
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
      this.latestSearch.name=this.searchForm.name;
      this.latestSearch.timeRange=this.searchForm.timeRange;
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
      if(requirement.pageSize) params.ps=requirement.pageSize
      if(requirement.currentPage) params.p=requirement.currentPage
      this.getInfoConfig(params);
    },  
    gotoNext(path) {
      this.$router.push(path)
    },
    editRule(row) {
      this.$router.push('/main/info-extra/' + row.name + '/edit/' + row.id);
    },
    deleteRule(row) {
      this.toDeleteRuleId = row.id;
      this.$confirm('删除后，该规则将无法使用。', '确认删除 '+row.name+' ?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDialogConfirm()
        }).catch(() => {
          
        });
    },
    deleteDialogConfirm() {
      this.deleteConfigRule(this.toDeleteRuleId);
    },
    //翻页组件操作
    currentPageChange(page) {
      this.currentPage = page
      this.latestSearch.currentPage = page - 1
      this.refreshRuleTable(this.latestSearch);
    },
    pageSizeChange(size) {
      this.pageSize = size
      this.latestSearch.pageSize = size
      this.refreshRuleTable(this.latestSearch);
    },
  }
}
</script>
<style lang="less">
.search-btn {
  top: 3px;
  position: relative
}
.right-content {
  .searchBar {
    & .el-select {
      width: 150px;
    }
  }
  .block {
    text-align: right;
    margin-top: 30px;
  }
  .el-pagination {
    button,
    input {
      border: 1px solid #d1dbe5;
      border-radius: 5px;
    }
    .el-input {
      input {
        border-radius: 5px;
      }
    }
    .btn-next {
      margin: 0 10px;
    }
    .el-pager {
      li {
        margin-left: 10px;
        border: 1px solid #d1dbe5;
        border-radius: 5px;
      }
    }
  }
  .toolbar {
    button {
      margin: 0;
      &:after {
        content: " |";
        display: inline;
      }
      &:last-child:after {
        display: none;
      }
    }
  }
}
</style>