<template>
  <div class="main-content">
    <div class="headbox">
      <el-input placeholder="商户ID" v-model="mchNo"></el-input>
      <el-select v-model="vccUseStatus" placeholder="状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-button style="margin-left: 5px" type="primary" @click="searchInput"
        >查询</el-button
      >
    </div>
    <el-dialog
      :visible.sync="loadDialog"
      @close="clearData"
      width="580px"
      title="充值"
    >
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
            <template slot="suffix">
              <div>USD</div>
            </template>
          </el-input>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="transactionRecord"
      @close="clearData"
      width="580px"
    >
      <div style="margin-bottom: 10px">
        交易记录：{{ detailInfo.vccCardNo }}
      </div>
      <el-table :data="detailData" style="width: 100%">
        <el-table-column prop="transTime" label="时间"> </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <div>
              <span
                :style="{
                  color: scope.row.orderAmount < 0 ? 'red' : 'black',
                }"
              >
                {{ scope.row.orderAmount }}
              </span>
              <span class="unit">USD</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="交易状态">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.status === 1" style="color: #00bda1"
                >交易成功</span
              >
              <span v-else style="color: #dc5971">交易失败</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="交易类型"> </el-table-column>
        <el-table-column prop="billDesc" label="账单名称"> </el-table-column>
      </el-table>
    </el-dialog>
    <div class="contentbox">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="VCC卡号">
          <template slot-scope="scope">
            <div
              style="color: #00bda1; cursor: pointer"
              @click="toDetail(scope.row)"
            >
              {{ scope.row.vccCardNo }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mchNo" label="商户ID"> </el-table-column>
        <el-table-column prop="companyName" label="商户名称"> </el-table-column>
        <el-table-column label="开卡状态">
          <template slot-scope="scope">
            <span v-if="scope.row.vccStatus === 1">待开卡</span>
            <span v-else-if="scope.row.vccStatus === 2" style="color: #efaa3f"
              >开卡中</span
            >
            <span v-else-if="scope.row.vccStatus === 3" style="color: #dc5971"
              >开卡失败</span
            >
            <span v-else-if="scope.row.vccStatus === 4">开卡成功</span>
            <span v-else-if="scope.row.vccStatus === 5" style="color: #3357d2"
              >网络异常</span
            >
          </template>
        </el-table-column>
        <el-table-column label="使用状态">
          <template slot-scope="scope">
            <span v-if="scope.row.vccUseStatus === 1">未开卡</span>
            <span
              v-else-if="scope.row.vccUseStatus === 2"
              style="color: #00bda1"
              >可用</span
            >
            <span
              v-else-if="scope.row.vccUseStatus === 3"
              style="color: #dc5971"
              >锁定</span
            >
            <span
              v-else-if="scope.row.vccUseStatus === 4"
              style="color: #efaa3f"
              >注销</span
            >
            <span
              v-else-if="scope.row.vccUseStatus === 5"
              style="color: #3357d2"
              >失效</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="vccCardBalance" label="余额"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <div style="text-align: right">
              <el-button
                size="small"
                type="primary"
                @click="lockCard(scope.row.vccId)"
                v-if="hasPermi(perm.frozen) && scope.row.vccUseStatus === 2"
                plain
                >冻结</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="unlock(scope.row.vccId)"
                v-if="hasPermi(perm.unfroze) && scope.row.vccUseStatus === 3"
                >解冻</el-button
              >
              <el-button
                size="small"
                type="primary"
                v-if="hasPermi(perm.update)"
                @click="goLoad(scope.row)"
                >充值</el-button
              >
              <el-button
                size="small"
                type="danger"
                v-if="hasPermi(perm.delete)"
                @click="unRegister(scope.row.vccId)"
                >注销</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; text-align: center"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNumber"
        :page-size="pagination.pageSize"
        layout="prev, pager, next, total"
        :total="pagination.total"
      />
    </div>
  </div>
</template>
<script>
import apiData from "@/api/analysis";
import app from "@/main";

export default {
  name: "settlementReview",
  components: {},
  data() {
    return {
      options: [
        { value: 1, label: "未开卡" },
        { value: 2, label: "可用" },
        { value: 3, label: "锁定" },
        { value: 4, label: "注销" },
        { value: 5, label: "失效" },
      ],
      detailData: [],
      detailInfo: {},
      cards: {},
      tableData: [],
      loadDialog: false,
      transactionRecord: false,
      amount: "",
      mchNo: "",
      vccUseStatus: "",
      pagination: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
      pagination2: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      },
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
    this.$store.commit("CHANGE_PAGE_TITLE", "信用卡管理");
    this.getList();
  },
  methods: {
    goLoad(e) {
      this.cards = e;
      this.loadDialog = true;
    },
    toDetail(e) {
      this.detailInfo = e;
      this.transactionRecord = true;
      this.getOld(e.vccId);
    },
    clearData() {},
    opreation() {},
    searchInput() {
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = 10;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.pagination.pageNumber = currentPage;
      this.getList();
    },
    handleSizeChange2(pageSize) {
      this.pagination2.pageNumber = 1;
      this.pagination2.pageSize = pageSize;
    },
    handleCurrentChange2(currentPage) {
      this.pagination2.pageNumber = currentPage;
      this.toDetail();
    },
    async getList() {
      const [error, res] = await apiData.cardList({
        mchNo: this.mchNo,
        vccUseStatus: this.vccUseStatus,
        pageNumber: this.pagination.pageNumber,
        pageSize: this.pagination.pageSize,
      });
      if (error) return;
      const result = res.data.records;
      this.pagination.total = Number(res.data.total);
      this.tableData = result;
    },
    async getOld(id) {
      const data = {
        vccId: id,
        pageSize: this.pagination2.pageSize,
        pageNumber: this.pagination2.pageNumber,
      };
      const [error, res] = await apiData.getHistory(data);
      if (error) return;
      const result = res.data.records;
      this.pagination2.total = Number(res.data.total);
      this.detailData = result;
    },
    unRegister(id) {
      this.$confirm("确定要注销吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        try {
          const res = apiData.closeCard(id);
          const result = res.data;
          if (result.code == 0) {
            app.$message.success(result.msg);
            await this.getList();
          } else {
            app.$message.error(result.msg);
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
    lockCard(id) {
      this.$confirm("确定要冻结吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        try {
          const res = apiData.freezeCard(id);
          const result = res.data;
          if (result.code == 0) {
            app.$message.success(result.msg);
            await this.getList();
          } else {
            app.$message.error(result.msg);
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
    unlock(id) {
      this.$confirm("确定要解冻吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        try {
          const res = apiData.freezeCard(id);
          const result = res.data;
          if (result.code == 0) {
            app.$message.success(result.msg);
            await this.getList();
          } else {
            app.$message.error(result.msg);
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
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
  align-items: center;
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
/deep/ .el-table .cell {
  text-align: center;
  vertical-align: middle;
}
.create-box {
  margin-bottom: 20px;
  .center {
    text-align: center;
    margin-top: 20px;
  }
  .create-left {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
    width: 30%;
  }
  .create-right {
    display: inline-block;
    width: 70%;
    .el-input {
      width: 100% !important;
    }
  }
  .flex {
    display: flex;
  }
  /deep/.el-input__suffix {
    line-height: 40px;
  }
}
</style>
