<template>
  <div class="main-content">
    <el-form ref="form" :rules="rules" :model="form" label-width="180px">
      <el-form-item label="提现开关">
        <el-radio-group v-model="form.switch">
          <el-radio label="开启"></el-radio>
          <el-radio label="关闭"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="允许星期几提现">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="星期一" name="type"></el-checkbox>
          <el-checkbox label="星期二" name="type"></el-checkbox>
          <el-checkbox label="星期三" name="type"></el-checkbox>
          <el-checkbox label="星期四" name="type"></el-checkbox>
          <el-checkbox label="星期五" name="type"></el-checkbox>
          <el-checkbox label="星期六" name="type"></el-checkbox>
          <el-checkbox label="星期日" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="每日提现开始时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="每日提现结束时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="每日提现次数">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="每日提现最大金额（元）">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="单笔最大提现金额（元）">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="单笔最小提现金额（元）">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="结算手续费类型">
        <el-radio-group v-model="form.switch">
          <el-radio label="百分比收费"></el-radio>
          <el-radio label="固定收费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="结算手续费比例（%）">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="单笔手续费上限（元）">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="结算类型">
        <el-radio-group v-model="form.switch">
          <el-radio label="自动结算"></el-radio>
          <el-radio label="手动提现"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="结算方式">
        <el-radio-group v-model="form.switch">
          <el-radio label="D0到账"></el-radio>
          <el-radio label="D1到账"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "结算设置");
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.main-content {
  background: #fff;
  padding: 30px 40px;
  border-radius: 6px;
}
.el-input {
  width: 500px;
}
/deep/.el-form-item__label {
  text-align: left;
}
</style>
