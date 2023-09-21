<template>
  <div class="main-content">
    <div class="headbox">
      <el-input placeholder="代理商ID" v-model="formData.id"></el-input>
      <el-select v-model="formData.status" placeholder="业务类型">
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
        <el-table-column prop="date" label="代理商ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="代理商名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="分润金额"> </el-table-column>
        <el-table-column prop="address" label="金额"> </el-table-column>
        <el-table-column prop="address" label="笔数"> </el-table-column>
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
    this.$store.commit("CHANGE_PAGE_TITLE", "代理商分润排行");
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
  width: 150px;
  margin-right: 10px;
}
/deep/.el-range-editor.el-input__inner {
  width: 400px;
}
.order-list {
  background: #f4f5f7;
  padding: 15px;
  margin: 10px 0;
  font-size: 14px;
  display: flex;
  .order-item {
    color: #606060;
    margin-right: 30px;
    display: inline-block;
  }
}
</style>
