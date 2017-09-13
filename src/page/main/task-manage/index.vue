<template>
<div class="right-content">
  <div>
    <span>任务类型：</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>建立日期：</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>任务状态：</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="createTask">查询</el-button>
  </div>
  <div>
    <el-button class="fr" type="primary" @click="createTask">新增任务</el-button>
  </div>
  <el-table :data="tableData" border class="task-manage-task">
    <el-table-column prop="name" label="任务名称"></el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
    <el-table-column prop="NPLservice" label="NPL服务器"></el-table-column>
    <el-table-column prop="time" label="任务建立时间"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column label="开始执行">
      <template scope="scope">
        <el-button 
        @click="handleClick" type="text" size="small">开始</el-button>
        <el-button 
        @click="handleClick" type="text" size="small">删除</el-button>
        <el-button 
        @click="handleClick" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="1000">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
	name: 'task-manage',
    data () {
      return {
        options: [{
          value: 'all',
          label: '所有任务'
        }, {
          value: 'begin',
          label: '未开始'
        }, {
          value: 'running',
          label: '正在执行'
        }, {
          value: 'end',
          label: '已结束'
        }],
        tableData: [{
          name: '新闻实体识别',
          type: '实体识别',
          NPLservice: 'spark服务_45',
          time: '2017-08-09',
          status: '未开始'
        }, {
          name: '存量裁判文书解析',
          type: '裁判文书',
          NPLservice: 'spark服务_36',
          time: '2017-08-29',
          status: '正在执行'
        }],
        value: 'all'
      }
    },
    watch: {
      
    },
    created(){
    },
    methods: {
      handleClick (data) {
        console.log(data)
      },
      createTask () {
        this.$router.push('/main/task-manage/create')
      },
      handleCurrentChange (page) {
        console.log(page)
      }
    }
}
</script>

<style lang="less">
.right-content {
  padding: 40px;
  .task-manage-task {
    margin-top: 16px;
  }
  .block {
    text-align: right;
    margin-top: 30px
  }
}
</style>