<template>
  <div class="goods">
    <!-- page-content有划线，说不能将类型分配给另一个类型，缺少...可能是因为后面绑定的东西和要求的不匹配，绑定完了就不报错了 -->
    <page-content :contentTableConfig="contentTableConfig" pageName="goods"
      ><template #image="scope">
        <!-- el-image形成预览图，list表示那个位置可预览的一系列图 -->
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image> </template
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";

import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  name: "goods",
  components: {
    PageContent, //全局注册在app.vue中，import、这里的导入都可以不要
  },
  setup() {
    return { contentTableConfig };
  },
});
</script>

<style scoped></style>
