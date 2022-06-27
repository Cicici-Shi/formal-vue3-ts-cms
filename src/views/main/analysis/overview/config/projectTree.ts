export const treeOptions = `
vue3_ts_cms
│  .browserslistrc
│  .eslintrc.js
│  .gitignore
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  vue.config.js
│
├─public
│      favicon.ico
│      index.html
│
└─src
    │  App.vue
    │  main.ts
    │  shims-vue.d.ts
    │
    ├─assets
    │  ├─css
    │  │      base.less
    │  │      index.less
    │  │
    │  └─img
    │          login-bg.svg
    │          logo.svg
    │
    ├─base-ui
    │  ├─breadcrumb
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      breadcrumb.vue
    │  │  │
    │  │  └─types
    │  │          index.ts
    │  │
    │  ├─card
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          card.vue
    │  │
    │  ├─descriptions
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          descriptions.vue
    │  │
    │  ├─echarts
    │  │  │  index.ts
    │  │  │
    │  │  ├─data
    │  │  │      china.json
    │  │  │
    │  │  ├─hooks
    │  │  │      useECharts.ts
    │  │  │
    │  │  └─src
    │  │          base-echart.vue
    │  │
    │  ├─editor
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          editor.vue
    │  │
    │  ├─form
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      form.vue
    │  │  │
    │  │  └─types
    │  │          index.ts
    │  │
    │  └─tabel
    │      │  index.ts
    │      │
    │      └─src
    │            tabel.vue
    │
    ├─components
    │  ├─nav-header
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          nav-header.vue
    │  │          nav-info.vue
    │  │
    │  ├─nav-menu
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          nav-menu.vue
    │  │
    │  ├─page-content
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │         page-content.vue
    │  │   
    │  ├─page-echarts
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │       bar-echart.vue
    │  │  │       line-echart.vue
    │  │  │       map-echart.vue
    │  │  │       pie-echart.vue
    │  │  │       pie-lable-echart.vue
    │  │  │       rose-echart.vue
    │  │  │
    │  │  ├─types
    │  │  │       index.ts
    │  │  │
    │  │  └─utils
    │  │          convert-data.ts
    │  │          coordinate-data.ts
    │  │   
    │  ├─page-modal
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          page-modal.vue
    │  │
    │  └─page-search
    │      │  index.ts
    │      │
    │      └─src
    │              page-search.vue
    │
    ├─global
    │      index.ts
    │      register-properties.ts
    │
    ├─hooks
    │      use-page-modal.ts
    │      use-page-search.ts
    │      use-permission.ts
    │
    ├─router
    │  │  index.ts
    │  │
    │  ├─login
    │  │      index.ts
    │  │
    │  └─main
    │      ├─analysis
    │      │  ├─dashboard
    │      │  │      dashboard.ts
    │      │  │
    │      │  └─overview
    │      │          overview.ts
    │      │
    │      ├─product
    │      │  ├─category
    │      │  │      category.ts
    │      │  │
    │      │  └─goods
    │      │          goods.ts
    │      │
    │      ├─story
    │      │  ├─chat
    │      │  │      chat.ts
    │      │  │
    │      │  └─list
    │      │          list.ts
    │      │
    │      └─system
    │          ├─department
    │          │      department.ts
    │          │
    │          ├─menu
    │          │      menu.ts
    │          │
    │          ├─role
    │          │      role.ts
    │          │
    │          └─user
    │                  user.ts
    │
    ├─service
    │  │  axios.demo.ts
    │  │  index.ts
    │  │  types.ts
    │  │
    │  ├─login
    │  │      index.ts
    │  │      types.ts
    │  │
    │  ├─main
    │  │  ├─analysis
    │  │  │      dashboard.ts
    │  │  │
    │  │  ├─story
    │  │  │      index.ts
    │  │  │
    │  │  └─system
    │  │          system.ts
    │  │
    │  └─request
    │          config.ts
    │          index.ts
    │          type.ts
    │
    ├─store
    │  │  index.ts
    │  │  types.ts
    │  │
    │  ├─analysis
    │  │      dashboard.ts
    │  │      types.ts
    │  │
    │  ├─login
    │  │      index.ts
    │  │      types.ts
    │  │
    │  ├─product
    │  │
    │  └─system
    │          system.ts
    │          types.ts
    │
    ├─utils
    │      cache.ts
    │      date-formate.ts
    │      map-menus.ts
    │
    └─views
        ├─login
        │  │  LoginView.vue
        │  │
        │  ├─cpns
        │  │      account-config.vue
        │  │
        │  ├─cpns
        │  │      login-account.vue
        │  │      login-panel.vue
        │  │      login-phone.vue
        │  │
        │  └─hooks
        │
        ├─main
        │  │  MainView.vue
        │  │
        │  ├─analysis
        │  │  ├─dashboard
        │  │  │  └─dashboard.vue
        │  │  │
        │  │  └─overview
        │  │      │  overview.vue
        │  │      │
        │  │      └─config
        │  │              dependencies.ts
        │  │              devDependencies.ts
        │  │              projectStandard.ts
        │  │              projectTree.ts
        │  │              technologyStacks.ts
        │  │
        │  ├─product
        │  │  ├─category
        │  │  │  │  category.vue
        │  │  │  │
        │  │  │  ├─config
        │  │  │  │      dialog.config.ts
        │  │  │  │      form.config.ts
        │  │  │  │      tabel.config.ts
        │  │  │  │
        │  │  │  └─cpn
        │  │  │          categoryHeader.vue
        │  │  │
        │  │  └─goods
        │  │      │  goods.vue
        │  │      │
        │  │      └─configs
        │  │              content.config.ts
        │  │
        │  ├─story
        │  │  ├─chat
        │  │  │      chat.vue
        │  │  │
        │  │  └─list
        │  │      │  list.vue
        │  │      │
        │  │      └─config
        │  │              content.config.ts
        │  │
        │  └─system
        │      ├─department
        │      │  │  department.vue
        │      │  │
        │      │  └─config
        │      │          content.config.ts
        │      │          modal.config.ts
        │      │          search.config.ts
        │      │
        │      ├─menu
        │      │  │  menu.vue
        │      │  │
        │      │  └─config
        │      │          content.config.ts
        │      │
        │      ├─role
        │      │  │  role.vue
        │      │  │
        │      │  └─config
        │      │          content.config.ts
        │      │          modal.config.ts
        │      │          search.config.ts
        │      │
        │      └─user
        │          │  user.vue
        │          │
        │          └─configs
        │                  content.config.ts
        │                  modal.config.ts
        │                  search.config.ts
        │
        └─not-found
            │  not-Found.vue
            │
            └─src
`;
