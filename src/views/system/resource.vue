<template>
  <AppSction :head="false" class="mb-15">
    <template v-slot:cont>
      <div v-loading="loading" class="menus-config-page">
        <div class="muenus-head">
          <el-form
            @submit.native.prevent
            :inline="true"
            class="demo-form-inline"
          >
            <el-form-item>
              <el-input
                size="small"
                v-model.trim="filterText"
                placeholder="资源名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                plain
                icon="el-icon-plus"
                size="small"
                type="primary"
                v-if="hasPermi(perm.add)"
                @click.stop="edt({}, { pid: '0' }, 0)"
                >新增</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-row style="padding-left: 24px; margin-bottom: 16px">
            <el-col :span="6"
              ><div class="grid-content bg-purple">菜单</div></el-col
            >
            <el-col :span="1"
              ><div class="grid-content bg-purple">排序</div></el-col
            >
            <el-col :span="5"
              ><div class="grid-content bg-purple">请求地址</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">类型</div></el-col
            >
            <!-- <el-col :span="2"><div class="grid-content bg-purple">可见</div></el-col> -->
            <el-col :span="6"
              ><div class="grid-content bg-purple">权限标识</div></el-col
            >
            <el-col :span="4">
              <div class="grid-content bg-purple">操作</div>
            </el-col>
          </el-row>
          <el-tree
            ref="tree"
            :filter-node-method="filterNode"
            :data="menu"
            class="roles-tree"
            node-key="entId"
            :props="defaultProps"
          >
            <el-row slot-scope="{ node, data }" class="tree-el-row">
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  {{ data.entName || "--" }}
                </div></el-col
              >
              <el-col :span="1"
                ><div class="grid-content bg-purple">
                  {{ data.entSort }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ data.url || "--" }}
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  {{ typeFn(data.entType) }}
                </div></el-col
              >
              <!-- <el-col :span="2"><div class="grid-content bg-purple">{{ statusFn(data) }}</div></el-col> -->
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  {{ data.accreditName || "--" }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="edt(node, data, 0)"
                    v-if="hasPermi(perm.add)"
                  >
                    新增
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="hasPermi(perm.update)"
                    @click.stop="edt(node, data, 2)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="hasPermi(perm.delete)"
                    @click.stop="remove(node, data)"
                  >
                    删除
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-tree>
        </div>
      </div>
      <ResourceAdd
        ref="ResourceAdd"
        :topMenu="topMenu"
        @addSuccess="addSuccess"
      />
      <UsersView ref="UsersView" />
      <UsersRoles ref="UsersRoles" />
    </template>
  </AppSction>
</template>
<script>
import { mapActions } from "vuex";
import ResourceAdd from "@/views/system/components/ResourceAdd.vue";
import UsersView from "@/views/system/components/UsersView.vue";
import UsersRoles from "@/views/system/components/UsersRoles.vue";
import apiUser from "@/api/user";
export default {
  name: "SystemUsers",
  components: { ResourceAdd, UsersView, UsersRoles },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      filterText: "",
      menu: [],
      defaultProps: {
        children: "childList",
        label: "entName",
        value: "entId",
      },
    };
  },
  methods: {
    ...mapActions("user", ["getUserPermission", "getPermissionTree"]),
    typeFn(text) {
      switch (text) {
        case 0:
          return "目录";
        case "ML":
          return "菜单";
        case "PB":
          return "按钮";
        default:
          return "--";
      }
    },
    edt(node, d, type) {
      const data = JSON.parse(JSON.stringify(d));
      this.$refs.ResourceAdd.show(data, type);
    },
    remove(node, data) {
      console.log(data);
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const [error] = await apiUser.sysEntsDel(data.entId);
          if (error) return;
          this.$message.success("删除成功");
          this.sysEntsList();
        })
        .catch(() => {});
    },
    addSuccess() {
      this.sysEntsList();
      Promise.all([this.getUserPermission(), this.getPermissionTree()]);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.entName.indexOf(value) !== -1;
    },
    async sysEntsList() {
      this.loading = true;
      const [error, res] = await apiUser.sysEntsList({ sysType: "MGR" });
      this.loading = false;
      if (error) return;
      this.menu = res.data;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    topMenu() {
      return [
        {
          entName: "顶级菜单",
          entId: "0",
          pid: "-1",
          childList: this.menu,
        },
      ];
    },
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "菜单管理");
    this.sysEntsList();
  },
};
</script>
<style lang="scss">
.menus-config-page {
  i {
    font-style: normal;
  }
  ul,
  li {
    list-style: none;
  }
  .muenus-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-tree-node__content {
    height: 60px;
    border-bottom: 1px solid rgb(220, 223, 230);
    display: flex;
    // padding-left:0 !important;
    .tree-el-row {
      flex: 1;
    }
  }
}
</style>
