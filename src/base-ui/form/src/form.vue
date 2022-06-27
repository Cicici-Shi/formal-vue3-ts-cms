<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- label几个字的宽度也不写死 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 如果用:span="8"就写死了 -->
          <el-col v-bind="colLayout">
            <!-- :style 写在props中 动态样式，不写死，在每个页面中想调还可以调 如user.vue
            不用从item中取，直接用设过的itemstyle就行。v-if="!item.isHidden"没有isHidden或者false才显示-->
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 要用template包起来 -->
              <!-- 一般输入框和密码框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
                <!-- 不用v-model双向绑定（不好理清楚）,自己用语法糖监听。直接拿modelValue，不用FormData。:model-value="modelValue[`${item.field}`]"把传进来的modelValue的值赋值到el-select中上；如果el-select改变了，就触发update:modelValue事件。$event拿到内部传进来的改变的值，item.field拿字段 -->
              </template>
              <!-- 多选框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 选时间的框 -->
              <template v-else-if="item.type === 'datepicker'">
                <!-- v-bind="item.otherOptions"把其他有的属性全部绑进来 -->
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"; //PropType是vue3结合TS的语法//一般reactive会出问题，建议用ref
import { IFormItem } from "../types";

export default defineComponent({
  props: {
    //不要用v-model去直接修改Props中的属性，违反单向数据流。要emit一个事件，在父组件中修改。
    modelValue: {
      //双向绑定，默认由page-search传进modelValue
      type: Object,
      required: true, //必传
    },
    //父传子 在props里面写可以由外界决定，不写死
    formItems: {
      type: Array as PropType<IFormItem[]>, //as是类型断言 该Array里放的IFormItem
      default: () => [], //vue3+ts 规定数组和对象为默认类型，要写成箭头函数，可以用到上下文的this
    },
    labelWidth: {
      type: String, //数组、对象才用as Proptype
      default: "100px",
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 24/6=4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue }); //浅拷贝了一份的formData，单向数据流，这里的修改和原来对象无关
    // watch(
    //   //watch监听formData，发生改变时就发出去
    //   formData,
    //   (newValue) => {
    //     emit("update:modelValue", newValue);
    //   },
    //   {
    //     deep: true, //深度监听，里面的某个属性发生改变也能监听到
    //   }
    // );
    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value }); //modelValue一旦被改变了就把这个事件触发，把整个对象发出去。外面page-search双向绑定绑的formData，所以要把大的modelValue解构后传出去。field是个变量，[]才能跟随改的值动。
      // console.log({ ...props.modelValue });
      // console.log({ [field]: value });
      //{id: '', name: '', password: '', sport: '', createTime: ''}
      // {name: '1'}
      // {id: '', name: '1', password: '', sport: '', createTime: ''}
      // {name: '11'}
    };
    return {
      // formData,不用双向绑定了就注释掉了
      handleValueChange,
    };
  },
});
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px; //el-form-item只有下padding，自己给hy-form加一个上的
}
</style>
