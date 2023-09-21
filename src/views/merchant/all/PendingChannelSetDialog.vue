<template>
  <CommonDialog
    width="500px"
    title="代付通道配置"
    :visible="visible"
    :close-on-click-modal="false"
    @close="onClose"
  >
    <el-form size="small" label-position="left" label-width="120px">
      <el-form-item label="待付通道">
        <el-select style="width: 100%" placeholder="请选择待付通道">
          <el-option label="label" value="value" />
          <el-option label="label" value="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="通道子账户">
        <el-input placeholder="请输入通道子账户" />
      </el-form-item>
      <el-form-item label="代理商费率">未设置</el-form-item>
      <el-form-item label="代付单笔限额(元)">
        <el-input />
      </el-form-item>
      <el-form-item label="代付手续费(元)">
        <el-input />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group>
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认">
        <el-radio-group>
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onSave" size="small" type="primary">保存</el-button>
      <el-button @click="onClose" size="small">关闭</el-button>
    </template>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/views/components/CommonDialog.vue";

export default {
  props: {
    visible: Boolean,
  },
  components: {
    CommonDialog,
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    onSave() {},
  },
};
</script>
