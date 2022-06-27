export interface IAccount {
  //把该接口导出
  name: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}
