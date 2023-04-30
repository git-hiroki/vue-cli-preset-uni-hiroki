# <%= rootOptions.projectName %>
- 版本号 1.0.0

# 项目安装
```
  npm install --verbose --legacy-peer-deps
```

# 环境信息
- node v16.14.0
- npm v8.3.1
- wx-dev-tools 1.06.2210310 win32-x64
- wx-base-lib 2.27.1

**请认真通读此文档, 不执行该文档中涉及的细节将直接导致提交被驳回的后果**

# 设计原则
1. 在程序设计时应遵循下列原则
> 安全性 > 精巧性 > 统一性 > 扩展性 > 复用性 > 可维护性 > 易用性

分清技术资产和技术债务的区别,

宁可花更长时间在设计上, 也不遗留技术债务, 避免积重难返, 最后变得无法维护

**啰嗦的代码难以维护**, 因此代码应该极尽精巧和优雅, 即不写任何一行无用代码, 在实现前优先而深刻的思考如何精简化实现

2. 彻底关注和聚焦数据的输入和输出,

了解用户在点选按钮或在输入控件处输入的信息**经过何种加工后**方可变为后端需要的数据,

巧用 this.$set 和迭代函数 map, filter, some, every, … etc, 来操作数据,

始终坚持以数据驱动改变视图的原则, 如无必要, **不新增任何页面中的UI状态**, 而是直接修改数据, 从而达到UI变化的目的

3. 注重组件和方法的复用性, 任何跨组件、页面调用超过一次的方法应抽离至 mixins 中, 任何在未来可能复用的伴随状态的DOM结构都应该被单独抽象成为组件, 在设计组件或 mixins 方法时, 应始终预设使用者作为无脑小白, 不应让复用方法关注过多的业务上下文, 代码贡献者始终有责任为方法的使用者提供丝般顺滑的开发体验

4. 千里之堤, 溃于蚁穴

任何一座屎山都是从第一行 trick 代码形成的, 应该面向未来编程, 解决问题前应彻查原因, 从根源入手直达症结, 无法确定根本原因的问题向产品等非研发人员说明时应统一口径, 一律断言为无法解决, 直到查出根因为止, 永远不可通过取巧的方法处理, 避免掩盖问题造成积患

5. 设计程序应遗留文档或注释, 向使用者说明应用场景以及应该规避的问题, 应该学会始终从历史问题中汲取教训

> 掉到坑里不要慌, 写个文档帮人忙, 精诚协作相互助, 赠人玫瑰留余香


# 分支策略
> **主干**: master 分支的最新一次提交必须稳定, 上面的每一次带有标签的提交都应该是可发布的

> **小功能开发**: 开发人员从 develop 分支上拉 用户名/日期 分支, 自测后合回 develop

> **多人合作功能开发**: leader 从 develop 分支上拉 feature/日期.功能名 分支, 随后开发人员直接从该分支上提交, 中途不发pr, 功能自测完备后, 由主程提 pr 合回 develop, 主程对该次 pr 的代码质量负责

> **线上问题修复**: 开发人员从最新一个带有标签的 commit 中拉 hotfix/日期.功能名 分支, 改动后直接提测, 经过测试后合回 develop 和 master

# 提交信息规范
## 提交信息类别
* feat: 新功能
* fix: 修补bug
* docs: 文档
* style:  格式, 不影响代码运行的变动
* refactor: 重构, 既不是新增功能, 也不是修改bug的代码变动
* test: 增加测试
* chore: 构建过程或辅助工具的变动
* perf: 提升性能
## 提交信息格式
[类别]:[禅道关联] 提交信息

> feat: STORY #15 新增 ×××× 功能

> fix: BUG #6 修复 ×××× BUG

提交信息不小于六个汉字, 不符合规范的提交将被程序自动拒绝

