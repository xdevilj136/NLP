<template>
  <div class="clearfix">
    <table class="info-extra-card-box">
      <tr class="info-extra-card-head">
        <th>{{data.attribute}}</th>
        <th>
        </th>
      </tr>
      <tr class="info-extra-card-body">
        <td>触发规则</td>
        <td>
          <pre>{{data.trigger}}</pre>
        </td>
      </tr>
      <tr class="info-extra-card-body">
        <td>匹配规则</td>
        <td>
          <pre>{{data.matchRule}}</pre>
        </td> 
      </tr>
      <tr class="info-extra-card-footer">
        <td>只匹配一次</td>
        <td>{{data.matchOne ? '是':'否'}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'info-extra-card',
  data() {
    return {
    }
  },
  props: ['data'],

  methods: {
  }
}
</script>

<style lang="less">
.info-extra-card-box {
  border: 1px solid #F7F7F7;
  width: 100%;
  margin-top: 20px;
  border-radius: 4px;
  .info-extra-card-head {
    background: #F7F7F7;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    th {
      font-size: 12px;
    }
  }
  .info-extra-card-body td {
    height: 100px;
  }
  tr td:nth-child(1) {
    color: #333;
    font-size: 12px;
    text-align: center;
    width: 120px;
    border: 1px solid #F7F7F7;
  }
  tr td:nth-child(2) {
    padding: 10px;
    color: #666;
    border: 1px solid #F7F7F7;
    font-size: 12px;
    max-height: 120px;
    vertical-align: top;
    overflow: auto;
    width: ~'calc(100% - 22px)';
    display: inline-block;
    pre{
      font-size: 12px;
    }
  }
  .info-extra-card-footer td {
    height: 30px;
    line-height: 30px;
    border: 1px solid #F7F7F7;
  }
}
</style>