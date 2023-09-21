<template>
  <div>
    <el-card>
      <el-form inline :model="formData" size="small">
        <el-form-item>
          <el-input v-model="formData.id" placeholder="流水ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formData.bankName"
            placeholder="银行名称"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="hasPermi(perm.add)">
          <el-button type="primary" @click="onEdit()">
            <i class="el-icon-plus"></i>
            新增卡Bin
          </el-button>
        </el-form-item>
        <el-form-item v-if="hasPermi(perm.import)">
          <el-upload
            action="#"
            :disabled="loading.import"
            :show-file-list="false"
            :http-request="httpRequest"
          >
            <el-button :loading="loading.import" type="primary">
              <i class="el-icon-upload"></i>
              导入卡Bin
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="hasPermi(perm.download)">
          <el-button type="primary" @click="download">
            <i class="el-icon-download"></i>
            下载模板
          </el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading.table" :data="tableData" size="small">
        <el-table-column prop="id" label="ID" min-width="100" align="center" />
        <el-table-column
          prop="cardBin"
          label="卡Bin"
          width="120"
          align="center"
        />
        <el-table-column
          prop="bankName"
          label="银行名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="bankCode"
          label="银行编码"
          width="120"
          align="center"
        />
        <el-table-column
          prop="cardName"
          label="卡名"
          width="120"
          align="center"
        />
        <el-table-column
          prop="cardType"
          label="类型"
          min-width="100"
          align="center"
        />
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
      :data="addDialog.data"
      @submit-success="handleCurrentChange(1)"
    />
  </div>
</template>

<script>
import AddDialog from "./AddDialog.vue";
import apiPay from "@/api/pay";

export default {
  name: "PayType",
  components: {
    AddDialog,
  },
  data() {
    return {
      addDialog: {
        data: null,
        visible: false,
      },
      formData: {
        id: "",
        bankName: "",
      },
      loading: {
        table: false,
        import: false,
      },
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "卡Bin");
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
      this.loading.table = true;
      const [, res] = await apiPay.cardBinList({
        ...this.formData,
        pageSize: this.pagination.pageSize,
        pageNumber: this.pagination.pageNumber,
      });
      if (res && res.code == 0) {
        this.tableData = res.data.records || [];
        this.pagination.total = Number(res.data.total);
      }
      this.loading.table = false;
    },
    async httpRequest({ file }) {
      this.loading.import = true;
      const [, res] = await apiPay.cardBinImport({ file });
      if (res && res.code == 0) {
        this.$message.success("导入成功");
        this.fetchTableData();
      }
      this.loading.import = false;
    },
    onEdit(row) {
      this.addDialog.data = row;
      this.addDialog.visible = true;
    },
    download() {
      window.open("./CardBin模板.xlsx");
    },
  },
};
</script>