# 编码规范
  - 如无必要, 禁用.then, 改用 async/await
  - 类unix操作系统中对文件名大小写敏感, windows不敏感, 因此文件/目录使用中划线`-`命名, 禁用驼峰和下划线`_`
  - less 中, 涉及函数的建议使用 ~ 表达式, 如: `~"calc(1 + 2)"`, 用于规避运行时函数在编译时被处理的情况
  - 引入文件时, 忽略扩展名
  - 数字小于 0 时, 忽略小数点前的`0`, 如 `0.2` 记作 `.2`
  - less语句和DOM节点中, 使用 `~@/` 开头的路径替代以 `../` 开头的路径, js 中始终使用以 `@/` 开头的路径引入本地文件
  - 如果一个方法或属性被挂载于`uni.`中, 请始终使用该方法, 而非单独引入, 组件同理, 已经声明的全局组件请勿再度书写引入语句
  - 请参照位于 `docs/architecture-diagram.svg` 下的架构图对照要实现的功能属于哪个层级, 越层的代码将被拒绝
  - 没有任何内容的DOM节点记为单标记
  - 禁止使用 `import` 语法导入非 `js` / `vue` / `json` 文件
  - 样式代码中禁止设置 `overflow`, `overflow-x`, `overflow-y` 为 `auto`, `unset`, `hidden` 之外的任何值, 确有需要的, 使用 `<scroll-view>` 组件实现
  - 为防下标越界, 在 `data()` 中不允许使用 `-1` 作为数组下标的默认值
  - 如无必要, 禁止内联样式
  - 抽象配置文件时, 应始终按后端数据的要求定义字段, 若日后配置文件需要改成接口实现, 应当可以无缝优雅升级
  - 确定仅在一个固定页面中使用的组件应放在页面目录下的 `components` 目录, 而非 `src/components` 目录
  - 组件、函数的设计始终遵循单一职责原则, 不允许一个功能身兼数职, 慎用函数重载功能
  - 图片和资源文件命名应明确, 图片不应该使用颜色命名, 推荐使用表示形状或状态的命名, 如: `icon-gray` 应改为 `icon-disabled`, 在英语语境中多个不连词组合在一起时, 始终使用连字符 `-` 将其分隔
  - 确保图片目录里所有资源存在至少一次调用, 微信小程序限制上传资源的总大小, 空间寸土寸金
  - 若非必要, 不使用 storage 进行持久化
  - 引入目前架构内不存在的新写法、新工艺前应当报leader获准
  - import 文件时禁止出现循环引用, 及 b `import a` 后 a `import b`
  - 不允许新增 setInterval, 如确有需要, 请在全局定时器 `runTimer` 中进行处理

  - 其余规则请参照 .eslintrc.js 及已有代码
  **不论项目是否处于紧急状态, 针对不符合规范的代码一律直接打回处理, 若约定工期, 由此产生的delay由对应功能的开发者负责**

请在编写时始终使用且仅使用 eslint 确保编码规范, 禁止与其他同类型插件混用, 以避免带来意想不到的效果

# 应用分包
  代码包过大时, 上传/发布会被拒绝
  - 整个小程序所有分包大小不超过 20M
  - 单个分包/主包大小不能超过 2M

  因此, 项目中目前按迭代版本区分分包, 以 `v[版本号]-pages` 为分包目录进行命名
  
  有关应用分包, 可以参照下列文档
  https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html
  https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html

  目前项目中所有图片均放置于本地目录下进行编译, 但根据这一限制, 未来面临所有分包超限的风险时, 将会把图片等资产迁移至 oss 中

# 第三方组件
原则上不拒绝通过插件市场下载对应的组件直接进行使用, 但在引入时, 应对第三方组件的选型做好充分评估,
并使用注释标明出处、作者及其位于插件市场的链接

## 三方组件选型评估维度
- 安全性: 无恶意代码注入
- 精巧性: 代码不冗余, 命名清晰规范遵循语义
- 统一性: 与业务不冲突, 可以融入主视觉UI而无违和感
- 扩展性: 代码支持多平台, 不同平台的代码使用条件编译进行区分, 以避免后续小程序编译至其他平台时需要的额外兼容成本
- 复用性: 在业务中只引用不超过两次, 且未来复用可能性低于 20% 的组件, 建议考虑自行实现
- 可维护性: 与目前架构统一, 未使用已弃用的语法特性
- 易用性: 交互丝滑不卡顿, 界面友好, 无性能问题

Dcloud插件市场 https://ext.dcloud.net.cn/

## 一些禁忌
- 引入第三方组件时注意单位, 所有单位为 `px` 的数值应换算为 `rpx`, 如此一来可以天然兼容 `pad` 设备, 而无需为其单独书写兼容代码
- 为充分享受组件更新, 降低更新组件时的改造成本:
  1. 移植第三方组件时应当对移植过程中的修改做记录
  2. 针对全局引入的第三方组件尽量不做修改

# 图片压缩
目前在代码被提交至 git 仓库之前, 会使用 tinify 进行至少一次图片压缩操作, 压缩后的图片将被置于暂存区中

