export interface IDataType<T = any> {
  //别人没有传就默认any
  code: number;
  data: T; //类型是不确定的用户信息、菜单可能是数组
}
