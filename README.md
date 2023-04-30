# vue-cli-preset-uni-hiroki
- 版本号 1.0.0

# 新建项目
```
  vue create -p git-hiroki/vue-cli-preset-uni-hiroki my-project
```

# 环境信息
- node v16.14.0
- npm v8.3.1
- @vue/cli 5.0.8
- TUIKit IM SDK 7.1.3925 (2023年3月15日 17:10:07)

# 技术栈
- uni-app (mp-weixin, app-plus, h5, 其他平台未测试)
- TUIKit (可选)

# preset 说明
本项目旨在为个人和中小企业提供 uni-app 脚手架的最佳实践。
通过填写 preset options, 你可以快速获得一个轻量, 干净且满足各种中小项目开发的 Vue 脚手架。

# preset 特点
1. 集成路由守卫功能 (必选)
2. 可选使用 Tinify 在 git commit 时自动压缩项目内图片
3. 可选使用 husky 约束 git 提交信息, 并支持发布版本时自动生成 CHANGELOG
4. 可选支持并且天然兼容一套经过精细化配置的 ESLint 规则
6. 可选集成 腾讯云 TIM 即时通讯解决方案
7. 提供上拉加载、tabs、表单验证等一些方便的自带组件
8. 集成全局 Modal, Popup, 用法请参见脚手架内部 README

# 贡献者 (排名不分先后)
> - 🌳·𝒉𝒊𝒓𝒐𝒌𝒊 <hiroki@email.com>