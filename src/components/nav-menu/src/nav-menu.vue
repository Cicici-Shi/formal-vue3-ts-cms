<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <!-- 不折叠的时候文本才出现 -->
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <!-- el-menu有个属性:unique-opened="true"唯一打开，默认可以打开多个
     default-active变成动态的，前面要加冒号-->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- id是唯一标识，所以用id作为key -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单 可以展开的菜单 index要求字符串类型＋''可以转成字符串 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 用具名插槽 -->
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 点击哪个拿到其id、url、name、type对象 -->
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <!-- 有icon再显示该元素 -->
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store"; //刚刚自己封装了个store在store的index.ts中
import { useRouter, useRoute } from "vue-router";

import { pathMapToMenu } from "@/utils/map-menus";

// vuex - typescript  => pinia 用pinia代替vuex

export default defineComponent({
  props: {
    //:collapse="isCollapse"的值传过来，在上面的template就可以用，决定nav-menu折不折叠
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    //store
    const store = useStore();
    const userMenus = computed(() => store.state.login.userMenus); //直接写在template中太长了，用计算属性//这里的store是用自制的类型限制的

    //router
    const router = useRouter();
    const route = useRoute(); //useRoute（）拿路径
    const currentPath = route.path;

    // data 当前路径->userMenus->menu.url=>匹配menu.id->defaultValue的值
    const menu = pathMapToMenu(userMenus.value, currentPath); //userMenus.id computed拿到ref对象，要具体值就要.value
    const defaultValue = ref(menu.id + ""); //''变字符串

    // event handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found", //有就用item的url，没有就跳/not-found
      });
    };
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