# API文档
目前项目集成 esdoc 作为文档生成工具, 可使用 `npm run esdoc` 指令根据代码注释自动生成 API 文档
请在设计复杂 API 时规范化代码注释, 以便可被自动化文档工具覆盖到

另, 请勿将本地生成的 esdoc 文档上传至 git 仓库

# 代码生成
目前项目中有关页面布局的代码使用 codefun 进行生成
具体可访问下列链接了解详情:
https://beta.code.fun/

如需权限, 可联系 hiroki@email.com 进行索取

## 一些禁忌
  - 位于 codefun 中 cdn 引入的图片必须本地化
  - 使用 codefun 布局代码时, 移除所有类似 `font-family: PingFangSC;` 的字体声明, 同时 `font-weight: 600;` 改为 `font-weight: bold;`

# 持续集成
未来将使用 jenkins 进行项目持续集成

如需权限, 可联系 hiroki@email.com 进行索取

---

# 路由架构
## 路由守卫
可在 ~@/utils/router.js 中在全局对页面进入, 退出的行为进行全局监听, 暴露下列钩子
- router.beforeEach
- router.afterEach

同时, 在组件中可以使用 beforeRouteLeave 生命周期钩子勾住离开页面事件, 从而在离开页面时可以更规范的做操作
(但受系统限制, 安卓滑动手势功能离开页面时可能无法被监听到, App-iOS 3.4.0+ 如需禁用滑动手势, 可在page.json中声明 disableSwipeBack)

有关路由守卫功能的更多细节请参看下列文档
https://hhyang.cn/v2/start/cross/guard.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB

