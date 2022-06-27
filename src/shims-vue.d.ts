/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component//导出的是组件类型对应的实例
}

declare let $store: any
declare module '*.json'
