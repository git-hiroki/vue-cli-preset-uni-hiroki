const
  TransformPages = require("uni-read-pages"),
  path = require("path"),
  { webpack } = new TransformPages();

module.exports = {
  css: {
    loaderOptions: {
      less: {
        sourceMap: true,
        lessOptions: {
          javascriptEnabled: true,
          globalVars: {
            hack: `true; @import "${path.join(
              __dirname,
              "src/static/variables.less"
            )}";`
          }
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(
        {
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/
        }
      ),
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages(
            { includes: ["path", "name", "meta", "aliasPath"] }
          );
          return JSON.stringify(tfPages.routes);
        }, true)
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(
        options => Object.assign(
          options ?? {},
          { limit: 1000000000 }
        )
      );
  },
  lintOnSave: true
};