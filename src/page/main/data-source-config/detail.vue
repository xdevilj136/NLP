<template>
    <div class="right-content">
        <div class="title-show-box">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/main/data-source-config' }">数据源配置</el-breadcrumb-item>
                <el-breadcrumb-item>数据详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class="detail-form" label-position="right" label-width="100px">
            <el-form-item label="数据名称：">
                <span class="detail-right-label">{{detail.name}}</span>
            </el-form-item>
            <el-form-item label="数据源格式：">
                <span class="detail-right-label">{{detail.inputType}}</span>
            </el-form-item>
            <el-form-item label="数据源文件：">
                <span class="detail-right-label">{{detail.uploadDataName}}</span>
            </el-form-item>
            <el-form-item v-if="targetSheetShow" label="目标表：">
                <span class="detail-right-label">{{detail.targetSheet | targetSheetFilter}}</span>
            </el-form-item>
            <el-form-item v-if="encodeShow" label="编码格式：">
                <span class="detail-right-label">{{detail.encode}}</span>
            </el-form-item>
            <el-form-item v-if="symbolShow" label="分隔符：">
                <span class="detail-right-label">{{detail.splitSymbols}}</span>
            </el-form-item>
            <el-form-item v-if="topRowIsTitleShow" label="首行标题行：">
                <span class="detail-right-label">{{detail.topRowIsTitle}}</span>
            </el-form-item>
            <el-form-item label="数据源预览：">
                <el-input v-if="textIsOnPreview" type="textarea" v-model="previewTxt" :rows="10" resize="none" readonly></el-input>
                <el-table :data="previewTableData" v-if="tableIsOnPreview" :height="280" :border="true">
                    <el-table-column v-for="(head,index) in previewTableHeaders" :key="index" :prop="head" :label="head">
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <div class="toolbar">
            <el-button v-if="$route.name=='data-source-config-create'" @click="createDataSource" type="primary" size="small">创建</el-button>
            <el-button v-if="$route.name=='data-source-config-edit'" @click="saveDataSource" type="primary" size="small">保存</el-button>
            <el-button @click="goBack" size="small">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
    name: 'data-source-config-create',
    data() {
        return {
            //不同数据源格式，显示不同控件
            targetSheetShow: true,
            encodeShow: true,
            topRowIsTitleShow: true,
            symbolShow: false,
            symbolsModalVisible: false,
            textIsOnPreview: false,
            tableIsOnPreview: false,
            //预览相关
            previewTxt: '',
            previewTableData: [],
            previewTableHeaders: [],

            //数据源配置
            dataSource: {
                name: '',
                type: 'excel',
                encode: 'utf8',
                targetSheet: 0,
                splitSymbols: '',
                topRowIsTitle: true
            },
            detail:{}
        }
    },
    computed: {
        ...mapState([
            'singleDataSource'
        ])
    },
    watch: {
        singleDataSource: function(singleDataSource) {
            if (singleDataSource.result) {
                this.detail = Object.assign({}, singleDataSource.result)
            }
        }
    },
    created() {
        this.queryDataSourceById(this.$route.params.id)
    },
    methods: {
        ...mapActions([
            'queryDataSourceById'
        ]),
        goBack() {
            this.$router.go(-1)
        }
    },
      filters: {

    targetSheetFilter:function(value){

    }
  }
}
</script>

<style lang="less">
.right-content {
    .breadcrumb {
        font-size: 16px;
        line-height: inherit;
    }
    .detail-form {
        & .el-form-item {
            margin: 0;
        }
    }
    .detail-left-label {
        height: 36px;
        line-height: 36px;
        float: left;
        width: 80px;
    }
    .detail-right-label {
        width: auto;
        color: grey;
    }
    .toolbar {
        position: absolute;
        right: 40px;
        top: 40px;
        margin-top: 32px;
        button {
            margin: 0;
            &:after {
                content: " |";
                display: inline;
            }
            &:last-child:after {
                display: none;
            }
        }
    }
}
</style>