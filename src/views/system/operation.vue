<template>
  <AppSction :head="false" class="mb-15">
    <template v-slot:cont>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            size="small"
            v-model.trim="userId"
            placeholder="用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="mb-15">
        <el-table :data="mchInfoList.records" stripe style="width: 100%">
          <el-table-column prop="userId" label="用户ID"> </el-table-column>
          <el-table-column prop="userName" label="用户名"> </el-table-column>
          <el-table-column prop="userIp" label="用户IP"> </el-table-column>
          <el-table-column prop="methodRemark" label="业务描述">
          </el-table-column>
          <el-table-column prop="methodName" label="方法" width="220">
          </el-table-column>
          <el-table-column prop="optReqParam" label="请求参数" width="220">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div
                  slot="content"
                  class="tip-content"
                  v-if="scope.row.optReqParam"
                >
                  <pre
                    class="language-json"
                    data-type="json"
                  ><code v-html="resCode(scope.row.optReqParam)">
                
                  </code></pre>
                </div>
                <el-button class="code-btn">{{
                  scope.row.optReqParam
                }}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="optResInfo" label="响应结果" width="220">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.optResInfo" placement="top">
                <div slot="content" class="tip-content">
                  <pre
                    class="language-json"
                    data-type="json"
                  ><code v-html="resCode(scope.row.optResInfo)">
                
                  </code></pre>
                </div>
                <el-button class="code-btn">{{
                  scope.row.optResInfo
                }}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="InformationView(scope.row)"
                plain
                >查看</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <div class="center-center">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="formInline.pageNumber"
          :page-size="formInline.pageSize"
          background
          layout="prev, pager, next"
          :total="formInline.total"
        />
      </div>
      <RolesAdd ref="UsersAdd" @addSuccess="addSuccess" />
      <InformationView ref="InformationView" />
    </template>
  </AppSction>
</template>
<script>
import RolesAdd from "@/views/system/components/InformationAdd.vue";
import InformationView from "@/views/system/components/InformationView.vue";
import apiUser from "@/api/user";

export default {
  name: "InformationList",
  components: { RolesAdd, InformationView },
  data() {
    return {
      dialogVisible: false,
      mchInfoList: {
        records: [],
        current: 1,
        total: 0,
      },
      userId: "",
      formInline: {
        pageNumber: 1,
        roleName: "",
        total: 0,
        pageSize: 24,
        sysType: "MGR",
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.formInline.pageNumber = val;
      this.getList();
    },
    onSubmit() {
      this.getList(1);
    },
    addSuccess() {
      this.getList(1);
    },
    InformationView(row) {
      this.$refs.InformationView.show(row);
    },
    resCode(json) {
      let code = "";
      try {
        code = JSON.parse(json);
      } catch (error) {
        code = json;
      }
      return code;
    },
    async getList(p) {
      const [error, res] = await apiUser.sysLogList({
        ...this.formInline,
        pageNumber: p || this.formInline.pageNumber,
        userId: this.userId,
      });
      if (error) return;
      const result = res.data;
      this.mchInfoList = result;
      this.formInline.pageNumber = +result.current;
      this.formInline.total = +result.total;
    },
    deleteFn(id) {
      this.$confirm("确定删除吗?", "提示信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          const [error] = await apiUser.ssysMsgDelete(id);
          loading.close();
          if (error) return;
          this.getList(1);
        })
        .catch(() => {});
    },
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "操作日志");
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.tip-content {
  max-width: 1000px;
  overflow-x: auto;
}
.code-btn {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
pre code {
  display: block;
  font-size: 14px;
  font-family: "Source Code Pro", monospace;
  font-style: normal;
  font-weight: 400;
  word-wrap: normal;
  white-space: pre;
}
</style>
