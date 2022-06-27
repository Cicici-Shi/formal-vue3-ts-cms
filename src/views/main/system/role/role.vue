<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <!-- label、name是字段名。 -->
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus"; //工具函数

import { ElTree } from "element-plus"; //全局注册是在template中用组件不用导入，这里用作类型要导入
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageModal } from "@/hooks/use-page-modal";

export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch,
    PageModal,
  },
  setup() {
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      //这里就拿到了usePageModal传过来的item
      const leafKeys = menuMapLeafKeys(item.menuList);
      nextTick(() => {
        //eltree还没有来得及绑定，所以nextTick在下一帧再操作
        console.log(elTreeRef.value);
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback);

    const store = useStore();
    const menus = computed(() => store.state.entireMenu); //computed保证数据是响应式的

    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys; //checkNodes是完整的对象，checkedKeys只拿key
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList }; //直接等是个数组，{ menuList }是{ menuList:menuList }语法糖
    };

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef,
    };
  },
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
