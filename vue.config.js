const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 属性值包裹在lessOptions内
        lessOptions: {
          javascriptEnabled: true,
          globalVars: {
            "bg-color": "#F4F5F7",
            primary: "#00BDA1",
          },
        },
      },
      sass: {
        sassOptions: {
          // 输出风格改为 expanded (避免伪元素中的字符被转义）
          outputStyle: "expanded",
        },
      },
    },
  },
});
