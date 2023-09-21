<template>
  <el-dialog
    :close-on-click-modal="false"
    :fullscreen="true"
    v-loading="loading"
    :title="text"
    :visible.sync="dialogVisible"
    width="96%"
  >
    <div class="roles-edt-page">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        :data="menu"
        show-checkbox
        class="roles-tree"
        node-key="entId"
        :default-expanded-keys="allId"
        :default-checked-keys="checkId"
        :props="defaultProps"
        :check-strictly="true"
        @check="clickDeal"
      />
    </div>
  </el-dialog>
</template>

<script>
import apiUser from "@/api/user";
export default {
  name: "ManagerRoleEdt",
  data() {
    return {
      dialogVisible: false,
      loading: false,
      menu: [],
      defaultProps: {
        children: "childList",
        label: "entName",
      },
      checkId: [],
      user: {},
    };
  },
  computed: {
    allId() {
      return this.lookForAllId(this.menu);
    },
    text() {
      return `权限管理-${this.user.name}/${this.user.userId}`;
    },
  },

  methods: {
    async show(user) {
      this.user = { userId: user.roleId, name: user.roleName };
      this.loading = true;
      this.dialogVisible = true;
      await this.getMenuTree();
      this.loading = false;
    },
    goBack() {},
    async getMenuTree() {
      const [, res] = await apiUser.queryRoleEnt({ roleId: this.user.userId });
      this.menu = res.data;
      this.checkId = this.lookForCheckId(this.menu);
    },
    lookForAllId(data = [], arr = []) {
      for (const item of data) {
        arr.push(item.entId);
        if (item.childList && item.childList.length)
          this.lookForAllId(item.childList, arr);
      }
      return arr;
    },
    lookForCheckId(data = [], arr = []) {
      for (const item of data) {
        if (item.isSelected) {
          arr.push(item.entId);
        }
        if (item.childList && item.childList.length)
          this.lookForCheckId(item.childList, arr);
      }
      return arr;
    },
    lookForParentId(data = [], arr = []) {
      for (const item of data) {
        if (item.isSelected) {
          arr.push(item.entId);
        }
        if (item.childList && item.childList.length)
          this.lookForCheckId(item.childList, arr);
      }
      return arr;
    },
    getParentId(list, id) {
      for (const i in list) {
        if (list[i].id === id) {
          return [list[i]];
        }
        if (list[i].children) {
          const node = this.getParentId(list[i].children, id);
          if (node !== undefined) {
            return node.concat(list[i]);
          }
        }
      }
    },
    checkChange(a, b) {
      // 如果为取消
      if (b === false) {
        // 如果当前节点有子集
        if (a.children) {
          // 循环子集将他们的选中取消
          a.children.map((item) => {
            this.$refs.tree.setChecked(item.id, false);
          });
        }
      } else {
        // if (a.children) {
        // // 循环子集将他们的选中取消
        //   a.children.map(item => {
        //     this.$refs.tree.setChecked(item.id, true)
        //   })
        // }
        if (parseInt(a.parentId) !== 0) {
          // 如果不为空则将其选中
          this.$refs.tree.setChecked(a.parentId, true);
        }
      }
    },
    clickDeal(currentObj, treeStatus) {
      this.clickCheck(currentObj, treeStatus, this.$refs.tree);
    },

    /**
     * 树形菜单复选框父子节点不关联实现父子节点联动回显
     *
     * @see selectedParent - 处理父节点为选中
     * @see uniteChildSame - 处理子节点为相同的勾选状态
     * @see removeParent   - 子节点全没选中取消父级的选中状态
     *
     * @param {Object} currentObj - 当前勾选节点的对象
     * @param {Object} treeStatus - 树目前的选中状态对象
     * @param {Object} ref - this.$refs.xxx
     **/
    clickCheck(currentObj, treeStatus, ref) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      const selected = treeStatus.checkedKeys.indexOf(currentObj.entId); // -1未选中
      console.log(currentObj);
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj, ref);
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true, ref);
      } else {
        // 取消子节点的选中状态触发
        if (currentObj.pid !== -1) {
          // this.removeParent(currentObj, ref);
        }

        // 未选中 处理子节点全部未选中
        if (currentObj.childList && currentObj.childList.length !== 0) {
          this.uniteChildSame(currentObj, false, ref);
        }
      }
    },

    /**   统一处理子节点为相同的勾选状态  **/
    uniteChildSame(treeList, isSelected, ref) {
      const treeListData = treeList.childList || [];
      const len = treeListData.length;

      ref.setChecked(treeList.entId, isSelected);

      for (let i = 0; i < len; i++) {
        this.uniteChildSame(treeListData[i], isSelected, ref);
      }
    },

    /**    统一处理父节点为选中    **/
    selectedParent(currentObj, ref) {
      const currentNode = ref.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        ref.setChecked(currentNode.parent, true);
        return this.selectedParent(currentNode.parent, ref);
      }
    },
    async onSubmit() {
      this.loading = true;
      const [error] = await apiUser.sysRolesDist({
        roleId: this.user.userId,
        entIdList: this.$refs.tree.getCheckedKeys(),
      });
      this.loading = false;
      if (error) return;
      this.dialogVisible = false;
      this.$message.success("操作成功");
      this.$emit("addSuccess");
    },
  },
};
</script>
<style lang="scss">
.roles-edt-page {
  .roles-tree {
    & > [role="treeitem"] {
      margin-bottom: 16px;
      & > [role="group"] {
        display: flex;
        border: 1px solid #dcdfe6;
        border-top-color: transparent;
        padding-top: 8px;
        flex-wrap: wrap;
      }
      & > .el-tree-node__content {
        height: 40px;
        border: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
