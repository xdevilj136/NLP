<template>
  <div class="right-content">
    <div class="title-show-box">用户与权限管理</div>
    <el-table :data="userList" border class="data-table">
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="roleId" label="权限">
        <template scope="scope">
          <span>{{ scope.row.roleId | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          <span>{{ scope.row.status | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="handleEditClick(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteClick(scope.$index,scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page="currentPage" :page-sizes="[5, 10,50, 100]" :page-size="pageSize" :total="totalCount" layout=" prev, pager, next, sizes, jumper">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
      <div v-if="dialogType==='deleteDialog'">
        <span>删除后，该用户需要重新注册才能使用平台。</span>
      </div>
      <div v-if="dialogType==='editDialog'">
        <el-form :model="editForm">
          <el-form-item label="权限：">
            <el-radio-group v-model="editForm.authorityRadio">
              <el-radio label="user">普通用户</el-radio>
              <el-radio label="admin">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：">
            <el-radio-group v-model="editForm.statusRadio">
              <el-radio label="active">激活</el-radio>
              <el-radio label="notActive">未激活</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'authority-manage',
  data() {
    return {
      userList: [],
      dialogVisible: false,
      dialogTitle: "",
      //编辑对话框、删除对话框
      dialogType: "",
      editForm: {
        authorityRadio: "",
        statusRadio: ""
      },
      //操作表格行索引
      operateRowIndex: "",
      //翻页相关
      currentPage: 1,
      pageSize: 10,
      totalCount: 10,
    }
  },
  computed: mapState(['authorityManage']),

  watch: {
    authorityManage: function(data) {
      if (data.result && data.result.list) {
        this.userList = data.result.list
        this.totalCount = data.result.count
      }
    }

  },
  created() {
    this.getAuthorityManage()
  },
  methods: {
    ...mapActions([
      'getAuthorityManage'
    ]),
    handleDeleteClick(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "确认删除用户 " + row.username + " 吗？";
      this.dialogType = "deleteDialog";
      this.operateRowIndex = index;
    },
    handleEditClick(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑用户";
      this.dialogType = "editDialog";
      this.editForm.authorityRadio = row.roleId == 1 ? "admin" : "user";
      this.editForm.statusRadio = row.status == 1 ? "active" : "notActive";
      this.operateRowIndex = index;
    },
    //编辑对话框确认
    dialogConfirm() {
      if (this.dialogType == "deleteDialog") {
        this.userList.splice(this.operateRowIndex, 1);
      }
      else if (this.dialogType == "editDialog") {
        let operateRow = this.userList[this.operateRowIndex];
        let authority = this.editForm.authorityRadio == "admin" ? 1 : 0;
        let status = this.editForm.statusRadio == "active" ? 1 : 0;
        operateRow.roleId = authority;
        operateRow.status = status;
      }
      this.dialogVisible = false;
    },
    //翻页控件
    currentPageChange(currentPage) {
      // this.currentPage = currentPage
      // this.latestSearch.currentPage = currentPage - 1
      // this.refreshDataSource()
    },
    pageSizeChange(pageSize) {
      // this.pageSize = pageSize
      // this.latestSearch.pageSize = pageSize
      // this.refreshDataSource()
    },
  },
  filters: {
    roleFilter: function(value) {
      let result = ''
      switch (value) {
        case 1:
          result = "管理员"
          break;
        case 0:
          result = "普通用户"
          break;
        default:
          break;
      }
      return result
    },
    statusFilter: function(value) {
      let result = ''
      switch (value) {
        case 1:
          result = "已激活"
          break;
        case 0:
          result = "未激活"
          break;
        default:
          break;
      }
      return result
    }
  }
}
</script>

<style lang="less">
.title {
  border-bottom: 1px solid #E8E8E8;
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

