const user = () => import("@/views/main/system/user/user.vue"); //懒加载
export default {
  path: "/main/system/user",
  name: "user",
  component: user, //太长了，放上面
  children: [],
};
