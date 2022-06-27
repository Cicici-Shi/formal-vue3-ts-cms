class LocalCache {
  //类有更强的封装性，所以选择类
  setCache(key: string, value: any) {
    //value可能要保存对象、数组、字符串、number，所以any。也可以用联合，但没必要
    window.localStorage.setItem(key, JSON.stringify(value)); //window.localStorage.setItem要求传入的value是string，所以要JSON.stringify转化//用账号coderwhy登了一次后，用codertest登就有缓存，如果做项目我可能考虑用session storage
  }

  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key);
    if (value) {
      //如果获取到了
      return JSON.parse(value); //把转掉的再转成对象
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
