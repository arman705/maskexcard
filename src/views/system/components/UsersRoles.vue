<template>
  <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%">
    <el-form v-loading="loading" class="demo-ruleForm">
      <el-form-item>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="city in cities"
            :label="city.roleId"
            :key="city.roleId"
            >{{ city.roleName }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserRole()">提交</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import apiUser from "@/api/user";
export default {
  name: "UsersRoles",
  data() {
    return {
      dialogVisible: false,
      loading: false,
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      row: {},
    };
  },
  methods: {
    async show(row = {}) {
      this.loading = true;
      this.dialogVisible = true;
      const [, result] = await apiUser.queryUserRole({
        userId: row.sysUserId,
      });
      this.checkedCities = result.data
        .filter((v) => v.isSelected)
        .map((v) => v.roleId);
      this.loading = false;
      this.cities = result.data;
      this.row = row;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities.map((v) => v.roleId) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    async saveUserRole() {
      this.loading = true;
      const [error] = await apiUser.saveUserRole({
        roleIdList: this.checkedCities,
        userId: this.row.sysUserId,
      });
      this.loading = false;
      if (error) return;
      this.$message.success("操作成功");
      this.dialogVisible = false;
      this.$emit("addSuccess");
    },
  },
};
</script>
<style scoped lang="less">
@import "@/assets/style/mixins/ellipsis.less";
.msg-yips {
  max-width: 412px;
  height: 29px;
  padding: 0 16px;
  border-radius: 29px;
  border: 1px solid #00bda1;
  color: @primary;
  line-height: 1;
  .ellipsis();
  .el-icon-chat-line-round {
    font-size: 24px;
    margin-right: 8px;
  }
}
</style>
