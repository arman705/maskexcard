<template>
  <VerificationCode @updateCode="updateCode" ref="VerificationCode" />
</template>

<script>
import apiUser from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "GetApiKey",
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
      const [error, res] = await apiUser.geyApiKey({ code });
      loading.close();
      if (error) {
        this.$refs.VerificationCode.resCode();
        if (error.code === 9991) {
          this.$message.error(error.msg);
        }
        return;
      }
      this.close();
      this.$emit("geyApiKey", res.data);
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
