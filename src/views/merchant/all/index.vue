<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item>
          <el-input v-model="formData.mchNo" placeholder="商户号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCurrentChange(1)">
            <i class="el-icon-search"></i>
            查询
          </el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button>
            <i class="el-icon-plus"></i>
            新增
          </el-button>
        </el-form-item> -->
      </el-form>

      <el-table v-loading="loading" :data="tableData" size="small">
        <el-table-column
          prop="mchNo"
          label="商户ID"
          min-width="180"
          align="center"
        />
        <el-table-column
          prop="companyName"
          label="公司名称"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="country"
          label="国家"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="currency"
          label="结算货币"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="stateDesc"
          label="状态"
          min-width="100"
          align="center"
        />
        <el-table-column label="操作" width="460" align="center" fixed="right">
          <template #default="{ row }">
            <!-- <el-button size="small">登录系统</el-button> -->
            <el-button
              v-if="hasPermi(perm.query)"
              size="small"
              @click="showInfo(row, 'detail')"
            >
              查看信息
            </el-button>
            <el-button
              v-if="hasPermi(perm.querySettlementType)"
              size="small"
              @click="showSettlement(row)"
            >
              结算设置
            </el-button>
            <el-button
              v-if="hasPermi(perm.payProductList)"
              size="small"
              @click="showPaymentChannel(row)"
            >
              支付通道
            </el-button>
            <!-- <el-button size="small" @click="showPendingChannel(row)">
              代付通道
            </el-button> -->
            <el-button
              v-if="hasPermi(perm.amountUpdate)"
              size="small"
              @click="showBalanceChange(row)"
            >
              余额变更
            </el-button>
            <el-button
              v-if="hasPermi(perm.update)"
              size="small"
              type="primary"
              @click="showInfo(row, 'edit')"
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
    <!-- 查看/编辑信息 -->
    <info-dialog
      :type="infoDialog.type"
      :mchNo="infoDialog.mchNo"
      :visible.sync="infoDialog.visible"
      @submit-success="fetchTableData"
    />
    <!-- 结算设置 -->
    <settlement-dialog
      :mchNo="settlementDialog.mchNo"
      :companyName="settlementDialog.companyName"
      :visible.sync="settlementDialog.visible"
      @submit-success="fetchTableData"
    />
    <!-- 支付通道 -->
    <payment-channel-dialog
      :mchNo="paymentChannelDialog.mchNo"
      :visible.sync="paymentChannelDialog.visible"
    />
    <!-- 待付通道 -->
    <pending-channel-dialog
      :id="pendingChannelDialog.id"
      :visible.sync="pendingChannelDialog.visible"
    />
    <!-- 余额变更 -->
    <balance-change-dialog
      :mchNo="balanceChangeDialog.mchNo"
      :visible.sync="balanceChangeDialog.visible"
      @submit-success="fetchTableData"
    />
  </div>
</template>

<script>
import InfoDialog from "./InfoDialog.vue";
import SettlementDialog from "./SettlementDialog.vue";
import PaymentChannelDialog from "./PaymentChannelDialog.vue";
import PendingChannelDialog from "./PendingChannelDialog.vue";
import BalanceChangeDialog from "./BalanceChangeDialog.vue";
import apiMerchant from "@/api/merchant";

export default {
  name: "MerchantAll",
  components: {
    InfoDialog,
    SettlementDialog,
    PaymentChannelDialog,
    PendingChannelDialog,
    BalanceChangeDialog,
  },
  data() {
    return {
      infoDialog: {
        visible: false,
        type: "detail",
        mchNo: "",
      },
      settlementDialog: {
        visible: false,
        id: "",
      },
      paymentChannelDialog: {
        visible: false,
        id: "",
      },
      pendingChannelDialog: {
        visible: false,
        id: "",
      },
      balanceChangeDialog: {
        visible: false,
        mchNo: "",
      },
      formData: {
        mchNo: "",
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
    this.$store.commit("CHANGE_PAGE_TITLE", "所有商户");
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
      const [, res] = await apiMerchant.mchInfoList({
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
    showInfo(row, type) {
      this.infoDialog.type = type;
      this.infoDialog.mchNo = row.mchNo;
      this.infoDialog.visible = true;
    },
    showSettlement(row) {
      this.settlementDialog.mchNo = row.mchNo;
      this.settlementDialog.companyName = row.companyName;
      this.settlementDialog.visible = true;
    },
    showPaymentChannel(row) {
      this.paymentChannelDialog.mchNo = row.mchNo;
      this.paymentChannelDialog.visible = true;
    },
    showPendingChannel(row) {
      this.pendingChannelDialog.id = row.id;
      this.pendingChannelDialog.visible = true;
    },
    showBalanceChange(row) {
      this.balanceChangeDialog.mchNo = row.mchNo;
      this.balanceChangeDialog.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-button--default {
    background-color: #f3fcfb !important;
    color: #00bda1 !important;
  }
}
</style>
