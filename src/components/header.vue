<template>
  <div class="header-box">
    <img class="header-logo" src="../images/natural-language/haizhi-logo.png">
    <div class="header-right-box fr" v-if="$route.path!=='/login'">
      <div class="fl">
        <img class="header-right-logo" src="../images/natural-language/question.png">
        <span>帮助</span>
      </div>
      <div class="header-right-end fl">
        <img class="header-right-logo" src="../images/natural-language/head-logo.png">
        <span>{{username}}</span>
        <div class="user-menu">
          <i class="up-trig"></i>
          <li class="menu-item" @click="resetPassword">修改密码</li>
          <hr class="w80 mgt10 mgb10">
          <li class="menu-item" @click="logout">退出登录</li>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" size="tiny" :modal="true" :modal-append-to-body="false">
      <el-form label-width="100px">
        <el-form-item label="原密码：">
          <el-input prop="oldPassword" type="password" v-model="oldPassword" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input prop="newPassword" type="password" v-model="newPassword" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：">
          <el-input prop="confirmNewPassword" type="password"v-model="confirmNewPassword" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <p v-if="confirmError" style="color:red;">两次输入密码不一致</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="validateEmpty()" @click.native.prevent="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
  name: 'header',
  computed: {
    ...mapState(['isCheck','changePasswordResponse']),
    confirmError:function(){
      let result=false;
      if(this.newPassword.trim()&&this.confirmNewPassword.trim()&&this.newPassword!==this.confirmNewPassword){
        result=true
      }
      return result
    }
  },
  watch:{
    changePasswordResponse:function(response){
      utils.notifyResponse(response,()=>{this.dialogVisible=false})
    },
    isCheck:function(isCheck){
      if(isCheck.error){
        utils.notifyResponse(isCheck,()=>{},()=>{this.$route.push('/login')})
      }
      else if(isCheck.result){
        this.username=isCheck.result.username
      }
    }
  },
  data(){
    return {
      username:'',
      dialogVisible: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  },
  created() {
      if(this.$route.path.indexOf('/main')!==-1){
        this.loginCheck()
      }
  },
  methods: {
    ...mapActions([
      'logOut',
      'changePassword',
      'loginCheck'
    ]),
    logout() {
      this.logOut()
      this.$router.push('/login')
    },
    resetPassword() {
      this.dialogVisible=true
    },
    dialogConfirm(){
      if(this.confirmError) return
      this.changePassword({
        newPassword:this.newPassword,
        oldPassword:this.oldPassword
      })
    },
    validateEmpty(){
      return this.oldPassword.trim().length==0||this.newPassword.trim().length==0||this.confirmNewPassword.trim().length==0
    }
  }
}
</script>

<style lang="less">
.header-box {
  z-index: 99;
  position: absolute;
  height: 64px;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  min-width: 1024px;
  background: white;
  .header-logo {
    padding: 12px 0 12px 24px;
    height: 40px;
  }
  .error-tip{
    display: none;
    color:red;
  }
  .header-right-box {
    height: 100%;
    line-height: 64px;
    cursor: pointer;
    margin-right: 20px;
    .header-right-logo {
      width: 20px;
      height: 20px;
      top: 5px;
      position: relative;
      padding-right: 5px;
    }
    .header-right-end {
      padding: 0 40px;
      position: relative;
      &:hover .user-menu {
        display: inline-block
      }
      .user-menu {
        width: 100px;
        line-height: 15px;
        padding-bottom: 15px;
        text-align: center;
        background: white;
        z-index: 100;
        color: #666;
        top: 55px;
        position: absolute;
        display: none;
        border: 0.5px solid #999;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);

        .up-trig {
          width: 0;
          height: 0;
          display: inline-block;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #999;
          position: relative;
          top: -12px;
        }
        .menu-item {
          &:hover {
            color: #249CFF;
          }
        }
      }
    }
  }
}
</style>