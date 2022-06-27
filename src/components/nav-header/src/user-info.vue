<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><circle-close /></el-icon>退出登录</el-dropdown-item
          >
          <!-- divided表示上面有分割线 -->
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore(); //用userstore取出vuex数据
    const name = computed(() => store.state.login.userInfo.name);

    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache("token");
      router.push("/main"); //删除token并跳转
    };

    return { name, handleExitClick };
  },
});
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer; //显示一个小手
  display: flex;
  align-items: center;
}
</style>
