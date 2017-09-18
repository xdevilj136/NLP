<template>
  <div>
    <div class="background-title">
      <span>规则说明</span>
    </div>

    <el-form :inline="true" :model="ruleDiscription" class="rule-discription-form" label-width="100px">
      <el-form-item label="规则名称：">
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
        <el-form :model="domain.ruleProperty" class="rule-discription-form" label-width="100px">
          <div class="inline-form">
            <el-form-item label="属性名称：">
              <el-input v-model="domain.ruleProperty.attribute" placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item label="只匹配一次：">
              <el-radio-group v-model="domain.ruleProperty.matchOne">
                <el-radio :label=true>是</el-radio>
                <el-radio :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="触发规则：">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入内容" v-model="domain.ruleProperty.trigger">
            </el-input>
          </el-form-item>
          <el-form-item label="匹配规则：">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入内容" v-model="domain.ruleProperty.matchRule">
            </el-input>
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
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'info-extra-edit',
  data() {
    return {
      ruleDiscription: {
        ruleName: '',
        isPublic: true
      },

      propertyDomains: [
        {
          key: '',
          ruleProperty: {
            attribute:'',
            matchRule: '',
            trigger: '',
            matchOne: true
          },
        }
      ]
    }
  },
  computed: mapState(['infoExtraDetail']),
  watch: {
    '$route'(newVal, oldVal) {
      console.log(newVal)
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    ...mapActions([
      'infoExtraDetailGet','createRuleRequest'
    ]),
    addPropertyDomain() {
      this.propertyDomains.push(
        {
          key: Date.now(),
          ruleProperty: {
            attribute:'',
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
    createRule() {
      console.log(this.ruleDiscription);
      console.log(this.propertyDomains);
      var ruleName=this.ruleDiscription.ruleName;
      var isPublic=this.ruleDiscription.isPublic;
      var configs=[];
      for (var index = 0; index < this.propertyDomains.length; index++) {
        configs.push( this.propertyDomains[index].ruleProperty);
      }
      var content={
        name:ruleName,
        configs:configs
      };
  var rule={
    name:ruleName,
    content:JSON.stringify(content),
    privilege:isPublic?1:0
  }
console.log(rule);
this.createRuleRequest(rule);

//       {
// "name":"招中标3",
// "content":"{\"name\":\"招中标\",\"configs\":[{\"attribute\":\"招标机构\",\"matchOne\":true,\"trigger\":\"\",\"matchRule\":\"(?:招标人|项目法人|采购人|发包人|委托人|采购机构|业主).{0,5}(%organization%)采购单位及联系人电话.{0,5}.{0,5}(%Organization%)招标(?:项目|范围|内容|标段|投标).{0,5}(%organization%)(?:建设|发布|管理|招标|项目|采购)单位.{0,5}(%organization%)(%organization%).{0,10}公告(%organization%).{0,5}(?:采购|改造|升级|扩建|经费|横向|招标|维护|工程|比选)项目(?:受|由)(%organization%).{0,5}委托监督部门(%organization%)监察室\"}]}",
// "privilege":0
// }


    },
    saveRule() {

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

.rule-discription-form {
  margin: 10px;
  .el-form-item {
    margin-right: 50px;
  }
  input {
    width: 250px;
  }
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