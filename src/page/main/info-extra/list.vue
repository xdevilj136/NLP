<template>
<div>
    <div class="info-extra-list-head-box">
    </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: 'function-display',
    data () {
      return {
          title: {
              one: '信息抽取配置',
              two: ''
          },
          config: '',
          action: {
              'info-extra-detail': false,
              'info-extra-edit': '修改配置',
              'info-extra-add': '添加配置'
          }
      }
    },
    computed: mapState(['configList']),
}
</script>