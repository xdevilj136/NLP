<template>
    <div class="main_container clearfix a100">
        <headerNav></headerNav>
        <loginCard></loginCard>
    </div>
</template>

<script>
import headerNav from 'components/header'
import loginCard from 'components/loginCard'
import { mapActions, mapState } from 'vuex';

export default {
    name: 'main',
    components: {
        headerNav,
        loginCard
    },
    created() {
        // this.loginCheck()
    },
    watch: {
        // isCheck: function(isCheck) {
        //     console.log(isCheck)
        //     if (isCheck) {
        //         this.$router.push('/main')
        //     }
        // }
    }

}
</script>
<style lang="less">

</style>