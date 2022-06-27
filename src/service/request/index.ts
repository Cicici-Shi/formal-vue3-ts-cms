import axios from "axios"; //当前文件对axios有依赖，引进的的axios是实例AxiosInstance
import type { AxiosInstance } from "axios";
import type { HYRequestInterceptors, HYRequestConfig } from "./type";

import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";

const DEAFULT_LOADING = true; //默认情况变了可以在这里改

class HYRequest {
  //类本身的封装性较函数强
  //为多个不同的Request对象（如多个BASE_URL），创建多个instance实例
  instance: AxiosInstance; //Axios前缀的类型是axios内部告诉的
  interceptors?: HYRequestInterceptors; //可选，不一定有该拦截器，实例hyRequest才有
  showLoading: boolean;
  loading?: LoadingInstance; //可选，不一定认为下面的回调函数一定会调用

  constructor(config: HYRequestConfig) {
    //请求拦截是后添加的先执行，响应拦截是先添加的先响应，一般无所谓，都是改config的
    //对对应config做基础配置、HYRequestConfig是自己的类型，不止可以传AxiosRequestConfig基础配置，还可以传拦截器
    // 创建axios实例
    this.instance = axios.create(config); //放到instance中保存

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING; //双问号，看一下前面的是不是undefined或者null，如果是就默认给default
    this.interceptors = config.interceptors;

    // 使用拦截器（公有逻辑，逻辑封装到拦截器中）
    // 1.从config中取出的拦截器是对应的实例的拦截器，写在实例hyRequest中，在外层index.ts
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, //有些拦截器是没有必要传的，写成可选的
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有的实例都有的拦截器（封装在单个实例、请求有单独的拦截的是提升，这种封装在全局的是基本的）
    this.instance.interceptors.request.use(
      (config) => {
        //封装时成功或失败会有很多拦截console，封装完了就可以删掉

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true, //
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除，可选（有值的时候才移除）不用if，直接用可选链
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~, 错误信息");
        } else {
          return data;
        }
      },
      (err) => {
        // 将loading移除 请求失败也要移除，不然就一直显示loading
        this.loading?.close();

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息,一般用switch
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
        return err;
      }
    );
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    //返回一个promise，自己设的return
    //传HY开头的才能有拦截器
    return new Promise((resolve, reject) => {
      //给request做个修改，以返回promise。里面用this.instance发送请求，请求到结果后把resolve结果返回出去，错误用reject把错误返回
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        //有这个interceptor带的函数就对config进行转化
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        //为false时再进来，不然就默认显示loading
        this.showLoading = config.showLoading; //config.showLoading就是false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //这里的res是上面res.data过的，不再是AxiosResponse类型，换成T
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res); //res是T类型（调用函数者决定的），默认responseInterceptor要求AxiosResponse类型，不匹配。要把responseInterceptor类型通过request时传的HYRequestConfig改成T，进而传到HYRequestInterceptors，这里的才被改掉
          }

          //2.将showLoading设置true, 这样不会影响下一个请求。默认显示，为false再不显示
          this.showLoading = DEAFULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    //这四个HYRequestConfig也像request一样的原因加<T>
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" }); //修改
  }
}
//把当前的类导出
export default HYRequest;
