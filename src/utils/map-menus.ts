//有点复杂的代码可以写在这个工具文件中
import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  //接收userMenus，返回数组route。符合userMenus的路由再放到RouteRecordRaw
  const routes: RouteRecordRaw[] = [];

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/); //require.context webpack的加载文件夹工具 true表示递归查找，文件夹里面的文件夹......找下来；只找当前文件夹下面的就false \.ts正则表达式，所有以.ts结尾的文件
  routeFiles.keys().forEach((key) => {
    //./system/user/user.ts split 用.切割，拿/system/user/user
    const route = require("../router/main" + key.split(".")[1]); //commonJS中的require，加载具体文件
    allRoutes.push(route.default); //route拿到module，route.default才拿到有path、name的对象
  });

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1 -> children
  // type === 2 -> url -> route。
  const _recurseGetRoute = (menus: any[]) => {
    //封装一个递归函数
    for (const menu of menus) {
      if (menu.type === 2) {
        //===2才开始映射，不然就得继续递归
        const route = allRoutes.find((route) => route.path === menu.url); //find() es6的函数，从数组中找到某个对象 这里是当===的时候，就是想要的route
        if (route) routes.push(route); //如果找到想要的route，就把它放到routes中
        if (!firstMenu) {
          //如果firstMenu没值，就把第一个找到的menu值给它，下次进来就有值了
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs); //
  return breadcrumbs;
}

// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      //可以展开，不是要找的，要进行遍历找有url的
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath); //如果menu.children没有值，就去遍历空数组，不然undefined就会出问题
      if (findMenu) {
        //findMenu是一级，menu是二级
        breadcrumbs?.push({ name: menu.name }); //这里不给path，点击就不会跳转到notFound
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      //一级的在上面遍历过就会来到这里
      return menu;
    }
  }
}

//用户权限的字符串
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    //递归
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);

  return permissions;
}

//获取菜单里所有叶子节点（下面没有子节点）的key
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []; //要了id

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children); //递归对其调用
      } else {
        leftKeys.push(menu.id); //没有值，就把id放到里面
      }
    }
  };
  _recurseGetLeaf(menuList); //调用

  return leftKeys;
}

export { firstMenu };
