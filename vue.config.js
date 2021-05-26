module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "VueApp";
      return args;
    });
  },
  devServer: {
    proxy: process.env.VUE_APP_MY_ENV_BASE_API_URL
  },
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/]
    }
  }
};
