<template>
  <el-dialog
    title="充值"
    :visible.sync="loaddialog"
    @close="clearData"
    width="580px"
  >
    <div v-if="task === 0">
      <div class="create-box">
        <div class="create-left">VCC卡号</div>
        <div class="create-right">
          <img
            style="width: 18px; margin-right: 5px"
            src="@/assets/img/mastercard.png"
          />
          <span>{{ cards.vccCardNo }}</span>
        </div>
      </div>
      <div class="create-box" style="margin-bottom: 10px">
        <div class="create-left">数量</div>
        <div class="create-right">
          <div>1</div>
        </div>
      </div>
      <div class="create-box" style="margin-bottom: 10px">
        <div class="create-left">充值金额</div>
        <div class="create-right">
          <el-input
            v-model="amount"
            oninput="value=value.replace(/^0|[^0-9]/g, '')"
          >
            <template slot="append">{{ cards.vccCardCurrency }}</template>
          </el-input>
        </div>
      </div>
      <!--      <div class="create-box" style="margin-bottom: 10px">-->
      <!--        <div class="create-left">备注</div>-->
      <!--        <div class="create-right">-->
      <!--          <el-input v-model="remark" placeholder="备注(可选)"></el-input>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="dialog-footer">
        <el-button type="primary" @click="nextStep()">下一步</el-button>
      </div>
    </div>

    <div v-if="task === 1" class="second-step">
      <div class="create-box" style="margin-bottom: 0">
        <div class="create-left center float-nomargin">请往以下地址充值</div>
        <div class="create-right">
          <div style="line-height: 25px">
            <div style="color: #000">
              <span style="font-size: 20px">{{ linkAddress.amount }} </span>
              <span style="font-size: 14px">{{ linkAddress.unit }} </span>
            </div>
            <div class="fees">
              <span>手续费：{{ linkAddress.fee }}</span>
              <span class="unit">{{ linkAddress.unit }} </span>
              <span class="blue">({{ linkAddress.payFeeRate }}%)</span>
            </div>
            <div class="fees">
              <span>实际到账{{ linkAddress.actualAmount }}</span>
              <span class="unit">{{ linkAddress.unit }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="create-box" style="margin-bottom: 0; margin-top: 20px">
        <div class="create-left center" contenteditable="false">
          充值地址（TRC20）
        </div>
        <div class="create-right">
          <div class="flex">
            <el-input
              v-model="linkAddress.addr"
              contenteditable="false"
            ></el-input>
            <img
              @click="copy"
              class="copy-button"
              style="width: 20px; margin-left: 10px"
              src="@/assets/img/copy.svg"
            />
          </div>
        </div>
      </div>
      <div class="create-box">
        <div class="create-left center"></div>
      </div>
      <div class="create-box">
        <div class="create-left center float-nomargin">充值二维码(TRC20)</div>
        <div class="create-right">
          <div class="flex">
            <QrcodeVue :value="linkAddress.addr" :size="131" />
          </div>
        </div>
      </div>
      <div class="create-box">
        <div class="create-left center"></div>
        <div class="create-right">
          <el-button @click="clearData" class="basis-btn">已完成充值</el-button>
          <div class="red" style="margin-top: 10px">*充值完成后请点击</div>
        </div>
      </div>
    </div>
    <div v-if="task === 2" class="second-step">
      <div class="position-center">
        <el-icon
          class="el-icon-circle-check success"
          style="font-size: 72px"
        ></el-icon>
        <div style="margin-top: 10px">已成功提交</div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="loaddialog = false">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import instance from "@/plugins/blob";
import api from "@/api/card";
import FileSaver from "file-saver";
import app from "@/main";
import QrcodeVue from "qrcode.vue";
import ClipboardJS from "clipboard";
export default {
  components: {
    QrcodeVue,
  },
  props: {
    dialogShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    cards: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vcc: "", // 在这里定义 VCC
      bin: "",
      label: "",
      flow: "",
      task: 0,
      taskTag: "",
      tags: "",
      year: 2,
      creditdialog: false,
      loading: false,
      linkAddress: "",
      remark: "",
      vcccard: "",
      loadamount: "",
      status: "",
      status2: "",
      pageSize: 10,
      pageNum: 1,
      start: "",
      topInfo: {},
      end: "",
      timerId: null, // 存储定时器 ID
      type: "",
      dialogVisible: false,
      radio: "0",
      amount: "",
      activeName: "0",
      date: "",
      checked: false,
      loaddialog: this.dialogShow,
      dict: [],
      tableData: [],
    };
  },
  watch: {
    dialogShow() {
      this.loaddialog = true;
    },
  },
  methods: {
    nextStep() {
      this.creditdialog = true;
      this.getLoad();
    },
    toDetail(cctId) {
      this.$router.push({
        name: "cardDetail",
        query: { cctId },
      });
    },
    handlePageChange(newPage) {
      this.pageNum = newPage;
      this.getList();
    },
    copy() {
      const clipboard = new ClipboardJS(".copy-button", {
        text: () => this.linkAddress.addr,
      });
      clipboard.on("success", () => {
        app.$message({
          message: "复制成功！",
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        app.$message({
          message: "复制失败，请手动复制。",
          type: "error",
        });
        clipboard.destroy();
      });
    },
    async getQr(e) {
      console.log("eee=>", e);
      if (!this.amount && e == 1) {
        app.$message.error("请输入金额");
        return;
      }
      const data = {
        amount: e === 2 ? "15" : this.amount,
        vccTag: this.taskTag,
        cctOrg: this.type,
        vccNo: this.bin,
        cctValidYear: e === 2 ? this.year : "",
        type: e,
        remark: this.remark,
        vccId: e == 2 ? "" : this.cards.vccId,
        toAddress: this.linkAddress.addr,
      };
      const res = await api.getAddress(data);
      this.loading = false;
      this.linkAddress = res[1].data;
      this.task = 1;
      this.getDetail(this.linkAddress.ccrId);
      console.log("see=>", this.linkAddress);
    },
    async getLoad() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const data = {
          amount: this.amount,
          type: 1,
          remark: this.remark,
          vccId: this.cards.vccId,
        };
        const res = await api.payCard(data);
        this.linkAddress = res[1].data;
        this.loading = false;
        this.task = 2;
        console.log("see=>", this.linkAddress);
      } catch (error) {
        this.loaddialog = false;
        this.$emit("windowClose", false);
        // 进行异常处理，比如提示用户请求出错或者显示错误信息等
      } finally {
        this.loading = false;
      }
    },
    async createQr() {
      //开卡
      const data = {
        vccTag: this.taskTag,
        cctOrg: this.type,
        remark: this.remark,
        cctValidYear: this.year,
      };
      const res = await api.createCard(data);
      this.loading = false;
      this.linkAddress = res[1].data;
      this.task = 2;
      this.getDetail(this.linkAddress.ccrId);
      console.log("see=>", this.linkAddress);
    },

    async creditNext() {
      //信用账户充值下一步
      if (this.amount < 500) {
        app.$message.error("最小充值金额为500");
        return;
      }
      const data = {
        amount: this.amount,
        type: 1,
        remark: this.remark,
      };
      const res = await api.getAddress(data);
      this.task = 1;
      this.creditdialog = true;
      this.loading = false;
      this.linkAddress = res[1].data;
      this.task = 1;
      this.getDetail(this.linkAddress.ccrId);
      console.log("see=>", this.linkAddress);
    },
    confirmation() {
      console.log("123");
    },
    clearTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    },
    async getDetail(e) {
      this.clearTimer();

      const requestDetail = async () => {
        try {
          const res = await api.rechargeDetail(e);

          if (res[1].code == 0) {
            this.task = 2;
            this.loading = false;
          } else {
            this.timerId = setTimeout(requestDetail, 5000);
          }
        } catch (error) {
          this.timerId = setTimeout(requestDetail, 5000);
        }
      };

      requestDetail();
    },
    clearData() {
      this.task = 0;
      this.tags = "";
      this.taskTag = "";
      this.pageNum = 1;
      this.status2 = "";
      this.amount = "";
      this.start = "";
      this.remark = "";
      this.end = "";
      this.vcc = "";
      this.status = "";
      this.type = "";
      this.creditdialog = false;
      this.dialogVisible = false;
      this.loaddialog = false;
      if (this.timerId) {
        clearTimeout(this.timerId); // 在页面销毁前取消定时器
      }
    },
    createCard() {
      this.dialogVisible = true;
    },
    async getTop() {
      const res = await api.cardInfo();
      this.loading = false;
      this.topInfo = res[1].data;
    },
    async getDict() {
      const res = await api.carddictList();
      this.loading = false;
      this.dict = res[1].data;
    },
    async opreation(a1, a2) {
      if (a1.vccUseStatus == 2 || a1.vccUseStatus == 3) {
        const operation = a2 == 4 ? "注销" : "锁定";
        const confirmed = await this.$confirm(
          a1.vccUseStatus === 3 && a2 == 3
            ? "确认将解锁该卡片吗?"
            : "确认将" + operation + "该卡片吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch(() => false);
        if (!confirmed) {
          return;
        }
        try {
          const res = await (a1.vccUseStatus === 3 && a2 == 3
            ? api.cardUnlock(a1.vccId)
            : api.cardOpreate(a1.vccId, a2));
          this.loading = false;
          if (res[1].code == 0) {
            app.$message.success(res[1].data);
          }
          this.getList();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async getList(e) {
      const data = {
        vccStatus: this.status,
        vccTag: this.tags,
        bin: this.bin,
        vccCardNo: this.vcc,
        vccCardBalanceStart: this.start,
        vccCardBalanceEnd: this.end,
        vccCardOrg: this.type,
        pageSize: this.pageSize,
        pageNumber: this.pageNum,
      };
      if (e && e === 2) {
        instance
          .get("/card/export", {
            responseType: "blob", // 修改 responseType 为 "blob"
            params: data,
          })
          .then((res) => {
            const timestamp = new Date().getTime().toString();
            // 将数据转换为 Blob 对象
            const blob = new Blob([res.data], {
              type: "text/csv;charset=utf-8;",
            });
            // 使用 FileSaver.js 库将 Blob 对象保存为文件并下载到本地
            FileSaver.saveAs(blob, `csv_${timestamp}.csv`);
          })
          .catch((error) => {
            console.error("文件下载失败，错误信息为:", error.message);
          });
      } else {
        const res = await api.cardList(data);
        this.loading = false;
        this.tableData = res[1].data;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../common.less");
</style>
