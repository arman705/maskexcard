<template>
  <div class="main-content">
    <div class="headbox">
      <el-input placeholder="代理商ID" v-model="formData.id"></el-input>
      <el-input placeholder="商户ID" v-model="mchNo"></el-input>
      <el-input placeholder="产品类型" v-model="formData.num"></el-input>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      <el-button style="margin-left: auto" type="primary" @click="searchInput"
        >查询</el-button
      >
    </div>
    <div class="contentbox">
      <!--      <div class="order-list">-->
      <!--        <div class="order-item">-->
      <!--          <span>订单数：</span>-->
      <!--          <span>0</span>-->
      <!--        </div>-->
      <!--        <div class="order-item">-->
      <!--          <span>代付金额：</span>-->
      <!--          <span>0</span>-->
      <!--        </div>-->
      <!--        <div class="order-item">-->
      <!--          <span>代付费用：</span>-->
      <!--          <span>0</span>-->
      <!--        </div>-->
      <!--      </div>-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="mchNo" label="商户ID"> </el-table-column>
        <el-table-column prop="mchName" label="商户名称"> </el-table-column>
        <el-table-column prop="amount" label="充值金额" sortable>
        </el-table-column>
        <el-table-column prop="rechargeQty" label="充值笔数" sortable>
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
</template>
<script>
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
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
      page: 1,
      pageSize: 10,
      startDate: "",
      endDate: "",
      mchNo: "",
      date: "",
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
    this.$store.commit("CHANGE_PAGE_TITLE", "商户充值排行");
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
    searchInput() {
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = 10;
      this.getList();
    },
    async getList() {
      if (!this.date) {
        this.date = "";
      }
      const [error, res] = await apiData.loadList({
        endDate: this.date[1],
        startDate: this.date[0],
        mchNo: this.mchNo,
        pageNumber: this.pagination.pageNumber,
        pageSize: this.pagination.pageSize,
      });
      if (error) return;
      const result = res.data.records;
      this.pagination.total = Number(res.data.total);
      this.tableData = result;
    },
  },
};
</script>
<style lang="less" scoped>
.main-content {
  background: #fff;
  padding: 15px;
  border-radius: 6px;
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
</style>
