<template>
  <AppSction :head="false" class="mb-15">
    <template v-slot:cont>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            size="small"
            v-model.trim="msgTitle"
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
        <!-- roleId 角色ID  roleName 名称 roleName 创建时间 createdAt -->
        <el-table :data="mchInfoList.records" stripe style="width: 100%">
          <el-table-column prop="msgId" label="ID"> </el-table-column>
          <el-table-column prop="msgTitle" label="消息标题"> </el-table-column>
          <el-table-column prop="state" label="状态"> </el-table-column>
          <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="InformationView(scope.row)"
                v-if="hasPermi(perm.query)"
                plain
                >查看</el-button
              >
              <el-button
                size="small"
                type="primary"
                v-if="hasPermi(perm.update)"
                @click="$refs.UsersAdd.show(scope.row, 2)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                v-if="hasPermi(perm.delete)"
                @click="deleteFn(scope.row.msgId)"
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
      <InformationView ref="InformationView" />
    </template>
  </AppSction>
</template>
<script>
import RolesAdd from "@/views/system/components/InformationAdd.vue";
import InformationView from "@/views/system/components/InformationView.vue";
import apiUser from "@/api/user";

export default {
  name: "InformationList",
  components: { RolesAdd, InformationView },
  data() {
    return {
      dialogVisible: false,
      mchInfoList: {
        records: [],
        current: 1,
        total: 0,
      },
      msgTitle: "",
      formInline: {
        pageNumber: 1,
        roleName: "",
        total: 0,
        pageSize: 24,
      },
    };
  },
  methods: {
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
    InformationView(row) {
      this.$refs.InformationView.show(row);
    },
    async getList(p) {
      const [error, res] = await apiUser.sysMsgList({
        ...this.formInline,
        pageNumber: p || this.formInline.pageNumber,
        msgTitle: this.msgTitle,
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
          const [error] = await apiUser.ssysMsgDelete(id);
          loading.close();
          if (error) return;
          this.getList(1);
        })
        .catch(() => {});
    },
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "消息管理");
    this.getList();
  },
};
</script>
<style lang="less" scoped></style>
