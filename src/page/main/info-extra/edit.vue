<template>
  <div>
    <div class="background-title">
      <span>规则说明</span>
    </div>
    <el-form :inline="true" :rules="rules" :model="ruleDiscription" ref="ruleDiscriptionForm" class="rule-discription-form" label-width="100px">
      <el-form-item label="规则名称：" prop="ruleName">
        <el-input v-model="ruleDiscription.ruleName" placeholder="请输入" size="small"></el-input>
      </el-form-item>
      <el-form-item label="设为公开：">
        <el-radio-group v-model="ruleDiscription.isPublic">
          <el-radio :label=true>是</el-radio>
          <el-radio :label=false>否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="background-title">
      <span>规则属性</span>
    </div>
    <div v-for="(domain, index) in propertyDomains" :key="domain.key">
      <div class="border-container">
        <el-form :model="domain.ruleProperty" ref="rulePropertyForm" :rules="rules" class="rule-property-form" label-width="100px">
          <div class="inline-form">
            <el-form-item label="属性名称：" prop="attribute">
              <el-input v-model="domain.ruleProperty.attribute" placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item label="只匹配一次：">
              <el-radio-group v-model="domain.ruleProperty.matchOne">
                <el-radio :label=true>是</el-radio>
                <el-radio :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="触发规则：" prop="trigger">
            <codemirror v-model="domain.ruleProperty.trigger" :options="options" placeholder="请输入内容"></codemirror>
          </el-form-item>
          <el-form-item label="匹配规则：" prop="matchRule">
            <codemirror v-model="domain.ruleProperty.matchRule" :options="options" placeholder="请输入内容"></codemirror>
            <p class="config-content-desc">*匹配规则与触发规则必填一项</p>
          </el-form-item>
        </el-form>
      </div>
      <el-button v-if="propertyDomains.length>1" @click="removePropertyDomain(domain)" class="inline-button" type="primary" icon="minus" size="small"></el-button>
      <el-button v-if="index==propertyDomains.length-1" @click="addPropertyDomain" class="inline-button" type="primary" icon="plus" size="small"></el-button>
    </div>
    <div class="action-box">
      <el-button v-if="$route.name=='info-extra-add'" @click="createRule" type="primary" size="small">创建</el-button>
      <el-button v-if="$route.name=='info-extra-edit'" @click="saveRule" type="primary" size="small">保存</el-button>
      <el-button @click="$router.go(-1)" size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/addon/display/placeholder.js')

