<template>
  <el-dialog
    :title="title"
    class="g-dialog-component"
    :visible.sync="dialogCode"
    width="30%"
  >
    <p class="center-center view">打开您的Authenticator应用查看您的验证码。</p>
    <ul class="enter-code center-center" @click="focusFn">
      <li
        v-for="(item, idx) in codes"
        :key="idx"
        :class="{ 'code-after': !item.focus }"
      >
        <el-input
          class="js-txt-input"
          :ref="`codeinput${idx}`"
          @keyup.delete.native="del(idx)"
          v-model.trim="item.text"
        ></el-input>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
const initCode = () => {
  return [
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
  ];
};
export default {
  name: "VerificationCode",
  data() {
    return {
      emitCode: false,
      dialogCode: false,
      codes: initCode(),
    };
  },
  props: {
    title: {
      type: String,
      default: "请输入验证码",
    },
  },
  watch: {
    codes: {
      handler: function (val) {
        let idx, v, num;
        val.forEach((value, key) => {
          if (value.text) {
            idx = key;
            v = value.text;
          }
        });
        if (v) {
          num = parseInt(v);
          if (Number.isInteger(num) && `${v}`.length === 1) {
            this.codes[idx].text = `${num}`;
            if (this.codes[idx + 1]) {
              this.codes[idx + 1].ref.focus();
            }
          } else {
            this.codes[idx].text = "";
          }
          if (!this.codes[idx].text) return;
          const docs = this.codes.filter((item) => !item.text);
          if (docs.length === 0) {
            this.$emit(
              "updateCode",
              this.codes.map((item) => item.text).join("")
            );
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    del(idx) {
      if (this.codes[idx - 1] && this.codes[[idx - 1]].text) {
        this.codes[[idx - 1]].text = "";
        this.codes[idx - 1].ref.focus();
      }
    },
    focusFn() {
      let idx;
      this.codes.forEach((value, key) => {
        if (value.text) {
          idx = key;
        }
      });
      if (!this.codes[idx]) {
        this.codes[0].ref.focus();
        return;
      }
      if (this.codes[idx] && this.codes[idx + 1]) {
        this.codes[idx + 1].ref.focus();
      }
    },
    resCode() {
      this.codes = initCode();
      this.$nextTick(() => {
        for (let i = 0; i < this.codes.length; i++) {
          this.codes[i].ref = this.$refs[`codeinput${i}`][0].$refs.input;
          if (i === 0) {
            this.codes[i].ref.focus();
          }
        }
      });
    },
    show() {
      this.dialogCode = true;
      this.emitCode = false;
      this.resCode();
    },
    close() {
      this.dialogCode = false;
    },
  },
};
</script>
<style scoped lang="less">
.enter-code {
  margin-top: 20px;
  ::v-deep input {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    margin: 0 5px;
  }
}
.code-after {
  position: relative;
  &::before {
    content: "";
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 3;
  }
}
</style>
