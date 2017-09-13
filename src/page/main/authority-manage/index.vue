<template>
  <div class="right-content">
    <h3 class="title">用户与权限管理</h3>
    <el-table :data="tableData" border class="authority-manage-task">
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="authority" label="权限">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="handleEditClick(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteClick(scope.$index,scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="1000">
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
export default {
  name: 'authority-manage',
  data() {
    return {
      tableData: [{
        username: '张三',
        authority: '管理员',
        status: '已激活'
      }, {
        username: '李四',
        authority: '普通用户',
        status: '未激活'
      }, {
        username: '王五',
        authority: '管理员',
        status: '已激活'
      }, {
        username: '赵六',
        authority: '普通用户',
        status: '未激活'
      }],
      dialogVisible: false,
      dialogTitle: "",
      //编辑对话框、删除对话框
      dialogType: "",
      editForm: {
        authorityRadio: "",
        statusRadio: ""
      },
      //操作表格行索引
      operateRowIndex: ""
    }
  },
  watch: {

  },
  created() {
  },
  methods: {
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
      this.editForm.authorityRadio = row.authority == "管理员" ? "admin" : "user";
      this.editForm.statusRadio = row.status == "已激活" ? "active" : "notActive";
      this.operateRowIndex = index;
    },
    handleCurrentChange(page) {
      console.log(page)
    },
    dialogConfirm() {
      if (this.dialogType == "deleteDialog") {
        this.tableData.splice(this.operateRowIndex, 1);
      }
      else if(this.dialogType=="editDialog"){
        let operateRow=this.tableData[this.operateRowIndex];
        let authority=this.editForm.authorityRadio=="admin"?"管理员":"普通用户";
        let status=this.editForm.statusRadio=="active"?"已激活":"未激活";
        operateRow.authority=authority;
        operateRow.status=status;
      }
      this.dialogVisible = false;
    }
  }
}
</script>

<style lang="less">
.title{
  border-bottom: 1px solid #E8E8E8;
}
.right-content {
  padding: 40px;
  .authority-manage-task {
    margin-top: 16px;
  }
  .block {
    text-align: right;
    margin-top: 30px
  }
}
</style>

