<template>
  <AppSction :head="false" class="mb-15">
    <template v-slot:cont>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            size="small"
            v-model.trim="formInline.roleName"
            placeholder="角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            plain
            icon="el-icon-plus"
            size="small"
            type="primary"
            v-if="hasPermi(perm.add)"
            @click="$refs.UsersAdd.show({}, 0)"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <div class="mb-15">
        <!-- roleId 角色ID  roleName 名称 roleName 创建时间 createAt -->
        <el-table :data="mchInfoList.records" stripe style="width: 100%">
          <el-table-column prop="roleId" label="角色ID"> </el-table-column>
          <el-table-column prop="roleName" label="用户名称"> </el-table-column>
          <el-table-column prop="createAt" label="创建时间"> </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="addPermissions(scope.row)"
                plain
                v-if="hasPermi(perm.assignPerm)"
                >分配权限</el-button
              >
              <el-button
                size="small"
                type="primary"
                @click="$refs.UsersAdd.show(scope.row, 2)"
                v-if="hasPermi(perm.update)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                v-if="hasPermi(perm.delete)"
                @click="deleteFn(scope.row.roleId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="center-center">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="formInline.pageNumber"
          :page-size="formInline.pageSize"
          background
          layout="prev, pager, next"
          :total="formInline.total"
        />
      </div>
      <RolesAdd ref="UsersAdd" @addSuccess="addSuccess" />
      <RolesPermissions @addSuccess="roleSuccess" ref="RolesPermissions" />
    </template>
  </AppSction>
</template>
<script>
import RolesAdd from "@/views/system/components/RolesAdd.vue";
import RolesPermissions from "@/views/system/components/RolesPermissions.vue";
import apiUser from "@/api/user";
import { mapActions } from "vuex";
export default {
  name: "SystemRoles",
  components: { RolesAdd, RolesPermissions },
  data() {
    return {
      dialogVisible: false,
      mchInfoList: {
        records: [],
        current: 1,
        total: 0,
      },
      formInline: {
        pageNumber: 1,
        roleName: "",
        total: 0,
        pageSize: 24,
      },
    };
  },
  methods: {
    ...mapActions("user", ["getUserPermission", "getPermissionTree"]),
    roleSuccess() {
      Promise.all([this.getUserPermission(), this.getPermissionTree()]);
    },
    handleCurrentChange(val) {
      this.formInline.pageNumber = val;
      this.getList();
    },
    onSubmit() {
      this.getList(1);
    },
    addSuccess() {
      this.getList(1);
    },
    addPermissions(row) {
      this.$refs.RolesPermissions.show(row);
    },
    async getList(p) {
      const [error, res] = await apiUser.sysRolesList({
        ...this.formInline,
        pageNumber: p || this.formInline.pageNumber,
      });
      if (error) return;
      const result = res.data;
      this.mchInfoList = result;
      this.formInline.pageNumber = +result.current;
      this.formInline.total = +result.total;
    },
    deleteFn(id) {
      this.$confirm("确定删除吗?", "提示信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          const [error] = await apiUser.sysRolesDelete(id);
          loading.close();
          if (error) return;
          this.getList(1);
        })
        .catch(() => {});
    },
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "角色管理");
    this.getList();
  },
};
</script>
<style lang="less" scoped></style>
