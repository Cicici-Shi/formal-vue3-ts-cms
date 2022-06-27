<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"; //defineProps定义props属性，defineExpose暴露出去的东西（之前是return出去），defineEmits是之前options api的emit
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

const props = defineProps<{
  pieData: IDataType[];
}>();

const options = computed(() => {
  //computed会收集Props的依赖，props传进来的数据发生改变时，options就会更新，让template重新渲染。也要让base-echart再调setOptions，用watchEffect
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
