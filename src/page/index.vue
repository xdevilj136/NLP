<template>
  	<div class="main_container clearfix a100">
      <headerNav></headerNav>
      <div class="content-box">
        <leftNav></leftNav>
        <div class="right-content-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import headerNav from 'components/header'
import leftNav from 'components/leftNav'
import {mapState} from 'vuex';
export default {
	name: 'main',
    components: {
   		headerNav,
        leftNav
  	},
    computed: mapState(['isLogin']),
    created(){
    }
}
</script>

<style lang="less">
.content-box {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 64px;
  min-width: 1024px;
  z-index: 89;
  .right-content-box {
    float: left;
    height: 100%;
    width: calc(~"100% - 200px");
    overflow: auto;
  }
}
</style>
