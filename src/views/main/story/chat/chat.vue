<template>
  <div class="chat">
    <div class="header">
      <el-input style="width: 300px" v-model="title"></el-input>
      <el-button @click="publishArticlesClic">发布文章</el-button>
    </div>
    <div class="content">
      <hy-editor ref="editRef"></hy-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HyEditor from "@/base-ui/editor";
import { ElMessage } from "element-plus";
import { publishArticlesData } from "@/service/main/story";
export default defineComponent({
  name: "chat",
  components: { HyEditor },
  setup() {
    const editRef = ref<InstanceType<typeof HyEditor>>();
    const title = ref<string>();
    const publishArticlesClic = () => {
      publishArticlesData({
        title: title.value!,
        cotent: editRef.value!.content.html,
      })
        .then(() => {
          ElMessage.success({
            message: "文章发布成功",
            type: "success",
          });
        })
        .catch(() => {
          ElMessage.error("文章发布失败");
        });
    };
    return { editRef, publishArticlesClic, title };
  },
});
</script>

<style lang="less" scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    text-align: right;
    height: 40px;
  }
  .content {
    flex: 1;
  }
}
</style>
