<template>
<div class="login-box">
  <div class="login-content-box">
    <div class="login-title">
      <span :class="['login-head',{'active':status==='login'}]" @click="loginStatus('login')">登陆</span>
      <span>•</span>
      <span :class="['login-head',{'active':status==='register'}]" @click="loginStatus('register')">注册</span>
    </div>
    <el-form v-if="status==='login'"
    :model="login" :rules="loginRules" ref="login" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="checkName">
        <el-input size="large" class="login-input" v-model="login.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input size="large" class="login-input" type="password" v-model="login.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-submit" @click="submitForm('login')">登陆</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="status==='register'"
    :model="register" :rules="registerRules" ref="register" label-width="100px" class="demo-ruleForm register-box">
      <el-form-item prop="checkRegisterName">
        <el-input size="large" class="login-input" v-model="register.name" placeholder="用户名"></el-input>
      </el-form-item>
      <p class="login-desc">6-20位中英文字符，区分大小写</p>
      <el-form-item prop="checkRegisterPass">
        <el-input size="large" class="login-input" type="password" v-model="register.password" placeholder="密码"></el-input>
      </el-form-item>
      <p class="login-desc">6-20位字符，区分大小写</p>
      <el-form-item prop="checkRegisterRePass">
        <el-input size="large" class="login-input" type="password" v-model="register.repassword" placeholder="再次输入密码"></el-input>
      </el-form-item>
      <p class="login-desc">6-20位字符，区分大小写</p>
      <el-form-item>
        <el-button type="primary" class="login-submit" @click="submitForm('register')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
  name: 'loginCard',
    data() {
      var checkNameVal = (rule, value, callback) => {
        if (!this.login.name || this.login.name.trim() === '') {
          return callback(new Error('用户名不能为空'));
        } else {
          return callback()
        }
      };
      var validatePassVal = (rule, value, callback) => {
        if (!this.login.password || this.login.password.trim() === '') {
          return callback(new Error('密码不能为空'));
        } else {
          return callback()
        }
      };
      var checkRegisterNameVal = (rule, value, callback) => {
        if (!this.register.name || this.register.name.trim() === '') {
          return callback(new Error('用户名不能为空'));
        } else {
          return callback()
        }
      };
      var validateRegisterPassVal = (rule, value, callback) => {
        if (!this.register.password || this.register.password.trim() === '') {
          return callback(new Error('密码不能为空'));
        } else {
          return callback()
        }
      };
      var validateRegisterRePassVal = (rule, value, callback) => {
        if (this.register.repassword !== this.register.password) {
          return callback(new Error('两次输入密码不同'));
        } else {
          return callback()
        }
      };
      return {
        login: {
          name: '',
          password: '',
        },
        register: {
          name: '',
          password: '',
          repassword: ''
        },
        status: 'login',
        loginRules: {
          checkName: [
            { validator: checkNameVal, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePassVal, trigger: 'blur' }
          ],
        },
        registerRules: {
          checkRegisterName: [
            { validator: checkRegisterNameVal, trigger: 'blur' }
          ],
          checkRegisterPass: [
            { validator: validateRegisterPassVal, trigger: 'blur' }
          ],
          checkRegisterRePass: [
            { validator: validateRegisterRePassVal, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      ...mapActions([
        'loginCheck'
      ]),
      submitForm(formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.loginCheck(self[formName])
            self.$router.push('/main')
          } else {
            return false;
          }
        });
      },
      loginStatus (status) {
        this.status = status
      }
    }
  }
</script>

<style lang="less">
.login-box {
  text-align: center;
  height: 100%;
  .register-box {
    .el-form-item {
      margin-bottom: 0
    }
  }
  .login-content-box {
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    width: 350px;
    display: inline-block;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    border-radius: 8px;
    padding: 50px;
    .el-form.demo-ruleForm .el-form-item .el-form-item__content {
      margin-left: 0 !important
    }
    .login-desc {
      float: right;
      color: #BDBDBD;
      font-size: 12px
    }
    .login-submit {
      width: 100%;
      height: 42px;
      margin-top: 20px;
      cursor: pointer
    }
    .login-input {
      margin-top: 10px;
    }
  }
  .login-title {
    width: 100%;
    color: #BDBDBD;
    font-size: 18px;
    text-align: center;
    position: relative;
    margin-bottom: 50px;
    span {
      padding: 0 5px;
      cursor: pointer;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      background: #BDBDBD;
      height: 1px;
      top: 50%;
      width: 100px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      background: #BDBDBD;
      height: 1px;
      top: 50%;
      width: 110px;
    }
    .login-head, .register-head {
      &:hover, &.active {
        color: #333
      }
    }
  }
}
</style>