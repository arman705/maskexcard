<template>
  <div class="main-content">
    <div class="headbox">
      <el-input placeholder="商户ID" v-model="mchNo"></el-input>
      <!--      <el-select v-model="formData.status" placeholder="状态">-->
      <!--        <el-option-->
      <!--          v-for="item in options"-->
      <!--          :key="item.value"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value"-->
      <!--        >-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <span style="margin-left: 5px">对账日期：</span>
      <el-date-picker
        v-model="formData.date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
      >
      </el-date-picker>

      <el-button style="margin-left: 5px" type="primary" @click="searchInput"
        >查询</el-button
      >
    </div>
    <div class="contentbox">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="对账日期"> </el-table-column>
        <el-table-column prop="successQty" label="成功订单数">
        </el-table-column>
        <el-table-column prop="successRate" label="成功率"> </el-table-column>
        <el-table-column prop="totalQty" label="总订单数"> </el-table-column>
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
      mchNo: "",
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
    this.$store.commit("CHANGE_PAGE_TITLE", "商户对账单");
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
      if (!this.formData.date) {
        this.formData.date = "";
      }
      const [error, res] = await apiData.merchList({
        ccsType: this.ccsType,
        date: this.formData.date,
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
  align-items: center;
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
/deep/ .el-table .cell {
  text-align: center;
  vertical-align: middle;
}
</style>
