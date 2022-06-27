//数据请求并保存在vuex
import { Module } from "vuex";

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getGoodsAmountList,
  getGoodsSaleTop10,
} from "@/service/main/analysis/dashboard";

import { IDashboardState } from "./types";
import { IRootState } from "../../types";

const dashboardModule: Module<IDashboardState, IRootState> = {
  //泛型
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
      goodsAmountList: [],
      goodsSaleTop10: [],
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    },
    changeGoodsAmountList(state, list: any[]) {
      state.goodsAmountList = list;
    },
    changeGoodsSaleTop10(state, list: any[]) {
      state.goodsSaleTop10 = list;
    },
  },
  actions: {
    //请求数据
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount();
      commit("changeCategoryGoodsCount", categoryCountResult.data);
      const categorySaleResult = await getCategoryGoodsSale();
      commit("changeCategoryGoodsSale", categorySaleResult.data);
      const categoryFavorResult = await getCategoryGoodsFavor();
      commit("changeCategoryGoodsFavor", categoryFavorResult.data);
      const addressGoodsResult = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", addressGoodsResult.data);
      const goodsAmountListRes = await getGoodsAmountList();
      commit("changeGoodsAmountList", goodsAmountListRes.data);
    },
    async goodsSaleTop10Action({ commit }) {
      const goodsSaleTop10Res = await getGoodsSaleTop10();
      commit("changeGoodsSaleTop10", goodsSaleTop10Res.data);
    },
  },
};

export default dashboardModule;
