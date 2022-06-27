//放在上面的index.js会杂乱，从这里导入
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface HYRequestInterceptors<T = AxiosResponse> {
  //接口是可以接收泛型的，但里面的函数不可以。所以要接口接收T，里面才可以用。这里意思是默认类型是AxiosResponse，没传就是它
  //其实是回调hooks
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig; //这里的类型是看下面request.use源码说的
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T; //这里的类型是看index.ts下面request.use源码说的
  responseInterceptorCatch?: (error: any) => any;
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  //接口才可以接收泛型，里面才能用。上面和这里写一个默认也可以，但让接口本身更加独立写两个
  //把AxiosRequestConfig变成自己的类型，扩展了一个Interceptor
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean; //可选，不传就用默认值
}
