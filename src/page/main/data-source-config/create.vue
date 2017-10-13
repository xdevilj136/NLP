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
                <el-upload :disabled="isUploading" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload" :on-progress="uploading" :on-success="uploadSuccess" :on-error="uploadError" :show-file-list="false">
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
                <span class="lightFont">无</span>
            </div>
        </div>
        <div class="clearfix mgt15">
            <el-button v-if="$route.name=='data-source-config-create'" @click="createTask" type="primary" size="small">创建</el-button>
            <el-button v-if="$route.name=='data-source-config-edit'" @click="saveTask" type="primary" size="small">保存</el-button>
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
            //控制上传进度、状态
            dataLoaded: false,
            uploadDataName: '',
            uploadingPercent: 0,
            uploadingStatus: '',
            isUploading: false,
            uploadTypeLimit: 'excel',
            //不同数据源格式，显示不同控件
            targetSheetShow: true,
            encodeShow: true,
            topRowIsTitleShow: true,
            //数据源配置
            dataSource: {
                name: '',
                type: 'excel',
                encode: '',
                targetSheet: '',
                topRowIsTitle: true
            },
            dataTypeOptions: [
                { label: 'Excel', value: 'excel' },
                { label: 'Csv', value: 'csv' },
                { label: '文本文件', value: 'txt' },
            ],
            encodeOptions: [
                { label: 'UTF-8', value: 'UTF-8' },
                { label: 'UTF-16', value: 'UTF-16' },
                { label: 'GBK', value: 'GBK' },
                { label: 'GB18030', value: 'GB18030' },
            ],
            sheetOptions: []
        }
    },
    computed: mapState([
    ]),
    watch: {
        // createTaskResponse: function(response) {
        //   utils.notifyResponse(response,()=>this.$router.go(-1))
        // },
        // updateTaskResponse: function(response) {
        //   utils.notifyResponse(response,()=>this.$router.go(-1))
        // },

    },
    created() {
    },
    methods: {
        ...mapActions([
        ]),
        goBack() {
            this.$router.go(-1)
        },
        dataSourceTypeChange(value) {
            console.log(value)
            switch (value) {
                case 'excel':
                    this.targetSheetShow = true
                    this.encodeShow = true
                    this.topRowIsTitleShow = true
                    this.uploadTypeLimit = 'excel'
                    break;
                case 'csv':
                    this.targetSheetShow = false
                    this.encodeShow = true
                    this.topRowIsTitleShow = true
                    this.uploadTypeLimit = 'csv'
                    break;
                case 'txt':
                    this.targetSheetShow = false
                    this.encodeShow = true
                    this.topRowIsTitleShow = false
                    this.uploadTypeLimit = 'txt'
                    break;
                default:
                    break;
            }
        },
        beforeUpload(file) {
            const isCsv = file.type === 'text/csv';
            const isTxt = file.type === 'text/plain';
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
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
            setTimeout(() => {
                this.isUploading = false
                this.uploadingStatus = ''

            }, 1000);
            this.uploadDataName = file.name
            this.dataLoaded = true
        },
        uploadError(err, file) {
            console.log(err)
            this.uploadingStatus = 'exception'
            setTimeout(() => {
                this.isUploading = false
                this.uploadingStatus = ''
            }, 1000);
        },
        submitValidate() {

        },
        createTask() {
        },
        saveTask() {
        }
    }
}
</script>

<style lang="less">
.lightFont {
    color: gray;
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