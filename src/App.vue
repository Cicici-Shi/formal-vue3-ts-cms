<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  //用defineComponent包裹，在TS上有用，里面有很多泛型及默认值，哪些东西能传入并类型推导
  // 这里把对象导出，在另外的组件中，不是直接使用的对象，而是根据该对象创造出来一个真正的组件实例。导出的是组件的描述，类是对象的整体描述，如class Person{name:string}再根据类创造出真正的对象。react就直接用的类，vue是用的对象，但其实就是类。
  name: "App",
  components: {
    ElConfigProvider,
  },
  setup() {
    return { zhCn };
  },
});
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
