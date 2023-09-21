<template>
  <CommonDialog
    width="700px"
    :title="id ? '编辑' : '新增'"
    :visible="visible"
    :close-on-click-modal="false"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
  >
    <el-form
      ref="formEl"
      :model="formData"
      :rules="rules"
      size="small"
      label-position="left"
      label-width="110px"
      v-loading="loading.detail"
    >
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品类型" required prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">收款</el-radio>
          <el-radio :label="1">代付</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付类型" prop="payTypeCode">
        <el-select
          v-model="formData.payTypeCode"
          placeholder="请选择支付类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in typeList"
            :key="item.payTypeCode"
            :label="item.payTypeName"
            :value="item.payTypeCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代理商费率(%)" prop="proxyRate">
        <el-input-number
          v-model="formData.proxyRate"
          :min="0"
          class="custom-input-number"
          placeholder="请输入代理商费率"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="商户费率(%)" prop="merchantRate">
        <el-input-number
          v-model="formData.merchantRate"
          :min="0"
          class="custom-input-number"
          placeholder="请输入商户费率"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="产品类型" required prop="apiMode">
        <el-radio-group v-model="formData.apiMode">
          <el-radio :label="0">单独</el-radio>
          <el-radio :label="1">轮询</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付通道" prop="dataList">
        <el-table ref="multipleTableRef" :data="tableData" border size="small">
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="id"
            label="通道ID"
            min-width="100"
            align="center"
          />
          <el-table-column
            prop="channelName"
            label="通道名称"
            min-width="100"
            align="center"
          />
          <el-table-column label="轮询权重(1-9)" width="120" align="center">
            <template #default="{ row }">
              <el-input-number
                class="custom-input-number"
                v-model="row.weight"
                :min="1"
                :max="9"
                :controls="false"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="状态" required prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        @click="onSubmit"
        :loading="loading.submit"
        :disabled="loading.detail"
        size="small"
        type="primary"
      >
        保存
      </el-button>
      <el-button @click="onClose" size="small">关闭</el-button>
    </template>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/views/components/CommonDialog.vue";
import apiPay from "@/api/pay";

export default {
  props: {
    visible: Boolean,
    id: [String, Number],
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      typeList: [],
      tableData: [],
      formData: {
        name: "",
        type: 0,
        payTypeCode: "",
        proxyRate: 0,
        merchantRate: 0,
        apiMode: 0,
        dataList: [],
        status: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入产品名称", trigger: "change" },
        ],
        payTypeCode: [
          {
            required: true,
            message: "请选择支付类型",
            trigger: "change",
          },
        ],
      },
      loading: {
        detail: false,
        submit: false,
      },
    };
  },
  created() {
    this.fetchTypeList();
    this.fetchTableData();
  },
  methods: {
    async onOpen() {
      if (this.id) {
        await this.fetchDetailData();
        this.setDefaultSelection();
      }
    },
    setDefaultSelection() {
      this.$nextTick(() => {
        this.tableData.forEach((item1) => {
          this.formData.dataList.forEach((item2) => {
            if (item1.id === item2.channelId) {
              this.$refs.multipleTableRef.toggleRowSelection(item1, true);
            }
          });
        });
      });
    },
    onClose() {
      this.$emit("update:visible", false);
    },
    onClosed() {
      this.$refs.multipleTableRef.clearSelection();
      this.$refs.formEl.resetFields();
    },
    async fetchDetailData() {
      this.loading.detail = true;
      const [, res] = await apiPay.payProductDetail(this.id);
      if (res && res.code == 0) {
        Object.keys(this.formData).forEach((key) => {
          this.formData[key] = res.data[key];
        });
      }
      this.loading.detail = false;
    },
    async fetchTypeList() {
      const [, res] = await apiPay.payTypeList({
        pageSize: 9999,
        pageNumber: 1,
        status: 0,
      });
      if (res && res.code == 0) {
        this.typeList = res.data.records || [];
      }
    },
    async fetchTableData() {
      const [, res] = await apiPay.payChannelList({
        pageSize: 9999,
        pageNumber: 1,
        status: 0,
      });
      if (res && res.code == 0) {
        const data = res.data.records || [];
        data.forEach((item) => (item.weight = 1));
        this.tableData = data;
        console.log(this.tableData);
      }
    },
    onSubmit() {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading.submit = true;
          const requestApi = this.id
            ? apiPay.payProductUpdate
            : apiPay.payProductAdd;
          const [, res] = await requestApi({
            ...this.formData,
            id: this.id,
            payTypeName:
              this.typeList.find(
                (item) => item.payTypeCode === this.formData.payTypeCode
              )?.payTypeName || "",
            dataList: this.$refs.multipleTableRef.selection.map((item) => {
              return {
                channelId: item.id,
                channelName: item.channelName,
                weight: item.weight,
              };
            }),
          });
          if (res && res.code == 0) {
            this.$emit("submit-success");
            this.onClose();
          }
        }
        this.loading.submit = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-input-number {
  width: 100%;
  ::v-deep .el-input__inner {
    text-align: left;
  }
}
</style>
