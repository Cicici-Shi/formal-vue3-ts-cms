<!-- 新建或编辑时的弹窗 -->
<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <!-- 下面是el-dialog的插槽具体内容 -->
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

import HyForm from "@/base-ui/form";

export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData = ref<any>({}); //formData推导出来是{}，不能把string类型放进去，改成any

    watch(
      //监听defaultInfo的改变，改变后拿newValue，给formData初始化
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          //在modal.config.ts找到formItems里有哪些属性，从newValue取出它的值，放到formData
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );

    // 点击确定按钮的逻辑
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        // 编辑（编辑和新建的确定，逻辑也是不一样的。defaultInfo有值，就是编辑；没有是新建）
        console.log("编辑用户");
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        // 新建
        console.log("新建用户");
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
    };

    return {
      dialogVisible,
      formData,
      handleConfirmClick,
    };
  },
});
</script>

<style scoped></style>
