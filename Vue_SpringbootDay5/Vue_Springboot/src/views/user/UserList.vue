<template>
  <div>
    <el-button @click="toggleSelection([userList[1], userList[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>

    <el-button @click="clearFilter">清除所有过滤器</el-button>

    <el-table ref="filterTable" :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :default-sort="{prop: 'id', order: 'ascending'}" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180" :filters="[{ text: '重庆', value: '重庆' }, { text: '北京', value: '北京' },{ text: '上海', value: '上海' }]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.address === '重庆' ? 'primary' : 'success'" disable-transitions>{{scope.row.address}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入姓名关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="userList.length"
        background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList: [],
        multipleSelection: [], //全选和反选标记
        search: '', //关键词查找
        currentPage: 1 ,//最初显示默认要跳转的一页
        pagesize:10
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      //多行全选和反选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.filterTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.filterTable.clearSelection();
        }
      },
      handleSelectionChange(val) { //反选
        this.multipleSelection = val;
      },
      //排序
      formatter(row, column) {
        return row.address;
      },
      //标签查找和清除标签
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('address');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.address === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
      },
      //分页
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.pagesize = size;
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
      },
      getUserList() {
        this.$ajax.get('/user/aop/list').then((res) => { //axios发送get请求
          if (res.data) {
              console.log(res.data)
              this.userList = res.data.data;
            } else {
              this.$message({
                type: 'error',
                message: '查询失败',
                showClose: true
              })
            }
         })
      }
    }
  }
</script>
