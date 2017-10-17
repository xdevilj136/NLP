<template>
    <div class="right-content">
        <div class="title-show-box">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/main/data-source-config' }">数据源配置</el-breadcrumb-item>
                <el-breadcrumb-item>配置数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="clearfix mgt15">
            <span class="detail-left-label">数据名称:</span>
            <div class="detail-right-content-box">
                <el-input v-model="dataSource.name" class="input" placeholder="请输入" size="small"></el-input>
            </div>
        </div>
        <div class="clearfix mgt15">
            <span class="detail-left-label">数据源格式:</span>
            <div class="detail-right-content-box">
                <div>
                    <el-select v-model="dataSource.type" @change="dataSourceTypeChange" class="input" size="small">
                        <el-option v-for="item in dataTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="clearfix mgt15" style="position:relative;">
            <span class="detail-left-label">数据源文件:</span>
            <div class="detail-right-content-box">
                <el-upload :disabled="isUploading" class="upload-demo" action="/api/inputSource/upload" :before-upload="beforeUpload" :on-progress="uploading" :on-success="uploadSuccess" :on-error="uploadError" :show-file-list="false">
                    <el-input v-model="uploadDataName" readonly class="input" placeholder="浏览..." size="small"></el-input>
                </el-upload>
            </div>
            <el-progress v-if="isUploading" class="uploading-progress" type="circle" :width="50" :percentage="uploadingPercent" :status="uploadingStatus"></el-progress>
        </div>
        <div v-if="targetSheetShow" class="clearfix mgt15">
            <span class="detail-left-label">目标表:</span>
            <div class="detail-right-content-box">
                <el-select :disabled="!dataLoaded" v-model="dataSource.targetSheet" placeholder="- -" class="input" size="small">
                    <el-option v-for="item in sheetOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div v-if="encodeShow" class="clearfix mgt15">
            <span class="detail-left-label">编码格式:</span>
            <div class="detail-right-content-box">
                <el-select :disabled="!dataLoaded" v-model="dataSource.encode" class="input" placeholder="- -" size="small">
                    <el-option v-for="item in encodeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div v-if="symbolShow" class="clearfix mgt15">
            <span class="detail-left-label">分隔符:</span>
            <div class="detail-right-content-box">
                <el-input @focus="symbolsModalShow" v-model="dataSource.splitSymbols" class="input" placeholder="请选择" size="small" readonly></el-input>
            </div>
        </div>
        <div v-if="topRowIsTitleShow" class="clearfix mgt15">
            <span class="detail-left-label">首行标题行:</span>
            <div class="detail-right-content-box mgt10">
                <el-radio-group v-model="dataSource.topRowIsTitle">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="clearfix mgt15">
            <span class="detail-left-label">数据源预览:</span>
            <div class="detail-right-content-box  mgt10">
                <el-button v-if="!textIsOnPreview&&!tableIsOnPreview" type="text" :disabled="!dataLoaded" class="normal_a" @click="previewUploaded">预览</el-button>
                <el-input v-if="textIsOnPreview" type="textarea" v-model="previewTxt" :rows="10" resize="none" readonly></el-input>
                <el-table :data="previewTableData" v-if="tableIsOnPreview" :height="280" :border="true">
                    <el-table-column v-for="(head,index) in previewTableHeaders" :key="index" :prop="head" :label="head">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="clearfix mgt15">
            <el-button v-if="$route.name=='data-source-config-create'" @click="createDataSource" type="primary" size="small">创建</el-button>
            <el-button v-if="$route.name=='data-source-config-edit'" @click="saveDataSource" type="primary" size="small">保存</el-button>
            <el-button @click="goBack" size="small">取消</el-button>
        </div>
        <el-dialog title="设置分隔符" :visible.sync="symbolsModalVisible" size="tiny" :modal="true" :modal-append-to-body="false">
            <p>请设置您的数据中包含的分隔符。</p>
            <el-form label-width="100px">
                <el-form-item class="modal-left-part" label="分隔符：">
                    <el-checkbox-group v-model="symbolsList">
                        <el-checkbox label="制表符"></el-checkbox>
                        <el-checkbox label="分号"></el-checkbox>
                        <el-checkbox label="逗号"></el-checkbox>
                        <el-checkbox @change="spaceSymbolChange" :checked="spaceSymbolChecked" label="空格"></el-checkbox>
                        <el-checkbox label="其它">
                            <span>其它：
                                <el-input v-model="otherSymbol" size="small"></el-input>
                            </span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class="modal-right-part">
                    <el-checkbox v-model="regardAsSingle" label="连续分隔符视为单个处理"></el-checkbox>
                </el-form-item>
                <el-form-item class="modal-right-part">
                    <span>文本限定符:</span>
                    <el-select v-model="textQualifier" class="input" size="small">
                        <el-option v-for="item in textQualifierOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="symbolsModalVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="validateSymbolEmpty()" @click.native.prevent="symbolsModalConfirm">确 定</el-button>
            </span>
        </el-dialog>
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
            }
        }
    },
    computed: {
        ...mapState([
            'createDataSourceResponse',
            'previewDataSourceResponse'
        ])
    },
    watch: {

        // updateTaskResponse: function(response) {
        //   utils.notifyResponse(response,()=>this.$router.go(-1))
        // },

    },
    created() {
    },
    methods: {
        ...mapActions([
            'createDataSourceWithUpload',
            'previewDataSource'
        ]),
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less">
.lightFont {
    color: gray;
}

.modal-left-part {
    float: left;
    width: 200px;
}

.modal-right-part {
    float: right;
    width: 200px;
    margin-right: 100px;
    margin-top: 20px;
}

.el-checkbox-group {
    padding-top: 20px;
    margin-left: -15px;
}

.el-dialog__footer {
    border-top: 1px solid #c4c4c4;
    overflow: hidden;
    margin-top: 200px;
}

.normal_a {
    text-decoration: underline;
    margin-top: -10px;
}

.uploading-progress {
    position: absolute;
    left: 370px;
    top: -10px;
}

.right-content {
    .breadcrumb {
        font-size: 16px;
        line-height: inherit;
    }
    .detail-left-label {
        height: 36px;
        line-height: 36px;
        float: left;
        width: 100px;
    }
    .detail-right-content-box {
        float: left;
        width: calc(~"100% - 100px");
        .input {
            width: 250px;
        }
        .radio:not(:first-child) {
            margin-right: 20px;
            margin-top: 15px;
            margin-left: 0;
            width: 100px;
        }
    }
}
</style>