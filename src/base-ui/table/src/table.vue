<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <!-- title展示什么东西，不写死 -->
        <div class="title">{{ title }}</div>
        <div class="handler">
          <!-- 让使用者来决定右边处理的handler长什么样子，具名插槽 -->
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- align="center"是居中 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <!-- 当内容过长被隐藏时显示tooltip -->
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- #default="scope"作用域插槽。再scope.row把行里的数据传过来。展示scope.row里的propItem.prop -->
          <template #default="scope">
            <!-- 有可能会改变里面的内容，先用slot，若不改变就用插槽中的默认内容。动态插槽名，插槽的名字不写死，用：，展示的文档中用“#插槽名”才能改。:row="scope.row"把数据传到父组件（user.vue) -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 有的不想展示，就把v-if为false -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      //不能叫userList
      type: Array, //不好判断数组里有什么，不用as。。
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    propList: {
      type: Array as PropType<any[]>, //自己写的，解决了很牛。学的form.vue写的断言，propType。看了propList发现不能用object，换成了any
      // required: true,//把这里注释掉，page-content.vue的hy-table就不会报错了，不懂
    },
    showIndexColumn: {
      type: Boolean,
      default: false, //默认不显示
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }), //默认0,10
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["selectionChange", "update:page"], //要拿到数据的是页面，所以要把数据发出去emit
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      // console.log(value)//可以先用log测试一下有没有取到值，写emit是为了把数据给页面
      emit("selectionChange", value);
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };

    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style scoped lang="less">
.el-table {
  font-size: 13px;
}

.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
