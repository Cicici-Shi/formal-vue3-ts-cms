import { createApp } from "vue";
import { globalRegister } from "./global";
import "./service/axios.demo";
import "normalize.css"; //用了默认的东西
import "./assets/css/index.less";

// import hyRequest from "./service";

import App from "./App.vue";

import router from "./router";
import store from "./store";
import { setupStore } from "./store";

import ElementPlus from "element-plus"; //全局引用，而不是按需引用
import "element-plus/dist/index.css";
import * as ElIconModules from "@element-plus/icons-vue";

const app = createApp(App);

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}

// 对vue进行类型补充说明，不让$filter报错
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $filters: any;
  }
}

app.use(globalRegister);
app.use(store);
setupStore();
app.use(router);
app.use(ElementPlus);

app.mount("#app");

// hyRequest.request({
//   url: "/home/multidata",
//   method: "GET", //request要指定是什么请求
// });

// hyRequest.request({
//   //这个请求有拦截东西
//   url: "/home/multidata",
//   method: "GET",
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单独请求的config");
//       return config;
//     },
//     requestInterceptorCatch: (err: any) => {
//       console.log("dd请求失败的拦截"); //coderwhy说可以不用写error的，但不写这里会报错
//       return err;
//     },
//     responseInterceptor: (res: any) => {
//       console.log("单独响应的response");
//       return res;
//     },
//     responseInterceptorCatch: (err: any) => {
//       console.log("dd响应失败的拦截");
//       return err;
//     },
//   },
// });

// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }

// hyRequest
//   .get<DataType>({
//     //告诉它T是设置的DataType类型
//     url: "/home/multidata",
//     showLoading: true, //要不要显示showloading可以用参数传过来
//   })
//   .then((res) => {
//     //res是DataType类型，传进去了T，Promise出来还是T，即DataType，有以下三个属性
//     console.log(res.data);
//     console.log(res.returnCode);
//     console.log(res.success);
//   });
