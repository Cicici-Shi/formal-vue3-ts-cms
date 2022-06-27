<template>
  <div class="page-search">
    <!-- 双向绑定，外面输的，里面可以改。点击重置后，会改这里的formData -->
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HyForm from "@/base-ui/form";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true, //必传
    },
  },
  components: {
    HyForm,
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    //如果只是简单数据绑定message=ref('')就行，但传的是对象，数据太复杂，又用v-model（本质是一种语法糖）传
    //双向绑定的属性应该是由配置文件的field决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []; //前面为空，就给空数组
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = ""; //默认值空字符串,formOriginData就是键为item.field，值为空的对象
      // console.log(formOriginData);
      // console.log(item.field);
    }
    // const arrA = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    // let arr = {};
    // for (const item of arrA) {
    //   arr[item.id] = 0;
    //   console.log(item);//item是键值对{ id: 1 },arr是键值对组成的对象{1: 0, 2: 0, 3: 0, 4: 0}，所以下文拿的是key
    //   console.log(item.id);
    //   console.log(arr);
    // }

    const formData = ref(formOriginData); //动态的formOriginData，所有的field都在里面

    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]; //拿到里面的key，对其值修改。这种对浅拷贝出来的formData也有效。form.vue用双向绑定时
      // }
      formData.value = formOriginData;
      emit("resetBtnClick");
    };

    // 3.优化三: 当用户点击搜索
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };

    return { formData, handleResetClick, handleQueryClick };
  },
});
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0; //挨得近的设margin会穿透，可以设padding
}
</style>
