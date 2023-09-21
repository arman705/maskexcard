<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item>
          <el-input v-model="formData.mchNo" placeholder="商户号" clearable />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formData.auditStatus"
            placeholder="状态"
            clearable
          >
            <el-option label="全部" value="" />
            <el-option label="待审核" value="1" />
            <el-option label="通过" value="2" />
            <el-option label="拒绝" value="3" />
          </el-select>
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
          label="商户号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="companyName"
          label="公司名称"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="country"
          label="国家"
          width="150"
          align="center"
        />
        <el-table-column
          prop="auditStatusDesc"
          label="状态"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <span
              :style="{
                color: row.auditStatus === 3 ? 'red' : 'inherit',
              }"
            >
              {{ row.auditStatusDesc }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="拒绝原因"
          min-width="120"
          align="center"
          :formatter="(row) => row.reason || '-'"
        />
        <el-table-column
          prop="createdAt"
          label="时间"
          width="180"
          align="center"
        />
        <el-table-column
          label="审核人"
          width="120"
          align="center"
          :formatter="(row) => row.auditor || '-'"
        />
        <el-table-column
          label="审核时间"
          width="180"
          align="center"
          :formatter="(row) => row.auditTime || '-'"
        />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="hasPermi(perm.audit)"
              :disabled="row.auditStatus != 1"
              size="small"
              @click="onVerify(row)"
            >
              审核
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

    <!-- 审核弹窗 -->
    <verify-dialog
      :id="verifyDialog.id"
      :mchNo="verifyDialog.mchNo"
      :visible.sync="verifyDialog.visible"
      @submit-success="fetchTableData"
    />
  </div>
</template>

<script>
import VerifyDialog from "./VerifyDialog.vue";
import apiMerchant from "@/api/merchant";

export default {
  name: "MerchantNotReviewed",
  components: {
    VerifyDialog,
  },
  data() {
    return {
      verifyDialog: {
        visible: false,
        id: "",
        mchNo: "",
      },
      formData: {
        mchNo: "",
        auditStatus: "",
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
    this.$store.commit("CHANGE_PAGE_TITLE", "待审商户");
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
      const [, res] = await apiMerchant.mchInfoAuditList({
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
    onVerify(row) {
      this.verifyDialog.id = row.id;
      this.verifyDialog.mchNo = row.mchNo;
      this.verifyDialog.companyName = row.companyName;
      this.verifyDialog.visible = true;
    },
    editInfo(row) {
      this.infoDialog.mchNo = row.mchNo;
      this.infoDialog.visible = true;
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
