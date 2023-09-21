<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item v-if="hasPermi(perm.add)">
          <el-button type="primary" @click="onEdit()">
            <i class="el-icon-plus"></i>
            新增支付通道
          </el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="tableData" size="small">
        <el-table-column
          prop="id"
          label="通道ID"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="channelName"
          label="通道名称"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="apiCode"
          label="接口代码"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="apiName"
          label="接口名称"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="payTypeName"
          label="支付类型"
          min-width="120"
          align="center"
        />
        <el-table-column
          label="通道费率"
          min-width="120"
          align="center"
          :formatter="(row) => `${row.rate}%`"
        />
        <el-table-column label="通道状态" min-width="100" align="center">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">
              {{ row.status === 0 ? "开启" : "关闭" }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="hasPermi(perm.payChannelSettingFee)"
              size="small"
              @click="onRateSet(row)"
              >费率</el-button
            >
            <el-button
              v-if="hasPermi(perm.payChannelSettingRisk)"
              size="small"
              @click="onRiskSet(row)"
              >风控</el-button
            >
            <el-button
              v-if="hasPermi(perm.update)"
              size="small"
              type="primary"
              @click="onEdit(row)"
            >
              编辑
            </el-button>
          </template>
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
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <add-dialog
      :visible.sync="addDialog.visible"
      :data="addDialog.data"
      @submit-success="handleCurrentChange(1)"
    />
    <!-- 费率设置 -->
    <rate-set-dialog
      :visible.sync="rateSetDialog.visible"
      :data="rateSetDialog.data"
      @submit-success="handleCurrentChange(1)"
    />
    <!-- 风控设置 -->
    <risk-set-dialog
      :visible.sync="riskSetDialog.visible"
      :data="riskSetDialog.data"
      @submit-success="handleCurrentChange(1)"
    />
  </div>
</template>

<script>
import AddDialog from "./AddDialog.vue";
import RateSetDialog from "./RateSetDialog.vue";
import RiskSetDialog from "./RiskSetDialog.vue";
import apiPay from "@/api/pay";

export default {
  name: "PayChannel",
  components: {
    AddDialog,
    RateSetDialog,
    RiskSetDialog,
  },
  data() {
    return {
      addDialog: {
        data: null,
        visible: false,
      },
      rateSetDialog: {
        data: {},
        visible: false,
      },
      riskSetDialog: {
        data: {},
        visible: false,
      },
      formData: {
        // mchNo: "",
      },
      loading: false,
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "支付通道");
    this.fetchTableData();
  },
  methods: {
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
      const [, res] = await apiPay.payChannelList({
        ...this.formData,
        pageSize: this.pagination.pageSize,
        pageNumber: this.pagination.pageNumber,
      });
      if (res && res.code == 0) {
        this.tableData = res.data.records || [];
        this.pagination.total = Number(res.data.total);
      }
      this.loading = false;
    },
    onEdit(row) {
      this.addDialog.data = row;
      this.addDialog.visible = true;
    },
    onRateSet(row) {
      this.rateSetDialog.data = row;
      this.rateSetDialog.visible = true;
    },
    onRiskSet(row) {
      this.riskSetDialog.data = row;
      this.riskSetDialog.visible = true;
    },
  },
};
</script>
