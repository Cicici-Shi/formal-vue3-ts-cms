<template>
  <div class="page-content">
    <!-- v-model:page可以给v-model起名，不起名默认modelValue update:modelValue，表示给整个hy-table绑定的；起名就成了page update:page -->
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 这里的新建用户可以改成双大括号，让别人传进来 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- 2.列中的插槽 -->
      <!-- 从上一层拿到的scope -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 这里需要行的数据，所以用作用域插槽，用scope，下面scope.row就能拿到 -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="small"
            type="text"
            @click="handleEditClick(scope.row)"
            ><el-icon><edit /></el-icon>编辑</el-button
          >
          <el-button
            v-if="isDelete"
            size="small"
            type="text"
            @click="handleDeleteClick(scope.row)"
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 公共的再放page-content.vue中，各自的放goods.vue这类中。#[item.slotName]="scope"遍历出来哪个就把插入到里面的东西放到hy-table的image里面，一一对应 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 只有slotName有值时，才动态插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store"; //普通的useStore是来自vuex，这里用自制的，所以从@/store导入
import { usePermission } from "@/hooks/use-permission";

import HyTable from "@/base-ui/table";

export default defineComponent({
  components: {
    HyTable,
  },
  props: {
    contentTableConfig: {
      //把配置的数据传到这里，直接绑定到上面的hy-table
      type: Object,
      require: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();

    // 0.获取操作的权限 增删改查都是有权限的，没查询权限就不请求，没有另外三个权限（新建、编辑、删除），就没有对应按钮
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 }); //默认为0，10
    watch(pageInfo, () => getPageData()); //pageInfo发生改变时，发送网络请求，获取新数据

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return; //没有该权限，就直接return，不走了
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName, //pageUrl 部门是/department/list，角色是/role/list...
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize, //偏移量，忽略前多少条数据。因为前面currentPage是1，这里要减一
          size: pageInfo.value.pageSize, //一页请求的数量  一般10条
          ...queryInfo, //把queryInfo的东西全部拿出来，一个一个条件都可以查询
        },
      });
    }; //不同页面就dispatch不同的东西，有不同的操作}
    getPageData(); //一调用就可以发送网络请求

    // 3.从vuex中获取数据
    const dataList = computed(
      () =>
        //getter在某一模块中，所以要先传一个模块，再拿哪一个getter
        store.getters[`system/pageListData`](props.pageName) //这里在调用函数，还拿了props.pageName
    );
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    );
    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      }
    );

    // 5.删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      console.log(item); //检查一下是否拿到了
      store.dispatch("system/deletePageDataAction", {
        //有作用域，写上system/
        //删除数据，和网络请求有关，不在页面操作，去vuex。vuex中做个封装，去调service层。分层，让代码结构清晰，复用逻辑也更方便。
        pageName: props.pageName,
        id: item.id,
      });
    };

    const handleNewClick = () => {
      emit("newBtnClick");
    };
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };

    return {
      dataList,
      getPageData, //外界要拿到它调用，就要return出去
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
    };
  },
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
