<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" class="common-dialog">
    <template v-for="name in Object.keys($slots)" v-slot:[name]>
      <slot :name="name"></slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.common-dialog {
  ::v-deep {
    .el-dialog {
      padding: 0 30px;
    }
    .el-dialog__header {
      padding: 20px 4px 10px 4px;
      border-bottom: 1px solid #f1f1f1;
    }
    .el-dialog__headerbtn {
      right: 30px;
    }
    .el-dialog__title {
      font-size: 14px;
      color: #15192a;
    }
    .el-dialog__body {
      padding: 14px 0 0 0;
    }
    .el-dialog__footer {
      padding: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
