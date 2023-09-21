<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item>
          <el-input v-model="formData.ccrSn" placeholder="流水号" clearable />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formData.queryType"
            placeholder="查询类型"
            clearable
          >
            <el-option
              v-for="item in Object.values(queryTypeOptions)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formData.ccrStatus"
            placeholder="充值状态"
            clearable
          >
            <el-option
              v-for="item in ccrStatusOptions"
              :key="item.value"
              :label="item.description"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.ccrType" placeholder="类型" clearable>
            <el-option
              v-for="item in ccrTypeOptions"
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
            value-format="yyyy-MM-dd hh:mm:ss"
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

      <el-table v-loading="loading" :data="tableData" size="small">
        <el-table-column
          prop="mchNo"
          label="商户号"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="ccrId"
          label="充值记录ID"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="ccrSn"
          label="充值流水号"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="ccrAmount"
          label="金额"
          width="100"
          align="center"
        />
        <el-table-column
          prop="ccrCurrency"
          label="货币"
          width="100"
          align="center"
        />
        <el-table-column label="类型" min-width="100" align="center">
          <template #default="{ row }">
            {{ getDictName(ccrTypeOptions, row.ccrType) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="100" align="center">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">
              {{ getDictName(ccrStatusOptions, row.ccrStatus) }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          width="150"
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
import billPay from "@/api/bill";
import apiDict from "@/api/dict";

export default {
  name: "PayApiType",
  data() {
    return {
      addDialog: {
        data: null,
        visible: false,
      },
      formData: {
        ccrSn: "",
        ccrStatus: "",
        ccrType: "",
        queryType: "",
        dateRange: [],
      },
      loading: false,
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
      ccrStatusOptions: [],
      ccrTypeOptions: [],
      queryTypeOptions: {
        1: { label: "商户", value: "1" },
        2: { label: "信用卡", value: "2" },
      },
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "支付订单");

    this.parseQuery();
    this.fetchTableData();
    this.fetchCcrTypeOptions();
    this.fetchCcrStatusOptions();
  },
  methods: {
    parseQuery() {
      const { queryType, startDate, endDate } = this.$route.query;
      this.formData.queryType = queryType;
      if (startDate && endDate) this.formData.dateRange = [startDate, endDate];
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
      const [, res] = await billPay.mgrRechargeList(params);
      if (res && res.code == 0) {
        this.tableData = res.data.records || [];
        this.pagination.total = Number(res.data.total);
      }
      this.loading = false;
    },
    async fetchCcrStatusOptions() {
      const [, res] = await apiDict.dictSearch({ type: "ccrStatus" });
      if (res.code == 0) {
        this.ccrStatusOptions = res.data || [];
      }
    },
    async fetchCcrTypeOptions() {
      const [, res] = await apiDict.dictSearch({ type: "ccrType" });
      if (res.code == 0) {
        this.ccrTypeOptions = res.data || [];
      }
    },
    getDictName(data, value) {
      const target = data.find((item) => item.value == value);
      return target ? target.description : "-";
    },
    onEdit(row) {
      this.addDialog.data = row;
      this.addDialog.visible = true;
    },
  },
};
</script>
