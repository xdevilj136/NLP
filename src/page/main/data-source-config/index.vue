<template>
	<div class="right-content">
		<div class="title-show-box">
			<span>数据源配置</span>
		</div>
		<el-form :inline="true" :model="searchForm" class="searchBar">
			<el-form-item label="数据源类型">
				<el-select v-model="searchForm.dataSourceType" placeholder="请选择" size="small">
					<el-option v-for="item in dataTypeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="创建日期：">
				<el-select v-model="searchForm.timeRange" placeholder="请选择" size="small">
					<el-option v-for="item in timeRangeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchSubmit" size="small">查询</el-button>
			</el-form-item>
		</el-form>

		<div style="overflow:hidden;">
			<span class="lightFont">共搜索到{{totalCount?totalCount:0}}条数据</span>
			<div class="fr">
				<el-button type="primary" @click="createDataSource" size="small">创建</el-button>
			</div>
		</div>

		<el-table :data="dataSourceList" class="data-table" border :default-sort="{prop: 'ctime', order: 'descending'}">
			<el-table-column prop="name" label="数据名称" min-width="200px">

				<template scope="scope">
					<router-link :to="'/main/data-source-config/detail/' + scope.row.id">{{ scope.row.name }}</router-link>
				</template>

			</el-table-column>
			<el-table-column prop="inputType" label="数据源类型" min-width="100px"></el-table-column>
			<el-table-column prop="utime" label="创建日期" :sortable="true" min-width="200px"></el-table-column>
			<el-table-column label="操作" min-width="130px">
				<template scope="scope">
					<div class="toolbar">
						<el-button type="text" :disabled="!scope.row.editable" @click="editSource(scope.row.id)">编辑</el-button>
						<el-button type="text" @click="deleteSource(scope.row)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page="currentPage" :page-sizes="[5, 10,50, 100]" :page-size="pageSize" :total="totalCount" layout=" prev, pager, next, sizes, jumper">
			</el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapActions, mapState } from 'vuex'
import utils from 'src/config/utils'

export default {
	name: 'data-source-config',
	data() {
		return {
			//待删除数据源id
			toDeleteSourceId: '',
			//查询表单
			searchForm: {
				dataSourceType: '',
				timeRange: '',
				currentPage: '',
				pageSize: ''
			},
			//最近一次查询条件
			latestSearch: {
				dataSourceType: '',
				timeRange: '',
				currentPage: '',
				pageSize: ''
			},
			dataSourceList: [],
			//翻页相关
			currentPage: 1,
			pageSize: 10,
			totalCount: 10,
			//查询条件
			timeRangeOptions: [{
				value: 'oneMonth',
				label: '近一个月'
			},
			{
				value: 'threeMonth',
				label: '近三个月'
			},
			{
				value: 'halfYear',
				label: '近半年'
			},
			{
				value: 'oneYear',
				label: '近一年'
			},
			{
				value: 'beyondOneYear',
				label: '一年以上'
			}],
			dataTypeOptions: [{
				value: 'txt',
				label: '文本文件'
			},
			{
				value: 'excel',
				label: 'Excel'
			},
			{
				value: 'csv',
				label: 'CSV'
			}
			]
		}
	},
	computed: mapState([
		'dataSource',
		'deleteDataSourceResponse'
	]),
	watch: {
		dataSource: function(data) {
			if (data.result && data.result.list) {
				this.dataSourceList = data.result.list
				this.totalCount = data.result.count
			}
		},
		deleteDataSourceResponse: function(response) {
			utils.notifyResponse(response, () => { this.refreshDataSource() })
		}
	},
	created() {
		this.refreshDataSource()
	},
	methods: {
		...mapActions([
			'getDataSource',
			'deleteDataSource'
		]),
		//计算时间 （最近时间范围）-》建立时间
		computeCreateTime(timeRange) {
			let timeRange_ms = '';
			switch (timeRange) {
				case 'oneMonth':
					timeRange_ms = 30 * 24 * 60 * 60 * 1000;
					break;
				case 'threeMonth':
					timeRange_ms = 3 * 30 * 24 * 60 * 60 * 1000;
					break;
				case 'halfYear':
					timeRange_ms = 6 * 30 * 24 * 60 * 60 * 1000;
					break;
				case 'oneYear':
					timeRange_ms = 12 * 30 * 24 * 60 * 60 * 1000;
					break;
				case 'beyondOneYear':
					timeRange_ms = 12 * 30 * 24 * 60 * 60 * 1000;
					break;
			};
			return (timeRange_ms ? (new Date(Date.now() - timeRange_ms).toLocaleDateString()) : '').replace(/\//g, '-');
		},
		editSource(id) {
			this.$router.push('/main/data-source-config/edit/' + id)
		},
		deleteSource(row) {
			this.toDeleteSourceId = row.id;
			this.$confirm('删除后，数据源配置将全部失效。', '确认删除 ' + row.name + ' 数据?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteDialogConfirm()
			}).catch(() => {

			});
		},
		//查询确认
		searchSubmit() {
			this.latestSearch = Object.assign({}, this.searchForm)
			this.refreshSourceTable(this.searchForm)
		},
		//根据上一次查询条件刷新数据源列表
		refreshDataSource() {
			this.refreshSourceTable(this.latestSearch);
		},
		//刷新数据源表格
		refreshSourceTable(requirement) {
			let dataSourceType = requirement.dataSourceType;
			let currentPage = requirement.currentPage
			let pageSize = requirement.pageSize
			//计算建立时间
			let createTime = this.computeCreateTime(requirement.timeRange)
			//查询参数
			let params = {};
			if (dataSourceType !== '') params.t = dataSourceType;
			if (currentPage !== '') params.p = currentPage
			if (pageSize !== '') params.ps = pageSize
			if (createTime !== '') params.bt = createTime
			this.getDataSource(params)
		},
		deleteDialogConfirm() {
			this.deleteDataSource(this.toDeleteSourceId)
		},

		createDataSource() {
			this.$router.push('/main/data-source-config/create')
		},
		//翻页控件
		currentPageChange(currentPage) {
			this.currentPage = currentPage
			this.latestSearch.currentPage = currentPage - 1
			this.refreshDataSource()
		},
		pageSizeChange(pageSize) {
			this.pageSize = pageSize
			this.latestSearch.pageSize = pageSize
			this.refreshDataSource()
		},


	},

}
</script>

<style lang="less">
.right-content {
	.searchBar {
		& .el-select {
			width: 150px;
		}
	}
	.block {
		text-align: right;
		margin-top: 30px;
	}
	.el-pagination {
		button,
		input {
			border: 1px solid #d1dbe5;
			border-radius: 5px;
		}
		.el-input {
			input {
				border-radius: 5px;
			}
		}
		.btn-next {
			margin: 0 10px;
		}
		.el-pager {
			li {
				margin-left: 10px;
				border: 1px solid #d1dbe5;
				border-radius: 5px;
			}
		}
	}
	.toolbar {
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

.sub-title {
	margin: 20px 0;
}

.lightFont {
	color: gray;
}


.searchBar {
	& .el-select {
		width: 150px;
	}
}

.image-card-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	.image-card {
		flex: 0 0 15%;
		margin: 0 20px 40px 0;
		.image {
			width: 100%;
			display: block;
		}
	}
}

.toolbar {
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
</style>
