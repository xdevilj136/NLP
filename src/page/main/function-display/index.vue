<template>
    <div class="right-content">
        <div class="title-show-box">
            <span class="hightLight">功能展示 / </span>
            <span class="fade">{{title ? title : ''}}</span>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: 'function-display',
    data() {
        return {
            titleList: {
                'machanism-ident': '机构名识别',
                'analysis': '词法分析',
                'data-extract': '信息抽取',
                'zsbank-credit': '授信报告解析',
                'article-analysis' : '篇章分析',
                'sentence-similarity': '语义相识度',
                'industry-category': '行业分类'
            },
            title: ''
        }
    },
    watch: {
        '$route'(newVal, oldVal) {
            let location = newVal.path.split('/')
            this.title = this.titleList[location[location.length - 1]]
        }
    },
    created() {
        let location = this.$route.path.split('/')
        this.title = this.titleList[location[location.length - 1]]
    },
    methods: {
    }
}
</script>

<style lang="less">
.right-content {
    padding: 40px;
    overflow: auto;
    .hightLight {
        color: #333
    }
    .fade{
        color:#999;
    }
}
</style>