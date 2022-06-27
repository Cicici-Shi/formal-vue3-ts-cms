import { ref } from "vue";
import PageContent from "@/components/page-content";

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>(); //pageContentRef就是PageContent类型
  const handleResetClick = () => {
    pageContentRef.value?.getPageData(); //可选链，value没有值，后面就不会调用
  };
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  return [pageContentRef, handleResetClick, handleQueryClick]; //看成元祖
}
//   return [pageTabelRef, resetBtnClic, searchBtnClic];
