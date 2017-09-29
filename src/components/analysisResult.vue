<template>
<div class="analysis-box">
    <p class="analysis-title">{{headTitle?headTitle:'--'}}</p>
    <div class="analysis-content">
      <div class="analysis-content-less">
        <span v-for="(word, index) in data.Words" :key="index"
        :style="{ background: matchWordColor(index)}">
        {{word}}
        </span>
      </div>
      <div class="analysis-description">
        <p class="analysis-des-title">{{desTitle}}</p>
        <span v-for="(tag, index) in data.newTags" :key="index"
        :style="{ background: matchTagColor(tag)}">
        {{matchTagName(tag)}}
        </span>
      </div>
    </div>
</div>
</template>
<script>
import { pos_list, seg_list, ner_list } from '../config/colorConfig'
export default {
  name: 'analysisResult',
  data () {
      return {
          seg_list: seg_list,
          ner_list: ner_list,
          pos_list: pos_list
      }
  },
  props:[ 'data', 'nerList','type'],
  created(){
  },
  watch:{
  },
  computed:{
    headTitle:function(){
      let title=''
      if(this.type=='pos_list'){
        title='词性标注'
      }
      else if(this.type=='ner_list'){
        title='实体识别'
      }
      return title
    },
    desTitle:function(){
      let title=''
      if(this.type=='pos_list'){
        title='词性类别图示：'
      }
      else if(this.type=='ner_list'){
        title='实体类别图示：'
      }
      return title
    }
  },

  methods:{
    matchWordColor(index){
      let colorType=this[this.type]
      let tags=this.data.Tags
      let matchColor=''
      if(this.type=='ner_list'){
        matchColor=this.nerList[tags[index]].color
      }
      else{
        matchColor=colorType[tags[index]].color
      }
      return matchColor
    },
    matchTagColor(tag){
      let colorType=this[this.type]
      let matchColor=''
      if(this.type=='ner_list'){
        matchColor=this.nerList[tag].color
      }
      else{
        matchColor=colorType[tag].color
      }
      return matchColor
    },
    matchTagName(tag){
      let colorType=this[this.type]
      let matchName=''
      if(this.type=='ner_list'){
        matchName=this.nerList[tag].name
      }
      else{
        matchName=colorType[tag].name
      }
      return matchName
    }
  }
}
</script>

<style lang="less">
.analysis-box {
  margin-top: 20px;
  .analysis-title {
    color: #333;
    padding: 10px 0;
    font-size: 14px;
  }
  .analysis-content {
    padding: 10px 20px;
    background: #F7F7F7;
    max-height: 250px;
    min-height: 50px;
    overflow: auto;
    .analysis-content-all span {
      font-size: 12px;
      padding: 6px 10px;
      margin: 0 3px 3px 0;
      float: left;
    }
    .analysis-content-less {
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
    .analysis-description {
      width: 20%;
      float: left;
      .analysis-des-title {
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