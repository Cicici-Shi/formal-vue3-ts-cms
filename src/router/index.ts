import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/LoginView.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/MainView.vue"),
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  //每次进行页面跳转之前都要来到这个位置
  //导航守卫，没登录要登录
  if (to.path !== "/login") {
    const token = localCache.getCache("token"); //从缓存中看token，没有就登录
    if (!token) {
      return "/login";
    }
  }
  // console.log(router.getRoutes());
  // console.log(to);//要跳转到的地方//页面刷新路由匹配bug时的name是notfound

  //app.use(router)->执行install函数->获取当前path->router.routes（当前里面没有动态注册的东西）->匹配到notFound 也不会路由守卫，路由守卫是要跳转的时候才执行
  //setupStore()->注册动态路由routes
  //路由守卫（回调） 此时router.getRoutes()得到的都很正常，但to不对
  //解决办法：main.ts中把setupStore()放到app.use(router)上面就行
  if (to.path === "/main") {
    //main的时候匹配不到真正的组件，要再重定向，跳到firstMenu.url
    console.log(firstMenu);
    return firstMenu.url;
  }
});

export default router;
