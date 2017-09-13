<template>
<div>
  <el-checkbox-group class="mgb10"
    v-model="data.type">
    <el-checkbox v-for="type in typeOption" :label="type.value" :key="type.value">{{type.name}}</el-checkbox>
  </el-checkbox-group>
  <el-input class="mgt10 mgb10"
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 5}"
    placeholder="请输入要进行词法分析的内容"
    v-model="data.value">
  </el-input>
  <div class="submit-box">
    <el-button
    @click="submitTxt()"
    type="primary">提交文本</el-button>
  </div>
  <div class="analysi-box" v-if="analysiData['seg_list']">
    <p class="analysi-title">分词</p>
    <div class="analysi-content">
      <div class="analysi-content-all">
        <span v-for="(word, index) in analysiData['seg_list']" :key="index"
        :style="{background: '#D8D8D8'}">
        {{word}}
        </span>
      </div>
    </div>
  </div>
  <div class="analysi-box" v-if="analysiData['pos_list']">
    <p class="analysi-title">词性标注</p>
    <div class="analysi-content">
      <div class="analysi-content-less">
        <span v-for="(word, index) in analysiData['pos_list'].words" :key="index"
        :style="{ background: color.pos_list[analysiData['pos_list'].tags[index]].color }">
        {{word}}
        </span>
      </div>
      <div class="analysi-description">
        <p class="analysi-des-title">词性类别图示：</p>
        <span v-for="(tag, index) in analysiData['pos_list'].newTags" :key="index"
        :style="{ background: color.pos_list[tag].color }">
        {{color.pos_list[tag].name}}
        </span>
      </div>
    </div>
  </div>
  <div class="analysi-box" v-if="analysiData['ner_list']">
    <p class="analysi-title">实体识别</p>
    <div class="analysi-content">
      <div class="analysi-content-less">
        <span v-for="(word, index) in analysiData['ner_list'].words" :key="index"
        :style="{ background: color.ner_list[analysiData['ner_list'].tags[index]].color }">
        {{word}}
        </span>
      </div>
      <div class="analysi-description">
        <p class="analysi-des-title">词性类别图示：</p>
        <span v-for="(tag, index) in analysiData['ner_list'].newTags" :key="index"
        :style="{ background: color.ner_list[tag].color }">
        {{color.ner_list[tag].name}}
        </span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { pos_list, seg_list, ner_list } from './colorConfig'
export default {
	name: 'analysis',
    data () {
      return {
        typeOption: [{
          name: '分词',
          value: 'seg_list'
        }, {
          name: '词性标注',
          value: 'pos_list'
        }, {
          name: '实体识别',
          value: 'ner_list'
        }],
        color: {
          seg_list: seg_list,
          ner_list: ner_list,
          pos_list: pos_list
        },
        data: {
          type: [],
          value: ''
        }
      }
    },
    computed: mapState(['analysiData']),
    watch: {
    },
    created(){
    },
    methods: {
      ...mapActions([
        'analysisGet'
  		]),
      submitTxt () {
        this.analysisGet(this.data)
      }
    }
}
</script>

<style lang="less">
.submit-box {
  text-align: right
}
.analysi-box {
  margin-top: 20px;
  .analysi-title {
    color: #333;
    padding: 10px 0;
    font-size: 14px;
  }
  .analysi-content {
    padding: 10px 20px;
    background: #F7F7F7;
    max-height: 250px;
    min-height: 50px;
    overflow: auto;
    .analysi-content-all span {
      font-size: 12px;
      padding: 6px 10px;
      margin: 0 3px 3px 0;
      float: left;
    }
    .analysi-content-less {
      float: left;
      width: ~"calc(80% - 50px)";
      padding-right: 50px;
      span {
        font-size: 12px;
        padding: 6px 10px;
        margin: 0 3px 3px 0;
        float: left;
      }
    }
    .analysi-description {
      width: 20%;
      float: left;
      .analysi-des-title {
        font-size: 12px;
        padding: 6px 0;
      }
      span {
        font-size: 12px;
        padding: 6px 10px;
        margin: 0 6px 6px 0;
        float: left;
      }
    }
  }
}
</style>