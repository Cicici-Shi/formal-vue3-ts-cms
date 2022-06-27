<template>
  <div class="category">
    <category-header :chartsData="chartsData" />
    <page-search
      :searchFormConfig="searchFormConfig"
      class="page-search"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="category"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="category"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";

import CategoryHeader from "./cpn/categoryHeader.vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchFormConfig from "./config/form.config";
import contentTableConfig from "./config/tabel.config";
import modalConfig from "./config/dialog.config";

import { usePageModal } from "@/hooks/use-page-modal";
import { usePageSearch } from "@/hooks/use-page-search";

export default defineComponent({
  name: "category",
  components: { CategoryHeader, PageSearch, PageContent, PageModal },
  setup() {
    const store = useStore();
    store.dispatch("dashboard/goodsSaleTop10Action");

    const chartsData = computed(() => {
      return store.state.dashboard.goodsSaleTop10.map((goods) => {
        return { name: goods.name, value: goods.saleCount };
      });
    });

    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal();
    return {
      chartsData,
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
    };
  },
});
</script>

<style scoped lang="less">
.category {
  .page-search {
    margin: 10px 0;
  }
  .category-header {
    width: 100%;
  }
}
</style>
