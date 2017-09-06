<template>
<div class="header-box">
  <img class="header-logo" src="../images/natural-language/haizhi-logo.png">
  <div class="header-right-box fr">
    <div class="fl">
      <img class="header-right-logo" src="../images/natural-language/question.png">
      <span>帮助</span>
    </div>
    <div class="header-right-end fl">
      <img class="header-right-logo" src="../images/natural-language/head-logo.png">
      <span>admin</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'header',
  created(){
    
  }
}
</script>

<style lang="less">
.header-box {
  z-index: 100;
  position: absolute;
  height: 64px;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  min-width: 1024px;
  background: white;
  .header-logo {
    padding: 12px 0 12px 24px;
    height: 40px;
  }
  .header-right-box {
    height: 100%;
    line-height: 64px;
    cursor: pointer;
    .header-right-logo {
      width: 20px;
      height: 20px;
      top: 5px;
      position: relative;
      padding-right: 5px;
    }
    .header-right-end {
      padding: 0 40px;
    }
  }
}
</style>