<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item v-if="hasPermi(perm.add)">
          <el-button type="primary" @click="onEdit()">
            <i class="el-icon-plus"></i>
            新增支付产品
          </el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="tableData" size="small">
        <el-table-column
          prop="id"
          label="产品ID"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="name"
          label="产品名称"
          min-width="120"
          align="center"
        />
        <el-table-column
          label="产品类型"
          width="100"
          align="center"
          :formatter="(row) => (row.type === 0 ? '收款' : '代付')"
        />
        <el-table-column
          prop="payTypeName"
          label="支付类型"
          min-width="120"
          align="center"
        />
        <el-table-column
          label="代理商费率"
          width="100"
          align="center"
          :formatter="(row) => (row.proxyRate ? `${row.proxyRate}%` : '未设置')"
        />
        <el-table-column
          label="商户费率"
          width="100"
          align="center"
          :formatter="
            (row) => (row.merchantRate ? `${row.merchantRate}%` : '未设置')
          "
        />
        <el-table-column
          label="接口模式"
          width="100"
          align="center"
          :formatter="(row) => (row.apiMode === 0 ? '单独' : '轮询')"
        />
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">
              {{ row.status === 0 ? "开启" : "关闭" }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
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
      :id="addDialog.id"
      @submit-success="handleCurrentChange(1)"
    />
  </div>
</template>

<script>
import AddDialog from "./AddDialog.vue";
import apiPay from "@/api/pay";

export default {
  name: "PayProduct",
  components: {
    AddDialog,
  },
  data() {
    return {
      addDialog: {
        id: "",
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
    this.$store.commit("CHANGE_PAGE_TITLE", "支付产品");
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
      const [, res] = await apiPay.payProductList({
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
    onEdit(row = {}) {
      this.addDialog.id = row.id;
      this.addDialog.visible = true;
    },
  },
};
</script>
