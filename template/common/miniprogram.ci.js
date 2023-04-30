const
  path = require("path"),
  minimist = require("minimist"),
  argv = minimist(
    process.argv.slice(2)
  ),
  config = {
    appid: argv.appid,
    version: argv.version,
    desc: argv.desc,
    projectPath: argv.projectPath,
    threads: 2,
    es6: true,
    es7: true,
    minify: true,
    disableUseStrict: true,
    autoPrefixWXSS: true,
    bigPackageSizeSupport: true,
    onProgressUpdate: console.warn
  };

(async ({
  appid,
  version,
  desc,
  projectPath,
  threads,
  es6,
  es7,
  minify,
  disableUseStrict,
  autoPrefixWXSS,
  bigPackageSizeSupport,
  onProgressUpdate
}) => {
  console.warn(JSON.stringify(argv));
  const
    ci = require("miniprogram-ci"),
    project = new ci.Project({
      appid,
      type: "miniProgram",
      projectPath: path.resolve(__dirname, projectPath),
      privateKeyPath: path.resolve(__dirname, `private.${appid}.key`),
      ignores: ["node_modules/**/*"]
    }),
    res = await ci.upload({
      project,
      version,
      desc,
      threads,
      setting: {
        es6,
        es7,
        minify,
        disableUseStrict,
        autoPrefixWXSS,
        bigPackageSizeSupport
      },
      onProgressUpdate
    });
  // eslint-disable-next-line no-console
  console.log(res);
})(config);