<template>
  <div>
    <div class="info-extra-list-head-box">
      <el-form :inline="true" :model="searchForm" class="searchBar">
        <el-form-item label="创建人">
          <el-select v-model="searchForm.name" placeholder="请选择" size="small" filterable>
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
    <el-table :data="data" class="data-table" :default-sort="{prop: 'time', order: 'descending'}" border>
      <el-table-column prop="name" label="规则名称">
        <template scope="scope">
          <router-link :to="'/main/info-extra/' + scope.row.value + '/detail'">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人">
      </el-table-column>
      <el-table-column prop="time" label="创建日期" :sortable="true">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <div class="toolbar">
            <el-button type="text" :disabled="noPermission(scope.row.status)" @click="editRule(scope.row)">编辑</el-button>
            <el-button type="text" :disabled="noPermission(scope.row.status)" @click="deleteRule(scope.row)">删除</el-button>
          </div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
            <span>删除后，该规则将无法使用。</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click.native.prevent="deleteDialogConfirm(scope.row)">确 定</el-button>
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
      data: [],
      searchForm: {
        name: '',
        time: ''
      },
      dialogTitle: '',
      dialogVisible: false
    }
  },
  computed: mapState(['configList']),
  created() {
    this.data = this.configList
  },
  methods: {
    searchSubmit() {

    },
    gotoNext(path) {
      console.log(path)
      this.$router.push(path)
    },
    noPermission(status) {
      return false;
    },
    editRule(row) {
      this.$router.push('/main/info-extra/edit/' + row.id);
    },
    deleteRule(row) {
      this.dialogTitle = '确认删除 ' + row.name + ' 规则？';
      this.dialogVisible = true;

    },
    deleteDialogConfirm(row) {
      this.dialogVisible = false;
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