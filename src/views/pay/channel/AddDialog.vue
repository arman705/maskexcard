<template>
  <CommonDialog
    width="500px"
    :title="data ? '编辑支付通道' : '新增支付通道'"
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
    >
      <el-form-item label="通道名称" prop="channelName">
        <el-input v-model="formData.channelName" placeholder="请输入通道名称" />
      </el-form-item>
      <el-form-item label="支付接口" prop="apiCode">
        <el-select
          v-model="formData.apiCode"
          placeholder="请选择支付接口"
          style="width: 100%"
        >
          <el-option
            v-for="item in apiList"
            :key="item.apiCode"
            :label="item.apiName"
            :value="item.apiCode"
          />
        </el-select>
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
      <el-form-item label="通道状态" required prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          :rows="4"
          v-model="formData.remark"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        @click="onSubmit"
        :loading="loading"
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
    data: Object,
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      apiList: [],
      typeList: [],
      formData: {
        channelName: "",
        apiCode: "",
        payTypeCode: "",
        status: 0,
        remark: "",
      },
      rules: {
        channelName: [
          { required: true, message: "请输入通道名称", trigger: "change" },
        ],
        apiCode: [
          { required: true, message: "请选择支付接口", trigger: "change" },
        ],
        payTypeCode: [
          { required: true, message: "请选择支付类型", trigger: "change" },
        ],
      },
      loading: false,
    };
  },
  created() {
    this.fetchApiList();
    this.fetchTypeList();
  },
  methods: {
    onOpen() {
      if (this.data) this.formData = { ...this.data };
    },
    onClose() {
      this.$emit("update:visible", false);
    },
    onClosed() {
      this.$refs.formEl.resetFields();
    },
    async fetchApiList() {
      const [, res] = await apiPay.payApiList({
        pageSize: 9999,
        pageNumber: 1,
      });
      if (res && res.code == 0) {
        this.apiList = res.data.records || [];
      }
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
    onSubmit() {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const requestApi = this.data
            ? apiPay.payChannelUpdate
            : apiPay.payChannelAdd;
          const [, res] = await requestApi({
            ...this.formData,
            apiName:
              this.apiList.find(
                (item) => item.apiCode === this.formData.apiCode
              )?.apiName || "",
            payTypeName:
              this.typeList.find(
                (item) => item.payTypeCode === this.formData.payTypeCode
              )?.payTypeName || "",
          });
          if (res && res.code == 0) {
            this.$emit("submit-success");
            this.onClose();
          }
        }
        this.loading = false;
      });
    },
  },
};
</script>
