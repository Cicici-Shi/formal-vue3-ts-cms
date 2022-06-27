<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";
import BaseEchart from "@/base-ui/echart";

const props = withDefaults(
  defineProps<{
    //放在props中，暴露出去，就可以在外面改
    title?: string;
    xLabels: string[];
    values: any[];
  }>(),
  {
    title: "",
  }
);

const options = computed(() => {
  return {
    title: {
      text: props.title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {}, //不写就会自动从数据的name获取
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      //离周围的距离，是否包含文本
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "分别销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: props.values,
      },
    ],
  };
});
</script>

<style scoped></style>
