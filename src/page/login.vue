<template>
  	<div class="main_container clearfix a100">
      <headerNav></headerNav>
      <loginCard></loginCard>
    </div>
</template>

<script>
import headerNav from 'components/header'
import loginCard from 'components/loginCard'

export default {
	name: 'main',
    components: {
   		headerNav,
      loginCard
  	},
    created(){
    }
}
</script>
<style lang="less">
</style>