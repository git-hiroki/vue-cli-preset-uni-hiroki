/**
 * @desc 将新配置并入原配置中
 * @param {Object} from 新配置
 * @param {Object} from 原配置
 * @returns {Object} 合并后的配置
*/
function merge(newConf, oldConf){
  const result = {};
  Object.entries(oldConf).filter(([k]) => !Object.keys(newConf).includes(k)).forEach(
    ([k, v]) => {
      result[k] = v;
    }
  );
  return {
    ... newConf,
    ... result
  };
}

// eslint-disable-next-line max-lines-per-function
module.exports = (api, options, rootOptions) => {
  api.extendPackage(
    { version: "1.0.0" },
    { forceOverwrite: true }
  );
  api.extendPackage(
    // eslint-disable-next-line max-lines-per-function, complexity
    pkg => ({
      scripts: {
        ... merge(
          {
            "dev:app-plus": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=app-plus vue-cli-service uni-build --watch\"",
            "dev:custom": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development uniapp-cli custom\"",
            "dev:h5": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve\"",
            "dev:mp-360": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-360 vue-cli-service uni-build --watch\"",
            "dev:mp-alipay": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-alipay vue-cli-service uni-build --watch\"",
            "dev:mp-baidu": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-baidu vue-cli-service uni-build --watch\"",
            "dev:mp-jd": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-jd vue-cli-service uni-build --watch\"",
            "dev:mp-kuaishou": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-kuaishou vue-cli-service uni-build --watch\"",
            "dev:mp-lark": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-lark vue-cli-service uni-build --watch\"",
            "dev:mp-qq": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-qq vue-cli-service uni-build --watch\"",
            "dev:mp-toutiao": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-toutiao vue-cli-service uni-build --watch\"",
            "dev:mp-weixin": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch\"",
            "dev:mp-xhs": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=mp-xhs vue-cli-service uni-build --watch\"",
            "dev:quickapp-native": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=quickapp-native vue-cli-service uni-build --watch\"",
            "dev:quickapp-webview": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=quickapp-webview vue-cli-service uni-build --watch\"",
            "dev:quickapp-webview-huawei": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=quickapp-webview-huawei vue-cli-service uni-build --watch\"",
            "dev:quickapp-webview-union": "concurrently \"node .issue_display\" \"cross-env NODE_ENV=development UNI_PLATFORM=quickapp-webview-union vue-cli-service uni-build --watch\"",
            "depcheck": "depcheck .",
            ... options?.eslint ? {
              "lint": "eslint ./src/*.vue ./src/**/*.vue ./src/**/**/*.vue ./*.js ./src/*.js ./src/**/*.js ./src/**/**/*.js",
              "lint:fix": "npm run lint -- --fix"
            } : {},
            ... options?.tinify ? {
              tinify: "node ./tinify.js"
            } : {},
            ... options?.esdoc ? {
              esdoc: "esdoc -c ./docs/.esdoc.json"
            } : {},
            ... options?.changelog ? {
              version: "conventional-changelog -p custom-config -i CHANGELOG.md -s -n ./changelogrc.js && git add CHANGELOG.md && git commit --no-verify -m \"docs: 更改CHANGELOG.md",
              release: "npm version minor -m \"chore: 线上版本更新\"",
              major: "npm version major -m \"chore: 线上版本更新\""
            } : {},
            ... options?.commitlint || options?.tinify ? {
              "prepare": "npx husky install",
              "lint-staged": "lint-staged -q -v"
            } : {}
          },
          pkg?.scripts
        )
      },
      dependencies: {
        ... merge(
          {
            "moment": "^2.29.4",
            "uni-simple-router": "^2.0.7",
            "uni-read-pages": "^1.0.5",
            "qs": "^6.11.0",
            ... options?.TUIKit ? {
              "tim-profanity-filter-plugin": "^0.9.0",
              "tim-wx-sdk": "^2.17.0",
              "tim-js-sdk": "^2.17.0",
              "tim-upload-plugin": "^1.0.4",
              "cos-wx-sdk-v5": "^1.0.10"
            } : {}
          },
          pkg?.dependencies
        )
      },
      devDependencies: {
        ... options?.commitlint || options?.tinify ? {
          "husky": "^8.0.2",
          "lint-staged": "^13.1.0"
        } : {},
        ... options?.commitlint ? {
          "@commitlint/cli": "^17.3.0",
          "@commitlint/config-conventional": "^17.3.0",
          "commitlint": "^17.3.0",
          "vue-cli-plugin-commitlint": "^1.0.12"
        } : {},
        ... options?.changelog ? {
          "conventional-changelog-cli": "^2.2.2",
          "conventional-changelog-custom-config": "^0.3.1"
        } : {},
        ... options?.esdoc ? {
          "esdoc": "^1.1.0",
          "esdoc-ecmascript-proposal-plugin": "^1.0.0",
          "esdoc-standard-plugin": "^1.0.0",
          "esdoc-vue-plugin": "^1.0.0"
        } : {},
        ... options?.eslint ? {
          "babel-eslint": "^10.1.0",
          "eslint": "^7.32.0",
          "eslint-plugin-vue": "^7.19.1"
        } : {},
        ... options?.stylelint ? {
          "stylelint": "^14.16.0",
          "stylelint-config-recommended-vue": "^1.4.0",
          "stylelint-order": "^5.0.0"
        } : {},
        ... options?.tinify ? {
          tinify: "^1.6.1"
        } : {},
        "colors": "^1.3.2",
        "concurrently": "^8.0.1",
        "depcheck": "^1.4.3",
        "@dcloudio/uni-helper-json": "*",
        "@dcloudio/types": "^3.3.2",
        "miniprogram-api-typings": "*",
        "mini-types": "*",
        "less-loader": "^6.0.0",
        "postcss": "^7.0.39",
        "postcss-comment": "^2.0.0",
        "@vue/cli-plugin-babel": "~4.5.15",
        "@vue/cli-service": "~4.5.15"
      },
      resolutions: {
        "@babel/runtime": "~7.17.9"
      },
      husky: {
        hooks: {
          "commit-msg": "commitlint -E $HUSKY_GIT_PARAMS"
        }
      },
      browserslist: [
        "Android >= 4.4",
        "ios >= 9"
      ]
    })
  );

  api.render(files => {
    Object.keys(files)
      .forEach(
        path => delete files[path]
      );
  });

  api.render("../template/common");

  if(options.TUIKit){
    api.render("../template/tuikit");
  }
  else {
    api.render("../template/default");
  }
};