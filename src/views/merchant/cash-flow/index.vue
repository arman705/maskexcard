<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item>
          <el-input v-model="formData.mchNo" placeholder="商户号" clearable />
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.ccsType" placeholder="类型" clearable>
            <el-option
              v-for="item in cssTypeOptions"
              :key="item.value"
              :label="item.description"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="formData.dateRange"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCurrentChange(1)">
            <i class="el-icon-search"></i>
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="total-panel">
        <div class="total-panel-item">总笔数：400元</div>
        <div class="total-panel-item">代理商利润：400元</div>
        <div class="total-panel-item">平台利润：400元</div>
      </div> -->
      <el-table v-loading="loading" :data="tableData" size="small">
        <el-table-column
          prop="createTime"
          label="时间"
          width="180"
          align="center"
        />
        <el-table-column
          prop="mchNo"
          label="商户号"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="ccsNo"
          label="流水号"
          min-width="140"
          align="center"
        />
        <el-table-column label="余额变化" width="100" align="center">
          <template #default="{ row }">
            <span class="amount-value">{{ row.ccsAvailableAmountChange }}</span>
            <span class="amount-unit">USD</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ccsTypeDesc"
          label="类型"
          width="120"
          align="center"
        />
        <el-table-column label="冻结金额" min-width="100" align="center">
          <template #default="{ row }">
            <span class="amount-value">{{ row.ccsFrozenAmount }}</span>
            <span class="amount-unit">USD</span>
          </template>
        </el-table-column>
        <el-table-column label="冻结金额变动" min-width="100" align="center">
          <template #default="{ row }">
            <span class="amount-value">{{ row.ccsFrozenAmountChange }}</span>
            <span class="amount-unit">USD</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" min-width="140" align="center">
          <template #default="{ row }">
            <span class="amount-value">{{ row.ccsAvailableAmount }}</span>
            <span class="amount-unit">USD</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ccsRelevantNoEncrypt"
          label="关联流水号"
          min-width="140"
          align="center"
        />
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
    </el-card>
  </div>
</template>

<script>
import apiMerchant from "@/api/merchant";
import apiDict from "@/api/dict";

export default {
  name: "MerchantCashFlow",
  data() {
    return {
      formData: {
        mchNo: "",
        ccsType: "",
        dateRange: [],
      },
      loading: false,
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
      cssTypeOptions: [],
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "资金流水");
    this.fetchTableData();
    this.fetchCssTypeOptions();
  },
  methods: {
    async fetchCssTypeOptions() {
      const [, res] = await apiDict.dictSearch({ type: "ccsType" });
      if (res.code == 0) {
        this.cssTypeOptions = res.data || [];
      }
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.pagination.pageNumber = currentPage;
      this.fetchTableData();
    },
    async fetchTableData() {
      this.loading = true;
      const params = {
        ...this.formData,
        pageSize: this.pagination.pageSize,
        pageNumber: this.pagination.pageNumber,
      };
      params.startDate = this.formData.dateRange
        ? this.formData.dateRange[0]
        : "";
      params.endDate = this.formData.dateRange
        ? this.formData.dateRange[1]
        : "";
      Reflect.deleteProperty(params, "dateRange");
      const [, res] = await apiMerchant.mchInfoGetStatementList(params);
      if (res && res.code == 0) {
        this.tableData = res.data.records || [];
        this.pagination.total = Number(res.data.total);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.total-panel {
  background-color: #f4f5f7;
  display: flex;
  padding: 8px 20px;
  border-radius: 2px;
  margin-bottom: 16px;
}
.total-panel-item {
  color: #606060;
  font-size: 14px;
  margin-right: 50px;
}
.amount-value {
  color: #333;
  font-weight: 700;
}
.amount-unit {
  color: #aaa;
  font-weight: 700;
  margin-left: 4px;
}
</style>
