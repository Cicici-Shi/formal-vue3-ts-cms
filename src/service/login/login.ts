import hyRequest from "../index";

import { IAccount, ILoginResult } from "./type";
import { IDataType } from "../types";

enum LoginAPI { //枚举：将一组可能出现的值，列举出来，在一个类型中
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法: /users/1（id）
  UserMenus = "/role/", // 用法: role/1（id）/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    //调用post函数时是必须传入一个泛型的，所以必须IDataType，给IDataType里面的T为ILoginResult，若不传则为any
    //IDataType中的data的类型是ILoginResult
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id, //users/1（id）在这里拼接
    showLoading: false, //不要showloading，不然会跳几次
  });
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false,
  });
}
