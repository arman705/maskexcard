// 权限计算
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["permissionAll", "paramsKey"]),
    loginUser() {
      return this.$store.state.user.user;
    },
    perm() {
      const fix = `${this.$route.path
        .replace(/\//gi, ":")
        .replace(/^:/gi, "")}:`;
      const Obj = {};
      this.paramsKey.forEach((v) => {
        Obj[`${v}`] = `${fix}${v}`;
      });
      return Obj;
    },
  },
  methods: {
    hasPermi(p) {
      return this.loginUser.isAdmin === 1 || this.permissionAll.has(p);
    },
  },
};
