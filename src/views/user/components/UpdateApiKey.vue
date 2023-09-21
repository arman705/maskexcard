<template>
  <VerificationCode @updateCode="updateCode" ref="VerificationCode" />
</template>

<script>
import apiUser from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "UpdateApiKey",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    async updateCode(code) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const [error] = await apiUser.updateKey({ code });
      loading.close();
      if (error) {
        this.$refs.VerificationCode.resCode();
        if (error.code === 9991) {
          this.$message.error(error.msg);
        }
        return;
      }
      this.$message({
        message: "修改成功",
        type: "success",
      });
      this.close();
      this.$emit("updateKey");
    },
    close() {
      this.$refs.VerificationCode.close();
    },
    show() {
      this.$refs.VerificationCode.show();
    },
  },
};
</script>
<style scoped lang="less"></style>
