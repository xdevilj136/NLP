<template>
    <div class="right-content">
        <div class="title-show-box">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/main/data-source-config' }">数据源配置</el-breadcrumb-item>
                <el-breadcrumb-item>数据详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class="detail-form" label-position="right" label-width="100px">
            <el-form-item  label="数据名称：">
                <span class="detail-right-label">{{detail.name}}</span>
            </el-form-item>
            <el-form-item  label="数据源格式：">
                <span class="detail-right-label">{{detail.inputType}}</span>
            </el-form-item>
            <el-form-item  v-if="targetSheetShow" label="目标表：">
                <span class="detail-right-label">{{detail.targetSheet}}</span>
            </el-form-item>
            <el-form-item label="编码格式：">
                <span class="detail-right-label">{{detail.encode}}</span>
            </el-form-item>
            <el-form-item  v-if="symbolShow" label="分隔符：">
                <span class="detail-right-label">{{detail.splitSymbols}}</span>
            </el-form-item>
            <el-form-item  v-if="topRowIsTitleShow" label="首行标题行：">
                <span class="detail-right-label">{{detail.topRowIsTitle}}</span>
            </el-form-item>
            <el-form-item label="数据源预览：">
                <el-input v-if="textIsOnPreview" type="textarea" v-model="previewTxt" :rows="10" resize="none" readonly></el-input>
                <el-table :data="previewTableData" v-if="tableIsOnPreview" :style="tableWidth" :height="280" :border="true">
                    <el-table-column v-for="(head,index) in previewTableHeaders" :width="columnWidth" :key="index" :prop="head" :label="head">
                    </el-table-column>
                </el-table>
            </el-form-item>
            <div class="right-toolbar">
                <el-button :disabled="!detail.editable" @click="editDataSource(detail.id)" type="primary" size="small">编辑</el-button>
                <el-button @click="deleteSource(detail.id)" size="small">删除</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
    name: 'data-source-config-create',
    data() {
        return {
            toDeleteSourceId:'',
            //不同数据源格式，显示不同控件
            targetSheetShow: true,
            topRowIsTitleShow: true,
            symbolShow: false,
            symbolsModalVisible: false,
            textIsOnPreview: false,
            tableIsOnPreview: false,
            //预览相关
            previewTxt: '',
            previewTableData: [],
            previewTableHeaders: [],
            tableWidth:'',
            columnWidth:310,
            //详情数据
            detail: {}
        }
    },
    computed: {
        ...mapState([
            'singleDataSource',
            'deleteDataSourceResponse'
        ])
    },
    watch: {
        singleDataSource: function(singleDataSource) {
            if (singleDataSource.result) {
                this.detail = Object.assign({}, singleDataSource.result)
                let config = JSON.parse(this.detail.config)
                this.detail.encode = config.extraConfig.encoding

                if(config.inputType!=='txt'){
         
                    this.tableIsOnPreview = true
                    let resultData=JSON.parse(this.detail.overview).data         
                    this.previewTableHeaders = []
                    this.previewTableData = []
                    if (resultData[0]) {
                        this.previewTableHeaders = resultData[0]
                        this.tableWidth="width:"+(this.previewTableHeaders.length*this.columnWidth)+'px'
                        for (let index = 1; index < resultData.length; index++) {
                            let element = resultData[index]
                            let processed = {}
                            element.forEach(function(value, num) {
                                let key = this.previewTableHeaders[num]
                                let add = {
                                    key: value
                                }
                                processed[key] = value
                            }, this);
                            this.previewTableData.push(processed)
                        }
                    }
                    this.targetSheetShow=true
                    this.topRowIsTitleShow=true
                    let sheetIndex=config.extraConfig.sheet
                    this.detail.targetSheet=JSON.parse(this.detail.overview).tables[sheetIndex]
                    this.detail.topRowIsTitle = config.extraConfig.titleRow ? '是' : '否'
                }
                else{
                    this.textIsOnPreview = true
                    let combinedTxt = ''
                    let resultData=JSON.parse(this.detail.overview).data         
                    for (let index = 0; index < resultData.length; index++) {
                        combinedTxt += resultData[index] + '\n'
                    }
                    this.previewTxt = combinedTxt  
                    this.targetSheetShow=false
                    this.topRowIsTitleShow=false
                }
            }
        },
        deleteDataSourceResponse:function(response){
            utils.notifyResponse(response, () => this.$router.go(-1))
        }
    },
    created() {
        this.queryDataSourceById(this.$route.params.id)
    },
    methods: {
        ...mapActions([
            'queryDataSourceById',
            'deleteDataSource'
        ]),
        goBack() {
            this.$router.go(-1)
        },
        editDataSource(id) {
            this.$router.push('/main/data-source-config/edit/' + id)
        },
        deleteSource(id) {
			this.toDeleteSourceId = id;
			this.$confirm('删除后，数据源配置将全部失效。', '确认删除 ' + this.detail.name + ' 数据?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteDialogConfirm()
			}).catch(() => {

			});
        },
        deleteDialogConfirm(){
            this.deleteDataSource(this.toDeleteSourceId)
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
        position: relative;
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
    .right-toolbar {
        position: absolute;
        right: 40px;
        top: 5px;
    }
    .el-table{
        .cell{
            white-space: nowrap;
        }
    }
}
</style>