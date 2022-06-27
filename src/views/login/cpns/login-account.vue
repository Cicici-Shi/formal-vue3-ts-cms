<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- show-password输入密码会变星号，可点击可见和隐藏element-plus的属性 -->
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus"; //这里是全局导入，看不到ElForm，要import
import localCache from "@/utils/cache";

import { rules } from "../config/account-config"; //用到了ref/reactive/useStorage/onMouted,把逻辑抽出去要用hooks。仅仅是配置文件，用不到响应式，就config

export default defineComponent({
  setup() {
    const store = useStore();

    const account = reactive({
      //账号和密码关系紧密，放在一起
      name: localCache.getCache("name") ?? "", //记住密码里面有就用，没有就空
      password: localCache.getCache("password") ?? "",
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        //valid验证通过返回true，没通过返回false
        if (valid) {
          //验证通过才能立即登录
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存 session storage会话关掉就没了
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            //没选记住密码就把所以清掉
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }

          // 2.开始进行登录验证
          store.dispatch("login/accountLoginAction", { ...account }); //解构，拿到账号和密码传参给accountLoginAction
        }
      });
    };

    return { account, rules, loginAction, formRef }; //rules没有在setup中使用，也必须在这里return
  },
});
</script>

<style scoped></style>