## 编程式导航
- uni.navigateTo({ url: "path?a=1&b=2" }) 替换为 go.to("path", { a: 1, b: 2 })
- uni.redirectTo({ url: "path?a=1&b=2" }) 替换为 go.redirect("path", { a: 1, b: 2 })
- uni.switchTab({ url: "path?a=1&b=2" ) 替换为 go.toTab("path", { a: 1, b: 2 })
- uni.navigateBack({ delta: 1 }) 替换为 go.back(1)
- 新增 go.refreshBack() api, 以期解决返回上一页时 onLoad 方法不被调用的问题
- 目前在页面内已全局引入 go 并被挂载在 uni 对象中, 可直接使用 uni.$go
- **🚨redirect至tab页时请勿带参,小程序不支持此种写法!**

注: 使用自定义编程式导航可能对搜索优化产生影响, 具体可参阅下列链接的 "页面跳转优先采用 navigator 组件" 一节
https://developers.weixin.qq.com/miniprogram/dev/framework/search/seo.html

## 页面参数的接收
在已经引入 ~@/mixins 的页面中, 可以使用
```
  this.query()
```
用来接收上一个页面传入的参数, 会得到一个参数对象,
之所以这么做基于下列两点原因
- 受限于小程序架构限制, 一般情况下只能在 onLoad 的第一个参数中获得 query 对象, 这种写法不够优雅
- 结合编程式导航 ~@/utils/go, 可以将 query 暂存于 getApp().globalData 下, 用于解决某些情况下拿不到 query 的问题

# 布局说明
可通过修改 `@/store/manifest.js` 文件对页面布局及全局功能进行开关, 这里的开关将作为页面默认配置注入, 在页面 
onShow 生命周期自动写入对应 store 中
# 组件说明

## 1 无限上滑列表 (list)
### 使用说明
调用 list 组件时应确保在页面中引入 ~@/mixins

随后编写页面模板
```
  <list
    ref="list"
    @success="handleListSuccess"
  >
    <!-- 这里是需要循环的内容 -->
  </list>
```

在页面中, 加入数据源

```
//export default {
  computed: {
    options(){
      return {
        url: "feed/all",
        params: {
          sort: "top-today"
        }
      };
    }
  }
//}
```

随后在页面 onLoad 生命周期钩子函数中初始化 list
this?.$refs?.list?.init(this.options);


### 其他说明
如在同一页面中引入多个 list 组件, 则需要对refs及数据源进行分别命名, 调用方法如下

```
  <list
    ref="list1"
    @success="list => handleListSuccess(list, 'list1')"
  >
    <waterfall :data="list1" v-if="list1" />
  </list>
  <list
    ref="list2"
    @success="list => handleListSuccess(list, 'list2')"
  >
    <waterfall :data="list2" v-if="list2" />
  </list>
```

```
//export default {
  computed: {
    options(){
      return {
        "list1": {
          url: "…",
          params: {}
        },
        "list2": {
          url: "…",
          params: {}
        }
      }
    }
  }
//}
```

```
this?.$refs?.list1?.init(
  this?.options?.list1,
  "list1"
);
this?.$refs?.list2?.init(
  this?.options?.list2,
  "list1"
);
```

## 双向绑定控件开发说明
开发组件时, 应始终遵循双向绑定设计原则,
即, 在下列模板的基础上开发数据可响应式的组件, 这是为了充分进行状态隔离, 通过修改数据可以直接变更组件的表现, 而无需让组件外部关心`触发事件`和`UI状态`, 从而大幅精简代码逻辑

```
export default {
  props: {
    value: {
      type: String
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  computed: {
    defaultValue: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      }
    }
  },
  created() {
    this.defaultValue = this?.value;
  }
}
```
若该控件内存在输入行为, 则直接在组件内部修改 this.defaultValue 即可
随后即可在父级元素中使用 v-model 对该控件进行双向数据绑定

### 一些禁忌
1. 在表单控件中如果使用 this?.setData() 修改 defaultValue 数据,
会导致 computed?.set 监听失效, 请避免这种写法, 直接使用 `this.defaultValue = …` 赋值语句即可
2. 在使用双向绑定组件时, 要确保父级元素已声明此组件的 v-model 指令
3. 请确定双向绑定组件的 props 类型始终正确, 否则 v-model 指令无法将 value 传递给该组件

> ### 详情请参阅下列参考资料:
> https://zhuanlan.zhihu.com/p/102706931

> https://blog.csdn.net/qq_40052237/article/details/109630249

# 其他说明

## 发布版本
> npm run release

## 升级大版本
> npm run major

上述两个操作会自动执行自动生成 CHANGELOG 及打标签的动作

## 有关 keystore
本项目根下存在 .keystore 文件, 下面是该文件的信息

> Android包名: uni.UNIXXXXXXX
> 证书别名: __UNI__XXXXXXX
> 证书私钥密码: 与DCloud登录账号密码相同

https://ask.dcloud.net.cn/article/35777

```
keytool -genkey -alias __UNI__XXXXXXX -keyalg RSA -keysize 2048 -keystore keystore.keystore

keytool -importkeystore -srckeystore keystore.keystore -destkeystore keystore.keystore -deststoretype pkcs12
```

## 有关用户协议和隐私政策
 为落实《网络安全法》《消费者权益保护法》的要求, 有效治理App强制授权、过度索权、超范围收集个人信息等现象, 保障个人信息安全, 国内各大应用市场都加强了应用审核, 要求应用必须符合相关政策才能上架
 
 详情:
 https://uniapp.dcloud.net.cn/tutorial/app-privacy-android.html#

 不上架国内应用市场无需处理。

<%_ if (options.TUIKit) { _%>
## TIM
本项目已按下列文档集成 TIM:
https://github.com/TencentCloud/TIMSDK/tree/master/uni-app/TUIKit-vue2-js

其中, 为适配项目, 新增下列文件

> components/base

> components/tui-chat

> components/tui-conversation

> components/tui-conversation/conversation-item

> components/tui-group

> components/tui-group/group-profile

> debug/GenerateTestUserSig.js

> debug/lib-generate-test-usersig-es.min.js

> utils/api.js

> utils/common-utils.js

> utils/console.js

> utils/logger.js

> utils/token.js

集成时, 对部分文件进行了改动, 具体如下:

> static/static/tim-wx.js --> static/js/tim-wx.js

> static/static/* --> static/*

> pages/TUI-Chat/chat --> tim-pages/chat

> pages/TUI-Conversation/conversation --> tim-pages/conversation

> pages/TUI-Conversation/create-conversation --> tim-pages/create-conversation

> pages/TUI-Group/join-group --> tim-pages/join-group

> pages/TUI-Group/create-group --> tim-pages/create-group

> pages/TUI-Index --> tim-pages/index

> pages/TUI-Login --> tim-pages/login

> pages/TUI-User-Center --> tim-pages/ucenter

除上述提及的改动外, 其他均与 TIMSDK [6dfe341] 结构一致
<%_ } _%>

# 贡献者 (排名不分先后)

> - 🌳·𝒉𝒊𝒓𝒐𝒌𝒊 <hiroki@email.com>

# Todo's
- [x] 1. 架构开发