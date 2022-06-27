<template>
  <div class="category-header">
    <el-collapse class="category-box">
      <h3 class="category-title">销量前十</h3>
      <el-collapse-item name="1">
        <pie-label-echart
          :optionData="chartsData"
          style=" width: 200px, height: 200px "
        ></pie-label-echart>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { PieLabelEchart } from "@/components/page-echarts";

export default defineComponent({
  name: "categoryHeader",
  props: {
    chartsData: {
      type: Array,
      default: () => [],
    },
  },
  components: { PieLabelEchart },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.category-box {
  position: relative;
  cursor: pointer;
  .category-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -5px);
    z-index: 10000;
  }
}
</style>
