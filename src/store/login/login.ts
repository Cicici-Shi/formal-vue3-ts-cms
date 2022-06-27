//store和views的文件夹是对应的
import { Module } from "vuex";

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/login";
import localCache from "@/utils/cache";
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus";
import router from "@/router"; //下面4跳转到首页

import { IAccount } from "@/service/login/type";
import { ILoginState } from "./types"; //I开头代表是接口
import { IRootState } from "../types";

const loginModule: Module<ILoginState, IRootState> = {
  //Module<S, R> S是模块中state的类型，R是根store中的state类型
  namespaced: true, //给个命名空间
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token; //state的token等于别人传过来的token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      //注册动态路由

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus);

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route); //addRoute()路由的动态添加路由方法
      }); // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //写成异步函数
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token); //把token做一个本地缓存

      // 发送初始化的请求(完整的role/department)。调根里面的action（模块中也有）
      dispatch("getInitialDataAction", null, { root: true });

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo); //用户信息也要本地缓存，下次用户来的时候就可以直接跳转到首页了
      // 3.请求用户菜单，每个用户的菜单权限不一样
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);
      // 4.跳到首页
      router.push("/main"); //压入一个新界面，点击返回时，上一个界面还可以回退
    },
    loadLocalLogin({ commit, dispatch }) {
      //与setupStore配套，让vuex刷新后也会加载对应的token数据
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
        // 发送初始化的请求(完整的role/department) 对应刷新操作
        dispatch("getInitialDataAction", null, { root: true });
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log("phoneLoginAction", payload);

    // },
  },
};

export default loginModule;
