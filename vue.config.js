const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // transpileDependencies: true,
  outputDir: "./build",
  devServer: {
    //避免跨域
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000", //映射到152.。。。解决跨域访问问题
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
  //配置方式：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
  },
});
