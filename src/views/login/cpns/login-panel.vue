<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <span>账户登录</span>
          </span>
        </template>
        <!-- cpns的login-account -->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <span>手机登录</span>
          </span>
        </template>
        <!-- cpns的login-phone -->
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true); //is开头是布尔类型，默认记住密码
    const accountRef = ref<InstanceType<typeof LoginAccount>>(); //拿到LoginAccount中导出(return中)的类型，什么都不传是any类型，就没有类型限制，不安全。不可以直接把对象名称LoginAccount写在泛型的地方，对象只是普通的对象，不是类型，要给一个拥有构造函数的实例InstanceType<typeof LoginAccount>，accountRef就是LoginAccount类型
    // 这里把对象导出，在另外的组件中，不是直接使用的对象，而是根据该对象创造出来一个真正的组件实例。导出的是组件的描述，类是对象的整体描述，如class Person{name:string}再根据类创造出真正的对象。react就直接用的类，vue是用的对象，但其实就是类。
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    const currentTab = ref("account"); //默认值为account，表示默认账号登录

    // 2.定义方法
    const handleLoginClick = () => {
      //大的login-panel里面发生了'点击“立即登录”'，要告诉小的组件login-account，才可以调loginAction方法
      //点了登录后，1.登录的逻辑（网络请求，拿到数据后的处理）2.数据保存到某一位置3.发送其他的请求（请求当前用户的信息）4.拿到用户的菜单5.跳到首页
      if (currentTab.value === "account") {
        //账号登录
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        //手机登录
        console.log("phoneRef调用loginAction");
      }
    };

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phoneRef,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px; //让元素往上走点
  width: 320px;
}

.title {
  text-align: center;
}
.account-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%; //要调样式就加个class
  margin-top: 10px;
}
</style>
