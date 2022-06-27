<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue";
import { EChartsOption } from "echarts";
import useEchart from "../hooks/useEchart";

// 定义props
const props = withDefaults(
  defineProps<{
    //类型用泛型形式写，不能在泛型中写默认值；默认值用withDefaults，写第二个参数上
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    height: "360px",
  }
);

const echartDivRef = ref<HTMLElement>();

onMounted(() => {
  //执行setup代码时，template还没有处理完，echartDivRef还没有绑到template，所以要onMounted挂载完了
  const { setOptions } = useEchart(echartDivRef.value!); //useEchart可以直接拿到示例并且拿到setOptions设置选项

  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style scoped></style>
