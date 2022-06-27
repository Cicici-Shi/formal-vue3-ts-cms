import { createStore, Store, useStore as useVuexStore } from "vuex"; //用as取别名

import login from "./login/login"; //login外面不要加大括号
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard";

import { getPageListData } from "@/service/main/system/system";

import { IRootState, IStoreType } from "./types";

const store = createStore<IRootState>({
  //使用state时，只能用IRootState中的，其他不属于的可以写，但用不了
  state() {
    return {
      name: "coderwhy",
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    },
  },
  getters: {},
  actions: {
    //发送网络请求去获取，写在actions中
    async getInitialDataAction({ commit }) {
      //async是写到下面发现要await才加的
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000,
      });
      const { list: departmentList } = departmentResult.data; //不要两个都叫list，list: departmentList取别名。system/system.ts获取数据需要.data
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleResult.data;
      const menuResult = await getPageListData("/menu/list", {}); //第二个不需要额外参数，给空对象就行
      const { list: menuList } = menuResult.data;

      // 2.保存数据，要写对应的mutations
      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
      commit("changeEntireMenu", menuList);
    },
  },
  modules: {
    login,
    system,
    dashboard,
  },
});

export function setupStore() {
  //setupStore表示对store中的东西做初始化 vuex刷新完就没了
  store.dispatch("login/loadLocalLogin"); //login模块中的调用这个action
  // store.dispatch("getInitialDataAction");//需要调用。要拿到token再调用，不然异步会出错，所以放在login.ts拿到token后
}

export function useStore(): Store<IStoreType> {
  //自制store类型，让vuex可以在ts下用
  return useVuexStore();
}

export default store;
