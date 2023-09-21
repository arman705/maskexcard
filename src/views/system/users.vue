<template>
  <AppSction :head="false" class="mb-15">
    <template v-slot:cont>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            size="small"
            v-model="formInline.sysUserId"
            placeholder="用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            size="small"
            v-model="formInline.loginUsername"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            size="small"
            v-model="formInline.status"
            placeholder="状态"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
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
            @click="$refs.UsersAdd.show({}, 0)"
            v-if="hasPermi(perm.add)"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <div class="mb-15">
        <el-table :data="mchInfoList.records" stripe style="width: 100%">
          <el-table-column prop="sysUserId" label="用户ID"> </el-table-column>
          <el-table-column prop="loginUsername" label="用户名">
          </el-table-column>
          <el-table-column label="是否为超级管理员">
            <template slot-scope="scope">
              <div class="align-center">
                {{ scope.row.isAdmin ? "是" : "否" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="realname" label="用户昵称"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div class="align-center">
                {{ scope.row.state ? "启用" : "停用" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                v-if="hasPermi(perm.query)"
                plain
                @click="goEdt(scope.row)"
                >查看</el-button
              >
              <el-button
                size="small"
                type="primary"
                v-if="hasPermi(perm.assignPerm)"
                @click="$refs.UsersRoles.show(scope.row)"
                plain
                >分配角色</el-button
              >
              <el-button
                size="small"
                type="primary"
                @click="goEdt(scope.row, 2)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                v-if="hasPermi(perm.delete)"
                @click="deleteFn(scope.row.sysUserId)"
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
      <UsersAdd ref="UsersAdd" @addSuccess="addSuccess" />
      <UsersView ref="UsersView" />
      <UsersRoles @addSuccess="roleSuccess" ref="UsersRoles" />
    </template>
  </AppSction>
</template>
<script>
import UsersAdd from "@/views/system/components/UsersAdd.vue";
import UsersView from "@/views/system/components/UsersView.vue";
import UsersRoles from "@/views/system/components/UsersRoles.vue";
import { mapActions } from "vuex";
import apiUser from "@/api/user";
export default {
  name: "SystemUsers",
  components: { UsersAdd, UsersView, UsersRoles },
  data() {
    return {
      dialogVisible: false,
      mchInfoList: {
        records: [],
        current: 1,
        total: 0,
      },
      formInline: {
        loginUsername: "",
        pageNumber: 1,
        status: "",
        sysUserId: "",
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
    async goEdt(row, type = 1) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const [error, res] = await apiUser.sysUsersDetail(row.sysUserId);
      if (error) {
        loading.close();
        return;
      }
      loading.close();
      if (type === 1) {
        this.$refs.UsersView.show(res.data, 1);
        return;
      }
      this.$refs.UsersAdd.show(res.data, type);
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
    async getList(p) {
      const [error, res] = await apiUser.sysUsersList({
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
          const [error] = await apiUser.sysUsersDel(id);
          loading.close();
          if (error) return;
          this.getList(1);
        })
        .catch(() => {});
    },
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "用户管理");
    this.getList();
  },
};
</script>
<style lang="less" scoped></style>
