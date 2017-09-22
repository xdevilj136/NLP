<template>
    <div class="right-content">
        <div class="title-show-box clearfix">
            <span :class="{fade: index >0}" v-for="(item, index) in title" :key="index">
                <span :class="{hightLight: index < title.length - 1 && title[index + 1].name}" @click="gotoRoute(item.route, index < title.length - 1 && title[index + 1].name)">
                    {{item.name}}
                </span>
                <span v-if="index < title.length - 1 && title[index + 1].name"> / </span>
            </span>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'info-extra',
    data() {
        return {
            title: [{
                name: '信息抽取配置',
                route: '/main/info-extra'
            }],
            config: '',
            action: {
                'info-extra-list': '',
                'info-extra-detail': '',
                'info-extra-edit': '修改配置',
                'info-extra-add': '增加配置'
            }
        }
    },
    computed: mapState(['configList']),
    watch: {
        '$route'(newVal, oldVal) {
            if (newVal.params.config) {
                this.title.splice(1, 5, {
                    name: newVal.params.config,
                    route: '/main/info-extra/' + newVal.params.config + '/detail'
                }, { name: this.action[newVal.name], route: '' })
            } else {
                this.title.splice(1, 5, { name: this.action[newVal.name], route: '' })
            }
        }
    },
    created() {
        let newVal = this.$route
        if (newVal.params.config) {
            this.title.splice(1, 5, {
                name: newVal.params.config,
                route: '/main/info-extra/' + newVal.params.config
            }, { name: this.action[newVal.name], value: '' })
        } else {
            this.title.splice(1, 5, { name: this.action[newVal.name], value: '' })
        }
    },
    methods: {
        gotoRoute(route, check) {
            if (check) {
                this.$router.push(route)
            }
        }
    }
}
</script>

<style lang="less">
.right-content {
    padding: 40px;
    overflow: auto;
    .hightLight {
        color: #333;
        cursor: pointer;
        &:hover {
            color: #20a0ff
        }
    }
    .fade{
        color:#999;
    }
}
</style>