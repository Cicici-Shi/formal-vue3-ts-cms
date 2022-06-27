import hyRequest from "../../index";

import { IDataType } from "../../types";

enum DashboardAPI { //多个网络请求，枚举enum。接口
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
  goodsAmountList = "/goods/amount/list",
  goodsSaleTop10 = "/goods/sale/top10",
} //写了六个网络请求，不同权限可以作区分

export function getCategoryGoodsCount() {
  return hyRequest.get<IDataType>({
    //不理解IDataType是什么意思，抄下面的system.ts来的
    url: DashboardAPI.categoryGoodsCount,
  });
}

export function getCategoryGoodsSale() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale,
  });
}

export function getCategoryGoodsFavor() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor,
  });
}

export function getAddressGoodsSale() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale,
  });
}

export function getGoodsAmountList() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.goodsAmountList,
  });
}

export function getGoodsSaleTop10() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.goodsSaleTop10,
  });
}
