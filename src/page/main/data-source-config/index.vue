<template>
	<div class="right-content">
		<div class="title-show-box">
			<span>数据源配置</span>
		</div>
		<el-table :data="dataSource" border>
			<el-table-column prop="name" label="名称">
			</el-table-column>
			<el-table-column prop="type" label="类型">
			</el-table-column>
			<el-table-column prop="information" label="信息">
			</el-table-column>
		</el-table>
		<div class="sub-title">
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
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapActions, mapState } from 'vuex'

export default {
	name: 'data-source-config',
	data() {
		return {
			data: this.getDataSource(),
			newDataSource: [
				{
					id: 1,
					imageLocation: '/../../../images/natural-language/mysql.png'
				}, {
					id: 2,
					imageLocation: '../../../images/natural-language/excel.png'
				}, {
					id: 3,
					imageLocation: '../../../images/natural-language/oracle.png'
				}
			]

		}
	},
	computed: mapState(['dataSource']),
	methods: {
		...mapActions([
			'getDataSource'
		])
	},

}
</script>

<style lang="less" scoped>
.sub-title {
	margin: 20px 0;
}
.image-card-container{
	display: flex;
	flex-wrap: wrap;
	justify-content:space-between;
	align-items:center;
.image-card {
	flex: 0 0 15%;
	margin:0 20px 40px 0; 
	.image {
		width: 100%;
		display: block;
	}
}

}
</style>
