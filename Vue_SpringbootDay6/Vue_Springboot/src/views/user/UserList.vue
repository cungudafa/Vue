<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-button @click="toggleSelection([userList[1], userList[2]])" size="mini">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()" size="mini">取消选择</el-button>
      </el-col>
      <el-col :span="6">
      </el-col>
      <el-col :span="6">
        <el-button @click="clearFilter" type="success" size="mini"><i class="el-icon-refresh-right"></i>刷新</el-button>
        <!-- 导出按钮 -->
        <el-button @click="exportToExcel" @selection-change="handleSelectionChange" type="primary" class="button" size="mini"><i class="el-icon-download"></i>批量导出</el-button>
        <el-button @click="exportAllToExcel" type="warning" class="button" size="mini"><i class="el-icon-download"></i>全部导出</el-button>
      </el-col>
    </el-row>
    <el-table class="table" ref="filterTable" v-loading="loading" :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :default-sort="{prop: 'id', order: 'ascending'}" border tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange" :row-key="getRowKeys">
      <el-table-column type="selection" reserve-selection="true" width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="180" :formatter="formatter">
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        userList: [],
        loading: false, //加载效果
        multipleSelection: [], //标记选中的集合
        search: '', //关键词查找
        currentPage: 1, //最初显示默认要跳转的一页
        pagesize: 10
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
          this.$refs.filterTable.clearSelection(); //反选
        }
      },
      handleSelectionChange(val) { //选中的内容,监听状态@selection-change="handleSelectionChange"
        this.multipleSelection = val;
      },
      getRowKeys(row){//翻页也保存勾选状态
        return row.id;
      },
      //地址排序
      formatter(row, column) {
        return row.age;//排序
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
        this.loading = true;
        this.$ajax.get('/user/aop/list').then((res) => { //axios发送get请求
          if (res.data) {
            this.loading = false;
            //console.log(res.data)
            this.userList = res.data.data;
          } else {
            this.loading = false;
            this.$message({
              type: 'error',
              message: '查询失败',
              showClose: true
            })
          }
        })
      },
      // 部分下载
      exportToExcel() {
        if (this.multipleSelection.length) { //根据选中的某条数据进行导出
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require('@/vendor/Export2Excel'); //Export2Excel的地址，与配置路径相对应
            const tHeader = ['序号', '姓名', '年龄', '地址', '密码']; //表头
            const filterVal = ['id', 'name', 'age', 'address', 'password']; //userList里面的对应的全部数据
            const list = this.multipleSelection; //将导出数据赋值
            const data = this.formatJson(filterVal, list); //参数过滤方法
            export_json_to_excel(tHeader, data, '列表excel'); //表名，方法封装在在Export2Excel中
          })
        }else {
          this.$message({
            message: '请选择至少一项内容',
            type: 'warning',
            showClose: true
          })
        }
      },

      // 全部下载
      exportAllToExcel() { //数据导出方法
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('@/vendor/Export2Excel'); //Export2Excel的地址，与配置路径相对应
          const tHeader = ['序号', '姓名', '年龄', '地址', '密码']; //表头
          const filterVal = ['id', 'name', 'age', 'address', 'password']; //userList里面的对应的全部数据
          const list = this.userList; //将导出数据赋值
          const data = this.formatJson(filterVal, list); //参数过滤方法
          export_json_to_excel(tHeader, data, '列表excel'); //表名，方法封装在在Export2Excel中
        })
      },
      // 参数过滤
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //导出完毕

    }
  }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
