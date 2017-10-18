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
                <el-input :disabled="$route.name=='data-source-config-edit'" v-model="dataSource.name" class="input" placeholder="请输入" size="small"></el-input>
            </div>
        </div>
        <div class="clearfix mgt15">
            <span class="detail-left-label">数据源格式:</span>
            <div class="detail-right-content-box">
                <div>
                    <el-select :disabled="$route.name=='data-source-config-edit'" v-model="dataSource.type" @change="dataSourceTypeChange" class="input" size="small">
                        <el-option v-for="item in dataTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div v-if="$route.name=='data-source-config-create'" class="clearfix mgt15" style="position:relative;">
            <span class="detail-left-label">数据源文件:</span>
            <div class="detail-right-content-box">
                <el-upload :disabled="isUploading||$route.name=='data-source-config-edit'" class="upload-demo" action="/api/inputSource/upload" :before-upload="beforeUpload" :on-progress="uploading" :on-success="uploadSuccess" :on-error="uploadError" :show-file-list="false">
                    <el-input :disabled="$route.name=='data-source-config-edit'" v-model="uploadDataName" readonly class="input" placeholder="浏览..." size="small"></el-input>
                </el-upload>
            </div>
            <el-progress v-if="isUploading" class="uploading-progress" type="circle" :width="50" :percentage="uploadingPercent" :status="uploadingStatus"></el-progress>
        </div>
        <div v-if="targetSheetShow" class="clearfix mgt15">
            <span class="detail-left-label">目标表:</span>
            <div class="detail-right-content-box">
                <el-select :disabled="!dataLoaded" v-model="dataSource.targetSheet" @change="targetSheetChange" placeholder="- -" class="input" size="small">
                    <el-option v-for="item in sheetOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="clearfix mgt15">
            <span class="detail-left-label">编码格式:</span>
            <div class="detail-right-content-box">
                <el-select :disabled="!dataLoaded" v-model="dataSource.encode" @change="encodeChange" class="input" placeholder="- -" size="small">
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
                <el-radio-group @change="topRowIsTitleChange" v-model="dataSource.topRowIsTitle">
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
            //控制上传进度、状态
            dataLoaded: false,
            uploadDataName: '',
            uploadingPercent: 0,
            uploadingStatus: '',
            isUploading: false,
            uploadTypeLimit: 'excel',
            uploadedPath: '',
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
            //分隔符选择
            symbolsList: ["制表符"],
            otherSymbol: '',
            spaceSymbolChecked: false,
            regardAsSingle: false,
            //文本限定符
            textQualifier: "doubleQuotes",
            textQualifierOptions: [
                { label: '\"', value: 'doubleQuotes' },
                { label: '\'', value: 'singeQuotes' }
            ],
            //数据源配置
            dataSource: {
                name: '',
                type: 'excel',
                encode: 'utf8',
                targetSheet: 0,
                splitSymbols: '',
                topRowIsTitle: true
            },
            dataTypeOptions: [
                { label: 'Excel', value: 'excel' },
                // { label: 'Csv', value: 'csv' },
                { label: '文本文件', value: 'txt' }
            ],
            encodeOptions: [
                { label: 'UTF-8', value: 'utf8' },
                { label: 'UTF-16', value: 'utf16' },
                { label: 'GBK', value: 'gbk' },
                { label: 'GB18030', value: 'gb18030' }
            ],
            sheetOptions: [
                { label: 'sheet1', value: 0 },
                { label: 'sheet2', value: 1 },
                { label: 'sheet3', value: 2 },
                { label: 'sheet4', value: 3 },
                { label: 'sheet5', value: 4 }
            ]
        }
    },
    computed: {
        ...mapState([
            'createDataSourceResponse',
            'updateDataSourceResponse',
            'previewDataSourceResponse',
            'singleDataSource'
        ])
    },
    watch: {
        createDataSourceResponse: function(response) {
            utils.notifyResponse(response, () => this.$router.go(-1))
        },
        updateDataSourceResponse: function(response) {
            utils.notifyResponse(response, () => this.$router.go(-1))
        },
        previewDataSourceResponse: function(response) {
            if (!response.error) {
                if (this.dataSource.type == "txt") {
                    this.textIsOnPreview = true
                    let combinedTxt = ''
                    let resultData = response.result.data
                    for (var index = 0; index < resultData.length; index++) {
                        combinedTxt += resultData[index] + '\n'
                    }
                    this.previewTxt = combinedTxt
                }
                else {
                    this.tableIsOnPreview = true
                    let resultData = response.result.data
                    this.previewTableHeaders = []
                    this.previewTableData = []
                    if (resultData[0]) {
                        this.previewTableHeaders = resultData[0]
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
                }
            }
            else {
                utils.notifyResponse(response)
            }
        },
        singleDataSource: function(singleDataSource) {
            if (singleDataSource.result) {
                this.dataLoaded = true
                this.dataSource.name = singleDataSource.result.name
                this.dataSource.type = singleDataSource.result.inputType
                let config = JSON.parse(singleDataSource.result.config)
                this.uploadedPath=config.path
                this.dataSource.encode = config.extraConfig.encoding
                if (this.dataSource.type !== 'txt') {
                    this.targetSheetShow = true
                    this.topRowIsTitleShow = true
                    this.dataSource.targetSheet = config.extraConfig.sheet
                    this.dataSource.topRowIsTitle = config.extraConfig.titleRow
                }
                else {
                    this.targetSheetShow = false
                    this.topRowIsTitleShow = false
                }
            }
        }
    },
    created() {
        if (this.$route.params.id) {
            this.queryDataSourceById(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions([
            'createDataSourceWithUpload',
            'previewDataSource',
            'queryDataSourceById',
            'updateDataSource'
        ]),
        goBack() {
            this.$router.go(-1)
        },
        //编码格式切换
        encodeChange(value){
            this.tableIsOnPreview = false
            this.textIsOnPreview = false
        },
        //目标表切换
        targetSheetChange(value){
            this.tableIsOnPreview = false
            this.textIsOnPreview = false
        },
        //首行标题行切换
        topRowIsTitleChange(value){
            this.tableIsOnPreview = false
            this.textIsOnPreview = false
        },
        generateExtraConfig() {
            let extraConfig = {}
            switch (this.dataSource.type) {
                case 'excel':
                    extraConfig = {
                        titleRow: this.dataSource.topRowIsTitle,
                        encoding: this.dataSource.encode,
                        sheet: this.dataSource.targetSheet
                    }
                    break;
                case 'txt':
                    extraConfig = {
                        encoding: this.dataSource.encode
                    }
                    break;
                //         case 'csv':
                // extraConfig={
                //     titleRow: this.dataSource.topRowIsTitle,
                //     encoding: this.dataSource.encode,
                //     sheet: this.dataSource.targetSheet
                // }
                // break;
                default:
                    break;
            }
            return extraConfig
        },

        dataSourceTypeChange(value) {
            if (this.$route.name == 'data-source-config-create') {
                this.uploadDataName = ''
                this.dataLoaded = false
                this.tableIsOnPreview = false
                this.textIsOnPreview = false
                switch (value) {
                    case 'excel':
                        this.targetSheetShow = true
                        this.topRowIsTitleShow = true
                        this.symbolShow = false
                        this.uploadTypeLimit = 'excel'
                        break;
                    case 'csv':
                        this.targetSheetShow = false
                        this.topRowIsTitleShow = true
                        this.symbolShow = true
                        this.uploadTypeLimit = 'csv'
                        break;
                    case 'txt':
                        this.targetSheetShow = false
                        this.topRowIsTitleShow = false
                        this.symbolShow = false
                        this.uploadTypeLimit = 'txt'
                        break;
                    default:
                        break;
                }
            }
        },
        beforeUpload(file) {
            const isCsv = file.type === 'text/csv';
            const isTxt = file.type === 'text/plain';
            const isExcel = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || file.name.endsWith('.xls');
            switch (this.uploadTypeLimit) {
                case 'excel':
                    if (!isExcel) {
                        this.$message.error('可上传格式 Excel');
                        return false;
                    }
                    break;
                case 'csv':
                    if (!isCsv) {
                        this.$message.error('可上传格式 Csv');
                        return false;
                    }
                    break;
                case 'txt':
                    if (!isTxt) {
                        this.$message.error('可上传格式 文本文件');
                        return false;
                    }
                    break;

                default:
                    break;
            }
            return;
        },
        uploading(event, file) {
            this.isUploading = true
            let percent = Number.parseInt(event.percent)
            console.log(percent)
            this.uploadingPercent = percent

        },
        uploadSuccess(res, file) {
            this.uploadingStatus = 'success'
            this.uploadedPath = res.result
            setTimeout(() => {
                this.isUploading = false
                this.uploadingStatus = ''
            }, 1000);
            this.uploadDataName = file.name
            this.dataLoaded = true
            this.tableIsOnPreview = false
            this.textIsOnPreview = false
        },
        uploadError(err, file) {
            console.log(err)
            this.uploadingStatus = 'exception'
            setTimeout(() => {
                this.isUploading = false
                this.uploadingStatus = ''
            }, 1000);
        },
        //分隔符选择
        symbolsModalShow() {
            this.symbolsModalVisible = true
        },
        //空格分隔符与连续分隔符视为单一处理联动
        spaceSymbolChange(e) {
            let target = e.target || e.srcElement
            this.regardAsSingle = target.checked
        },
        //验证是否选择了分隔符
        validateSymbolEmpty() {

        },
        //分隔符对话框的确认
        symbolsModalConfirm() {

        },
        previewUploaded() {
            this.tableIsOnPreview = false
            this.textIsOnPreview = false
            let extraConfig = this.generateExtraConfig()
            let config = {
                path: this.uploadedPath,
                inputType: this.dataSource.type,
                extraConfig: extraConfig
            }
            let previewData = {
                name: this.dataSource.name,
                inputType: this.dataSource.type,
                config: JSON.stringify(config)
            }
            this.previewDataSource(previewData)
        },
        submitValidate() {

        },
        //创建数据源
        createDataSource() {
            let extraConfig = this.generateExtraConfig()
            let config = {
                path: this.uploadedPath,
                inputType: this.dataSource.type,
                extraConfig: extraConfig,
                isUpload: this.dataLoaded
            }
            let createData = {
                name: this.dataSource.name,
                inputType: this.dataSource.type,
                config: JSON.stringify(config)
            }
            this.createDataSourceWithUpload(createData)
        },
        //保存修改
        saveDataSource() {
            let extraConfig = this.generateExtraConfig()
            this.updateDataSource({
                id: parseInt(this.$route.params.id),
                extraConfig: JSON.stringify(extraConfig)
            })
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