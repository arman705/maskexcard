<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button type="primary">+新增代付通道</el-button>
    </div>
    <div class="main-content">
      <div class="contentbox">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="通道ID" width="180">
          </el-table-column>
          <el-table-column prop="name" label="通道名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="接口代码"> </el-table-column>
          <el-table-column prop="address" label="接口名称"> </el-table-column>
          <el-table-column prop="address" label="接口类型代码">
          </el-table-column>
          <el-table-column prop="address" label="接口类型名称">
          </el-table-column>
          <el-table-column prop="address" label="手续费"> </el-table-column>
          <el-table-column prop="address" label="通道状态"> </el-table-column>
          <el-table-column prop="address" label="操作"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "settlementReview",
  components: {},
  data() {
    return {
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "等待审核",
          label: "等待审核",
        },
      ],
      tableData: [],
      formData: {
        id: "",
        username: "",
        num: "",
        status: "",
        date: "",
      },
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "代付通道");
  },
};
</script>
<style lang="less" scoped>
.main-content {
  background: #fff;
  padding: 15px;
  border-radius: 6px;
}
.headbox {
  display: flex;
}
.el-input {
  display: inline-block;
  width: 150px;
  margin-right: 10px;
}
.el-date-picker {
  width: 300px;
}
.el-select {
  width: 100px;
  margin-right: 10px;
}
/deep/.el-range-editor.el-input__inner {
  width: 400px;
}
</style>
