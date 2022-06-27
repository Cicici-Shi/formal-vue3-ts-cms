import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  //module类型，泛型，传入S、R S是模块中state的类型，R是根store中的state类型
  namespaced: true, //作用域
  state() {
    return {
      usersList: [],
      usersCount: 0, //数据总数
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0,
      storyList: [],
      storyCount: 0,
    };
  },
  mutations: {
    //user数据的获取和store中的保存：在user.vue中dispatch一个action，在service做了网络请求的封装，在本文件调用网络请求的封装，拿到数据，解构数据，通过mutation放到state中
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    },
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list;
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count;
    },
    changeCategoryList(state, list: any[]) {
      state.categoryList = list;
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count;
    },
    changeStoryList(state, list: any[]) {
      state.storyList = list;
    },
    changeStoryCount(state, count: number) {
      state.storyCount = count;
    },
  },

  getters: {
    pageListData(state) {
      return (pageName: string) => {
        //return一个函数
        return (state as any)[`${pageName}List`];
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //查询
      //第一个是上下文对象，拿commit，也可以dispatch或router相关的。
      // console.log(payload.pageUrl); //可以用console.log试一下有没有传过来
      // console.log(payload.queryInfo);

      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      //规范的可以直接拼写出来 假如公司的url写得不规范:用case更有阅读性
      //switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data;

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1); //首字母大写
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
      // switch (pageName) {
      //     case 'users':
      //       commit(`changeUserList`, list)
      //       commit(`changeUserCount`, totalCount)
      //       break
      //     case 'role':
      //       commit(`changeRoleList`, list)
      //       commit(`changeRoleCount`, totalCount)
      //       break
      //   }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      //{ dispatch }是从context中解构出来，也可以context.dispath，若不用dispatch，写的是context
      // 1.获取pageName和id
      // pageName -> /users这样
      // id -> /users/id有了id才能完整拼接出来
      const { pageName, id } = payload; //从payload拿出来
      const pageUrl = `/${pageName}/${id}`;

      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据,展示的时候才没有那条删掉的
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    //新建逻辑
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求 要告诉编辑的哪条数据，带上id
      const { pageName, editData, id } = payload;
      console.log(editData);
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData); //调service

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
