module.exports = [
  {
    type: "input",
    name: "uniAppId",
    message: "请输入在Dcloud开发者中心处(https://dev.dcloud.net.cn/)申请到的形如__UNI__XXXXXXX的 AppId (可选)",
    filter: input => new Promise(
      (resolve, reject) => {
        if(!input || 14 == input.length){
          resolve(input);
        }
        else {
          reject(
            new Error("Dcloud AppId 填写不正确, 请检查后重新输入")
          );
        }
      }
    )
  },
  {
    type: "input",
    name: "wxAppId",
    message: "请输入微信小程序 AppId (如有)",
    filter: input => new Promise(
      (resolve, reject) => {
        if(!input || 18 == input.length){
          resolve(input);
        }
        else {
          reject(
            new Error("微信小程序 AppId 填写不正确, 请检查后重新输入")
          );
        }
      }
    )
  },
  {
    type: "confirm",
    name: "lint",
    message: "执行编码规范配置"
  },
  {
    type: "confirm",
    name: "eslint",
    when: answers => answers.lint,
    message: "使用 ESLint 进行编码规范检查和自动修复"
  },
  {
    type: "confirm",
    name: "commitlint",
    message: "提交时验证 git 提交记录应符合规范",
    when: answers => answers.lint,
    default: true
  },
  {
    type: "confirm",
    name: "changelog",
    message: "升级版本时根据 git 提交记录生成 CHANGELOG",
    when: answers => answers.lint,
    default: true
  },
  {
    type: "confirm",
    name: "tinify",
    message: "提交时使用 Tinify 自动压缩图片(默认不压缩)",
    when: answers => answers.lint,
    default: false
  },
  {
    type: "input",
    name: "tinifyKey",
    message: "请输入 Tinify Key",
    when: answers => answers.tinify,
    filter: input => new Promise(
      (resolve, reject) => {
        if(32 == input.length){
          resolve(input);
        }
        else {
          reject(
            new Error("Tinify Key 填写不正确, 请检查后重新输入")
          );
        }
      }
    )
  },
  {
    type: "input",
    name: "baseUrl",
    message: "请输入请求 baseUrl",
    default: "https://localhost/api"
  },
  {
    type: "input",
    name: "primaryColor",
    message: "请输入应用主要色(#xxxxxx)",
    default: "#FF0000",
    filter: input => new Promise(
      (resolve, reject) => {
        if(7 == input.length){
          resolve(input);
        }
        else {
          reject(
            new Error("主色填写不正确, 请检查后重新输入")
          );
        }
      }
    )
  },
  {
    type: "confirm",
    name: "TUIKit",
    message: "是否集成 TUIKit",
    default: false
  },
  {
    type: "input",
    name: "TUIKitSDKAppID",
    when: answers => answers.TUIKit,
    message: "请输入 TIM SDKAppID",
    filter: input => new Promise(
      (resolve, reject) => {
        if(10 == String(input.length)){
          resolve(input);
        }
        else {
          reject(
            new Error("TIM SDKAppID 填写不正确, 请检查后重新输入")
          );
        }
      }
    )
  },
  {
    type: "input",
    name: "TUIKitSecretKey",
    when: answers => answers.TUIKit,
    message:
      "请输入 TIM Secret Key (可选, 如不填则无法开箱即用, 需要自行通过接口获取 UserSig)",
    filter: input => new Promise(
      (resolve, reject) => {
        if(!input.length || 64 == String(input.length)){
          resolve(input);
        }
        else {
          reject(
            new Error("TIM Secret Key 填写不正确, 请检查后重新输入")
          );
        }
      }
    )
  }
];