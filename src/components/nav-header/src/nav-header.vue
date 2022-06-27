<template>
  <div class="nav-header">
    <el-icon :size="30">
      <!-- 图标用i元素 fold-menu是elementplus自带的icon-->
      <component
        class="fold-menu"
        :is="iconName"
        @click="handleFoldClick"
      ></component>
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" /> <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import HyBreadcrumb from "@/base-ui/breadcrumb";

import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { pathMapBreadcrumbs } from "@/utils/map-menus";

export default defineComponent({
  components: {
    UserInfo, //组件要import，component中注册，才能在template中使用
    HyBreadcrumb,
  },
  emits: ["foldChange"], //子传父
  setup(props, { emit }) {
    let iconName = ref("Fold");
    const isFold = ref(false);
    // 这里是点击图标可以进行切换，自己想的实现方法，可能不太好，但是功能实现了
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      if (isFold.value == false) {
        iconName.value = "Expand";
      } else {
        iconName.value = "Fold";
      }
      emit("foldChange", isFold.value);
    };

    // 面包屑的数据: [{name: , path: }]//数组里面有对象
    const store = useStore();
    const breadcrumbs = computed(() => {
      //计算属性 在userMenus和route发生改变时，breadcrumbs都重新获取
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return {
      iconName,
      handleFoldClick,
      isFold,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex; //el-icon和div独占一行则上下展示，希望左右展示就flex
  width: 100%; //nav-header占据整个宽度

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between; //均匀排列每个元素 首个元素放置于起点，末尾元素放置于终点
    align-items: center; //垂直方向居中
    flex: 1; //占剩余的所有部分
    padding: 0 20px; //距离左右两边就有间距
  }
}
</style>
