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
			<span class="lightFont">共搜索到{{dataSource.length?dataSource.length:0}}条数据</span>
			<div class="fr">
				<el-button type="primary" @click="createDataSource" size="small">创建</el-button>
			</div>
		</div>

		<el-table :data="dataSource" class="data-table" border :default-sort="{prop: 'ctime', order: 'descending'}">
			<el-table-column prop="name" label="数据名称"></el-table-column>
			<el-table-column prop="type" label="数据源类型"></el-table-column>
			<el-table-column prop="ctime" label="创建日期" :sortable="true" min-width="200px"></el-table-column>
			<el-table-column label="操作" min-width="230px">
				<template scope="scope">
					<div class="toolbar">
						<el-button type="text" @click="editSource(scope.row.id)">编辑</el-button>
						<el-button type="text" @click="deleteSource(scope.row)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!-- <div class="sub-title">
					<span>新增数据源</span>
				</div>
				<div class="image-card-container">
					<el-card  :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/mysql.png" class="image">
					</el-card>
					<el-card :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/excel.png" class="image">
					</el-card>
					<el-card  :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/oracle.png" class="image">
					</el-card>
					<el-card  :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/csv.png" class="image">
					</el-card>
					<el-card :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/hive.png" class="image">
					</el-card>
					<el-card  :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/sqlserver.png" class="image">
					</el-card>
					<el-card  :body-style="{ padding: '0' }" class="image-card">
						<img src="../../../images/natural-language/postgreSOL.png" class="image">
					</el-card>
				</div> -->
	</div>
</template>
<script type="text/javascript">
import { mapActions, mapState } from 'vuex'

export default {
	name: 'data-source-config',
	data() {
		return {
			data: this.getDataSource(),
			searchForm: {
				dataSourceType: '',
				timeRange: '',
				currentPage: '',
				pageSize: ''
			},
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
			// newDataSource: [
			// 	{
			// 		id: 1,
			// 		imageLocation: '/../../../images/natural-language/mysql.png'
			// 	}, {
			// 		id: 2,
			// 		imageLocation: '../../../images/natural-language/excel.png'
			// 	}, {
			// 		id: 3,
			// 		imageLocation: '../../../images/natural-language/oracle.png'
			// 	}
			// ]

		}
	},
	computed: mapState(['dataSource']),
	methods: {
		...mapActions([
			'getDataSource'
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

		},
		deleteSource(row) {

		},
		//查询确认
		searchSubmit() {
			this.refreshTaskTable(this.searchForm);
		},

		refreshTaskTable(requirement) {
			let dataSourceType = requirement.dataSourceType;
			let currentPage = requirement.currentPage
			let pageSize = requirement.pageSize
			//计算建立时间
			let createTime = this.computeCreateTime(requirement.timeRange);
			//查询参数
			let params = {};
			if (dataSourceType !== '') params.t = dataSourceType;
			if (currentPage !== '') params.p = currentPage
			if (pageSize !== '') params.ps = pageSize
			if (createTime !== '') params.bt = createTime
			this.getDataSource(params);
		},
		createDataSource() {
			this.$router.push('/main/data-source-config/create')
		}
	},

}
</script>

<style lang="less" scoped>
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
