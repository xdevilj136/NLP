<template>
<div class="analysi-box">
    <p class="analysi-title">{{headTitle?headTitle:'--'}}</p>
    <div class="analysi-content">
      <div class="analysi-content-less">
        <span v-for="(word, index) in data.words" :key="index"
        :style="{ background: color[type][data.tags[index]].color }">
        {{word}}
        </span>
      </div>
      <div class="analysi-description">
        <p class="analysi-des-title">词性类别图示：</p>
        <span v-for="(tag, index) in data.newTags" :key="index"
        :style="{ background: color[type][tag].color }">
        {{color[type][tag].name}}
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
        color: {
          seg_list: seg_list,
          ner_list: ner_list,
          pos_list: pos_list
        },
      }
  },
  props:['headTitle', 'data', 'type'],
  created(){
  }
}
</script>

<style lang="less">
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