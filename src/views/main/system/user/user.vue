<template>
  <div class="user">
    <!-- h2自带margin 双向绑定-->
    <!-- 一个页面由两个部分组成，上面是一个pageSearch，下面是一个pageContent，到时候传入配置就可以把页面开发出来。
    两个配置文件传过去 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- ref拿到该组件对象，才能调内部的方法，重置或搜索操作 -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <!-- ref="pageModalRef"在父组件中修改子组件的属性，要先在父组件中拿到子组件才能改 -->
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

//引入三个组件
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

//开发页面只需要写配置文件就行，不用大量重复代码
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";

//这里连逻辑都不需要写，交给导入的组件处理
export default defineComponent({
  name: "users",
  components: {
    PageSearch,
    PageContent,
    PageModal,
  },

  setup() {
    //pageSearch的hook
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch(); //return{...usePageSearch}同理，但是阅读性差

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = false; //
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = true; //不显示
    };

    // 2.动态从vuex给新建用户添加部门和角色列表
    const store = useStore();
    const modalConfigRef = computed(() => {
      //用了computed，是响应式的，改变就会自动在template刷新
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        //要用到store，得import并useStore()。options要求有title和value（之前的search.config.ts有），要转化一下。!断言，肯定会有值的
        return { title: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });

      return modalConfig;
    });

    // 3.调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback);

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
    };
  },
});
</script>

<style scoped lang="less"></style>
