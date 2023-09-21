<template>
  <div class="main-content">
    <div class="headbox">
      <el-input placeholder="结算商ID" v-model="formData.id"></el-input>
      <el-input placeholder="账户名" v-model="formData.username"></el-input>
      <el-input placeholder="结算单号" v-model="formData.num"></el-input>
      <el-select v-model="formData.status" placeholder="状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="formData.date"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      <el-button style="margin-left: auto" type="primary">查询</el-button>
    </div>
    <div class="contentbox">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="结算单号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="结算商类型" width="180">
        </el-table-column>
        <el-table-column prop="address" label="结算商ID"> </el-table-column>
        <el-table-column prop="address" label="账户名"> </el-table-column>
        <el-table-column prop="address" label="手续费"> </el-table-column>
        <el-table-column prop="address" label="打款金额"> </el-table-column>
        <el-table-column prop="address" label="结算状态"> </el-table-column>
        <el-table-column prop="address" label="结算金额"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
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
    this.$store.commit("CHANGE_PAGE_TITLE", "结算记录");
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
