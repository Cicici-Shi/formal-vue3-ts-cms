// service统一出口
import HYRequest from "./request"; //把request封装的类拿出来
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";

const hyRequest = new HYRequest({
  //new出来的是一个实例/对象hyRequest，类是抽象的HYRequest
  baseURL: BASE_URL, //不写死，放在request的config.ts中，导入
  timeout: TIME_OUT,

  //想传入hooks，但是这里要求传入AxiosRequestConfig类型，所以在HYRequestConfig中定义了一堆类型
  interceptors: {
    //有传的话，这里才有得拦截
    requestInterceptor: (config) => {
      // 携带token的拦截，只有该实例携带
      const token = localCache.getCache("token"); //从缓存中拿到token再携带过去
      if (token) {
        if (!config) {
          //这两个if是不让config.headers报未定义
          config = {};
        }
        if (!config.headers) {
          config.headers = {};
        }

        config.headers.Authorization = `Bearer ${token}`;
        //axios请求到的结果res中，数据在data，还有很多其他用不到的数据
      }
      //封装时成功或失败会有很多拦截console，封装完了就可以删掉
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

//添加前缀，和别人的封装区分，这个封装在其他项目中也可以使用，避免命名冲突
export default hyRequest; //其他地方拿这个就可以直接用