export default {
  name: 'info-extra-edit',
  components: {
    codemirror
  },
  data() {
    var validateEmpty = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('输入内容不能为空'));
      } else {
        callback();
      }
    };
    return {
      ruleId: '',
      ruleDiscription: {
        ruleName: '',
        isPublic: true
      },
      propertyDomains: [
        {
          key: '',
          ruleProperty: {
            attribute: '',
            matchRule: '',
            trigger: '',
            matchOne: true
          },
        }
      ],
      rules: {
        ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'change' },
          { validator: validateEmpty, trigger: 'change' }
        ],
        attribute: [
          { required: true, message: '请输入属性名称', trigger: 'change' },
          { validator: validateEmpty, trigger: 'change' }
        ]
      },
      options: {
        lineNumbers: true,
        lineWrapping: true,
        cursorHeight: 0.7,
        placeholder: '请输入内容'
      }
    }
  },
  computed: mapState([
    'infoExtraDetail',
    'createRuleResponse',
    'configRule',
    'updateRuleResponse'
  ]),
  watch: {
    createRuleResponse: function(response) {
      this.responseAlert(response);
    },
    updateRuleResponse: function(response) {
      this.responseAlert(response);
    },
    configRule: function(configRule) {
      if (configRule.result) {
        this.ruleId = configRule.result.id;
        this.ruleDiscription.ruleName = configRule.result.name ? configRule.result.name : '';
        this.ruleDiscription.isPublic = configRule.result.privilege == 0 ? false : true;
        if (configRule.result.content) {
          let attributeList = JSON.parse(configRule.result.content);
          for (var index = 0; index < attributeList.length; index++) {
            this.propertyDomains[index] = {
              key: index,
              ruleProperty: attributeList[index]
            };
          }
        }
      }
    }
  },
  created() {
    if (this.$route.name !== 'info-extra-add') {
      this.queryRuleById(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions([
      'createRuleRequest',
      'queryRuleById',
      'updateRuleRequest'
    ]),
    //对请求返回响应的提示
    responseAlert(response) {
      if ('result' in response && 'error' in response) {
        if (response.error) {
          this.$alert(response.errorMessage, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return;
        }
        else {
          this.$router.go(-1);
          this.$notify({
            message: response.result,
            type: 'success',
            duration: 2000,
            offset: 200
          });
        }
      }
    },
    //增加规则属性表单域
    addPropertyDomain() {
      this.propertyDomains.push(
        {
          key: Date.now(),
          ruleProperty: {
            attribute: '',
            matchRule: '',
            trigger: '',
            matchOne: true
          }

        }
      );
    },
    removePropertyDomain(item) {
      var index = this.propertyDomains.indexOf(item)
      if (index !== -1) {
        this.propertyDomains.splice(index, 1)
      }
    },
    //提交校验
    submitValidate() {
      let result = false;
      //属性表单校验
      let rulePropertyForms = this.$refs['rulePropertyForm'];
      let rulePropertyFormsValid = true;
      rulePropertyForms.forEach(function(form) {
        //匹配规则与触发规则必填一项
        let ruleEmpty = (form.model.matchRule == '' && form.model.trigger == '');
        form.validate((valid) => {
          if (!valid || ruleEmpty) {
            rulePropertyFormsValid = false;
          }
        });
      }, this);
      //规则说明表单校验
      this.$refs['ruleDiscriptionForm'].validate((ruleDiscriptionValid) => {
        if (ruleDiscriptionValid && rulePropertyFormsValid) {
          result = true;
        }
      });
      return result;
    },
    createRule() {
      if (this.submitValidate()) {
        var ruleName = this.ruleDiscription.ruleName.trim();
        var isPublic = this.ruleDiscription.isPublic;
        var configs = [];
        for (var index = 0; index < this.propertyDomains.length; index++) {
          let ruleProperty = this.propertyDomains[index].ruleProperty;
          for (var key in ruleProperty) {
            if (ruleProperty.hasOwnProperty(key) && typeof ruleProperty[key] == 'string') {
              ruleProperty[key] = ruleProperty[key].trim();
            }
          }
          configs.push(ruleProperty);
        }
        var rule = {
          name: ruleName,
          content: JSON.stringify(configs),
          privilege: isPublic ? 1 : 0
        }
        this.createRuleRequest(rule);
      } else {
        this.$alert('请按规则填写', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
    },
    saveRule() {
      if (this.submitValidate()) {
        var ruleName = this.ruleDiscription.ruleName.trim();
        var isPublic = this.ruleDiscription.isPublic;
        var configs = [];
        for (var index = 0; index < this.propertyDomains.length; index++) {
          let ruleProperty = this.propertyDomains[index].ruleProperty;
          for (var key in ruleProperty) {
            if (ruleProperty.hasOwnProperty(key) && typeof ruleProperty[key] == 'string') {
              ruleProperty[key] = ruleProperty[key].trim();
            }
          }
          configs.push(ruleProperty);
        }
        //修改需要传id
        var rule = {
          name: ruleName,
          content: JSON.stringify(configs),
          privilege: isPublic ? 1 : 0,
          id: this.ruleId
        };
        this.updateRuleRequest(rule);
      } else {
        this.$alert('请按规则填写', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
    }
  }
}
</script>

<style lang="less">
.background-title {
  background-color: #eef1f6;
  padding: 10px;
  color: #666;
}

.border-container {
  display: inline-block;
  border: 1px solid #bfcbd9;
  border-radius: 5px;
  margin: 20px;
  width: 85%;
}

.rule-discription-form,
.rule-property-form {
  margin: 10px;
  .el-form-item {
    margin-right: 50px;
  }
  .CodeMirror-placeholder {
    color: #97a9c6;
  }
  input {
    width: 250px;
  }
}

.rule-property-form>.el-form-item .el-form-item__content {
  border: 1px solid #bfcbd9;
  border-radius: 5px;
}

.inline-form {
  .el-form-item {
    display: inline-block;
  }
}

.inline-button {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.config-content-desc {
  color: #999
}

.action-box {
  margin: 0 0 30px 30px;
}
</style>