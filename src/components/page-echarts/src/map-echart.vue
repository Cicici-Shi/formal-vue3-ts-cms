<template>
  <div class="bar-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

import { convertData } from "../utils/convert-data";

const props = withDefaults(
  defineProps<{
    title?: string;
    mapData: IDataType[];
  }>(),
  {
    title: "",
  }
);

const options = computed(() => {
  //地图先要绘出整个地图（注册），然后确定地图上点的位置
  return {
    backgroundColor: "#fff",
    title: {
      text: "全国销量统计",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return params.name + " : " + params.value[2];
      },
    },
    visualMap: {
      //左下角的图例
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ["高", "低"],
      inRange: {
        color: ["rgb(70, 240, 252)", "rgb(250, 220, 46)", "rgb(245, 38, 186)"],
      },
      textStyle: {
        color: "#fff",
      },
    },
    geo: {
      map: "china", //相对china进行地理编码，点的位置。
      roam: "scale",
      emphasis: {
        areaColor: "#f4cccc",
        borderColor: "rgb(9, 54, 95)",
        itemStyle: {
          areaColor: "#f4cccc",
        },
      },
    },
    series: [
      {
        name: "销量",
        type: "scatter",
        coordinateSystem: "geo", //坐标系统是相对geo的
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
          },
        },
      },
      {
        type: "map",
        map: "china", //刚刚注册的是china
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false,
        },
      },
    ],
  };
});
</script>

<style scoped></style>
