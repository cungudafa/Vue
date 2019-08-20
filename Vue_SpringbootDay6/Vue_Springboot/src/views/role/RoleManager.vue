<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card shadow="always">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="linechart1" style="float:left;width:100%;height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div id="piechart2" style="float:left;width:100%;height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      this.$chart.line1('linechart1');
      this.$chart.pie1('piechart2');
    }
  }
</script>

<style scoped>
</style>
