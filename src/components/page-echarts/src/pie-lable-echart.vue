<template>
  <div class="pie-label-echart">
    <base-echart
      :options="options"
      :zoom="1.176471"
      width="800px"
      height="420px"
    ></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, computed } from "vue"; 
import BaseEchart from "@/base-ui/echart";

export default defineComponent({
  name: "PieLabelEchart",
  props: {
    optionData: {
      type: Array,
      default: () => []
    }
  },
  components: { BaseEchart },
  setup(props) {
const options = computed(() => {
  //computed会收集Props的依赖，props传进来的数据发生改变时，options就会更新，让template重新渲染。也要让base-echart再调setOptions，用watchEffect
  return {
    title: {
      text: "销量前10的商品数量",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      bottom: 11,
      left: "center",
      textStyle: {
        fontSize: 13,
        fontWeight: 700,
        width: 50,
        overflow: "truncate",
        ellipsis: "...",
      },
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        center: ["50%", "40%"],
        selectedMode: "single",
        data: props.optionData,
        label: {
          fontSize: 13,
        },
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

return { options };  }
});
</script>

<style scoped></style>
