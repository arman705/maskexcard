<template>
  <div>
    <div class="main-content">
      <div class="headbox">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>

        <el-button class="basic-btn" @click="searchInput">查询</el-button>
        <el-button
          class="basic-btn"
          @click="getList(1)"
          :style="{
            backgroundColor: selectedButton === 1 ? '#00BDA1' : '',
            color: selectedButton === 1 ? '#fff' : '',
          }"
          >按天统计成功率</el-button
        >

        <el-button
          @click="getList(2)"
          class="basic-btn"
          :style="{
            backgroundColor: selectedButton === 2 ? '#00BDA1' : '',
            color: selectedButton === 2 ? '#fff' : '',
          }"
          >按小时统计成功率</el-button
        >
      </div>
      <div class="contentbox">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期/时间"> </el-table-column>
          <el-table-column prop="successQty" label="成功订单数">
          </el-table-column>
          <el-table-column prop="totalQty" label="总订单数"> </el-table-column>
          <el-table-column prop="successRate" label="订单成功率">
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNumber"
          :page-size="pagination.pageSize"
          layout="prev, pager, next, total"
          :total="pagination.total"
        />
      </div>
    </div>
    <div class="main-content">
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import apiData from "@/api/analysis";
export default {
  name: "settlementReview",
  components: {},
  data() {
    return {
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "等待审核",
          label: "等待审核",
        },
      ],
      selectedButton: 1,
      tableData: [],
      chartData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
      formData: {
        id: "",
        username: "",
        num: "",
        status: "",
        date: "",
      },
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "成功率统计");
  },
  mounted() {
    this.dayChart();
    this.getList();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.pagination.pageNumber = currentPage;
      this.getList();
    },
    async getList(e) {
      if (e === 1) {
        this.dayChart();
        this.selectedButton = e; //互换按钮样式
      } else if (e === 2) {
        this.hourChart();
        this.selectedButton = e; //互换按钮样式
      }
      if (!this.formData.date) {
        this.formData.date = "";
      }
      const [error, res] = await apiData.successRates({
        endDate: this.formData.date[1],
        startDate: this.formData.date[0],
        queryType: e ? e - 1 : "",
        pageNumber: this.pagination.pageNumber,
        pageSize: this.pagination.pageSize,
      });
      if (error) return;
      const result = res.data.records;
      this.pagination.total = Number(res.data.total);
      this.tableData = result;
    },
    async getChart(e) {
      if (e === 1) {
        const [error, res] = await apiData.sevenDays();
        if (error) return;
        const result = res.data;
        // 将数据转换为 ECharts
        let dates = Object.keys(result);
        let amounts = Object.values(result);
        const chartContainer = this.$refs.chart;
        const chart = echarts.init(chartContainer);
        chart.setOption({
          xAxis: {
            data: dates, // 使用日期作为 xAxis 的数据
          },
          series: [
            {
              name: "总金额",
              type: "line",
              data: amounts, // 使用金额作为 series 的数据
            },
          ],
        });
      } else {
        const [error, res] = await apiData.hourData();
        if (error) return;
        const result = res.data;
        // 将数据转换为 ECharts
        let dates = Object.keys(result);
        let amounts = Object.values(result);
        const chartContainer = this.$refs.chart;
        const chart = echarts.init(chartContainer);
        chart.setOption({
          xAxis: {
            data: dates, // 使用日期作为 xAxis 的数据
          },
          series: [
            {
              name: "总金额",
              type: "line",
              data: amounts, // 使用金额作为 series 的数据
            },
          ],
        });
      }
    },
    dayChart() {
      this.getChart(1);
      const chartContainer = this.$refs.chart;
      const chart = echarts.init(chartContainer);
      // 配置项
      const options = {
        title: {
          text: "近7日平台交易金额", // 添加标题
          left: "left", // 标题居中
        },
        xAxis: {
          type: "category",
          data: [], // 替换为你的日期数据
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 1000,
          interval: 200,
        },
        series: [],
      };

      // 使用配置项初始化图表
      chart.setOption(options);
    },
    searchInput() {
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = 10;
      this.getList();
    },
    hourChart() {
      this.getChart(2);
      const chartContainer = this.$refs.chart;
      const chart = echarts.init(chartContainer);
      // 配置项
      const options = {
        title: {
          text: "近十二小时订单成功率", // 添加标题
          left: "left", // 标题居中
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
        },
        series: [],
      };

      // 使用配置项初始化图表
      chart.setOption(options);
    },
  },
};
</script>
<style lang="less" scoped>
.main-content {
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}
.headbox {
  display: flex;
}
.el-input {
  display: inline-block;
  width: 150px;
  margin-right: 10px;
}
.el-date-picker {
  width: 300px;
}
.el-select {
  width: 150px;
  margin-right: 10px;
}
/deep/.el-range-editor.el-input__inner {
  width: 400px;
}
.order-list {
  background: #f4f5f7;
  padding: 15px;
  margin: 10px 0;
  font-size: 14px;
  display: flex;
  .order-item {
    color: #606060;
    margin-right: 30px;
    display: inline-block;
  }
}
.chart {
  width: 100%;
  height: 400px; /* 根据需要调整这个值 */
}
.basic-btn {
  margin-left: 10px;
  color: #00bda1;
  background: #f3fcfb;
}
</style>
