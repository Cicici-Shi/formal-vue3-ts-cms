<template>
  <div class="department">
    <div class="department-header">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></page-search>
    </div>
    <div class="department-main">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="department"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
    </div>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="department"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";

export default defineComponent({
  name: "department",
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal();

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
    };
  },
});
</script>

<style scoped lang="less">
.department {
  .department-main {
    margin-top: 20px;
  }
}
</style>
