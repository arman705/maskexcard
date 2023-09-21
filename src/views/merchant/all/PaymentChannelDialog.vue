<template>
  <div>
    <CommonDialog
      width="790px"
      title="支付通道"
      :visible="visible"
      :close-on-click-modal="false"
      @close="onClose"
    >
      <el-table v-loading="loading" :data="tableData" size="small">
        <el-table-column
          prop="id"
          label="产品ID"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="productName"
          label="产品名称"
          width="100"
          align="center"
        />
        <el-table-column
          prop="typeDesc"
          label="产品类型"
          width="80"
          align="center"
        />
        <el-table-column
          prop="proxyRate"
          label="代理商费率"
          width="80"
          align="center"
          :formatter="(row) => `${((row.proxyRate || 0) * 100).toFixed(2)}%`"
        />
        <el-table-column
          prop="merchantRate"
          label="商户费率"
          width="80"
          align="center"
          :formatter="(row) => `${((row.merchantRate || 0) * 100).toFixed(2)}%`"
        />
        <el-table-column
          prop="apiModeDesc"
          label="接口模式"
          width="80"
          align="center"
        />
        <el-table-column
          prop="statusDesc"
          label="状态"
          width="60"
          align="center"
        />
        <el-table-column label="操作" width="60" align="center">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="onSet(row)">
              配置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        style="margin-top: 20px; text-align: center"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNumber"
        :page-size="pagination.pageSize"
        layout="prev, pager, next, total"
        :total="pagination.total"
      /> -->
      <template #footer>
        <el-button @click="onClose" size="small">关闭</el-button>
      </template>
    </CommonDialog>

    <payment-channel-set-dialog
      :mchNo="mchNo"
      :data="paymentChannelSet.data"
      :visible.sync="paymentChannelSet.visible"
      @submit-success="fetchTableData"
    />
  </div>
</template>

<script>
import CommonDialog from "@/views/components/CommonDialog.vue";
import PaymentChannelSetDialog from "./PaymentChannelSetDialog.vue";
import apiMerchant from "@/api/merchant";

export default {
  props: {
    visible: Boolean,
    mchNo: [String, Number],
  },
  components: {
    CommonDialog,
    PaymentChannelSetDialog,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
      paymentChannelSet: {
        visible: false,
        id: "",
      },
    };
  },
  watch: {
    mchNo() {
      this.tableData = [];
      this.fetchTableData();
    },
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
      const [error, res] = await apiMerchant.mchInfoPayProductList({
        mchNo: this.mchNo,
        // pageSize: this.pagination.pageSize,
        // pageNumber: this.pagination.pageNumber,
      });
      if (error) {
        this.$message.error(error.msg);
      } else {
        if (res.code == 0) {
          this.tableData = res.data || [];
          // this.pagination.total = Number(res.data.total);
        }
      }
      this.loading = false;
    },
    onClose() {
      this.$emit("update:visible", false);
    },
    onShutDown(row) {
      console.log(row);
      this.$confirm("确定要关闭吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    onSet(row) {
      this.paymentChannelSet.data = row;
      this.paymentChannelSet.visible = true;
    },
  },
};
</script>
