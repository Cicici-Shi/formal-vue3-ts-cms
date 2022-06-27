import { ILoginState } from "./login/types";
import { ISystemState } from "./main/system/types";
import { IDashboardState } from "./main/analysis/types";

export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState; //带login的module
  system: ISystemState;
  dashboard: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule; //兼具二者属性
