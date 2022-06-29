(function(){var t={4465:function(t,e,n){"use strict";var o=n(9963),r=n(7484),s=n.n(r),a=n(178),i=n.n(a);s().extend(i());const c="YYYY-MM-DD HH:mm:ss";function u(t,e=c){return s().utc(t).utcOffset(8).format(e)}function d(t){t.config.globalProperties.$filters={foo(){console.log("foo")},formatTime(t){return u(t)}}}function l(t){t.use(d)}var f=n(6252);function h(t,e,n,o,r,s){const a=(0,f.up)("router-view"),i=(0,f.up)("el-config-provider");return(0,f.wg)(),(0,f.j4)(i,{locale:t.zhCn},{default:(0,f.w5)((()=>[(0,f.Wm)(a)])),_:1},8,["locale"])}var g=n(8582),m=n(8538),p=(0,f.aZ)({name:"App",components:{ElConfigProvider:g.BR},setup(){return{zhCn:m.Z}}}),y=n(3744);const v=(0,y.Z)(p,[["render",h]]);var C=v,b=n(3824),w=n(6104),L=n(8001),S=(n(4415),n(2868));const Z=(0,o.ri)(C);for(const A in S)if(Reflect.has(S,A)){const t=S[A];Z.component(A,t)}Z.use(l),Z.use(w.ZP),(0,w.zn)(),Z.use(b.Z),Z.use(L.Z),Z.mount("#app")},3824:function(t,e,n){"use strict";var o=n(2119),r=n(3224),s=n(997);const a=[{path:"/",redirect:"/main"},{path:"/login",name:"login",component:()=>n.e(737).then(n.bind(n,9737))},{path:"/main",name:"main",component:()=>n.e(212).then(n.bind(n,2330))},{path:"/:pathMatch(.*)*",name:"notFound",component:()=>n.e(185).then(n.bind(n,2185))}],i=(0,o.p7)({history:(0,o.r5)(),routes:a});i.beforeEach((t=>{if("/login"!==t.path){const t=r.Z.getCache("token");if(!t)return"/login"}if("/main"===t.path)return console.log(s.Sl),s.Sl.url})),e["Z"]=i},901:function(t,e,n){"use strict";n.r(e);const o=()=>Promise.all([n.e(296),n.e(337)]).then(n.bind(n,2337));e["default"]={path:"/main/analysis/dashboard",name:"dashboard",component:o,children:[]}},8979:function(t,e,n){"use strict";n.r(e);const o=()=>n.e(481).then(n.bind(n,6481));e["default"]={path:"/main/analysis/overview",name:"overview",component:o,children:[]}},1666:function(t,e,n){"use strict";n.r(e);const o=()=>Promise.all([n.e(110),n.e(296),n.e(706)]).then(n.bind(n,1708));e["default"]={path:"/main/product/category",name:"category",component:o,children:[]}},1934:function(t,e,n){"use strict";n.r(e);const o=()=>n.e(840).then(n.bind(n,3840));e["default"]={path:"/main/product/goods",name:"goods",component:o,children:[]}},649:function(t,e,n){"use strict";n.r(e);const o=()=>n.e(491).then(n.bind(n,4491));e["default"]={path:"/main/story/chat",name:"chat",component:o,children:[]}},604:function(t,e,n){"use strict";n.r(e);const o=()=>n.e(896).then(n.bind(n,2896));e["default"]={path:"/main/story/list",name:"list",component:o,children:[]}},9515:function(t,e,n){"use strict";n.r(e);const o=()=>Promise.all([n.e(110),n.e(527)]).then(n.bind(n,293));e["default"]={path:"/main/system/department",name:"department",component:o,children:[]}},5291:function(t,e,n){"use strict";n.r(e);const o=()=>n.e(567).then(n.bind(n,9567));e["default"]={path:"/main/system/menu",name:"menu",component:o,children:[]}},6645:function(t,e,n){"use strict";n.r(e);const o=()=>Promise.all([n.e(110),n.e(15)]).then(n.bind(n,7909));e["default"]={path:"/main/system/role",name:"role",component:o,children:[]}},1169:function(t,e,n){"use strict";n.r(e);const o=()=>Promise.all([n.e(110),n.e(725)]).then(n.bind(n,6881));e["default"]={path:"/main/system/user",name:"user",component:o,children:[]}},9302:function(t,e,n){"use strict";n.d(e,{Z:function(){return g}});var o=n(2482),r=n(9669),s=n.n(r),a=n(3028);const i=!0;class c{constructor(t){(0,o.Z)(this,"instance",void 0),(0,o.Z)(this,"interceptors",void 0),(0,o.Z)(this,"showLoading",void 0),(0,o.Z)(this,"loading",void 0),this.instance=s().create(t),this.showLoading=t.showLoading??i,this.interceptors=t.interceptors,this.instance.interceptors.request.use(this.interceptors?.requestInterceptor,this.interceptors?.requestInterceptorCatch),this.instance.interceptors.response.use(this.interceptors?.responseInterceptor,this.interceptors?.responseInterceptorCatch),this.instance.interceptors.request.use((t=>(this.showLoading&&(this.loading=a.kN.service({lock:!0,text:"正在请求数据....",background:"rgba(0, 0, 0, 0.5)"})),t)),(t=>t)),this.instance.interceptors.response.use((t=>{this.loading?.close();const e=t.data;if("-1001"!==e.returnCode)return e;console.log("请求失败~, 错误信息")}),(t=>(this.loading?.close(),404===t.response.status&&console.log("404的错误~"),t)))}request(t){return new Promise(((e,n)=>{t.interceptors?.requestInterceptor&&(t=t.interceptors.requestInterceptor(t)),!1===t.showLoading&&(this.showLoading=t.showLoading),this.instance.request(t).then((n=>{t.interceptors?.responseInterceptor&&(n=t.interceptors.responseInterceptor(n)),this.showLoading=i,e(n)})).catch((t=>(this.showLoading=i,n(t),t)))}))}get(t){return this.request({...t,method:"GET"})}post(t){return this.request({...t,method:"POST"})}delete(t){return this.request({...t,method:"DELETE"})}patch(t){return this.request({...t,method:"PATCH"})}}var u=c;let d="";const l=1e4;d="http://coderwhy.org/prod";var f=n(3224);const h=new u({baseURL:d,timeout:l,interceptors:{requestInterceptor:t=>{const e=f.Z.getCache("token");return e&&(t||(t={}),t.headers||(t.headers={}),t.headers.Authorization=`Bearer ${e}`),t},requestInterceptorCatch:t=>t,responseInterceptor:t=>t,responseInterceptorCatch:t=>t}});var g=h},6104:function(t,e,n){"use strict";n.d(e,{ZP:function(){return D},zn:function(){return O},oR:function(){return T}});var o,r=n(3907),s=n(9302);function a(t){return s.Z.post({url:o.AccountLogin,data:t})}function i(t){return s.Z.get({url:o.LoginUserInfo+t,showLoading:!1})}function c(t){return s.Z.get({url:o.UserMenus+t+"/menu",showLoading:!1})}(function(t){t["AccountLogin"]="/login",t["LoginUserInfo"]="/users/",t["UserMenus"]="/role/"})(o||(o={}));var u=n(3224),d=n(997),l=n(3824);const f={namespaced:!0,state(){return{token:"",userInfo:{},userMenus:[],permissions:[]}},getters:{},mutations:{changeToken(t,e){t.token=e},changeUserInfo(t,e){t.userInfo=e},changeUserMenus(t,e){t.userMenus=e;const n=(0,d.xC)(e);n.forEach((t=>{l.Z.addRoute("main",t)}));const o=(0,d.CZ)(e);t.permissions=o}},actions:{async accountLoginAction({commit:t,dispatch:e},n){const o=await a(n),{id:r,token:s}=o.data;t("changeToken",s),u.Z.setCache("token",s),e("getInitialDataAction",null,{root:!0});const d=await i(r),f=d.data;t("changeUserInfo",f),u.Z.setCache("userInfo",f);const h=await c(f.role.id),g=h.data;t("changeUserMenus",g),u.Z.setCache("userMenus",g),l.Z.push("/main")},loadLocalLogin({commit:t,dispatch:e}){const n=u.Z.getCache("token");n&&(t("changeToken",n),e("getInitialDataAction",null,{root:!0}));const o=u.Z.getCache("userInfo");o&&t("changeUserInfo",o);const r=u.Z.getCache("userMenus");r&&t("changeUserMenus",r)}}};var h=f;function g(t,e){return s.Z.post({url:t,data:e})}function m(t){return s.Z["delete"]({url:t})}function p(t,e){return s.Z.post({url:t,data:e})}function y(t,e){return s.Z.patch({url:t,data:e})}const v={namespaced:!0,state(){return{usersList:[],usersCount:0,roleList:[],roleCount:0,goodsList:[],goodsCount:0,menuList:[],menuCount:0,departmentList:[],departmentCount:0,categoryList:[],categoryCount:0,storyList:[],storyCount:0}},mutations:{changeUsersList(t,e){t.usersList=e},changeUsersCount(t,e){t.usersCount=e},changeRoleList(t,e){t.roleList=e},changeRoleCount(t,e){t.roleCount=e},changeGoodsList(t,e){t.goodsList=e},changeGoodsCount(t,e){t.goodsCount=e},changeMenuList(t,e){t.menuList=e},changeMenuCount(t,e){t.menuCount=e},changeDepartmentList(t,e){t.departmentList=e},changeDepartmentCount(t,e){t.departmentCount=e},changeCategoryList(t,e){t.categoryList=e},changeCategoryCount(t,e){t.categoryCount=e},changeStoryList(t,e){t.storyList=e},changeStoryCount(t,e){t.storyCount=e}},getters:{pageListData(t){return e=>t[`${e}List`]},pageListCount(t){return e=>t[`${e}Count`]}},actions:{async getPageListAction({commit:t},e){const n=e.pageName,o=`/${n}/list`,r=await g(o,e.queryInfo),{list:s,totalCount:a}=r.data,i=n.slice(0,1).toUpperCase()+n.slice(1);t(`change${i}List`,s),t(`change${i}Count`,a)},async deletePageDataAction({dispatch:t},e){const{pageName:n,id:o}=e,r=`/${n}/${o}`;await m(r),t("getPageListAction",{pageName:n,queryInfo:{offset:0,size:10}})},async createPageDataAction({dispatch:t},e){const{pageName:n,newData:o}=e,r=`/${n}`;await p(r,o),t("getPageListAction",{pageName:n,queryInfo:{offset:0,size:10}})},async editPageDataAction({dispatch:t},e){const{pageName:n,editData:o,id:r}=e;console.log(o);const s=`/${n}/${r}`;await y(s,o),t("getPageListAction",{pageName:n,queryInfo:{offset:0,size:10}})}}};var C,b=v;function w(){return s.Z.get({url:C.categoryGoodsCount})}function L(){return s.Z.get({url:C.categoryGoodsSale})}function S(){return s.Z.get({url:C.categoryGoodsFavor})}function Z(){return s.Z.get({url:C.addressGoodsSale})}function A(){return s.Z.get({url:C.goodsAmountList})}function k(){return s.Z.get({url:C.goodsSaleTop10})}(function(t){t["categoryGoodsCount"]="/goods/category/count",t["categoryGoodsSale"]="/goods/category/sale",t["categoryGoodsFavor"]="/goods/category/favor",t["addressGoodsSale"]="/goods/address/sale",t["goodsAmountList"]="/goods/amount/list",t["goodsSaleTop10"]="/goods/sale/top10"})(C||(C={}));const I={namespaced:!0,state(){return{categoryGoodsCount:[],categoryGoodsSale:[],categoryGoodsFavor:[],addressGoodsSale:[],goodsAmountList:[],goodsSaleTop10:[]}},mutations:{changeCategoryGoodsCount(t,e){t.categoryGoodsCount=e},changeCategoryGoodsSale(t,e){t.categoryGoodsSale=e},changeCategoryGoodsFavor(t,e){t.categoryGoodsFavor=e},changeAddressGoodsSale(t,e){t.addressGoodsSale=e},changeGoodsAmountList(t,e){t.goodsAmountList=e},changeGoodsSaleTop10(t,e){t.goodsSaleTop10=e}},actions:{async getDashboardDataAction({commit:t}){const e=await w();t("changeCategoryGoodsCount",e.data);const n=await L();t("changeCategoryGoodsSale",n.data);const o=await S();t("changeCategoryGoodsFavor",o.data);const r=await Z();t("changeAddressGoodsSale",r.data);const s=await A();t("changeGoodsAmountList",s.data)},async goodsSaleTop10Action({commit:t}){const e=await k();t("changeGoodsSaleTop10",e.data)}}};var G=I;const E=(0,r.MT)({state(){return{name:"coderwhy",age:18,entireDepartment:[],entireRole:[],entireMenu:[]}},mutations:{changeEntireDepartment(t,e){t.entireDepartment=e},changeEntireRole(t,e){t.entireRole=e},changeEntireMenu(t,e){t.entireMenu=e}},getters:{},actions:{async getInitialDataAction({commit:t}){const e=await g("/department/list",{offset:0,size:1e3}),{list:n}=e.data,o=await g("/role/list",{offset:0,size:1e3}),{list:r}=o.data,s=await g("/menu/list",{}),{list:a}=s.data;t("changeEntireDepartment",n),t("changeEntireRole",r),t("changeEntireMenu",a)}},modules:{login:h,system:b,dashboard:G}});function O(){E.dispatch("login/loadLocalLogin")}function T(){return(0,r.oR)()}var D=E},3224:function(t,e){"use strict";class n{setCache(t,e){window.localStorage.setItem(t,JSON.stringify(e))}getCache(t){const e=window.localStorage.getItem(t);if(e)return JSON.parse(e)}deleteCache(t){window.localStorage.removeItem(t)}clearCache(){window.localStorage.clear()}}e["Z"]=new n},997:function(t,e,n){"use strict";n.d(e,{CH:function(){return s},CZ:function(){return i},Sl:function(){return o},Sx:function(){return a},v_:function(){return c},xC:function(){return r}});let o=null;function r(t){const e=[],r=[],s=n(372);s.keys().forEach((t=>{const e=n(7259)("./main"+t.split(".")[1]);r.push(e.default)}));const a=t=>{for(const n of t)if(2===n.type){const t=r.find((t=>t.path===n.url));t&&e.push(t),o||(o=n)}else a(n.children)};return a(t),e}function s(t,e){const n=[];return a(t,e,n),n}function a(t,e,n){for(const o of t)if(1===o.type){const t=a(o.children??[],e);if(t)return n?.push({name:o.name}),n?.push({name:t.name}),t}else if(2===o.type&&o.url===e)return o}function i(t){const e=[],n=t=>{for(const o of t)1===o.type||2===o.type?n(o.children??[]):3===o.type&&e.push(o.permission)};return n(t),e}function c(t){const e=[],n=t=>{for(const o of t)o.children?n(o.children):e.push(o.id)};return n(t),e}},372:function(t,e,n){var o={"./analysis/dashboard/dashboard.ts":901,"./analysis/overview/overview.ts":8979,"./product/category/category.ts":1666,"./product/goods/goods.ts":1934,"./story/chat/chat.ts":649,"./story/list/list.ts":604,"./system/department/department.ts":9515,"./system/menu/menu.ts":5291,"./system/role/role.ts":6645,"./system/user/user.ts":1169};function r(t){var e=s(t);return n(e)}function s(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=s,t.exports=r,r.id=372},7259:function(t,e,n){var o={"./main/analysis/dashboard/dashboard":901,"./main/analysis/dashboard/dashboard.ts":901,"./main/analysis/overview/overview":8979,"./main/analysis/overview/overview.ts":8979,"./main/product/category/category":1666,"./main/product/category/category.ts":1666,"./main/product/goods/goods":1934,"./main/product/goods/goods.ts":1934,"./main/story/chat/chat":649,"./main/story/chat/chat.ts":649,"./main/story/list/list":604,"./main/story/list/list.ts":604,"./main/system/department/department":9515,"./main/system/department/department.ts":9515,"./main/system/menu/menu":5291,"./main/system/menu/menu.ts":5291,"./main/system/role/role":6645,"./main/system/role/role.ts":6645,"./main/system/user/user":1169,"./main/system/user/user.ts":1169};function r(t){var e=s(t);return n(e)}function s(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=s,t.exports=r,r.id=7259}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,o,r,s){if(!o){var a=1/0;for(d=0;d<t.length;d++){o=t[d][0],r=t[d][1],s=t[d][2];for(var i=!0,c=0;c<o.length;c++)(!1&s||a>=s)&&Object.keys(n.O).every((function(t){return n.O[t](o[c])}))?o.splice(c--,1):(i=!1,s<a&&(a=s));if(i){t.splice(d--,1);var u=r();void 0!==u&&(e=u)}}return e}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[o,r,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,o){return n.f[o](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+t+"."+{15:"356de6ec",110:"ce35df25",185:"3ba58c8f",212:"da3c10da",296:"34fa4567",337:"b1ad5556",481:"03dcfe5d",491:"b20d6043",527:"16c7bb29",567:"a7bb605a",706:"a0d0e75e",725:"f818a414",737:"ada96762",840:"18ecc3cc",896:"d6d22731"}[t]+".js"}}(),function(){n.miniCssF=function(t){return"css/"+t+"."+{15:"9b3774f0",185:"928b7516",212:"dd00eb55",337:"668d0fd5",481:"a724fa96",491:"be04092e",527:"8fdd13d9",567:"43c5ca47",706:"fe4fe055",725:"78006dea",737:"55f06cf8",840:"43c5ca47",896:"0c4485e3"}[t]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="vue3-ts-cms:";n.l=function(o,r,s,a){if(t[o])t[o].push(r);else{var i,c;if(void 0!==s)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var l=u[d];if(l.getAttribute("src")==o||l.getAttribute("data-webpack")==e+s){i=l;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",e+s),i.src=o),t[o]=[r];var f=function(e,n){i.onerror=i.onload=null,clearTimeout(h);var r=t[o];if(delete t[o],i.parentNode&&i.parentNode.removeChild(i),r&&r.forEach((function(t){return t(n)})),e)return e(n)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var t=function(t,e,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var s=function(s){if(r.onerror=r.onload=null,"load"===s.type)n();else{var a=s&&("load"===s.type?"missing":s.type),i=s&&s.target&&s.target.href||e,c=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=i,r.parentNode.removeChild(r),o(c)}};return r.onerror=r.onload=s,r.href=e,document.head.appendChild(r),r},e=function(t,e){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],s=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(s===t||s===e))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],s=r.getAttribute("data-href");if(s===t||s===e)return r}},o=function(o){return new Promise((function(r,s){var a=n.miniCssF(o),i=n.p+a;if(e(a,i))return r();t(o,i,r,s)}))},r={143:0};n.f.miniCss=function(t,e){var n={15:1,185:1,212:1,337:1,481:1,491:1,527:1,567:1,706:1,725:1,737:1,840:1,896:1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=o(t).then((function(){r[t]=0}),(function(e){throw delete r[t],e})))}}(),function(){var t={143:0};n.f.j=function(e,o){var r=n.o(t,e)?t[e]:void 0;if(0!==r)if(r)o.push(r[2]);else{var s=new Promise((function(n,o){r=t[e]=[n,o]}));o.push(r[2]=s);var a=n.p+n.u(e),i=new Error,c=function(o){if(n.o(t,e)&&(r=t[e],0!==r&&(t[e]=void 0),r)){var s=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;i.message="Loading chunk "+e+" failed.\n("+s+": "+a+")",i.name="ChunkLoadError",i.type=s,i.request=a,r[1](i)}};n.l(a,c,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,s,a=o[0],i=o[1],c=o[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(c)var d=c(n)}for(e&&e(o);u<a.length;u++)s=a[u],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(d)},o=self["webpackChunkvue3_ts_cms"]=self["webpackChunkvue3_ts_cms"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(4465)}));o=n.O(o)})();
//# sourceMappingURL=app.50a75869.js.map