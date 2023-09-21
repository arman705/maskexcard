<template>
  <div class="home-view">
    <AppSction class="mb-15" title="今/昨日订单">
      <template v-slot:cont>
        <el-row :gutter="8">
          <el-col
            :span="4"
            class="order-list"
            v-for="(item, idx) in order"
            :key="idx"
            @click.native="goPath(item)"
          >
            <ul class="order-item flex-column justify-around">
              <li>{{ item.title }}</li>
              <li>
                <span class="order-value">{{ item.value }}</span>
                <span>{{ item.lable }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </template>
    </AppSction>
    <AppSction class="mb-15" title="近7日平台交易金额">
      <template v-slot:cont>
        <div class="my-echart" ref="myLine"></div>
      </template>
    </AppSction>
    <AppSction class="mb-15" title="平台">
      <template v-slot:cont>
        <el-row :gutter="8">
          <el-col
            :span="4"
            class="order-list"
            v-for="(item, idx) in plane"
            :key="idx"
            @click.native="goPath(item)"
          >
            <ul class="order-item flex-column justify-around">
              <li>{{ item.title }}</li>
              <li>
                <span class="order-value">{{ item.value }}</span>
                <span>{{ item.lable }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </template>
    </AppSction>
  </div>
</template>
<script>
import * as echarts from "echarts";
import apiIndex from "@/api/index";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(tz);
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      tz: "Asia/Shanghai",
      order: [
        {
          title: "今日充值订单",
          key: "todayRechargeOrder",
          value: "",
          lable: "个",
          url: "/bill/pay",
          query: { queryType: 1, time: "today" },
        },
        {
          title: "今天充值金额",
          key: "todayRechargeAmount",
          value: "",
          lable: "USD",
          url: "/bill/pay",
          query: { queryType: 1, time: "today" },
        },
        {
          title: "昨天充值订单",
          key: "ydayRechargeOrder",
          value: "",
          lable: "个",
          url: "/bill/pay",
          query: { queryType: 1, time: "yesterday" },
        },
        {
          title: "昨日充值金额",
          key: "ydayRechargeAmount",
          value: "",
          lable: "USD",
          url: "/bill/pay",
          query: { queryType: 1, time: "yesterday" },
        },
      ],
      plane: [
        {
          title: "商户总数",
          key: "mchCount",
          value: "",
          url: "/merchant/all",
          lable: "个",
        },
        {
          title: "充值订单",
          key: "rechargeOrderCount",
          url: "/bill/pay",
          query: { queryType: 1 },
          value: "",
          lable: "个",
        },
        {
          title: "充值金额",
          url: "/bill/pay",
          query: { queryType: 1 },
          key: "rechargeOrderAmount",
          value: "",
          lable: "USD",
        },
      ],
    };
  },
  methods: {
    goPath(item) {
      const query = item.query || {};
      if (query.time === "today") {
        const day = dayjs().tz(this.tz).format("YYYY-MM-DD");
        query.startDate = `${day} 00:00:00`;
        query.endDate = `${day} 23:59:59`;
      }
      if (query.time === "yesterday") {
        const day = dayjs().tz(this.tz).subtract(1, "day").format("YYYY-MM-DD");
        query.startDate = `${day} 00:00:00`;
        query.endDate = `${day} 23:59:59`;
      }
      if (query.time) delete query.time;
      this.$router.push({ path: item.url, query });
    },
    initEcharts(x, y) {
      this.myChart = echarts.init(this.$refs.myLine, null, {
        renderer: "canvas",
        useDirtyRect: false,
      });
      const option = {
        tooltip: { show: true },
        xAxis: {
          type: "category",
          data: x,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: y,
            type: "line",
          },
        ],
      };
      this.myChart.setOption(option);
    },
    async indexRequest() {
      const [error, res] = await apiIndex.indexRequest();
      if (error) return;
      for (const key in res.data) {
        if (Object.hasOwnProperty.call(res.data, key)) {
          const element = res.data[key];
          this.order.forEach((item) => {
            if (item.key === key) {
              item.value = element;
            }
          });
        }
      }
    },
    async platformInfo() {
      const [error, res] = await apiIndex.platformInfo();
      if (error) return;
      for (const key in res.data) {
        if (Object.hasOwnProperty.call(res.data, key)) {
          const element = res.data[key];
          this.plane.forEach((item) => {
            if (item.key === key) {
              item.value = element;
            }
          });
        }
      }
    },
    async tradingAmountTrend() {
      const [error, res] = await apiIndex.tradingAmountTrend();
      if (error) return;
      const date = [];
      const rechargeAmount = [];
      res.data.forEach((item) => {
        date.push(item.date);
        rechargeAmount.push(item.rechargeAmount);
      });
      this.initEcharts(date, rechargeAmount);
    },
  },
  beforeDestroy() {
    this.myChart.dispose();
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "运营首页");
    this.indexRequest();
    this.tradingAmountTrend();
    this.platformInfo();
  },
};
</script>
<style lang="less" scoped>
@import "@/assets/style/mixins/ellipsis.less";
.home-view {
  ::v-deep .layout-section {
    color: #15192a;
  }
  .msg-yips {
    max-width: 412px;
    height: 29px;
    padding: 0 16px;
    border-radius: 29px;
    border: 1px solid #00bda1;
    color: @primary;
    line-height: 1;
    .ellipsis();
    .el-icon-chat-line-round {
      font-size: 24px;
      margin-right: 8px;
    }
  }
  .order-item {
    width: 169px;
    height: 74px;
    background-color: #f4f5f7;
    padding: 6px;
    border-radius: 5px;
  }
  .order-list {
    margin-bottom: 8px;
  }
  .order-value {
    margin-right: 6px;
    color: @primary;
    font-size: 16px;
  }
  .my-echart {
    width: 100%;
    height: 240px;
  }
}
</style>
