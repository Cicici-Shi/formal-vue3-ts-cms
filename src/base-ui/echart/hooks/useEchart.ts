import * as echarts from "echarts";

import chinaMapData from "../data/china.json"; //json文件不识别模块，在shims-vue.ts声明

echarts.registerMap("china", chinaMapData); //map需要注册

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  window.addEventListener("resize", () => {
    echartInstance.resize(); //调用这个就会自动调整当浏览器缩放时的大小
  });
  const updateSize = () => {
    echartInstance.resize(); //折叠前后变化，可以点击时调这个
  };

  return {
    //这里用的是对象{}方式导出，而不是元组[]，用对象在外面获取时可以只获取其中的一个属性，元组形式就需要对应起来（如usePageModal，都会用到）
    echartInstance,
    setOptions,
    updateSize,
  };
}
