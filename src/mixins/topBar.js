import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["topBarTitle", "topMsgState"]),
  },
};
