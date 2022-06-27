//在user.vue、role.vue中用
import { ref } from "vue";
import PageModal from "@/components/page-modal";

type CallbackFn = (item?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  const handleNewData = () => {
    defaultInfo.value = {}; //新建，里面的内容是空的
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true; //为true就弹窗
    }
    newCb && newCb(); //逻辑与，有值的时候再调用
  };
  const handleEditData = (item: any) => {
    //这个item是监听的时候就请求到的，把请求到的数据给page-modal，再对里面的formData修改，输入框里的数据就被改了
    defaultInfo.value = { ...item }; //浅拷贝，改的时候不会影响原数据。里面是要请求内容的
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true; //为true就弹窗
    }
    editCb && editCb(item); //CallbackFn可传递参数item，editCb就传过去了
  };
  return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
