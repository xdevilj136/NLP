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
        <p class="analysis-des-title">词性类别图示：</p>
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
  props:['headTitle', 'data', 'type'],
  created(){
  },
  watch:{
    data:function(data){
      if(this.type=='ner_list'){
        let self=this
        //找出没有匹配的自定义实体tag
        let noMatchTags=data.newTags.filter(function(value){
          return !self.ner_list[value]
        });
        for (var index = 0,colorNum=0; index < noMatchTags.length; index++,colorNum++) {
          var element = noMatchTags[index];
          //超出备选颜色个数，重复顺序取值
          if(colorNum==ner_list.other.color.length){
            colorNum=0
          }
          let newTag={
            [element]:{
              color:this.ner_list.other.color[colorNum],
              name:'自定义实体'+(index+1)
            }
          }
          this.ner_list = Object.assign({}, this.ner_list, newTag)
        }
      }
    }
  },
  methods:{
    matchWordColor(index){
      let colorType=this[this.type]
      let tags=this.data.Tags
      return colorType[tags[index]].color
    },
    matchTagColor(tag){
      let colorType=this[this.type]
      return  colorType[tag].color
    },
    matchTagName(tag){
      let colorType=this[this.type]
      return colorType[tag].name
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