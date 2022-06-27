<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"; //PropType确定类型
import { IBreadcrumb } from "../types";

export default defineComponent({
  props: {
    //其他部分要传参数过来
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => [], //数组
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
