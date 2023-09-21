<template>
  <div>
    <CommonDialog
      width="790px"
      title="代付通道"
      :visible="visible"
      :close-on-click-modal="false"
      @close="onClose"
    >
      <el-table :data="data" size="small">
        <el-table-column
          prop="date"
          label="通道ID"
          min-width="80"
          align="center"
        />
        <el-table-column
          prop="date"
          label="通道名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="date"
          label="代理商费率"
          width="80"
          align="center"
        />
        <el-table-column
          prop="date"
          label="代付费率"
          width="80"
          align="center"
        />
        <el-table-column
          prop="date"
          label="单笔限额"
          width="80"
          align="center"
        />
        <el-table-column prop="date" label="状态" width="80" align="center" />
        <el-table-column prop="date" label="默认" width="80" align="center" />
        <el-table-column label="操作" width="80" align="center">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="onSet(row)">
              配置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="onClose" size="small">关闭</el-button>
      </template>
    </CommonDialog>

    <pending-channel-set-dialog
      :id="pendingChannelSet.id"
      :visible.sync="pendingChannelSet.visible"
    />
  </div>
</template>

<script>
import CommonDialog from "@/views/components/CommonDialog.vue";
import PendingChannelSetDialog from "./PendingChannelSetDialog.vue";

export default {
  props: {
    visible: Boolean,
  },
  components: {
    CommonDialog,
    PendingChannelSetDialog,
  },
  data() {
    return {
      data: [1, 1, 1, 1, 1],
      pendingChannelSet: {
        visible: false,
        id: "",
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    onSet(row) {
      console.log(row);
      this.pendingChannelSet.id = row.id;
      this.pendingChannelSet.visible = true;
    },
  },
};
</script>
